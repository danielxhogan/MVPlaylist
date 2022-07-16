import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useSession } from 'next-auth/react';

import { useSelector } from 'react-redux';

import styles from '../../styles/css/PlaylistWindow.module.css';

export default function PlaylistWindow({ screenSize }) {
  const router = useRouter();
  const { playlistId } = router.query;
  console.log(`playlistId: ${playlistId}`);
  const { data: session, status } = useSession();
  if (status === 'unauthenticated') { signIn('spotify'); }

  const theme = useSelector(state => state.theme);
  const playlists = useSelector(state => state.playlists);
  const playlistItems = useSelector(state => state.playlistItems);

  const [ deviceId, setDeviceId ] = useState();
  const [ player, setPlayer ] = useState(undefined);
  const [ playerIsActive, setPlayerIsActive ] = useState(false);
  const [ track, setTrack ] = useState();
  const [ paused, setPaused ] = useState(false);
  const [ currentsong, setCurrentSong ] = useState('Cold Turkey VIP');

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {

      const player = new window.Spotify.Player({
        name: 'MVPlaylist',
        getOAuthToken: cb => { cb(session.accessToken); },
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

      }));

      player.connect();
    };
  }, [session])

  const onClickPlaylistItem = (songId) => {
    if (!songId === track.id) {
      
    }
  }

  const renderSongs = () => {
    return (playlistItems.items && playlistItems.items.map( song => {
      return (
        <div
          key={song.track.id}
          className={styles['playlist-item']}
          onClick={() => onClickPlaylistItem(song.track.id)}
          >
          <div className={styles['playlist-item-play-btn']}>
            {song.track.name === currentsong ? (
              <i className='fa-solid fa-pause fa-xl' />  
            ):(
              <i className='fa-solid fa-play fa-xl' />
            )}
            
          </div>
          <div className={styles['playlist-item-content']}>
            <div>{ song.track.name }</div>
            <div className={styles['artist-name']}>
              { song.track.artists[0].name }
            </div>
          </div>
        </div>
      )
    }))
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
          onClick={ () => player.previousTrack() }
          >
          <i className='fa-solid fa-backward-step fa-xl' />
        </div>

        <div
          className={styles['player-control-btn']}
          onClick={ () => player.togglePlay() }
          >
          {paused ? (
            <i className='fa-solid fa-play fa-xl' />
            
          ):(
            <i className='fa-solid fa-pause fa-xl' />  
          )}
        </div>

        <div
          className={styles['player-control-btn']}
          onClick={ () => player.nextTrack() }
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