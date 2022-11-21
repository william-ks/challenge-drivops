import "./style.css";
import { BiUserCircle } from "react-icons/bi";
import { BsTrash, BsPencil } from "react-icons/bs";
import useSellers from "../../../hooks/useSellers";
import SellerModal from "../SellerModal";
import { useState } from "react";

export default function SellerCard({ name, id }) {
  const { delSellers } = useSellers();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <SellerModal
          id={id}
          edit
          nameFill={name}
          opened={setShowModal}
        />
      )}
      <div className="sellerCard">
        <div className="group">
          <div className="icon">
            <BiUserCircle />
          </div>
          <h3 className="text">Nome: {name}</h3>
        </div>
        <div className="buttons">
          <button className="noStyle" onClick={() => setShowModal(true)}>
            <BsPencil />
          </button>

          <button className="noStyle" onClick={() => delSellers(id)}>
            <BsTrash />
          </button>
        </div>
      </div>
    </>
  );
}
