import Header from '../../components/Header';
import SideNav from '../../components/MVPlaylist/SideNav';
import MVPlaylist from '../../components/MVPlaylist';

import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

import { wrapper } from '../../redux/store';
import { getVideosAction } from '../../redux/actions/youtubeActions';

import {
  SET_ACCESS_TOKEN,
  SET_USER_ID
} from '../../redux/types/userTypes';

import {
  getAllPlaylistsAction,
  getPlaylistItemsAction
} from '../../redux/actions/playlistActions';

export default function MVPlaylistPage() {
  return (
    <div>
      <SideNav />
      <Header />
      <MVPlaylist />
    </div>
  );
};

export const getServerSideProps =
wrapper.getServerSideProps(store => async ({ req, res, params }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  console.log(`user id: ${session.user.id}`)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  };

  await store.dispatch({ type: SET_USER_ID, payload: session.user.id });
  await store.dispatch({ type: SET_ACCESS_TOKEN, payload: session.accessToken });

  await store.dispatch(
    getVideosAction(
      req,
      session.user.id,
      params.playlistId
    )
  );

  await store.dispatch(getAllPlaylistsAction(session.accessToken));
  await store.dispatch(
    getPlaylistItemsAction(
      session.accessToken,
      params.playlistId
    )
  );
});
