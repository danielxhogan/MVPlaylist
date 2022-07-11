import styles from '../../styles/css/MVPlaylist.module.css';

import { useSelector } from 'react-redux';

export default function MVPlaylist() {
  const theme = useSelector(state => state.theme);

  return (
    <div className={styles[theme]}>
    <div className={styles['mvplaylist']}>
      Music Video Playlist
    </div>
    </div>
  );
}