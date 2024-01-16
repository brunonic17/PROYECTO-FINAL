import { Hash } from "../helpers/password.helpers.js"
import Users from "../models/user.models.js"


export const register = async (req, res) => {

    try {
        const {nameUser, email, password} = req.body
        const passwordHash = await Hash(password)
        const newUser = new Users ({
            nameUser,
            email,
            password: passwordHash
        })
        // Save user to the database
         const userSaved =  await newUser.save()

        res.status(200).json({messaje: "registrado existosamnete", data: {
            id: userSaved._id,
            nameUser: userSaved.nameUser,
            email: userSaved.email
        } })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: "ERR", data: error });
    }
}


export const login =(req, res) => {
    res.send("logueando")
}

