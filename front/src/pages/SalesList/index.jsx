import "./style.css";
import SaleCard from "./SaleCard";
import SaleModal from "./SaleModal";
import { useState, useEffect } from "react";
import useSellers from "../../hooks/useSellers";
import useSales from "../../hooks/useSales";

export default function SalesList() {
  const [showModal, setShowModal] = useState(false);

  const { readSales, sales } = useSales();

  useEffect(() => {
    readSales();
  }, []);

  return (
    <>
      {showModal && <SaleModal opened={setShowModal} />}
      <main className="styled sellersList">
        <div className="center">
          <div className="mainBox">
            <div className="head">
              <div className="pad">
                <h1 className="pageTitle">Histórico de vendas</h1>
                <button onClick={() => setShowModal(true)}>Nova venda</button>
              </div>
            </div>
            <div className="flexSellers">
              {sales.map((sale) => (
                <SaleCard key={sale.id} data={sale} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
