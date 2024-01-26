import model from '../models/user.model.js';



 async function getUsers(req,res){
    try{
        res.status(200).send({ status: 'OK', data: await model.find() });
    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
};


async function createUser(req,res) {
try{
    const { numberClient, nameUser, pasword, typeUser} = req.body;
    const newUser = await model.create({
        numberClient,
        nameUser,
        pasword,
        typeUser
      });
    return res.status(200).json({
      ok: true,
      data: newUser,
    });
        // numberClient: { type: 'number', required: true },
        // nameUser: { type: 'String', required: true },
        // pasword: { type: 'number', required:true },
        // typeUser: { type: 'String', enum: ['admin', 'buyer'], default: 'buyer' }
    
   
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }};

 export {getUsers, createUser}