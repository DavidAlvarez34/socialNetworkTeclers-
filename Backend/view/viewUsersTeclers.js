//const midd = require('../middlewares/userValidation')
//const userService = require('../services/userToken')
const autenticationUser = require('../middlewares/autentication');
const loginController= require('../controllers/loginController')
//debemos guardar el token desde el fronten desde un local storage
module.exports = (app) => {
    app.post('/login', async (req, res) => {
       
        try {
            let user = req.body
            
            //res.send(await loginController.login(user));
             let result = await loginController.login(user);
             
             //res.json({data:result})
             res.send({'token':result});
            // if (result) {
            //     let token = await loginController.login(user.emailUsr)
            //     res.json(token)
            // }
        } catch (err) {
            console.log("error");
            res.status(400).send('Unregistered user')
        }
    })
    //Ruta para obtener los usuarios 
    //le enviamos el token que recimimos
    app.post('/usersTeclers', autenticationUser.userAutentication, async (req, res) => {
        try {
            let user = req.body
            let result = await loginController.listUserTeclers(user.email)
            
            res.send({'token':result});
        } catch (err) {
            res.status(400).send('An unexpected error occurred')
        }
    })

    app.post('/usersTeclersUpdate',autenticationUser.userAutentication, async (req, res) => {
        try {
            let user = req.body
            
             let result = await loginController.updateUserTeclers(user)
            res.json(result)

        } catch (err) {
            res.status(400).send('An unexpected error occurred')
        }
    })

    app.post('/urlImageSave',autenticationUser.userAutentication, async (req, res) => {
        try {
            
            let urlPhoto = req.body
           
             let result = await loginController.updateUserPhotoController(urlPhoto)
            res.json(result)

        } catch (err) {
            res.status(400).send('An unexpected error occurred')
        }
    });

    app.post('/getUrlImage',autenticationUser.userAutentication, async (req, res) => {
        try {
            console.log("Obteniendo la url de la imagen",req.body);
            let urlPhoto = req.body
           
             let result = await loginController.getUserPhotoController(urlPhoto)
             console.log("Este es el resultrado de la url ----------",result);
            res.json(result)

        } catch (err) {
            res.status(400).send('An unexpected error occurred')
        }
    })

}