import { useContext } from "react";
import SellersContext from "../context/SellersProvider";

export default function useSellers() {
  return useContext(SellersContext);
}
