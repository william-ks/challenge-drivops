import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import { CarsProvider } from "./context/CarsProvider";
import { SalesProvider } from "./context/SalesProvider";
import { SellersProvider } from "./context/SellersProvider";
import useUser from "./hooks/useUser";

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import SellersList from "./pages/SellersList";
import CarsList from "./pages/CarsList";
import CarNew from "./pages/CarNew";
import SalesList from "./pages/SalesList";
import Header from "./components/Header";

const SecureRoutes = ({ redirectTo }) => {
  const { token } = useUser();
  return token ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default function MainRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />

      {/* autheticated context */}
      <Route
        element={
          <SellersProvider>
            <CarsProvider>
              <SalesProvider>
                <Header />
                <SecureRoutes redirectTo="/" />
              </SalesProvider>
            </CarsProvider>
          </SellersProvider>
        }
      >
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/sellers" element={<SellersList />} />
        <Route exact path="/cars" element={<CarsList />} />
        <Route exact path="/cars/new" element={<CarNew />} />
        <Route exact path="/cars/:id" element={<CarNew fill />} />
        <Route exact path="/sales" element={<SalesList />} />
      </Route>
    </Routes>
  );
}
