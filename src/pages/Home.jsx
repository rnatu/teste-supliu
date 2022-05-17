import "./styles.scss";
import logo from "../assets/logo.png";

import axios from "axios";

import { AlbumInfo } from "../components/AlbumInfo";

import { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { AddAlbumModal } from "../components/AddAlbumModal";

export function Home() {
  const [discography, setDiscography] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [modalStatus, setModalStatus] = useState("");

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

    console.log("api fn");
  }

  useEffect(() => {
    (async function () {
      await loadApiData();
      console.log("oooooooooo");
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

  function OpenModal() {
    setModalStatus("active");
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

          <SearchBar
            handleSearchSubmit={handleSearchSubmit}
            inputSearch={inputSearch}
            setInputSearch={setInputSearch}
          />

          <button onClick={OpenModal} className="addNewAlbumBtn">
            Adicionar novo album
          </button>

          {modalStatus === "active" && (
            <AddAlbumModal
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
              loadApiData={loadApiData}
            />
          )}

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
