const db = require("../../database/dbConect");

const sellersStatistics = async (req, res) => {
  const { ofDate, forDate } = req.query;

  try {
    // db connect
    const dbResponse = await db("sales")
      .join("sellers", "sellers.id", "=", "sales.seller_id")
      .join("cars", "cars.id", "=", "sales.car_id")
      .where({
        ["sales.isDeleted"]: false,
      })
      .select(
        "sales.id",
        "sales.date",
        { seller_id: "sellers.id" },
        { seller_name: "sellers.name" },
        { value: "cars.value" }
      )
      .orderBy("id");

    let sales = [];
    let response = [];

    // if there are filters by date, select only sales in that period
    if (ofDate && forDate) {
      sales = dbResponse.filter((sale) => {
        const saleDateTS = new Date(sale.date).getTime();

        return saleDateTS >= ofDate && saleDateTS <= forDate;
      });
    } else {
      sales = [...dbResponse];
    }

    sales.forEach((el) => {
      const find = response.find((wanted) => {
        return wanted.seller_id === el.seller_id;
      });
      if (!find) {
        response.push(el);
      }
    });

    // selecting each seller only once
    for (let seller of response) {
      let total = 0;

      // adding up the value of each sale
      sales.forEach((sale) => {
        if (sale.seller_id === seller.seller_id) {
          total += sale.value;
        }
      });

      seller.totalValue = total;
    }

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: "Server error." });
  }
};

const salesValueStatistics = async (req, res) => {
  const { ofDate, forDate } = req.query;

  try {
    // db connect
    const dbResponse = await db("sales")
      .join("sellers", "sellers.id", "=", "sales.seller_id")
      .join("cars", "cars.id", "=", "sales.car_id")
      .where({
        ["sales.isDeleted"]: false,
      })
      .select("sales.id", "sales.date", { value: "cars.value" })
      .orderBy("id");

    let response = [];

    // if there are filters by date, select only sales in that period
    if (ofDate && forDate) {
      response = dbResponse.filter((sale) => {
        const saleDateTS = new Date(sale.date).getTime();

        return saleDateTS >= ofDate && saleDateTS <= forDate;
      });
    } else {
      response = [...dbResponse];
    }

    //

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: "Server error." });
  }
};

const months = [
  {
    id: 0,
    name: "Janeiro",
  },
  {
    id: 1,
    name: "Fevereiro",
  },
  {
    id: 2,
    name: "Março",
  },
  {
    id: 3,
    name: "Abril",
  },
  {
    id: 4,
    name: "Maio",
  },
  {
    id: 5,
    name: "Junho",
  },
  {
    id: 6,
    name: "Julho",
  },
  {
    id: 7,
    name: "Agosto",
  },
  {
    id: 8,
    name: "Setembro",
  },
  {
    id: 9,
    name: "Outubro",
  },
  {
    id: 10,
    name: "Novembro",
  },
  {
    id: 11,
    name: "Dezembro",
  },
];

const salesAverage = async (req, res) => {
  let { year } = req.query;

  if (!year) {
    year = "2022";
  }

  try {
    // db connect
    const dbResponse = await db("sales")
      .join("sellers", "sellers.id", "=", "sales.seller_id")
      .join("cars", "cars.id", "=", "sales.car_id")
      .where({
        ["sales.isDeleted"]: false,
      })
      .select("sales.id", "sales.date", { value: "cars.value" })
      .orderBy("id");

    let sales = [];

    //filtering sales by year
    sales = dbResponse.filter((sale) => {
      const thisYear = new Date(sale.date).getFullYear();

      return thisYear == year;
    });

    const response = [];

    months.forEach((month, index) => {
      let totalValue = 0;
      let amountOfSales = 0;

      sales.forEach((sale) => {
        const thisMonth = new Date(sale.date).getMonth();

        if (month.id == thisMonth) {
          totalValue += sale.value;
          amountOfSales += 1;
        }
      });

      months[index].average = totalValue / amountOfSales;

      if (months[index].average) {
        response.push(months[index]);
      }
    });

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  sellersStatistics,
  salesValueStatistics,
  salesAverage,
};
