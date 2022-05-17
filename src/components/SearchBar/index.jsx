import "./styles.scss";

export function SearchBar({ handleSearchSubmit, inputSearch, setInputSearch }) {
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
