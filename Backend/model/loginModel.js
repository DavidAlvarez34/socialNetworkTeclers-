const sequelize = require("../db/conexion");
module.exports = class loginModel {
  constructor() {}
  async create(theUser) {
    let result = await sequelize.query(
      "INSERT INTO usuario (nombre,apellido,email,userPasword) VALUES ('" +
        theUser.myName +
        "','" +
        theUser.lastName +
        "','" +
        theUser.email +
        "','" +
        theUser.itemPassword +
        "');"
    );
    console.log(result);
    return result;
  }
  async list(email) {
    let result = await sequelize.query(
      `SELECT  nameUsr,lastName,nameUsrPage,emailUsr,birthDate FROM  userTecla WHERE emailUsr= '${email}' `
    );
    console.log("lISTa Resultado");
    return result[0];
  }
  async find(usr) {
    let user = [usr.email, usr.userPasword];
    try {
      let verifyUser = await sequelize.query(
        `SELECT emailUsr FROM userTecla WHERE emailUsr = '${user[0]}'`
      );
      console.log("Email: ", verifyUser[0][0].emailUsr);
      if (toString(user[0]) === toString(verifyUser[0][0].emailUsr)) {
        let verify = await sequelize.query(
          `SELECT passwordUser FROM userTecla WHERE passwordUser = '${user[1]}'`
        );
        console.log("Password", verify[0][0].passwordUser);
        if (toString(user[1]) === toString(verify[0][0].passwordUser)) {
          let infoUser = await sequelize.query(
            `SELECT emailUsr FROM userTecla WHERE emailUsr = '${user[0]}'`
          );
          console.log(infoUser);
          return infoUser;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  async update(updateUsr) {
    console.log(updateUsr);
    let result = await sequelize.query(
      `UPDATE userTecla SET nameUsr = '${updateUsr.nameUser}', lastName='${updateUsr.firstName}',nameUsrPage='${updateUsr.nameUserPerfil}', emailUsr ='${updateUsr.emailUpdate}', birthDate = '${updateUsr.AgeDate}'  WHERE emailUsr = '${updateUsr.userPrevius}'`
    );
    console.log("Resultado de la actualizacion: ", result);
    return result;
  }
  
 async updateUrlPhoto(updateUsrPhoto) {
    console.log("email y url",updateUsrPhoto);
    let result = await sequelize.query(
      `UPDATE userTecla SET photoUserUrl = '${updateUsrPhoto.urlPhoto}'  WHERE emailUsr = '${updateUsrPhoto.emailUsr}'`
    );
    console.log("Resultado de la actualizacion: ", result);
    return result;
  } 
  async getUrlPhoto(updateUsrPhoto) {
    let verifyUrl = await sequelize.query(
      `SELECT photoUserUrl FROM userTecla WHERE emailUsr = '${updateUsrPhoto.emailUsr}'`
    );

    return verifyUrl[0][0];
  }
  async delete(loginId) {
    let result = await sequelize.query(
      "DELETE FROM usuario WHERE idUsuario = " + loginId
    );
    return result;
  }

  async findToken(user) {
    let result = await sequelize.query(
      "SELECT nombre,apellido,email FROM usuario WHERE email = '" +
        user.email +
        "' AND userPasword = '" +
        user.userPasword +
        "'"
    );
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
};
module.exports.newUser = async (usr) => {
  try {
    let result = await sequelize.query(
      `SELECT * FROM userTecla WHERE emailUsr = '${usr.email}'`
    );
    if (result.lenght > 0) {
      console.log("Nose pudo");
      return false;
    } else {
      await sequelize.query(
        `INSERT INTO userTecla (nameUsr,lastName,nameUsrPage,emailUsr,birthDate,passwordUser) VALUES ('${usr.name}','${usr.lastname}','${usr.userPage}','${usr.email}','${usr.dateBirth}','${usr.password}')`
      );
      console.log("Si se pudo");
      return true;
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.userExist = async (usr) => {
  let user = [usr.emailUsr, usr.passwordUser];
  try {
    let result = await sequelize.query(
      `SELECT * FROM userTecla WHERE emailUsr = '${user[0]}'`
    );
    if (result) {
      let verify = await sequelize.query(
        `SELECT * FROM userTecla WHERE passwordUser = '${user[1]}'`
      );
      if (verify) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.users = async () => {
  try {
    let result = await sequelize.query("SELECT * FROM userTecla");
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
