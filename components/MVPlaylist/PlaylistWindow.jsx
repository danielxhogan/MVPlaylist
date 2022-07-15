import { useState } from 'react';

import { useSelector } from 'react-redux';

import styles from '../../styles/css/PlaylistWindow.module.css';

export default function PlaylistWindow({ screenSize }) {
  const theme = useSelector(state => state.theme);
  const playlists = useSelector(state => state.playlists);
  const playlistItems = useSelector(state => state.playlistItems);

  const [ currentsong, setCurrentSong ] = useState('Cold Turkey VIP');

  const renderSongs = () => {
    return (playlistItems.items && playlistItems.items.map( song => {
      return (
        <div key={song.track.id} className={styles['playlist-item']}>
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
    <div className={`
      ${styles[theme]}
      ${styles['window']}
      ${styles[screenSize]}
      `}>
      <div className={styles['player-control']}>

        <div className={styles['player-control-btn']}>
          <i className='fa-solid fa-backward-step fa-xl' />
        </div>

        <div className={styles['player-control-btn']}>
          {true ? (
            <i className='fa-solid fa-pause fa-xl' />  
          ):(
            <i className='fa-solid fa-play fa-xl' />
          )}
        </div>

        <div className={styles['player-control-btn']}>
        <i className='fa-solid fa-forward-step fa-xl' />
        </div>

      </div>
      <div className={`
      ${styles['playlist-window']}
      `}>

        { renderSongs() }
      </div>
    </div>
  );
};