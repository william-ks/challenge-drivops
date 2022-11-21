import "./style.css";
import { Link } from "react-router-dom";
import ListItem from "./ListItem";
import useCars from "../../hooks/useCars";
import { useEffect } from "react";

export default function CarsList() {
  const { cars, readCars } = useCars();

  useEffect(() => {
    readCars();
  }, []);

  return (
    <main className="styled carsList">
      <div className="center">
        <div className="mainBox">
          <div className="subHeader">
            <h2 className="title">Meus carros</h2>

            <Link to="/cars/new">
              <button className="button">+ Cadastrar carro</button>
            </Link>
          </div>
          <div className="list">
            <ul className="table">
              <li className="tableHeader">
                <h3 className="tableTitle">Nome</h3>
                <h3 className="tableTitle"></h3>
                <h3 className="tableTitle"></h3>
                <h3 className="tableTitle">Valor</h3>
              </li>

              {cars.map((el) => (
                <ListItem key={el.id} data={el} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
