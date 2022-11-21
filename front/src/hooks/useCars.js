import { useContext } from "react";
import CarsContext from "../context/CarsProvider";

export default function useSales() {
  return useContext(CarsContext);
}
