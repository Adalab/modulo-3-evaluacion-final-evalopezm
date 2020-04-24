import React, { useEffect, useState } from 'react';
import Image from '../images/logo.png';
import CharacterSearch from './CharacterSearch';
import '../stylesheets/App.css';
import getDataFromApi from '../services/getDataFromApi';
import CharacterDetail from './CharacterDetail';
import { Switch, Route } from 'react-router-dom';
import CharacterNotFound from './CharacterNotFound';

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

  if (FilteredCharacters.length === 0) return <CharacterNotFound />;

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
        <img className='header-image' src={Image} alt='Logo de Rick and Morty' />
      </header>
      <main>
        <Switch>
          <Route exact path='/'>
            <CharacterSearch characters={FilteredCharacters} charactersFilter={charactersFilter} />
          </Route>
          <Route path='/character/:characterId' render={renderCharacterDetail} />
          <Route exact path='/characternotfound' render={renderCharacterDetail} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
