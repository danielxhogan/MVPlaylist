import styles from '../../styles/css/VideoWindow.module.css';

import { useSelector } from 'react-redux';

export default function VideoWindow() {
  const theme = useSelector(state => state.theme);

  return (
    <div className={styles[theme]}>
      <div className={`
      ${styles['video-window']}
      ${styles['window']}
      `}>
        Video Window
      </div>
    </div>
  );
};