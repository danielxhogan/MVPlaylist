import Header from '../components/Header';
import Home from '../components/Home';

export default function HomePage() {
  return (
    <div>
      <Header home={true}/>
      <Home />
    </div>
  )
}
