const sequelize = require("../db/conexion");
module.exports = class infoAddModel {
  constructor() {}
  async create (usr){
    console.log("Usuarios desde el modelo",usr);
    let result = await sequelize.query(`INSERT INTO infoAdditonal (professionalProfile,emailUsr,country,town,linkLinkedin,languages,certifications,hobbies) VALUES ('${usr.profileUser}','${usr.emailPrevious}','${usr.countryUser}','${usr.cityLocation}','${usr.LinkedinTeclers}','${usr.lenguajes}','${usr.certiFication}','${usr.hobbies}');`);
    
    return result;
  }
  async list(email) {
    let result = await sequelize.query(
      `SELECT  professionalProfile,country,town,linkLinkedin,languages,certifications,hobbies FROM  infoAdditonal WHERE emailUsr= '${email.email}' `
    );
    console.log("lISTa Resultado");
    return result[0];
  }
}