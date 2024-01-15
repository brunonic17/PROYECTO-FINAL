import Users from "../models/user.models.js"


export const register = async (req, res) => {

    try {
        const {name, email, password} = req.body

        const newUser = new Users ({
            name,
            email,
            password,
        })
        // Save user to the database
         const userSaved =  await newUser.save()

        res.status(200).json({messaje: "registrado existosamnete", data: newUser })
    } catch (error) {
        
        res.status(500).send({ status: "ERR", data: err });
    }
}


export const login =(req, res) => {
    res.send("logueando")
}

