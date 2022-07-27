import { useDispatch, useSelector } from 'react-redux';
import { getYoutubeResultsAction } from '../../redux/actions/youtubeActions'

import styles from '../../styles/css/video-window/VideoWindow.module.css';

export default function VideoWindow({
  shownHidden,
//  setViewExpanded,
//  setViewCollapsed
}) {
//  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const {
    data: youtubeResults,
    query
  } = useSelector(state => state.youtubeResults);

  const renderVideos = () => {
    return (
    <p>Video Window</p>
    );
  };

  return (
    <div className={`
      ${styles[theme]}
      ${styles['window']}
      ${styles[shownHidden]}
      `}>
      <div className={`
        ${styles['video-window']}
        `}>

        <form className={styles['video-select-form']}>

          <div>
            { query }
            { youtubeResults &&  renderVideos() }
          </div>

          <div>
            <div>
              Add Video
            </div>
            <div>
              Cancel
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
