const { verify } = require("jsonwebtoken");

module.exports={

    async autentication(req,res,next){
        try{
            req.userId= verify(req.headers.authorization,process.env.PRIVATE_KEY).id
            next();
        }
        catch(err){
            let errors = new Error();
            if(err.message==="jwt expired"){
                errors.statusCode=403;
                errors.msg="Authentication failed";
                errors.status = 'fail'
                return next(errors)    
            }
            return res.status(404).send({
                status:'fail',
                msg:err.message
            })
        }
    }
}