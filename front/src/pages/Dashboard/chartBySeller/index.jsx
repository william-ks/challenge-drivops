import { useRef, useState, useEffect } from "react";
import CustomLineChart from "../../../components/CustomLineChart";
import useUser from "../../../hooks/useUser";
import api from "../../../service/api";

export default function ChartBySeller() {
  const [data, setData] = useState([]);
  const { headers } = useUser();

  const ofDate = useRef(null);
  const forDate = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ofDate.current.value || !forDate.current.value) {
      await downloadData();
    } else {
      await downloadData(ofDate.current.value, forDate.current.value);
    }
  };

  const downloadData = async (ofDate, forDate) => {
    //timestamp values
    const newOfDate = new Date(`${ofDate} 00:00:00`).toGMTString();
    const newForDate = new Date(`${forDate} 00:00:00`).toGMTString();
    const ofTimeStamp = new Date(newOfDate).getTime();
    const forTimeStamp = new Date(newForDate).getTime();

    const endpoint = `/chartBySeller${
      ofDate ? `?ofDate=${ofTimeStamp}&forDate=${forTimeStamp}` : ""
    }`;

    try {
      const { data: dataResponse } = await api.get(endpoint, { headers });
      const local = [];

      dataResponse.forEach((el) => {
        local.push({
          id: el.id,
          name: el.seller_name.split(" ")[0],
          value: (el.totalValue / 100).toFixed(2),
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
        <div className="flex">
          <label className="flex" htmlFor="ofdate">
            <p className="inputDesc">De:</p>
            <input ref={ofDate} type="date" id="ofdate" />
          </label>
          <label className="flex" htmlFor="fordate">
            <p className="inputDesc">Até:</p>
            <input ref={forDate} type="date" id="fordate" />
          </label>
        </div>
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
