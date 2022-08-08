import {useState, useEffect} from 'react';
import './App.css';
import MainMint from './components/MainMint'
import Navbar from './components/Navbar'

function App() {
  
  const [accounts, setAccounts] = useState([]);


  return (
    <div className="overlay">
    <div className="App">
      {/* @dev - Navbar is taking props that can be passed to another components */}
      <Navbar accounts={accounts} setAccounts={setAccounts} />
      <MainMint accounts={accounts} setAccounts={setAccounts} />
    </div>
    <div className='moving-animation-bg'></div>
    </div>
  );
}

export default App;
