import model from '../models/comments.model';


async function getComments(req,res){
    try{
        res.status(200).send({ status: 'OK', data: await model.find() });
    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
}



export default getComments 