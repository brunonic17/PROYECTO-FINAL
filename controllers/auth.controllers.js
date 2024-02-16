import { Hash } from "../helpers/password.helpers.js";
import Users from "../models/user.models.js";
import { createAccesToken } from "../libs/jwt.js";
import bcrypt from "bcrypt";


//registrarse
export const register = async (req, res) => {
  try {
    const { nameUser, email, password } = req.body;

    const userFound = await Users.findOne({email})
    if(userFound)
      return res.status(409).json({msg: 'El email ya esta en uso'});
    
    const passwordHash = await Hash(password);
    const newUser = new Users({
      nameUser,
      email,
      password: passwordHash,
    });
    // Save user to the database
    const userSaved = await newUser.save();
    
    const token = await createAccesToken({ id: userSaved._id });
    res.cookie("token", token);

    res.status(200).json({
      messaje: "registrado existosamnete",
      data: {
        id: userSaved._id,
        nameUser: userSaved.nameUser,
        email: userSaved.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, data: error.message });
  }
};
//Loguearse
 export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userFound = await Users.findOne({ email });
  
      if (!userFound)
        return res.status(400).send({
          message: "Usuario o contrasena erronea",
        });
      // const validPass = await Compare(password, userFound.password);
      const isMatch = await bcrypt.compare(password, userFound.password)
      if (!isMatch)
        return res.status(400).send({ message: "Usuario o contrasena erronea" });
      //token
      const token = await createAccesToken({ id: userFound._id });
      res.cookie("token", token);
  
      //(dto)
  
      res
        .status(200)
        .json({ ok: true, logged: isMatch, user: userFound, token: token });
    } catch (error) {
      res.status(400).send
      ({ message: error.message });
    }
  };
//Cerrar Sesion
  export const logout = (req, res) => {
    try {
      res.cookie("token", "", {
        expires: new Date(0),
      });
      res.status(200).json({ message: "Se cerro sesion" });
    } catch (error) {
     res.send(message.error);
    }
  };
//Rutas Protegidas
 export const profile = async (req, res) => {
    const userfound = await Users.findById(req.user.id)
    
    if(!userfound) return res.status(400).send({messaje: "usuario no encontrado"})
    
    res.status(200).json({
      id: userfound._id,
      nameUser: userfound.nameUser,
      email: userfound.email,
    })
}