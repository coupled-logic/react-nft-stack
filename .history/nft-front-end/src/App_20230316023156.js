import Alert from './components/Alert';
import Artworks from './components/Artworks';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Loading from './components/Loading';
import { useAdulam } from './Adulam';
import { useEffect } from 'react';
import { GlobalStateProvider } from './GlobalState';

const App = () => {
  const { loadWeb3 } = useAdulam();
  useEffect(() => {
    // Define the async function inside the effect
    async function initializeWeb3() {
      await loadWeb3();
    }

    // Call the async function immediately
    initializeWeb3();
  }, []);

  return (
    <GlobalStateProvider>
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
        <Header />
        <Hero />
      </div>
      <Artworks />
      <Footer />
      <Loading />
      <Alert />
    </div>
    </GlobalStateProvider>
  );
};

export default App;