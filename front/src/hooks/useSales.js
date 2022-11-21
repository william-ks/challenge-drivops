import { useContext } from "react";
import SalesContext from "../context/SalesProvider";

export default function useSales() {
  return useContext(SalesContext);
}
