const jwt = require("jsonwebtoken");
module.exports.userAutentication = (req, res, next) => {
  //next avanza con el cambio
  if (req.headers.authorization != undefined) {
    try{
  
    const token = req.headers.authorization.split(" ")[1];
    console.log("El token,", token);
    let result = jwt.verify( token , process.env.SECRET_KEY);
    console.log(result);
    
        return next();
    }catch(error){
        console.log(error);
        throw new Error("Token invalido");
    }
   
  }else{
      throw new Error("Token invalido");
  }
};
