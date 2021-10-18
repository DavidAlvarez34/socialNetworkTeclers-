
const FormController = require("../controllers/formControllerUser");
module.exports = async (app) => {
   
    app.post('/createUserTeclers', async(req, res) => {
        
         let FormRegister = req.body;
         
         res.send(await FormController.createMethodForm(FormRegister));
    })
    
}