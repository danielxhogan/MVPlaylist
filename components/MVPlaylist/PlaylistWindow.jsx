import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Script from 'next/script';
import Image from 'next/image';

import { useSelector } from 'react-redux';

import axios from 'axios';
const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

import styles from '../../styles/css/PlaylistWindow.module.css';

export default function PlaylistWindow({ screenSize }) {
  const router = useRouter();
  const { playlistId } = router.query;

  const theme = useSelector(state => state.theme);
  const accessToken = useSelector(state => state.accessToken);
  const playlistItems = useSelector(state => state.playlistItems);

  const [ deviceId, setDeviceId ] = useState();
  const [ player, setPlayer ] = useState(undefined);
  const [ playerIsActive, setPlayerIsActive ] = useState(false);
  const [ track, setTrack ] = useState();
  const [ contextUris, setContextUris ] = useState([]);
  const [ currentContextIdx, setCurrentContextIdx ] = useState(0);
  const [ paused, setPaused ] = useState(false);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {

      const player = new window.Spotify.Player({
        name: 'MVPlaylist',
        getOAuthToken: cb => { cb(accessToken); },
        volume: 1.0
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', ( state => {

        if (!state) {
            return;
        }
        setTrack(state.track_window.current_track);
        console.log(`track: ${state.track_window.current_track.name}`);
        setPaused(state.paused);

        player.getCurrentState().then( state => { 
            (!state)? setPlayerIsActive(false) : setPlayerIsActive(true) 
        });

        if (state) {
          const trackId = state.track_window.current_track.id;
          let contextIdx = null;

          for (let i=0; i<contextUris.length; i++) {
            let contextId = contextUris[i].split('spotify:track:')[1];
            if (contextId === trackId) { contextIdx = i; }
          }

          if (contextIdx) {
            console.log(`contextIdx: ${contextIdx}`);
            setCurrentContextIdx(contextIdx);
          }
        }
      }));

      player.connect();
    };

    // return () => {
    //   if (player) {
    //     player.removeListener('ready');
    //     player.removeListener('not_ready');
    //     player.removeListener('player_state_changed');
    //     player.disconnect();
    //   }
    // };

  }, [accessToken, deviceId, playlistId, player, contextUris])

  useEffect(() => {
    let uris = [];

    playlistItems.items && playlistItems.items.map(song => {
      uris.push(song.track.uri);
    });

    setContextUris(uris);
  }, [playlistItems.items])

  const setContext = async (idx) => {
    const url = `${SPOTIFY_BASE_URL}/me/player/play?device_id=${deviceId}`;
    const body = { 'uris': contextUris.slice(idx) };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    };
    // await axios.put(url, body, config);
    try { await axios.put(url, body, config); }
    catch (err) { window.location.reload(); }
  }

  const onClickPrevious = () => {
    if (currentContextIdx > 0) {
      setContext(currentContextIdx - 1);
    }
  }

  const onClickNext = () => {
    if (currentContextIdx < contextUris.length) {
      setContext(currentContextIdx + 1);
    }
  }

  const onClickPlaylistItem = (idx) => {
    const idxId = contextUris[idx].split('spotify:track:')[1];
    if ((!track) || (track && (track.id !== idxId))) {
      setCurrentContextIdx(idx);
      setContext(idx);
    }
  };

  const togglePlayCurrentSong = (songId) => {
    if (player && track && track.id === songId ) {
      player.togglePlay();
    }
  }

  const renderSongs = () => {
    const songDivs = [];

    playlistItems.items && playlistItems.items.forEach((song, idx) => {
      songDivs.push(
        <div
          key={song.track.id}
          className={styles['playlist-item']}
          onClick={() => onClickPlaylistItem(idx)}
          >

          <div
            className={styles['playlist-item-play-btn']}
            onClick={ () => togglePlayCurrentSong(song.track.id) }
            >
            {track &&
            (song.track.name === track.name) &&
            (paused === false)
            ? (
              <i className='fa-solid fa-pause fa-xl' />  
            ):(
              <i className='fa-solid fa-play fa-xl' />
            )}
          </div>

          <div className={styles['playlist-item-content']}>
            <div className={styles['song-name']}>
              { song.track.name }
            </div>
            <div className={styles['artist-name']}>
              { song.track.artists[0].name }
            </div>
          </div>
        </div>
      );
    })

    return songDivs;
  }

  return (
    <>
    <Script src="https://sdk.scdn.co/spotify-player.js"></Script>

    <div className={`
      ${styles[theme]}
      ${styles['window']}
      ${styles[screenSize]}
      `}>

      <div className={styles['player-control']}>
        <div className={styles['current-track-details']}>
          {track &&
          <div className={styles['current-track-cover-art']}>
          <Image
            src={track.album.images[0].url}
            height={50}
            width={50}
            alt='album conver'
            />
          </div>
          }
          {track &&
          <div>
          <div>{track.name}</div>
          <div>{track.artists[0].name}</div>
          </div>
          }
        </div>

        <div className={styles['player-control-btns']}>
          <div
            className={styles['player-control-btn']}
            onClick={ onClickPrevious }
            >
            <i className='fa-solid fa-backward-step fa-xl' />
          </div>

          <div
            className={styles['player-control-btn']}
            onClick={ () => player && player.togglePlay() }
            >
            {paused ? (
              <i className='fa-solid fa-play fa-xl' />
              
            ):(
              <i className='fa-solid fa-pause fa-xl' />  
            )}
          </div>

          <div
            className={styles['player-control-btn']}
            onClick={ onClickNext }
            >
          <i className='fa-solid fa-forward-step fa-xl' />
          </div>
        </div>
      </div>

      <div className={`
        ${styles['playlist-window']}
        `}>

        { renderSongs() }

      </div>
    </div>
    </>
  );
};