import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { TfiPencil } from "react-icons/tfi";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import "./style.css";

export default function ListItem({ data }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showModal]);

  return (
    <>
      {showModal && (
        <DeleteModal
          id={data.id}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

      <li className="tableItem">
        <div className="image">
          <img className="img" src={data.image} alt="Product Icon" />
        </div>
        <h5 className="itemText">
          {data.brand} {data.model}
        </h5>
        <h5 className="itemText"></h5>
        <h5 className="itemText"></h5>
        <h5 className="itemText price">
          R${(data.value / 100).toFixed(2).split(".").join(",")}
        </h5>

        <div className="custom">
          <button className="button">
            <Link to={`/cars/${data.id}`}>
              <TfiPencil />
            </Link>
          </button>
          <button className="button">
            <FiTrash2 onClick={() => setShowModal(true)} />
          </button>
        </div>
      </li>
    </>
  );
}
