import { useState } from 'react';
import styles from '../../styles/css/MVPlaylist.module.css';

const DARK = 'dark';
const LIGHT = 'light';

export default function MVPlaylist() {
  const [ theme, setTheme ] = useState(DARK);
  
  return (
    <div className={styles[theme]}>
    <div className={styles['mvplaylist']}>
      Music Video Playlist
    </div>
    </div>
  );
}