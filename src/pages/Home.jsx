import './styles.scss';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

import loadApiData from '../utils/loadApiData';

import { SearchBar } from '../components/SearchBar';
import { AddAlbumModal } from '../components/AddAlbumModal';
import { AlbumCard } from '../components/AlbumCard';

export function Home() {
  const [discography, setDiscography] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [modalStatus, setModalStatus] = useState('');

  useEffect(() => {
    (async function initialLoadData() {
      const data = await loadApiData();
      setDiscography(data);
    })();
  }, []);

  function OpenModal() {
    setModalStatus('active');
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

          <button type="button" onClick={OpenModal} className="addNewAlbumBtn">
            Adicionar novo album
          </button>

          {modalStatus === 'active' && (
            <AddAlbumModal
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
              setDiscography={setDiscography}
            />
          )}

          {searchResult.length === 0
            ? discography.map((album) => (
                <AlbumCard
                  key={album.id}
                  albumId={album.id}
                  name={album.name}
                  year={album.year}
                  tracks={album.tracks}
                  setDiscography={setDiscography}
                />
              ))
            : searchResult.map((album) => (
                <AlbumCard
                  key={album.id}
                  albumId={album.id}
                  name={album.name}
                  year={album.year}
                  tracks={album.tracks}
                  setDiscography={setDiscography}
                />
              ))}
        </section>
      </main>
    </div>
  );
}
