import { useEffect } from "react";
import { createContext, useState } from "react";
import useUser from "../hooks/useUser";
import api from "../service/api";

const SellersContext = createContext({});

export function SellersProvider({ children }) {
  const { headers } = useUser();
  const [sellers, setSellers] = useState([]);

  const readSellers = async () => {
    try {
      const { data } = await api.get("/seller", { headers });
      setSellers([...data]);
    } catch (e) {
      throw e;
    }
  };

  const createSeller = async (form) => {
    try {
      await api.post("/seller", { ...form }, { headers });

      await readSellers();
    } catch (e) {
      throw e;
    }
  };

  const updateSellers = async (form, id) => {
    try {
      await api.put(`/seller/${id}`, { ...form }, { headers });

      await readSellers();
    } catch (e) {
      throw e;
    }
  };

  const delSellers = async (id) => {
    try {
      await api.delete(`/seller/${id}`, { headers });

      await readSellers();
    } catch (e) {
      throw e;
    }
  };

  const data = {
    sellers,
    readSellers,
    createSeller,
    updateSellers,
    delSellers,
  };

  useEffect(() => {
    readSellers();
  }, []);

  return (
    <SellersContext.Provider value={data}>{children}</SellersContext.Provider>
  );
}

export default SellersContext;
