import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { getYoutubeResultsAction } from '../../redux/actions/youtubeActions'

import styles from '../../styles/css/VideoWindow.module.css';

export default function VideoWindow({
  shownHidden,
//  setViewExpanded,
  setViewCollapsed
}) {
//  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const {
    data: youtubeResults,
    query,
    songId
  } = useSelector(state => state.youtubeResults);

  const onSubmitAddVideo = (e) => {
    e.preventDefault();
    if (e.target['yt-radio-group'] && e.target['yt-radio-group'].value) {
      setViewCollapsed();
      const videoId = e.target['yt-radio-group'].value;
      console.log(`videoId: ${videoId}`)
    }
  }

  const onClickCancelBtn = () => {
     setViewCollapsed();
  }

  const renderVideos = () => {
    return (
      youtubeResults.items && youtubeResults.items.map(video => {
        return (
          <div
            key={video.id.videoId}
            className={styles['video-item']}
            >

            <div>
              <input
                type='radio'
                value={video.id.videoId}
                name='yt-radio-group'
              />
            </div>

            <div>
              <Image
                src={video.snippet.thumbnails.default.url}
                width={video.snippet.thumbnails.default.width}
                height={video.snippet.thumbnails.default.height}
                alt='video thumbnail'
              />
            </div>

            <div className={styles['video-item-content']}>
              <div className={styles['video-content-title']} >
                { video.snippet.title }
              </div>
              <div>
                { video.snippet.description }
              </div>
            </div>

          </div>
        );
      })
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

        <form
          className={styles['video-select-form']}
          onSubmit={onSubmitAddVideo}
          >

          <div>
            { query }
            { youtubeResults &&  renderVideos() }
          </div>

          <div className={styles['video-btns']}>
            <div>
              <button
                className={styles['add-video-btn']}
                type='submit'
                >
                Add Video
              </button>
            </div>
            <div onClick={onClickCancelBtn}>
              <button
                className={styles['cancel-btn']}
                >
                Cancel
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
