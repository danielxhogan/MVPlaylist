import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Script from 'next/script';

import { useSelector } from 'react-redux';

import axios from 'axios';
const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

import styles from '../../styles/css/PlaylistWindow.module.css';

export default function PlaylistWindow({ screenSize }) {
  const router = useRouter();
  const { playlistId } = router.query;

  const theme = useSelector(state => state.theme);
  const accessToken = useSelector(state => state.accessToken);
  const playlists = useSelector(state => state.playlists);
  const playlistItems = useSelector(state => state.playlistItems);

  const [ deviceId, setDeviceId ] = useState();
  const [ player, setPlayer ] = useState(undefined);
  const [ playerIsActive, setPlayerIsActive ] = useState(false);
  const [ track, setTrack ] = useState();
  const [ paused, setPaused ] = useState(false);
  const [ currentsong, setCurrentSong ] = useState('Friday');

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
        setContext(device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', ( state => {

          if (!state) {
              return;
          }
          setTrack(state.track_window.current_track);
          setPaused(state.paused);

          player.getCurrentState().then( state => { 
              (!state)? setPlayerIsActive(false) : setPlayerIsActive(true) 
          });

      }));

      player.connect();

      const setContext = async (device_id) => {
        const url = `${SPOTIFY_BASE_URL}/me/player/play?device_id=${device_id}`;

        const body = {
          'context_uri': `spotify:playlist:${playlistId}`
        };
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        };

        const res = await axios.put(url, body, config);
        console.log(`context response: ${res.status}`);
      };
    };

    // return () => {
    //   if (player) {
    //     player.removeListener('ready');
    //     player.removeListener('not_ready');
    //     player.removeListener('player_state_changed');
    //     player.disconnect();
    //   }
    // };

  }, [accessToken, deviceId, playlistId, player])

  const onClickPlaylistItem = async (contextUris) => {
    const url = `${SPOTIFY_BASE_URL}/me/player/play?device_id=${deviceId}`;

    const body = {
      'uris': contextUris
    };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      };
      try {
        const res = await axios.put(url, body, config);
      } catch (err) {
        window.location.reload();
      }
      
  };

  const renderSongs = () => {
    let contextUris = [];

    playlistItems.items && playlistItems.items.map(song => {
      contextUris.push(song.track.uri);
    });

    let contextUrisUris = [];
    const iterations = contextUris.length;

    for (let i=0; i<iterations; i++) {
      contextUrisUris.push([...contextUris]);
      contextUris.shift();
    }

    const songDivs = [];

    playlistItems.items && playlistItems.items.forEach((song, idx) => {
      songDivs.push(
        <div
          key={song.track.id}
          className={styles['playlist-item']}
          onClick={() => onClickPlaylistItem(contextUrisUris[idx])}
          >
          <div className={styles['playlist-item-play-btn']}>
            {song.track.name === currentsong ? (
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
        <div
          className={styles['player-control-btn']}
          onClick={ () => player && player.previousTrack() }
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
          onClick={ () => player && player.nextTrack() }
          >
        <i className='fa-solid fa-forward-step fa-xl' />
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