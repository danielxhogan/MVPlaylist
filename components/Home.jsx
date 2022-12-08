import Image from 'next/image';
import styles from '../styles/css/Home.module.css';

import { useSelector } from 'react-redux';

export default function Home() {
  const theme = useSelector(state => state.theme);
  
  return (
    <div className={styles[theme]}>
    <div className={`${styles['body']}`}>
    <div className={`${styles['container']}`}>
      <div className={styles['logos']}>
        <div>
        <Image
          src='/images/spotify-icons-logos/logos/Spotify_Logo_RGB_Green.png'
          height={100}
          width={330}
          alt='spotify-logo'
        />
        </div>
        <div>
        <Image
          src='/images/youtube-icons-logos/yt_logo_rgb_light.png'
          height={70}
          width={350}
          alt='spotify-logo'
        />
        </div>
      </div>
      <h1 className={styles['title']}>Music Video Playlist</h1>
      <p className={styles['subtitle']}>Turn your Spotify playlist into a Youtube music video playlist</p>
    </div>
    </div>
    </div>
  );
}
