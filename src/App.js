import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';



function App() {
  const [coins, setCoins] = useState([]);
  const [search, setsearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
      })
      .catch(error => console.log(error))
  }, []);


  const handleChange = e => {
    setsearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text"> SEARCH A CRYPTO CURRENCY</h1>
        <form>
          <input
            type='text'
            placeholder='...'
            className='coin-input'
            onChange={handleChange} />
        </form>
      </div>
      <div className="header1">
        <h1 className="coin1">Coin</h1>
        <h1 className="price1">Price</h1>
        <h1 className="volume1">Volume</h1>
        <h1 className="change1">Price Change</h1>
        <h1 className="mrkt1">Market Cap</h1>
      </div>
      {filteredCoins.map(coin => {
        return <Coin
          key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
        />;
      })}
    </div>
  );
}

export default App;
