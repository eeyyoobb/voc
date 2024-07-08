import Navbar from './components/Navbar';
import QuizzesArea from './components/QuizzesArea';

export default function Home({ darkMode }) {
  return (
    <div>
      <header>
          <Navbar darkMode={darkMode} />
      </header>
         <QuizzesArea darkMode={darkMode} />
    </div>
  );
}
