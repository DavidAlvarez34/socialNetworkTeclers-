const FormModel = require('../model/formRegisterModel');

module.exports.createMethodForm = async (userCreate) => {
    let response = new FormModel();
    let result = await response.create(userCreate);
    return "Metodo creado";
}