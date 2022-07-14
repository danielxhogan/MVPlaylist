import styles from '../../styles/css/PlaylistWindow.module.css';

import { useSelector } from 'react-redux';

export default function PlaylistWindow() {
  const theme = useSelector(state => state.theme);

  return (
    <div className={`
      ${styles[theme]}
      ${styles['window']}
      `}>
      <div className={`
      ${styles['playlist-window']}
      `}>
        Playlist Window
      </div>
    </div>
  );
};