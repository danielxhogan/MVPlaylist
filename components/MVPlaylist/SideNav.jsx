import styles from '../../styles/css/SideNav.module.css';

import { useSelector } from 'react-redux';

export default function SideNav() {
  const theme = useSelector(state => state.theme);

  return (
    <div className={styles[theme]}>
        <div className={styles['side-nav']}>
          <div className={styles['toggle-container']}>
            <div className={styles['toggle-button']}>
              <i className='fa-solid fa-angle-right' />
            </div>
            <div className={styles['side-nav-item']}>
              Side Nav
            </div>
          </div>
        </div>
    </div>
  );
};