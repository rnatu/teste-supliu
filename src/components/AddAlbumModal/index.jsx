import './styles.scss';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FiXCircle } from 'react-icons/fi';
import PropTypes from 'prop-types';
import loadApiData from '../../utils/loadApiData';

export function AddAlbumModal({ modalStatus, setModalStatus, setDiscography }) {
  const modalRef = useRef(null);
  const [inputAlbumName, setInputAlbumName] = useState('');
  const [inputAlbumYear, setInputAlbumYear] = useState('');

  function handleCloseModal() {
    setModalStatus('');
  }

  useEffect(() => {
    modalRef.current.focus();
  }, []);

  async function handleAddAlbum(e) {
    e.preventDefault();

    if (!inputAlbumName) {
      alert('Nome do album não pode estar vazio');
      return;
    }
    if (!inputAlbumYear) {
      alert('Ano do album não pode estar vazio');
      return;
    }

    if (/^(19|20)\d{2}$/.test(inputAlbumYear) === false) {
      alert('Ano incorreto');
      return;
    }

    await axios.post(
      'https://tiao.supliu.com.br/api/album',
      {
        name: inputAlbumName,
        year: inputAlbumYear,
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

    alert('Album Adicionado');
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
        <form action="#" className="modalForm" onSubmit={handleAddAlbum}>
          <label htmlFor="albumName">
            Nome do album
            <input
              id="albumName"
              type="text"
              ref={modalRef}
              placeholder="Ex: Rei do gado"
              value={inputAlbumName}
              onChange={(e) => setInputAlbumName(e.target.value)}
            />
          </label>

          <label htmlFor="albumYear">
            Ano do album
            <input
              id="albumYear"
              type="text"
              placeholder="Ex: 1991"
              value={inputAlbumYear}
              onChange={(e) => setInputAlbumYear(e.target.value)}
            />
          </label>

          <button type="submit">Criar</button>
        </form>
      </div>
    </div>
  );
}

AddAlbumModal.propTypes = {
  modalStatus: PropTypes.string,
  setModalStatus: PropTypes.func,
  setDiscography: PropTypes.func,
};
