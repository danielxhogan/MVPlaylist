import Header from '../components/Header';
import Playlists from '../components/Playlists';

import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

import { wrapper } from '../redux/store';
import { getAllPlaylistsAction } from '../redux/actions/playlistActions';

export default function PlaylistsPage() {
  return (
    <div>
      <Header />
      <Playlists />
    </div>
  );
}

export const getServerSideProps =
wrapper.getServerSideProps(store => async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  await store.dispatch(getAllPlaylistsAction(session.accessToken));
});