import "./styles.scss";
import logo from "../assets/logo.png";
import { AlbumInfo } from "../components/AlbumInfo";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home() {
  const [discography, setDiscography] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  async function loadApiData() {
    const { data: apiResponse } = await axios.get(
      "https://tiao.supliu.com.br/api/album",
      {
        headers: {
          Authorization: "rnatu91@gmail.com",
        },
      }
    );
    setDiscography(apiResponse.data);
  }

  useEffect(() => {
    (async function () {
      await loadApiData();
    })();
  }, []);

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (inputSearch === "") {
      alert("A busca não pode estar vazia");
      return;
    }

    setInputSearch("");

    const searchResult = discography.filter((album) =>
      album.name
        .toLocaleLowerCase()
        .startsWith(inputSearch?.toLocaleLowerCase())
    );

    if (searchResult.length === 0) {
      alert("Não foi encontrado resultados para a busca");
      return;
    }
    setSearchResult(searchResult);
  }

  return (
    <div className="homeContainer">
      <main className="homeContent">
        <header className="homeContent__header">
          <img src={logo} alt="Logo do Tião Carreiro" />
          <h1>Discografia</h1>
        </header>

        <section className="mainContent">
          <p>Digite uma palavra chave</p>

          <form
            action="/"
            className="mainContent__searchBar"
            onSubmit={(e) => handleSearchSubmit(e)}
          >
            <input
              type="word"
              placeholder="Pesquisar álbuns por nome"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />

            <button type="submit">Procurar</button>
          </form>

          {searchResult.length === 0
            ? discography.map((album) => (
                <AlbumInfo
                  key={album.id}
                  name={album.name}
                  year={album.year}
                  tracks={album.tracks}
                />
              ))
            : searchResult.map((album) => (
                <AlbumInfo
                  key={album.id}
                  name={album.name}
                  year={album.year}
                  tracks={album.tracks}
                />
              ))}
        </section>
      </main>
    </div>
  );
}
