import { signIn } from 'next-auth/react';
import { useSelector } from 'react-redux';

import CollectionCard from './Collectioncard';
import styles from '../styles/css/Playlists.module.css';

export default function Playlists() {
  const theme = useSelector(state => state.theme);
  const playlists = useSelector(state => state.playlists);

  if (playlists.status === 401) {
    signIn('spotify');
  }



  return (
    <div className={styles[theme]}>
      <div className={styles['playlists']}>
        <div className={`${styles['content']} ${styles['container']}`}>
          Playlists
        </div>
      </div>
    </div>
  );
}