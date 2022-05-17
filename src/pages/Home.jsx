import "./styles.scss";
import logo from "../assets/logo.png";

import { useEffect, useState } from "react";

import loadApiData from "../utils/loadApiData";

import { AlbumInfo } from "../components/AlbumInfo";
import { SearchBar } from "../components/SearchBar";
import { AddAlbumModal } from "../components/AddAlbumModal";

export function Home() {
  const [discography, setDiscography] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [modalStatus, setModalStatus] = useState("");

  useEffect(() => {
    (async function () {
      const data = await loadApiData();
      setDiscography(data);
    })();
  }, []);

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
            discography={discography}
            setSearchResult={setSearchResult}
          />

          <button onClick={OpenModal} className="addNewAlbumBtn">
            Adicionar novo album
          </button>

          {modalStatus === "active" && (
            <AddAlbumModal
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
              setDiscography={setDiscography}
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
