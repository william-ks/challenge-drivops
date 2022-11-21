import { useRef } from "react";
import "./style.css";
import useSales from "../../../hooks/useSales";
import useSellers from "../../../hooks/useSellers";
import useCars from "../../../hooks/useCars";
import { AiOutlineClose } from "react-icons/ai";

export default function SaleModal({ edit, opened, data }) {
  const seller_id = useRef(null);
  const car_id = useRef(null);
  const date = useRef(null);

  const { createSales, updateSales } = useSales();
  const { sellers } = useSellers();
  const { cars } = useCars();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      seller_id: Number(seller_id.current.value),
      car_id: Number(car_id.current.value),
      date: date.current.value
        ? new Date(date.current.value).toISOString()
        : "",
    };

    if (edit) {
      await updateSales(form, data.id);
    } else {
      if (
        !date.current.value ||
        !car_id.current.value ||
        !seller_id.current.value
      )
        return;

      await createSales(form);
    }

    opened(false);
  };

  return (
    <div className="modal">
      <div className="modalBox">
        <div className="close" onClick={() => opened(false)}>
          <AiOutlineClose />
        </div>
        <h1 className="modalTitle">{edit ? "Editar" : "Criar"} venda</h1>
        <form className="modalForm">
          <label htmlFor="seller">
            <p className="inputDesc">Vendedor</p>
            <select className="select" id="seller" ref={seller_id}>
              <option value="">Selecione um vendedor</option>
              {sellers.map((seller) => (
                <option key={seller.id} value={seller.id}>
                  {seller.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="car">
            <p className="inputDesc">Carro</p>
            <select className="select" id="car" ref={car_id}>
              <option value="">Selecione um carro</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.id}. {car.brand} {car.model} R${" "}
                  {(car.value / 100).toFixed(2).split(".").join(",")}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="date">
            <p className="inputDesc">Vendedor</p>
            <input type="date" ref={date} id="date" />
          </label>
          <button onClick={handleSubmit}>{edit ? "Editar" : "Criar"} </button>
        </form>
      </div>
    </div>
  );
}
