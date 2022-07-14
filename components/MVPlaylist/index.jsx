import { signIn } from 'next-auth/react';

import PlaylistWindow from './PlaylistWindow';
import VideoWindow from './VideoWindow';
import styles from '../../styles/css/MVPlaylist.module.css';

import { useSelector } from 'react-redux';

export default function MVPlaylist() {
  const theme = useSelector(state => state.theme);
  const playlistItems = useSelector(state => state.playlistItems);

  if (playlistItems.error && playlistItems.error.status === 401) {
    signIn('spotify');
  }

  return (
    <div className={styles[theme]}>
    <div className={styles['mvplaylist']}>
      <PlaylistWindow />
      <VideoWindow />
    </div>
    </div>
  );
}