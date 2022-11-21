import "./style.css";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ModalCancel({ setShowModalCancel, fill }) {
  const resetOverflow = () => {
    document.body.style.overflowY = "auto";
  };
  return (
    <div className="ModalCancel">
      <div className="modalBox">
        <MdClose
          onClick={() => setShowModalCancel(false)}
          className="closeIcon"
        />
        <h1 className="titleModal">Descartar alterações</h1>
        <p className="textModal">
          As alterações realizadas não foram salvas, deseja descartá-las?
        </p>
        <div className="buttons">
          <Link to="/cars" onClick={resetOverflow}>
            <button className="sm">Descartar</button>
          </Link>
          <button
            onClick={() => setShowModalCancel(false)}
            className="outline sm"
          >
            Continuar {fill ? "Editando" : "Criando"}
          </button>
        </div>
      </div>
    </div>
  );
}
