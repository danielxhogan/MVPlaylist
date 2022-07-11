import Header from '../components/Header';
import MVPlaylist from '../components/MVPlaylist';

import { authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

export default function MVPlaylistPage() {
  return (
    <div>
      <Header />
      <MVPlaylist />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {}
  }
};