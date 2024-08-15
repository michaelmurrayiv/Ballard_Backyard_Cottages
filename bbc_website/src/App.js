import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <p>
          The DADU Doctor
        </p>
        <SearchBar />
      </main>
    </div>
  );
}

export default App;
