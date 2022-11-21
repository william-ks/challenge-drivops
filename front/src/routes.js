import { Outlet, Route, Routes } from "react-router-dom";
import { CarsProvider } from "./context/CarsProvider";
import { SalesProvider } from "./context/SalesProvider";
import { SellersProvider } from "./context/SellersProvider";
import { UserProvider } from "./context/UserProvider";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import SellersList from "./pages/SellersList";
import CarsList from "./pages/CarsList";
import CarNew from "./pages/CarNew";
import SalesList from "./pages/SalesList";
import Header from "./components/Header";

export default function MainRoutes() {
  return (
    <Routes>
      {/* User Context */}
      <Route
        element={
          <UserProvider>
            <Outlet />
          </UserProvider>
        }
      >
        <Route exact path="/" element={<LoginPage />} />

        {/* autheticated context */}
        <Route
          element={
            <SellersProvider>
              <CarsProvider>
                <SalesProvider>
                  <Header />
                  <Outlet />
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
      </Route>
    </Routes>
  );
}
