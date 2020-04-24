import React, { useEffect, useState } from 'react';
import Image from '../images/logo.png';
import CharacterSearch from './CharacterSearch';
import '../stylesheets/App.css';
import getDataFromApi from '../services/getDataFromApi';
import CharacterDetail from './CharacterDetail';
import { Switch, Route, Link } from 'react-router-dom';

function App() {
  //states
  const [characters, setCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  useEffect(() => {
    getDataFromApi().then((data) => {
      setCharacters(data);
    });
  }, []);

  // Filter
  const charactersFilter = (data) => {
    setNameFilter(data);
  };
  const FilteredCharacters = characters.filter((character) => {
    return character.name.toLowerCase().includes(nameFilter.toLowerCase());
  });

  // Router
  const renderCharacterDetail = (props) => {
    const characterId = props.match.params.characterId;
    const foundCharacter = characters.find((character) => {
      return character.id === parseInt(characterId);
    });
    if (foundCharacter !== undefined) return <CharacterDetail character={foundCharacter} />;
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={Image} alt='Logo de Rick and Morty' />
        {/* <Link to='/CharacterDetail'>CharacterDetail</Link>
        <Link to='/CharacterSearch'>CharacterSearch</Link> */}
      </header>
      <main>
        <CharacterSearch characters={FilteredCharacters} charactersFilter={charactersFilter} />
        <Switch>
          <Route path='/character/:characterId' render={renderCharacterDetail} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
