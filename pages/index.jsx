import Header from '../components/Header';
import Home from '../components/Home';

import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { wrapper } from '../redux/store';

export default function HomePage() {
  return (
    <div>
      <Header home={true}/>
      <Home />
    </div>
  );
}

// By default the user is redirected to home page after login.
// The home page is essentially just a log in page. When the user
// logs in, it makes more sense to be redirected to the playlists
// page so they can start listening to music.

export const getServerSideProps =
wrapper.getServerSideProps(store => async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/playlists',
        permanent: false
      }
    };
  }
});