import './styles.scss';
import PropTypes from 'prop-types';

import { FiXCircle } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import loadApiData from '../../utils/loadApiData';

export function AddTrackModal({
  modalStatus,
  setModalStatus,
  setDiscography,
  albumId,
}) {
  const modalRef = useRef(null);
  const [inputTrackNumber, setInputTrackNumber] = useState('');
  const [inputTrackName, setInputTrackName] = useState('');
  const [inputTrackDuration, setInputTrackDuration] = useState('');

  function handleCloseModal() {
    setModalStatus('');
  }

  useEffect(() => {
    modalRef.current.focus();
  }, []);

  async function handleAddTrack(e) {
    e.preventDefault();

    if (!inputTrackNumber) {
      alert('Número da faixa não pode estar vazio');
      return;
    }
    if (!inputTrackName) {
      alert('Nome da música não pode estar vazio');
      return;
    }
    if (!inputTrackDuration) {
      alert('tempo de duração não pode estar vazio');
    }

    await axios.post(
      'https://tiao.supliu.com.br/api/track',
      {
        album_id: albumId,
        number: inputTrackNumber,
        title: inputTrackName,
        duration: inputTrackDuration,
      },
      {
        headers: {
          Authorization: 'rnatu91@gmail.com',
          'Content-type': 'application/json',
        },
      },
    );

    const data = await loadApiData();
    setDiscography(data);

    alert('Faixa Adicionada');
    handleCloseModal();
  }

  return (
    <div
      className={`modal-overlay ${modalStatus}`}
      onKeyDown={(e) => e.key === 'Escape' && handleCloseModal()}
      tabIndex="0"
      role="presentation"
    >
      <div className="modal">
        <button
          className="closeModalButton"
          onClick={handleCloseModal}
          type="button"
        >
          <FiXCircle size={25} />
        </button>
        <form action="#" className="modalForm" onSubmit={handleAddTrack}>
          <label htmlFor="trackName">
            Número da Faixa
            <input
              id="trackName"
              type="text"
              ref={modalRef}
              placeholder="Ex: 5"
              value={inputTrackNumber}
              onChange={(e) => setInputTrackNumber(e.target.value)}
            />
          </label>

          <label htmlFor="trackNumber">
            Nome da música
            <input
              id="trackNumber"
              type="text"
              placeholder="Ex: O Mineiro e o Italiano"
              value={inputTrackName}
              onChange={(e) => setInputTrackName(e.target.value)}
            />
          </label>

          <label htmlFor="trackDuration">
            Tempo de duração (em segundos)
            <input
              id="trackDuration"
              type="text"
              placeholder="Ex: 90"
              value={inputTrackDuration}
              onChange={(e) => setInputTrackDuration(e.target.value)}
            />
          </label>
          <button type="submit">Criar</button>
        </form>
      </div>
    </div>
  );
}

AddTrackModal.propTypes = {
  modalStatus: PropTypes.string,
  setModalStatus: PropTypes.func,
  setDiscography: PropTypes.func,
  albumId: PropTypes.number,
};
