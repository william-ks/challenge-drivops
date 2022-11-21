const db = require("../../database/dbConect");

const create = async (req, res) => {
  const { name, registration } = req.body;

  if (!name || !registration) {
    return res.status(400).json({ message: "All fields are mandatory." });
  }

  try {
    // validating registration
    const response = await db("sellers")
      .where({ registration })
      .andWhere({ isDeleted: false });

    if (response.length >= 1) {
      return res
        .status(400)
        .json({ message: "This registration already exists." });
    }

    // creating a new seller
    await db("sellers").insert({ name, registration });

    return res.status(201).end();
  } catch (e) {
    return res.status(500).json({ message: "Server error." });
  }
};

const read = async (req, res) => {
  try {
    let response = await db("sellers")
      .where({ isDeleted: false })
      .orderBy("id");

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
  const { id: sellerId } = req.params;
  const { name, registration } = req.body;

  if (!name && !registration) {
    return res
      .status(400)
      .json({ message: "Data to update is missing content." });
  }

  const dataToUpdate = {};

  if (name) {
    dataToUpdate.name = name;
  }

  if (registration) {
    dataToUpdate.registration = registration;
  }

  try {
    // validating if the "sellerId" exists
    let response = await db("sellers").where({
      id: sellerId,
      isDeleted: false,
    });

    if (response.length < 1) {
      return res.status(404).json({ message: "Seller not found." });
    }

    // validating registration

    if (registration) {
      response = await db("sellers")
        .where("id", "!=", sellerId)
        .andWhere({ isDeleted: false });

      if (response.length >= 1) {
        return res
          .status(400)
          .json({ message: "This registration already exists." });
      }
    }

    // updating seller
    await db("sellers")
      .update({ ...dataToUpdate })
      .where({ id: sellerId });

    return res.status(204).end();
  } catch (e) {
    return res.status(500).json({ message: "Server error." });
  }
};

const del = async (req, res) => {
  const { id: sellerId } = req.params;

  try {
    // validating if the "sellerId" exists
    const response = await db("sellers").where({
      id: sellerId,
      isDeleted: false,
    });

    if (response.length < 1) {
      return res.status(404).json({ message: "Seller not found." });
    }

    // deleting seller
    await db("sellers").update({ isDeleted: true }).where({ id: sellerId });

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
