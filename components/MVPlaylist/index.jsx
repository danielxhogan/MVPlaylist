import PlaylistWindow from './PlaylistWindow';
import VideoWindow from './VideoWindow';
import styles from '../../styles/css/MVPlaylist.module.css';

import { useSelector } from 'react-redux';

import { useState, useEffect } from 'react';
import Head from 'next/head'

import { signIn } from 'next-auth/react';

const SHOWN = 'shown';
const HIDDEN = 'hidden';

const FULL = 'full';
const HALF = 'half';

export default function MVPlaylist() {
  const theme = useSelector(state => state.theme);
  const playlistItems = useSelector(state => state.playlistItems);
  const { refresh: videoRefresh } = useSelector(state => state.video);
  const { refresh: resultsRefresh } = useSelector(state => state.youtubeResults);

  const [ videoShownHidden, setVideoShownHidden ] = useState(HIDDEN);
  const [ playlistScreenSize, setPlaylistScreenSize ] = useState(FULL);

  if (playlistItems.error && playlistItems.error.status === 401) {
    signIn('spotify');
  }

  const setViewExpanded = () => {
    setVideoShownHidden(SHOWN);
    setPlaylistScreenSize(HALF);
  }

  const setViewCollapsed = () => {
    setVideoShownHidden(HIDDEN);
    setPlaylistScreenSize(FULL);
  }
  
  // updates display when switching between playlists. All video window data
  // is refreshed when switching to a new playlist so window should close.
  useEffect(() => {
    if (videoRefresh && resultsRefresh) {
      setViewCollapsed();
    }
  }, [videoRefresh, resultsRefresh])

  // const onClickToggleView = () => {
  //    switch (videoShownHidden) {
  //     case HIDDEN: setVideoShownHidden(SHOWN); break;
  //     case SHOWN: setVideoShownHidden(HIDDEN); break;
  //    };

  //    switch (playlistScreenSize) {
  //     case FULL: setPlaylistScreenSize(HALF); break;
  //     case HALF: setPlaylistScreenSize(FULL); break;
  //    };
  // };

  return (
    <div className={styles[theme]}>
      <Head>
        <title>mvplaylist</title>
      </Head>
    {/*
    <button
      className={styles['toggle-view-btn']}
      onClick={onClickToggleView}
      >
      Toggle View
    </button>
    */}
    <div className={styles['mvplaylist']}>
      <PlaylistWindow
        screenSize={playlistScreenSize}
        setViewExpanded={setViewExpanded}
        setViewCollapsed={setViewCollapsed}
      />
      <VideoWindow
        shownHidden={videoShownHidden}
        setViewExpanded={setViewExpanded}
        setViewCollapsed={setViewCollapsed}
      />
    </div>
    </div>
  );
}