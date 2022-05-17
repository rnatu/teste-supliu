import "./styles.scss";

import { FiTrash2, FiPlusSquare } from "react-icons/fi";
import axios from "axios";

import loadApiData from "../../utils/loadApiData";
import { useState } from "react";

import { AddTrackModal } from "../addTrackModal";

export function AlbumCard({ name, year, tracks, albumId, setDiscography }) {
  const [modalStatus, setModalStatus] = useState("");

  function OpenModal() {
    setModalStatus("active");
  }

  function fmtMSS(seconds) {
    return (
      (seconds - (seconds = seconds % 60)) / 60 +
      (9 < seconds ? ":" : ":0") +
      seconds
    );
  }

  async function removeAlbum() {
    await axios.delete(`https://tiao.supliu.com.br/api/album/${albumId}`, {
      headers: {
        Authorization: "rnatu91@gmail.com",
        "Content-type": "application/json",
      },
    });

    const data = await loadApiData();
    setDiscography(data);

    alert("Album Removido");
  }

  async function removeTrack(trackId) {
    await axios.delete(`https://tiao.supliu.com.br/api/track/${trackId}`, {
      headers: {
        Authorization: "rnatu91@gmail.com",
        "Content-type": "application/json",
      },
    });

    const data = await loadApiData();
    setDiscography(data);

    alert("Faixa Removida");
  }

  return (
    <>
      <header className="albumTitle">
        <h4>
          Álbum: {name}, {year}
        </h4>

        <button className="deleteAlbumBtn" onClick={removeAlbum}>
          <FiTrash2 size={18} />
        </button>

        <button className="addTrackBtn" onClick={OpenModal}>
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
              className="deleteAlbumBtn"
              onClick={() => removeTrack(track.id)}
            >
              <FiTrash2 size={13} />
            </button>
          </div>

          <div>
            <p>{fmtMSS(track.duration)}</p>
          </div>
        </section>
      ))}
      {modalStatus === "active" && (
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
