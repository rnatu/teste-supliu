import axios from "axios";
import { useEffect, useRef, useState } from "react";
import loadApiData from "../../utils/loadApiData";
import "./styles.scss";

export function AddAlbumModal({ modalStatus, setModalStatus, setDiscography }) {
  const modalRef = useRef(null);
  const [inputAlbumName, setInputAlbumName] = useState("");
  const [inputAlbumYear, setInputAlbumYear] = useState("");

  function handleCloseModal() {
    setModalStatus("");
  }

  useEffect(() => {
    modalRef.current.focus();
  }, []);

  async function handleAddAlbum(e) {
    e.preventDefault();

    if (inputAlbumName === "") {
      alert("Nome não pode estar vazio");
      return;
    } else if (inputAlbumYear === "") {
      alert("Ano não pode estar vazio");
      return;
    }

    if (/^(19|20)\d{2}$/.test(inputAlbumYear) === false) {
      alert("Ano incorreto");
      return;
    }

    await axios.post(
      "https://tiao.supliu.com.br/api/album",
      {
        name: inputAlbumName,
        year: inputAlbumYear,
      },
      {
        headers: {
          Authorization: "rnatu91@gmail.com",
          "Content-type": "application/json",
        },
      }
    );

    const data = await loadApiData();
    setDiscography(data);

    alert("Adicionado");
    handleCloseModal();
  }

  return (
    <div
      className={`modal-overlay ${modalStatus}`}
      onKeyDown={(e) => e.key === "Escape" && handleCloseModal()}
      tabIndex="0"
    >
      <div className="modal">
        <button className="closeModalButton" onClick={handleCloseModal}>
          X
        </button>
        <form action="#" className="modalForm" onSubmit={handleAddAlbum}>
          <label htmlFor="albumName">Nome do album</label>
          <input
            id="albumName"
            type="text"
            ref={modalRef}
            placeholder="Ex: Rei do gado"
            value={inputAlbumName}
            onChange={(e) => setInputAlbumName(e.target.value)}
          />

          <label htmlFor="albumYear">Ano do album</label>
          <input
            id="albumYear"
            type="text"
            placeholder="Ex: 1991"
            value={inputAlbumYear}
            onChange={(e) => setInputAlbumYear(e.target.value)}
          />
          <button type="submit">Criar</button>
        </form>
      </div>
    </div>
  );
}
