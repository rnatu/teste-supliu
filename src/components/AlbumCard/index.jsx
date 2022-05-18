import './styles.scss';

import { FiTrash2, FiPlusSquare } from 'react-icons/fi';
import axios from 'axios';
import PropTypes from 'prop-types';

import { useState } from 'react';
import loadApiData from '../../utils/loadApiData';

import { AddTrackModal } from '../addTrackModal';

export function AlbumCard({ name, year, tracks, albumId, setDiscography }) {
  const [modalStatus, setModalStatus] = useState('');

  function OpenModal() {
    setModalStatus('active');
  }

  function secondsToMinutesFormatted(seconds) {
    let timeInSeconds = seconds;
    const formattedTime =
      (timeInSeconds - (timeInSeconds %= 60)) / 60 +
      (timeInSeconds > 9 ? ':' : ':0') +
      timeInSeconds;
    return formattedTime;
  }

  async function removeAlbum() {
    await axios.delete(`https://tiao.supliu.com.br/api/album/${albumId}`, {
      headers: {
        Authorization: 'rnatu91@gmail.com',
        'Content-type': 'application/json',
      },
    });

    const data = await loadApiData();
    setDiscography(data);

    alert('Album Removido');
  }

  async function removeTrack(trackId) {
    await axios.delete(`https://tiao.supliu.com.br/api/track/${trackId}`, {
      headers: {
        Authorization: 'rnatu91@gmail.com',
        'Content-type': 'application/json',
      },
    });

    const data = await loadApiData();
    setDiscography(data);

    alert('Faixa Removida');
  }

  return (
    <>
      <header className="albumTitle">
        <h4>
          Álbum: {name}, {year}
        </h4>

        <button type="button" className="deleteAlbumBtn" onClick={removeAlbum}>
          <FiTrash2 size={18} />
        </button>

        <button type="button" className="addTrackBtn" onClick={OpenModal}>
          <FiPlusSquare size={18} />
        </button>
      </header>
      <section className="albumInfoContent__header">
        <div className="trackDescription__header">
          <div>
            <p>Nº</p>
          </div>

          <div>
            <p>Faixa</p>
          </div>
        </div>

        <div>
          <p>Duração</p>
        </div>
      </section>

      {tracks.map((track) => (
        <section className="albumInfoContent" key={track.id}>
          <div className="trackDescription">
            <p>{track.number}</p>

            <p>{track.title}</p>
            <button
              type="button"
              className="deleteAlbumBtn"
              onClick={() => removeTrack(track.id)}
            >
              <FiTrash2 size={13} />
            </button>
          </div>

          <div>
            <p>{secondsToMinutesFormatted(track.duration)}</p>
          </div>
        </section>
      ))}
      {modalStatus === 'active' && (
        <AddTrackModal
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
          setDiscography={setDiscography}
          albumId={albumId}
        />
      )}
    </>
  );
}

AlbumCard.propTypes = {
  name: PropTypes.string,
  year: PropTypes.number,
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      duration: PropTypes.number,
      id: PropTypes.number,
      number: PropTypes.number,
      title: PropTypes.string,
    }),
  ),
  albumId: PropTypes.number,
  setDiscography: PropTypes.func,
};
