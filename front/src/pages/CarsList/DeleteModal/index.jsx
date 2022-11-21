import { MdClose } from "react-icons/md";
import "./style.css";
import useCars from "../../../hooks/useCars";

export default function DeleteModal({ setShowModal, id }) {
  const { delCar } = useCars();

  return (
    <div className="deleteModal">
      <div className="modalBox">
        <MdClose onClick={() => setShowModal(false)} className="closeIcon" />
        <h1 className="titleModal">Remover produto</h1>
        <p className="textModal">
          Tem certeza que deseja remover esse produto do estoque? A ação não
          poderá ser desfeita.
        </p>
        <div className="buttons">
          <button onClick={() => delCar(id)} className="sm">
            Remover
          </button>
          <button onClick={() => setShowModal(false)} className="outline sm">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
