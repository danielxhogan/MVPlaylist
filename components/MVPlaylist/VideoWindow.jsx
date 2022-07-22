import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getYoutubeResultsAction } from '../../redux/actions/youtubeActions'

import styles from '../../styles/css/VideoWindow.module.css';


export default function VideoWindow({ shownHidden }) {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);

  useEffect(() => {
    dispatch(getYoutubeResultsAction('nope'));
  })

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
