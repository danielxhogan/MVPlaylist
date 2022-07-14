import { useState } from 'react';
import styles from '../../styles/css/SideNav.module.css';

import { useSelector } from 'react-redux';

const SHOWN = 'shown';
const HIDDEN = 'hidden';

export default function SideNav() {
  const theme = useSelector(state => state.theme);

  const [ shownHidden, setShownHidden ] = useState(HIDDEN);

  const onClickChevronBtn = () => {
    switch (shownHidden) {
      case HIDDEN: setShownHidden(SHOWN); break;
      case SHOWN: setShownHidden(HIDDEN); break;
    }
  };

  return (
    <div className={styles[theme]}>
        <div className={styles['side-nav']}>
          <div className={`
            ${styles['toggle-container']}
            ${styles[shownHidden]}
            `}>
            <div
              className={`
                ${styles['toggle-button']}
                ${styles[shownHidden]}
                `}
              onClick={onClickChevronBtn}
              >
              <i className='fa-solid fa-angle-right' />
            </div>
            <div className={`
              ${styles['side-nav-title']}
              ${styles[shownHidden]}
              `}>
              Playlists
            </div>
            <div className={`
              ${styles['side-nav-item']}
              ${styles[shownHidden]}
              `}>
              Side Navffffffffffffffffffffffffffffffffffffffffffff
            </div>
            <div className={`
              ${styles['side-nav-item']}
              ${styles[shownHidden]}
              `}>
              Side Navfffffffffffffffffffffffffffffffffffffffffffff
            </div>
          </div>
        </div>
    </div>
  );
};