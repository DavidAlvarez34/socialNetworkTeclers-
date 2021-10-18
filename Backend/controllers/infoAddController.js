const jwt = require('jsonwebtoken');
const infoAddModel = require("../model/infoAddModel")

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

    module.exports.createPerfilAdd = async (userCreatePerfil) => {
        let response = new infoAddModel();
        let result = await response.create(userCreatePerfil);
        console.log(userCreatePerfil);
        return "Metodo creado";
    }
    module.exports.perfilUserTeclers = async (Usr) => {
        let response = new infoAddModel();
        let result = await response.list(Usr);
        return result;
    }