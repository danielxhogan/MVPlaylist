import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Script from 'next/script';
import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';
import { getYoutubeResultsAction } from '../../redux/actions/youtubeActions'

import axios from 'axios';
const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

import styles from '../../styles/css/PlaylistWindow.module.css';

export default function PlaylistWindow({
  screenSize,
  setViewExpanded,
//  setViewCollapsed
}) {
  const router = useRouter();
  const { playlistId } = router.query;

  const dispatch = useDispatch();

  const theme = useSelector(state => state.theme);
  const accessToken = useSelector(state => state.accessToken);
  const playlistItems = useSelector(state => state.playlistItems);
  const videos = useSelector(state => state.videos);

  const [ deviceId, setDeviceId ] = useState();
  const [ player, setPlayer ] = useState(undefined);
  const [ playerIsActive, setPlayerIsActive ] = useState(false);
  const [ track, setTrack ] = useState();
  const [ currentTrackId, setCurrentTrackId ] = useState();
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
        setPaused(state.paused);

        player.getCurrentState().then( state => { 
            (!state)? setPlayerIsActive(false) : setPlayerIsActive(true) 
        });

        if (state) {
          const trackId = state.track_window.current_track.id;

          for (let i=0; i<contextUris.length; i++) {
            let contextId = contextUris[i].split('spotify:track:')[1];

            if (contextId === trackId) {
              setCurrentContextIdx(i);
              setCurrentTrackId(contextId);
            }
          }
        }
      }));

      player.connect();
    };

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
      const contextId = contextUris[currentContextIdx - 1].split('spotify:track:')[1];
      setCurrentTrackId(contextId);
      setContext(currentContextIdx - 1);
      setCurrentContextIdx(currentContextIdx - 1);
    }
  }

  const onClickNext = () => {
    if (currentContextIdx < contextUris.length) {
      const contextId = contextUris[currentContextIdx + 1].split('spotify:track:')[1];
      setCurrentTrackId(contextId);
      setContext(currentContextIdx + 1);
      setCurrentContextIdx(currentContextIdx + 1);
    }
  }

  const onClickPlaylistItem = async (idx) => {
    const idxId = contextUris[idx].split('spotify:track:')[1];

    if (currentTrackId !== idxId) {
      setCurrentContextIdx(idx);
      setContext(idx);
      setCurrentTrackId(idxId);
    }
  };

  const togglePlayCurrentSong = (songId) => {
    if (player && currentTrackId === songId ) {
      player.togglePlay();
    }
  }

  const onClickMagGlass = (song) => {
    const songName = song.track.name;
    const artist = song.track.artists[0].name;
    const queryString = `${songName} ${artist}`;
    console.log(`queryString: ${queryString}`);

    const songId = song.track.id;

    dispatch(getYoutubeResultsAction(queryString, songId));
    setViewExpanded();
  }

  const renderSongs = () => {
    const songDivs = [];

    playlistItems.items && playlistItems.items.forEach((song, idx) => {
      songDivs.push(
        <div className={styles['playlist-item-container']}>
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

          <div className={styles['magnifying-glass']}>
            <i
              className={`fa-solid fa-magnifying-glass fa-xl`}
              onClick={() => onClickMagGlass(song)}
            />
          </div>

          { renderYTIcon(song.track.id) }
{/*
          <div className={styles['yt-button']}>
            <Image
              src='/images/youtube-icons-logos/yt_icon_rgb.png'
              width='45px'
              height='30px'
              alt='spotify logo'
            />
          </div>
*/}
        </div>
      );
    })

    return songDivs;
  }

  const checkForVideo = (songId) => {
    let matchingVideoId;

    videos.forEach(video => {
      if (video.songId === songId) {
        matchingVideoId = video.videoId;
      };
    });

    return matchingVideoId;
  }

  const renderYTIcon = (songId) => {
    const videoId = checkForVideo(songId);

    if (videoId) {
      return (
        <div
          className={styles['yt-button']}
//          onClick={playVideo}
          >
          <Image
            src='/images/youtube-icons-logos/yt_icon_rgb.png'
            width='45px'
            height='30px'
            alt='spotify logo'
          />
        </div>
      );
    } else {
      return <div></div>
    };
  };

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
