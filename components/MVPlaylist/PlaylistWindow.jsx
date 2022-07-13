import styles from '../../styles/css/PlaylistWindow.module.css';

import { useSelector } from 'react-redux';

export default function PlaylistWindow() {
  const theme = useSelector(state => state.theme);

  return (
    <div className={styles[theme]}>
      <div className={`
      ${styles['playlist-window']}
      ${styles['window']}
      `}>
        Playlist Window
      </div>
    </div>
  );
};