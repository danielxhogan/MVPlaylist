import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
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
  
  const { data: session, status } = useSession();

  if (status === "authenticated") {

    if (session.accessToken) {
      console.log(`accessToken: ${session.accessToken}`);
    }

    if (session.refreshToken) {
      console.log(`refreshToken: ${session.refreshToken}`);
    }

    if (session.user) {
      console.log(`user: ${session.user}`);

      if (session.user.name) {
        console.log(`name: ${session.user.name}`);
      }
  
      if (session.user.id) {
        console.log(`id: ${session.user.id}`);
      }
  
      if (session.user.email) {
        console.log(`email: ${session.user.email}`);
      }
    }


    if (session.token) {
      console.log(`token: ${session.token}`);

      if (session.token.accessToken) {
        console.log(`token.accessToken: ${session.token.accessToken}`);
      }
  
      if (session.token.refreshToken) {
        console.log(`token.refreshToken: ${session.token.refreshToken}`);
      }

      if (session.token.user) {
        console.log(`session.token.user: ${session.token.user}`)
        if (session.token.user.name) {
          console.log(`session.token.user.name: ${session.token.user.name}`)
          console.log(`session.token.user.email: ${session.token.user.email}`)
          console.log(`session.token.user.id: ${session.token.user.id}`)
          console.log(`session.token.user.image: ${session.token.user.image}`)          
        } 
      }
    }

  } else {
    console.log('not logged in');
  }
  
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

        <button onClick={() => signIn('spotify')}>
          Login to Spotify
        </button>
        <button onClick={() => signOut()}>
          Sign Out
        </button>

      </div>
    </div>
    </div>
  );
}