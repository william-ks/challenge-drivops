import "./style.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="center">
        <nav className="desktop">
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/sellers">Vendedores</Link>
            </li>
            <li>
              <Link to="/cars">Carros</Link>
            </li>
            <li>
              <Link to="/sales">Vendas</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
