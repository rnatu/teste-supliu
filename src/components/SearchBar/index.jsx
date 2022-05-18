import { useState } from 'react';
import './styles.scss';

import PropTypes from 'prop-types';

export function SearchBar({ setSearchResult, discography }) {
  const [inputSearch, setInputSearch] = useState('');

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (inputSearch === '') {
      setSearchResult(discography);
      return;
    }

    const searchResult = discography.filter((album) =>
      album.name
        .toLocaleLowerCase()
        .startsWith(inputSearch?.toLocaleLowerCase()),
    );

    if (searchResult.length === 0) {
      alert('Não foi encontrado resultados para a busca');
      return;
    }
    setSearchResult(searchResult);
  }

  return (
    <form action="/" className="searchBar" onSubmit={handleSearchSubmit}>
      <input
        type="word"
        placeholder="Pesquisar álbuns por nome"
        value={inputSearch}
        onChange={(e) => setInputSearch(e.target.value)}
      />

      <button type="submit">Procurar</button>
    </form>
  );
}

SearchBar.propTypes = {
  setSearchResult: PropTypes.func,
  discography: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      tracks: PropTypes.arrayOf(
        PropTypes.shape({
          duration: PropTypes.number,
          id: PropTypes.number,
          number: PropTypes.number,
          title: PropTypes.string,
        }),
      ),
      year: PropTypes.number,
    }),
  ),
};
