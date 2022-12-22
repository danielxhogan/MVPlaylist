import Header from '../components/Header';
import Home from '../components/Home';

import { wrapper } from '../redux/store';

export default function HomePage() {
  return (
    <div>
      <Header home={true}/>
      <Home />
    </div>
  );
}

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