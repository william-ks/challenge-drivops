const db = require("../../database/dbConect");

const create = async (req, res) => {
  const { seller_id, car_id, date } = req.body;

  try {
    // validating if this "car_id" was sold
    let response = await db("cars").where({
      id: car_id,
      isSold: true,
      isDeleted: false,
    });

    if (response.length >= 1) {
      return res.status(400).json({ message: "This car was sold." });
    }

    // validating if "seller_id" is a valid and active id
    response = await db("sellers").where({
      id: seller_id,
      isDeleted: false,
    });

    if (response.length < 1) {
      return res
        .status(400)
        .json({ message: `The seller_id: ${seller_id} was not found.` });
    }

    // validating if "car_id" is a valid and active id
    response = await db("cars").where({ id: car_id, isDeleted: false });

    if (response.length < 1) {
      return res
        .status(400)
        .json({ message: `The car_id: ${car_id} was not found.` });
    }

    // creating a new sale
    await db("sales").insert({ seller_id, car_id, date });

    //updating car "sold" property
    await db("cars").update({ isSold: true }).where({ id: car_id });

    return res.status(201).end();
  } catch (e) {
    return res.status(500).json({ message: "Server error." });
  }
};

const read = async (req, res) => {
  try {
    let response = await db("sales")
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
        { value: "cars.value" },
        { car_id: "cars.id" },
        { car_plate: "cars.license_plate" },
        { car_brand: "cars.brand" },
        { car_model: "cars.model" },
        { car_year: "cars.year" },
        { car_image: "cars.image" }
      ).orderBy('id');

    response = response.map((el) => {
      const { isDeleted, ...data } = el;
      return data;
    });

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: "Server error." });
  }
};

const update = async (req, res) => {
  const { seller_id, car_id, date } = req.body;
  const { id: saleId } = req.params;

  if (!seller_id && !car_id && !date) {
    return res
      .status(400)
      .json({ message: "Data to update is missing content." });
  }

  const dataToUpdate = {};

  if (seller_id) {
    dataToUpdate.seller_id = seller_id;
  }

  if (car_id) {
    dataToUpdate.car_id = car_id;
  }

  if (date) {
    dataToUpdate.date = date;
  }

  try {
    // validating if this "saleId" exists
    let response = await db("sales").where({
      id: saleId,
      isDeleted: false,
    });

    if (response.length < 1) {
      return res.status(400).json({ message: "Sale not found." });
    }

    // set old data
    const oldData = response[0];
    // validating if "seller_id" is a valid and active id

    if (seller_id && oldData.seller_id != seller_id) {
      response = await db("sellers").where({
        id: seller_id,
        isDeleted: false,
      });

      if (response.length < 1) {
        return res
          .status(400)
          .json({ message: `The seller_id: ${seller_id} was not found.` });
      }
    }

    // validating if "car_id" is a valid and active id
    if (car_id && oldData.car_id != car_id) {
      response = await db("cars").where({ id: car_id, isDeleted: false });

      if (response.length < 1) {
        return res
          .status(400)
          .json({ message: `The car_id: ${car_id} was not found.` });
      }

      // validating if there is another sale of this car_id
      response = await db("sales").where("id", "!=", saleId).andWhere({
        isDeleted: false,
        car_id,
      });

      if (response.length >= 1) {
        return res.status(400).json({ message: `The car was sold.` });
      }
    }

    // updating a sale
    await db("sales")
      .update({ ...dataToUpdate })
      .where({ id: saleId });

    // updating cars "isSold" property
    if (car_id && oldData.car_id != car_id) {
      await db("cars").update({ isSold: false }).where({ id: oldData.car_id });
      await db("cars").update({ isSold: true }).where({ id: car_id });
    }

    return res.status(204).end();
  } catch (e) {
    return res.status(500).json({ message: "Server error." });
  }
};

const del = async (req, res) => {
  const { id: saleId } = req.params;

  try {
    // validating if this "saleId" exists
    const response = await db("sales").where({
      id: saleId,
      isDeleted: false,
    });

    if (response.length < 1) {
      return res.status(400).json({ message: `Sale not found.` });
    }

    // deleting sale
    await db("sales").update({ isDeleted: true }).where({ id: saleId });

    //updating car "isSold" property
    await db("cars")
      .update({ isSold: false })
      .where({ id: response[0].car_id });

    return res.status(204).end();
  } catch (e) {
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  create,
  read,
  update,
  del,
};
