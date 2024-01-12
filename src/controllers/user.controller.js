import model from '../models/user.model.js';



 async function getUsers(req,res){
    try{
        res.status(200).send({ status: 'OK', data: await model.find() });
    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
}

 export default getUsers 