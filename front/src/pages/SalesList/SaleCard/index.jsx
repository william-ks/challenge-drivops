import { useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import useSales from "../../../hooks/useSales";
import SaleModal from "../SaleModal";
import "./style.css";

export default function SaleCard({ data }) {
  const { delSales } = useSales();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <SaleModal id={data.id} edit data={data} opened={setShowModal} />
      )}
      <div className="sellerCard">
        <div className="group">
          <div className="icon">
            <img src={data.car_image} alt="carro" />
          </div>
          <div className="flexi">
            <h3 className="text">
              {data.car_brand} {data.car_model}
            </h3>

            <h3 className="text">{data.seller_name.split(" ")[0]}</h3>

            <h3 className="text">
              R$ {(data.value / 100).toFixed(2).split(".").join(",")}
            </h3>

            <h3 className="text">
              {data.date.split("T")[0].split("-").reverse().join("/")}
            </h3>
          </div>
        </div>
        <div className="buttons">
          <button className="noStyle" onClick={() => setShowModal(true)}>
            <BsPencil />
          </button>

          <button className="noStyle" onClick={() => delSales(data.id)}>
            <BsTrash />
          </button>
        </div>
      </div>
    </>
  );
}
