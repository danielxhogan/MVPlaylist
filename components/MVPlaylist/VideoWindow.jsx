import styles from '../../styles/css/VideoWindow.module.css';

import { useSelector } from 'react-redux';

export default function VideoWindow({ shownHidden }) {
  const theme = useSelector(state => state.theme);

  return (
    <div className={`
    ${styles[theme]}
    ${styles['window']}
    ${styles[shownHidden]}
    `}>
      <div className={`
      ${styles['video-window']}
      
      `}>
        Video Window
      </div>
    </div>
  );
};