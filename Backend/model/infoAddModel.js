const sequelize = require("../db/conexion");
module.exports = class infoAddModel {
  constructor() {}
  async update (usr){
    console.log("Usuarios desde el modelo",usr);
    //let result = await sequelize.query(`INSERT INTO infoAdditonal (professionalProfile,emailUsr,country,town,linkLinkedin,languages,certifications,hobbies) VALUES ('${usr.profileUser}','${usr.emailPrevious}','${usr.countryUser}','${usr.cityLocation}','${usr.LinkedinTeclers}','${usr.lenguajes}','${usr.certiFication}','${usr.hobbies}');`);
    let result = await sequelize.query(`UPDATE infoAdditonal SET professionalProfile = '${usr.profileUser}', country = '${usr.countryUser}' , town = '${usr.cityLocation}', linkLinkedin = '${usr.LinkedinTeclers}',languages = '${usr.lenguajes}',certifications = '${usr.certiFication}',hobbies = '${usr.hobbies}' WHERE emailUsr = '${usr.emailPrevious}' `);
    console.log("Este es el resultado: ",result);
    return result;
  }
  async list(email) {
    let result = await sequelize.query(
      `SELECT  professionalProfile,country,town,linkLinkedin,languages,certifications,hobbies FROM  infoAdditonal WHERE emailUsr= '${email.email}' `
    );
   
    return result[0];
  }
}