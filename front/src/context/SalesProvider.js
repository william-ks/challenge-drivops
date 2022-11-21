import { useEffect } from "react";
import { createContext, useState } from "react";
import useUser from "../hooks/useUser";
import api from "../service/api";

const SalesContext = createContext({});

export function SalesProvider({ children }) {
  const { headers } = useUser();
  const [sales, setSales] = useState([]);

  const readSales = async () => {
    try {
      const { data } = await api.get("/sales", { headers });
      setSales([...data]);
    } catch (e) {
      throw e;
    }
  };

  const createSales = async (form) => {
    try {
      await api.post("/sales", { ...form }, { headers });

      await readSales();
    } catch (e) {
      throw e;
    }
  };

  const updateSales = async (form, id) => {
    try {
      await api.put(`/sales/${id}`, { ...form }, { headers });

      await readSales();
    } catch (e) {
      throw e;
    }
  };

  const delSales = async (id) => {
    try {
      await api.delete(`/sales/${id}`, { headers });

      await readSales();
    } catch (e) {
      throw e;
    }
  };

  const data = {
    sales,
    readSales,
    createSales,
    updateSales,
    delSales,
  };

  useEffect(() => {
    readSales();
  }, [])

  return <SalesContext.Provider value={data}>{children}</SalesContext.Provider>;
}

export default SalesContext;
