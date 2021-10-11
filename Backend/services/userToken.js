const userDB = require('../model/loginModel')
const jwt = require('jsonwebtoken')
//Crea el tokent
module.exports.tokenGeneration = async (data) => {
    //llave secreta
    const result = jwt.sign({ data }, process.env.SECRET_KEY);
    return result
}
//verificar el token el token que le enviamos
module.exports.userVerifyTecler = async (token) => {
    const result = jwt.verify(token, process.env.SECRET_KEY)
    if (result) {
        return result
    } else {
        throw new Error('Invalid Token')
    }
}

//Listar la lista de usuarios
module.exports.userList = async () => {
    try {
        let result = await userDB.users()
        return result
    } catch (err) {
        throw new Error('DB Error')
    }
}
//creacion de un usuario
module.exports.userCreator = async (user) => {
    //para verificar el usuario no crea un token
    let newUser = {
        name: user.name,
        lastname: user.lastName,
        userPage: user.nameUsr,
        email: user.emailUsr,
        dateBirth:user.birthDate,
        password: user.passwordUser,
    }
    try {
        console.log(newUser)
        let result = await userDB.newUser(newUser)

        if (result) {
            return 'User creation successfully'
        } else {

            throw new Error('User already exists')
        }

    } catch (err) {
        throw new Error('User creation error')
    }
}

module.exports.userValidate = async (usr) => {
    try {
        let result = await userDB.userExist(usr)
        if (result) {
            return result
        } else {
            throw new Error('User does not exist')
        }
    } catch (err) {
        throw new Error(err)
    }
}