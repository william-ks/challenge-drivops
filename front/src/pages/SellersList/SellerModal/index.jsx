import { useRef } from "react";
import "./style.css";
import useSellers from "../../../hooks/useSellers";
import { AiOutlineClose } from "react-icons/ai";

export default function SellerModal({ edit, nameFill, opened, id }) {
  const name = useRef(null);

  const { createSeller, updateSellers } = useSellers();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.current.value) return;

    if (!edit) {
      await createSeller({ name: name.current.value });
    } else {
      await updateSellers({ name: name.current.value }, id);
    }

    opened(false);
  };

  return (
    <div className="modal">
      <div className="modalBox">
        <div className="close" onClick={() => opened(false)}>
          <AiOutlineClose />
        </div>
        <h1 className="modalTitle">{edit ? "Editar" : "Criar"} usuário</h1>
        <form className="modalForm">
          <label htmlFor="name">
            <p className="inputDesc">Nome</p>
            <input
              type="text"
              id="name"
              ref={name}
              placeholder="Nome do vendedor"
              defaultValue={nameFill ? nameFill : ""}
              required
            />
          </label>
          <button onClick={handleSubmit}>{edit ? "Editar" : "Criar"} </button>
        </form>
      </div>
    </div>
  );
}
