import Fav from "../models/fav.models.js";
// Agregar a favoritos
export const createFavorites = async (req, res) => {
  try {
console.log(req.body)
    const newFav = new Fav({
      product: req.body.product,
      user: req.body.user,
    });
    // Se guarda en la database
    const favSaved = await newFav.save();

    res.status(200).json({
      favSaved,
    });
  } catch (error) {
    res.status(400).send({ data: error.message });
  }
};
// Pagina de favoritos
export const getFavorites = async (req, res) => {
  const fav = await Fav.find({
    user: req.user.id,
  })
  .populate("user");
  res.status(200).json(fav);
};
// Pagina de del producto
export const getFavorite = async (req, res) => {
  try {
    const fav = await Fav.findById(req.params.id).populate("user");
    if (!fav)
      return res.status(404).json({ message: "producto no encontrado" });
    res.json(fav);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
