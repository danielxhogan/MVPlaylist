import { useState } from 'react';
import styles from '../styles/css/Home.module.css';

const DARK = 'dark';
const LIGHT = 'light';

export default function Home() {
  const [ theme, setTheme ] = useState(DARK);

  const onClickToggleTheme = () => {
    switch (theme) {
      case DARK: setTheme(LIGHT); break;
      case LIGHT: setTheme(DARK); break;
      default: break;
    }
  }
  
  return (
    <div className={styles[theme]}>
    <div className={styles['body']}>
    </div> 
    </div>
  );
}