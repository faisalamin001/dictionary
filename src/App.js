import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle';
import Definition from './components/Definition/Definition';
import Footer from './components/Footer';

function App() {
  const [meanings, setMeanings] = useState([]);
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('en');

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    async function dictionaryAPI() {
      try {
        if (word !== '') {
          const fetchedData = await axios.get(BASE_URL + `${category}/${word}`);
          setMeanings(fetchedData.data);
        }
      } catch (err) {}
    }
    dictionaryAPI();
  }, [word, category, BASE_URL]);

  return (
    <React.Fragment>
      <Header
        category={category}
        setCategory={setCategory}
        word={word}
        setWord={setWord}
      />
      {word && (
        <Definition meanings={meanings} word={word} category={category} />
      )}
      <ThemeToggle />
      <Footer />
    </React.Fragment>
  );
}

export default App;
