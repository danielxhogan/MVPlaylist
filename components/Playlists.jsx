import styles from '../styles/css/Playlists.module.css';

import { useSelector } from 'react-redux';

export default function Playlists() {
  const theme = useSelector(state => state.theme);

  return (
    <div className={styles[theme]}>
      <div className={styles['playlists']}>
        Playlists
      </div>
    </div>
  );
}