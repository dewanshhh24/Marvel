import './App.css';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <div className="card">
        <h1 className="title">Marvel Comic Library</h1>
        <p className="subtitle">Explore your favorite heroes and their stories</p>
        <Search />
      </div>
    </div>
  );
}

export default App;
