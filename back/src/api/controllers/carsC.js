const db = require("../../database/dbConect");
const { upload } = require("../functions/fileStorage");

const createImage = async (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ message: "A image if mandatory." });
  }

  try {
    const response = await upload({ ...file });

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: "Server error." });
  }
};

const createCar = async (req, res) => {
  const {
    brand,
    model,
    license_plate,
    year,
    value,
    url: image,
    path: image_path,
  } = req.body;

  if (
    !brand ||
    !model ||
    !license_plate ||
    !year ||
    !value ||
    !image ||
    !image_path
  ) {
    return res.status(400).json({ message: "All fields are mandatory." });
  }

  try {
    // validating license_plate
    const response = await db("cars")
      .where({ license_plate })
      .andWhere({ isDeleted: false });

    if (response.length >= 1) {
      return res
        .status(400)
        .json({ message: "This license plate already exists." });
    }

    // creating a new car
    await db("cars").insert({
      brand,
      model,
      license_plate,
      year,
      value,
      image,
      image_path,
    });

    return res.status(201).end();
  } catch (e) {
    return res.status(500).json({ message: "Server error." });
  }
};

const read = async (req, res) => {
  try {
    let response = await db("cars").where({ isDeleted: false }).orderBy("id");

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
  const { id: carId } = req.params;
  const {
    brand,
    model,
    license_plate,
    year,
    value,
    url: image,
    path: image_path,
  } = req.body;

  // validating data to update
  if (
    !brand &&
    !model &&
    !license_plate &&
    !year &&
    !value &&
    !image &&
    !image_path
  ) {
    return res
      .status(400)
      .json({ message: "Data to update is missing content." });
  }

  //adding to "dataToupdate" the data to be updated
  const dataToupdate = {};

  if (brand) {
    dataToupdate.brand = brand;
  }

  if (model) {
    dataToupdate.model = model;
  }

  if (license_plate) {
    dataToupdate.license_plate = license_plate;
  }

  if (year) {
    dataToupdate.year = year;
  }

  if (value) {
    dataToupdate.value = value;
  }

  if (image) {
    dataToupdate.image = image;
  }

  if (image_path) {
    dataToupdate.image_path = image_path;
  }

  try {
    // validating if the "carId" exists
    let response = await db("cars").where({ id: carId, isDeleted: false });

    if (response.length < 1) {
      return res.status(404).json({ message: "Car not found" });
    }

    // validating license plate
    if (license_plate) {
      response = await db("cars")
        .where({ license_plate })
        .andWhere({ isDeleted: false })
        .andWhere("id", "!=", carId);

      if (response.length >= 1) {
        return res
          .status(400)
          .json({ message: "This license plate already exists." });
      }
    }

    // updating car
    await db("cars")
      .update({ ...dataToupdate })
      .where({ id: carId });

    return res.status(204).end();
  } catch (e) {
    return res.status(500).json({ message: "Server error." });
  }
};

const del = async (req, res) => {
  const { id: carId } = req.params;

  try {
    // validating if the "carId" exists
    const response = await db("cars").where({ id: carId, isDeleted: false });

    if (response.length < 1) {
      return res.status(404).json({ message: "Car not found" });
    }

    // deleting car
    await db("cars").update({ isDeleted: true }).where({ id: carId });

    return res.status(204).end();
  } catch (e) {
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  createImage,
  createCar,
  read,
  update,
  del,
};
