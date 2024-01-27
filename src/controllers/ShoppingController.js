import Shoppings from "../models/shopping.models.js";

export const GetProduct = async (req, res) => {
  try {
    const Shopping = await Shoppings.find();
    res.status(200).send({ status: "Ok", data: Shopping });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "Error", data: "No trae datos" });
  }
};

export const PostProduct = async (req, res) => {
  try {
    const {IdUsu } = req.body
    const NewCarro = new Shoppings({
        IdUsu
    });
    await NewCarro.create()
    res.status(200).json({ messaje: "Registrado Exitoso" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "Error", data: error });
  }
};
