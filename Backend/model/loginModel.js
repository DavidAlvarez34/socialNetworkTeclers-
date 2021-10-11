const sequelize = require('../db/conexion');
module.exports = class loginModel {
    constructor(){
       
    }
    async create (theUser){
        let result = await sequelize.query("INSERT INTO usuario (nombre,apellido,email,userPasword) VALUES ('" + theUser.myName + "','" + theUser.lastName + "','" + theUser.email + "','" + theUser.itemPassword + "');");
        console.log(result);
        return result;
    }
    async list (){
        let result = await sequelize.query("SELECT * FROM usuario");
        return result[0];
    }
    async find (usr){
        let user = [usr.emailUsr, usr.passwordUser]
        console.log(user);
    try {
        let result = await sequelize.query(`SELECT * FROM userTecla WHERE emailUsr = '${user[0]}'`);
        if (result) {
            let verify = await sequelize.query(`SELECT * FROM userTecla WHERE passwordUser = '${user[1]}'`);
            if (verify) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    } catch (err) {
        throw new Error(err)
    }

        // let result = await sequelize.query("SELECT * FROM usuario WHERE idUsuario = " + loginId);
        // return result[0][0];
    }
    async update (updateAPassword){
        let result = await sequelize.query("UPDATE usuario SET userPasword = '" + updateAPassword.userPasword +"' WHERE idUsuario = '" + updateAPassword.idUsuario + "';");
        return result;
    }
    async delete (loginId){
        let result = await sequelize.query("DELETE FROM usuario WHERE idUsuario = " + loginId);
        return result;
    }

    async findToken (user){
        let result = await sequelize.query("SELECT nombre,apellido,email FROM usuario WHERE email = '" + user.email + "' AND userPasword = '" + user.userPasword + "'");
        if (result[0].length > 0) {
            if (user.email == result[0][0].email) {
                return result[0][0];
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
module.exports.newUser = async (usr) => {
    try {
        let result = await sequelize.query(`SELECT * FROM userTecla WHERE emailUsr = '${usr.email}'`);
        if (result.lenght > 0) {
            console.log("Nose pudo");
            return false
        } else {
            await sequelize.query(`INSERT INTO userTecla (nameUsr,lastName,nameUsrPage,emailUsr,birthDate,passwordUser) VALUES ('${usr.name}','${usr.lastname}','${usr.userPage}','${usr.email}','${usr.dateBirth}','${usr.password}')`);
            console.log("Si se pudo");
            return true
        }
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.userExist = async (usr) => {
    let user = [usr.emailUsr, usr.passwordUser]
    try {
        let result = await sequelize.query(`SELECT * FROM userTecla WHERE emailUsr = '${user[0]}'`);
        if (result) {
            let verify = await sequelize.query(`SELECT * FROM userTecla WHERE passwordUser = '${user[1]}'`);
            if (verify) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.users = async () => {
    try {
        let result = await sequelize.query('SELECT * FROM userTecla')
        return result
    } catch (err) {
        throw new Error(err)
    }
}