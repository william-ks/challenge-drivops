import { useEffect, useRef, useState } from "react";
import CustomLineChart from "../../../components/CustomLineChart";
import useUser from "../../../hooks/useUser";
import api from "../../../service/api";

export default function ChartBySalesAverage() {
  const [data, setData] = useState([]);
  const { headers } = useUser();

  const year = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Number(year.current.value) < 1900 ||
      Number(year.current.value) > 2099
    ) {
      year.current.value = 2022;
    }

    await downloadData();
  };

  const downloadData = async () => {
    const endpoint = `/chartBySalesAverage?year=${year.current.value}`;

    try {
      const { data: dataResponse } = await api.get(endpoint, { headers });
      const local = [];

      dataResponse.forEach((el) => {
        local.push({
          id: el.id,
          name: el.name,
          value: (el.average / 100).toFixed(2),
          pv: 2400,
          amt: 2400,
        });
      });

      setData([...local]);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    downloadData();
  }, []);

  return (
    <div className="flexColumn">
      <form className="chartForm">
        <label className="flex" htmlFor="ofdate">
          <p className="inputDesc">Ano:</p>

          <input
            ref={year}
            type="number"
            min="1900"
            max="2099"
            step="1"
            defaultValue="2022"
          />
        </label>
      </form>
      {data ? (
        <div className="chart">
          <CustomLineChart data={data} />
        </div>
      ) : (
        ""
      )}
      <button className="chartButton" onClick={handleSubmit}>
        Atualizar
      </button>
    </div>
  );
}
