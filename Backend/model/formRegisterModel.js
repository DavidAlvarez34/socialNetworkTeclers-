const sequelize = require('../db/conexion');

module.exports = class FormModel {
    constructor(theUser,login){
        this.theUser = theUser;
        this.login = login;
       
    }
    async create (usr){
        console.log(usr);
        let result = await sequelize.query(`INSERT INTO userTecla (nameUsr,lastName,nameUsrPage,emailUsr,birthDate,passwordUser) VALUES ('${usr.name}','${usr.lastName}','${usr.nameUsr}','${usr.emailUsr}','${usr.birthDate}','${usr.passwordUser}')`);
        this.createinfoAdditonal(usr);
        this. createCommentsUsers (usr)
        return result;
    }
    async createinfoAdditonal (usr){
        console.log("Perfiles adicionales",usr);
        let result = await sequelize.query(`INSERT INTO infoAdditonal (emailUsr) VALUES ('${usr.emailUsr}')`);
        return result;
    }
    async createCommentsUsers (usr){
        console.log("Comentarios",usr);
        let result = await sequelize.query(`INSERT INTO commentsUsers (emailUsr) VALUES ('${usr.emailUsr}')`);
        return result;
    }
   
}