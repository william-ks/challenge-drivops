import { useEffect, useRef, useState } from "react";
import { IoImageOutline, IoTrashBinOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import LoadingModal from "../../components/LoadingModal";
import useCars from "../../hooks/useCars";
import ModalCancel from "./ModalCancel";
import ModalCreated from "./ModalCreated";
import "./style.css";

export default function CarNew({ fill }) {
  const brand = useRef(null);
  const license_plate = useRef(null);
  const model = useRef(null);
  const value = useRef(null);
  const year = useRef(null);

  const navigate = useNavigate();

  const { createImageCar, createCar, updateCar, cars } = useCars();

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const [file, setFile] = useState("");
  const [image, setImage] = useState({});
  const [activeButton, setActiveButton] = useState(false);
  const [titleLimit, setTitleLimit] = useState({ actual: 0, max: 50 });
  const [descriptionLimit, setDescriptionLimit] = useState({
    actual: 0,
    max: 100,
  });

  const { id } = useParams();

  const fillForm = async (id) => {
    const response = cars.find((el) => {
      return Number(id) === el.id;
    });

    brand.current.value = response.brand;
    license_plate.current.value = response.license_plate;
    model.current.value = response.model;
    value.current.value = response.value / 100;
    year.current.value = response.year;

    setImage({ url: response.image, path: response.image_path });

    setTitleLimit({
      actual: response.brand.length,
      max: 50,
    });
    setDescriptionLimit({
      actual: response.model.length,
      max: 100,
    });
  };

  useEffect(() => {
    if (fill) {
      fillForm(id);
    }
  }, []);

  const textCounter = (e) => {
    const { target } = e;
    if (target.name === "title") {
      setTitleLimit({ ...titleLimit, actual: target.value.length });
      if (titleLimit.actual >= titleLimit.max - 1) {
        const array = target.value.split("");
        array.pop();
        target.value = array.join("");
      }
    } else {
      setDescriptionLimit({ ...descriptionLimit, actual: target.value.length });
      if (descriptionLimit.actual >= descriptionLimit.max - 1) {
        const array = target.value.split("");
        array.pop();
        target.value = array.join("");
      }
    }
  };

  const verifyValidForm = () => {
    if (
      !brand.current.value ||
      !license_plate.current.value ||
      !model.current.value ||
      !value.current.value ||
      !year.current.value ||
      !image.url
    ) {
      setActiveButton(false);
    } else {
      setActiveButton(true);
    }
  };

  const validatePrice = (e) => {
    const alvo = e.target;

    // > 0
    if (alvo.value < 0) {
      alvo.value = 0;
    }

    // eliminando espaços
    alvo.value = alvo.value.split(" ").join("");

    // alterando . para virgula
    alvo.value = alvo.value.split(".").join(",");

    let splitedFull = alvo.value.split("");

    // removendo primeiro 0
    if (splitedFull[0] === "0") {
      if (splitedFull.length > 1 && splitedFull[1] !== ",") {
        splitedFull[0] = "";
        alvo.value = splitedFull.join("");
      }
    }

    //adicionando 0 no inicio caso tenha uma virgula em [0]
    if (splitedFull[0] === ",") {
      splitedFull[0] = "0";
      splitedFull[1] = ",";
      alvo.value = splitedFull.join("");
    }

    //removendo letras
    let forThis = splitedFull.join("").split(",");

    if (!Number(forThis.join("."))) {
      forThis = forThis.join(".").split("");

      for (let i = 0; i < forThis.length; i++) {
        if (!Number(forThis[i]) && forThis[i] !== ".") {
          forThis.splice(i, 1);
        }
      }

      alvo.value = forThis.join("").split(".").join(",");
    }

    //bloqueando mais de 1 virgula
    if (splitedFull.includes(",")) {
      const commas = splitedFull.filter((el) => el === ",");
      if (commas.length <= 1) {
        return;
      }

      const firstCommas = splitedFull.findIndex((el) => el === ",");

      let i = firstCommas + 2;

      for (i; i < commas.length + 2; i++) {
        if (splitedFull[i] === ",") {
          splitedFull.splice(i, 1);
        }
      }

      //impedindo vigula no final caso já exista alguma virgula no numero
      if (splitedFull[splitedFull.length - 1] === ",") {
        splitedFull[splitedFull.length - 1] = "";
      }

      alvo.value = splitedFull.join("");
    }
  };

  const handleSubmitImage = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setShowLoading(true);
      const data = await createImageCar(file);

      setImage({ ...data });
      verifyValidForm();
    } catch (e) {
      throw e;
    } finally {
      setShowLoading(false);
    }
  };

  const handleSubmit = async () => {
    const form = {
      brand: brand.current.value,
      license_plate: license_plate.current.value,
      model: model.current.value,
      value: (Number(value.current.value.split(",").join(".")) * 100).toFixed(
        0
      ),
      year: year.current.value,
      ...image,
    };

    try {
      setShowLoading(true);
      if (!fill) {
        await createCar(form);
      } else {
        await updateCar(form, id);
      }
    } catch (e) {
      throw e;
    } finally {
      setShowLoading(false);
      navigate("/cars");
    }
  };

  const removeImage = () => {
    setImage({});
    setFile("");
  };

  useEffect(() => {
    handleSubmitImage();
  }, [file]);

  useEffect(() => {
    verifyValidForm();
  }, [image]);

  useEffect(() => {
    if (showModalCreate || showLoading || showModalCancel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showModalCreate, showLoading, showModalCancel]);

  return (
    <>
      {showModalCreate && (
        <ModalCreated setShowModalCreate={setShowModalCreate} />
      )}

      {showLoading && <LoadingModal />}

      {showModalCancel && (
        <ModalCancel
          fill={fill ? true : false}
          setShowModalCancel={setShowModalCancel}
        />
      )}

      <main className="styled productNew">
        <div className="center">
          <div className="mainBox">
            <h1 className="title">Adicionar novo carro</h1>
            <form className="form" onChange={verifyValidForm}>
              <div className="twoColuns w100">
                <div className="w100 fmax">
                  <label htmlFor="" className="relative">
                    <p className="inputDescription">Marca</p>
                    <input
                      className="inputs"
                      type="text"
                      placeholder="Nome do produto"
                      onChange={textCounter}
                      name="title"
                      ref={brand}
                    />
                    <p className="textCounter in">
                      {titleLimit.actual}/{titleLimit.max}
                    </p>
                  </label>

                  <div className="w100">
                    <label htmlFor="">
                      <p className="inputDescription">Modelo</p>
                      <input
                        className="inputs"
                        type="text"
                        placeholder="Ex.: Civic 16v turbo"
                        onChange={textCounter}
                        ref={model}
                      />
                      <p className="textCounter out">
                        {descriptionLimit.actual}/{descriptionLimit.max}
                      </p>
                    </label>

                    <div className="twoColuns">
                      <label htmlFor="" className="relative">
                        <p className="inputDescription">Preço</p>
                        <input
                          className="inputs inputPrice"
                          type="text"
                          ref={value}
                          placeholder="0,00"
                          onChange={validatePrice}
                        />
                        <span className="priceFill">R$</span>
                      </label>
                      <label htmlFor="">
                        <p className="inputDescription">Ano</p>
                        <input
                          className="inputs"
                          type="text"
                          placeholder="Ex: 2022-2022"
                          ref={year}
                        />
                      </label>

                      <label htmlFor="">
                        <p className="inputDescription">Placa</p>
                        <input
                          className="inputs"
                          type="text"
                          placeholder="abc1234"
                          ref={license_plate}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="inputFileDiv">
                  <p className="inputDescription">Adicionar foto</p>
                  <label htmlFor="inputFile" className="fileLabel">
                    <div className="icon">
                      {image.url ? (
                        <>
                          <img
                            className="image"
                            src={image.url}
                            alt="product"
                          />
                          <div className="removeImage" onClick={removeImage}>
                            <IoTrashBinOutline />
                          </div>
                        </>
                      ) : (
                        <IoImageOutline />
                      )}
                    </div>
                    <input
                      onChange={(e) => setFile(e.target.files[0])}
                      className="inputFile"
                      id="inputFile"
                      type="file"
                      disabled={image.url ? true : false}
                    />
                  </label>
                </div>
              </div>
            </form>

            <div className="buttons">
              <button
                className={`button sm${!activeButton ? " inactive" : ""}`}
                onClick={activeButton ? () => handleSubmit() : () => {}}
              >
                Publicar anúncio
              </button>

              <button
                className="outline sm"
                onClick={() => setShowModalCancel(true)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
