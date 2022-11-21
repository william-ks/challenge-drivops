import "./style.css";
import SellerCard from "./SellerCard";
import SellerModal from "./SellerModal";
import { useState, useEffect } from "react";
import useSellers from "../../hooks/useSellers";

export default function SellersList() {
  const [showModal, setShowModal] = useState(false);

  const { readSellers, sellers } = useSellers();

  useEffect(() => {
    readSellers();
  }, []);

  return (
    <>
      {showModal && <SellerModal opened={setShowModal} />}
      <main className="styled sellersList">
        <div className="center">
          <div className="mainBox">
            <div className="head">
              <div className="pad">
                <h1 className="pageTitle">Lista de vendedores</h1>
                <button onClick={() => setShowModal(true)}>
                  Novo vendedor
                </button>
              </div>
            </div>
            <div className="flexSellers">
              {sellers.map((seller) => (
                <SellerCard key={seller.id} name={seller.name} id={seller.id} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
