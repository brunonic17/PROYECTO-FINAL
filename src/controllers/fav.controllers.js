import Fav from "../models/fav.models.js";
// Agregar a favoritos
export const createFavorites = async (req, res) => {
  const { product, user } = req.body;

  try {
    // Verificamos si el usuario ya tiene este producto en sus favoritos
    let favCheck = await Fav.findOne({
      product,
      user,
    });
    if (favCheck)
      res.status(400).json({ msg: "El producto ya se encuentra en favoritos" });
    // Si no lo tiene agregamos al carritco de compras del usuario

    const newFav = new Fav({
      product,
      user,
    });
    // Se guarda en la database
    const favSaved = await newFav.save();
    res.status(200).json({ Status: 200, data: favSaved });
  } catch (error) {
    res.status(400).send({ data: error.message });
  }
};
// Pagina de favoritos
export const getFavorites = async (req, res) => {
  try {
    const fav = await Fav.find({ user: req.user.id });
    res.status(200).json(fav);
  } catch (error) {
    res.status(400).json(error);
    // console.log(error);
  }
};

//Borrar el producto de favoritos
export const deleteFavorite = async (req, res) => {
  try {
    const deleteFavorite = await Fav.findByIdAndDelete(req.params.id);
    if (!deleteFavorite)
      return res
        .status(404)
        .json({ message: "el producto ya no se encuentra" });

    return res.sendStatus(204);
    //todo estubo bien no te voy a devolver nada
    //no devuelva nada(no hay contenido)solo que se haya borrado correctamente
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Pagina de del producto
export const productCard = async (req, res) => {
  try {
    const fav = await Fav.findById(req.params.id).populate("user");
    if (!fav)
      return res.status(404).json({ message: "producto no encontrado" });
    res.json(fav);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
