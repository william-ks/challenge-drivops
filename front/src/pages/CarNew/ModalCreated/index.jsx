import "./style.css";
import IMG from "../../../assets/modalCreated.svg";

export default function ModalCreated({ setShowModalCreate }) {
  return (
    <div className="ModalCreated">
      <div className="modalBox">
        <img src={IMG} alt="icon" />
        <h1 className="modalTitle">O anúncio foi publicado</h1>
        <p className="modalText">
          O anúncio está ativo e o produto disponível para venda
        </p>
        <button
          className="md modalButton"
          onClick={() => setShowModalCreate(false)}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
