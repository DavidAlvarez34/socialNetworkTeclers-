const jwt = require('jsonwebtoken');
const loginModel = require("../model/loginModel")

    module.exports.login = async (user) => {
        let login = new loginModel();
        
        let data= await login.find(user);
        console.log(data);
        if(data){
            let token = jwt.sign({data},process.env.KEY) // se agrega el usiario en corchetes para hacerlo como objeto
            return token;
        } else{
            return "User no autenticado"
        }
        
    }