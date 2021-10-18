const jwt = require('jsonwebtoken');
const loginModel = require("../model/loginModel")

    module.exports.login = async (user) => {
        let login = new loginModel();
        
        let data= await login.find(user);
        console.log(data);
        if(data){
            let token = jwt.sign({data},process.env.SECRET_KEY) // se agrega el usiario en corchetes para hacerlo como objeto
            console.log(token);
            return token;
        } else{
            return "User no autenticado"
        }
        
    }

    module.exports.listUserTeclers = async (emailUsr) => {
        let response = new loginModel();
        let result = await response.list(emailUsr);
        return result;
    }
    module.exports.updateUserTeclers = async (Usr) => {
        let response = new loginModel();
        let result = await response.update(Usr);
        return result;
    }
    
    module.exports.updateUserPhotoController = async (UsrPhoto) => {
        let response = new loginModel();
        let result = await response.updateUrlPhoto(UsrPhoto);
        return result;
    }
    module.exports.getUserPhotoController = async (UsrPhoto) => {
        let response = new loginModel();
        let result = await response.getUrlPhoto(UsrPhoto);
        return result;
    }