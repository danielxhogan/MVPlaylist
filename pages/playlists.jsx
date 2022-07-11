import Header from '../components/Header';
import Playlists from '../components/Playlists';
import { getAllPlaylistsAction } from '../redux/actions/playlistActions';

import { wrapper } from '../redux/store';

import { authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

export default function PlaylistsPage() {
  return (
    <div>
      <Header />
      <Playlists />
    </div>
  );
}

export const getServerSideProps =
wrapper.getServerSideProps(store => async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  await store.dispatch(getAllPlaylistsAction(context.req, session.accessToken));
});