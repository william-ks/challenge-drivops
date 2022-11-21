import ChartBySalesAverage from "./chartBySalesAverage";
import ChartBySaleValue from "./chartBySaleValue";
import ChartBySeller from "./chartBySeller";
import "./style.css";

export default function Dashboard() {
  return (
    <main className="styled dashboard">
      <div className="center">
        <div className="mainBox">
          <h1 className="subTitle">Vendas por Fúncionario</h1>
          <ChartBySeller />
          <h1 className="subTitle">Valores de cada venda</h1>
          <ChartBySaleValue />
          <h1 className="subTitle">Média dos valores dos carros por mês</h1>
          <ChartBySalesAverage />
        </div>
      </div>
    </main>
  );
}
