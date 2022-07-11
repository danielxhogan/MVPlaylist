import styles from '../styles/css/Search.module.css';

import { useSelector } from 'react-redux';

export default function Search() {
  const theme = useSelector(state => state.theme);

  return (
    <div className={styles[theme]}>
    <div className={styles['search']}>
      Search Spotify...
    </div>
    </div>
  );
}