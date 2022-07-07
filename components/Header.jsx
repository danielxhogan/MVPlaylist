import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/css/Header.module.css';

const DARK = 'dark';
const LIGHT = 'light';

const SHOWN = 'shown';
const HIDDEN = 'hidden';

export default function Header({ home=false }) {
  const [ theme, setTheme ] = useState(DARK);
  const [ sunClass, setSunClass ] = useState(SHOWN);
  const [ moonClass, setMoonClass ] = useState(HIDDEN);
  const [ smScrSearchClass, setSmScrSearchClass ] = useState(HIDDEN);

  const onClickMagGlass = () => {
    switch (smScrSearchClass) {
      case HIDDEN: setSmScrSearchClass(SHOWN); break;
      case SHOWN: setSmScrSearchClass(HIDDEN); break;
      default: break;
    }
  };
  
  const onClickSunIcon = () => {
    setTheme(LIGHT);
    setSunClass(HIDDEN);
    setMoonClass(SHOWN);
  };

  const onClickMoonIcon = () => {
    setTheme(DARK);
    setMoonClass(HIDDEN);
    setSunClass(SHOWN);
  };

  return (
    <div className={styles[theme]}>
    <div className={`
      ${styles[`${home ? 'home' : 'not-home'}`]}
      ${styles['small-scr-search-bar']}
      ${styles[smScrSearchClass]}
      `}>
      <input
        placeholder='Search Spotify...'
      />
    </div>

    <div className={`
      ${styles['topnav']} 
      ${styles[`${home ? 'home' : 'not-home'}`]}`}
      >
      <div className={styles['logo-section']}>
        <div className={styles['logo']}>
          <Image
            src='/images/spotify-icons-logos/icons/Spotify_Icon_RGB_Green.png'
            width='30px'
            height='30px'
            alt='spotify logo'
          />

          <Image
            src='/images/youtube-icons-logos/yt_icon_rgb.png'
            width='45px'
            height='30px'
            alt='spotify logo'
          />
        </div>

        <p>MVPlaylist</p>
      </div>

      <div className={styles['search-bar']}>
        <i
          className={`
            fa-solid fa-magnifying-glass fa-xl
            ${styles['magnifying-glass']}`}
          onClick={onClickMagGlass}
        />
        <input
          placeholder='Search Spotify...'
        />
      </div>

      <div className={styles['login']}>

        <div className={styles['theme-toggle-icon']}>
          <i
            className={`
              fa-solid fa-sun fa-xl
              ${styles['sun']}
              ${styles[sunClass]}`}
            onClick={onClickSunIcon}  
          />

          <i 
            className={`
              fa-solid fa-moon fa-xl
              ${styles['moon']}
              ${styles[moonClass]}`}
            onClick={onClickMoonIcon}
          />
        </div>

        <button>
          Login to Spotify
        </button>

      </div>
    </div>
    </div>
  );
}