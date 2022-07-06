import { useState } from 'react';
import styles from '../styles/css/Header.module.css';

const DARK = 'dark';
const LIGHT = 'light';

export default function Header({ home=false }) {
  const [ theme, setTheme ] = useState(DARK);

  return (
    <div className={styles[theme]}>
    <div className={`
      ${styles['topnav']} 
      ${styles[`${home ? 'home' : 'not-home'}`]}`}
      >

        <div className={styles['logo']}>
          Logo
        </div>

        <div className={styles['search-bar']}>
          Search
        </div>

        <div className={styles['login']}>
          Login
        </div>
        
    </div>
    </div>
  );
}