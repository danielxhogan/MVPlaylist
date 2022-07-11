import styles from '../styles/css/Home.module.css';

import { useSelector } from 'react-redux';

export default function Home() {
  const theme = useSelector(state => state.theme);
  
  return (
    <div className={styles[theme]}>
    <div className={styles['body']}>
    </div> 
    </div>
  );
}