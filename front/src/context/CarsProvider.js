import { useEffect } from "react";
import { createContext, useState } from "react";
import useUser from "../hooks/useUser";
import api from "../service/api";

const CarsContext = createContext({});

export function CarsProvider({ children }) {
  const { headers } = useUser();
  const [cars, setCars] = useState([]);

  const readCars = async () => {
    try {
      const { data } = await api.get("/car", { headers });

      const local = []

      data.forEach(el => {
        if(!el.isSold){
          local.push(el)
        }
      })

      setCars([...local]);
    } catch (e) {
      throw e;
    }
  };

  const createImageCar = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await api.post("/car/image", formData, {
        headers: {
          "Content-Type": "multpart/form-data",
          authorization: headers.authorization,
        },
      });

      return data;
    } catch (e) {
      throw e;
    }
  };

  const createCar = async (form) => {
    if (!form.license_plate || form.license_plate.length !== 7) {
      return {
        status: 400,
        message: "The license plate is invalid",
      };
    }

    try {
      await api.post("/car", { ...form }, { headers });

      await readCars();
    } catch (e) {
      throw e;
    }
  };

  const updateCar = async (form, id) => {
    if (form.license_plate && form.license_plate.length !== 7) {
      return {
        status: 400,
        message: "The license plate is invalid",
      };
    }

    try {
      await api.put(`/car/${id}`, { ...form }, { headers });

      await readCars();
    } catch (e) {
      throw e;
    }
  };

  const delCar = async (id) => {
    try {
      await api.delete(`/car/${id}`, { headers });

      await readCars();
    } catch (e) {
      throw e;
    }
  };

  const data = {
    cars,
    readCars,
    createImageCar,
    createCar,
    updateCar,
    delCar,
  };

  useEffect(() => {
    readCars();
  }, [])

  return <CarsContext.Provider value={data}>{children}</CarsContext.Provider>;
}

export default CarsContext;
