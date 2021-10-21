const autenticationUser = require('../middlewares/autentication');
const infoAddController= require('../controllers/infoAddController')
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
    app.post('/createInfoAdditionalPerfil', autenticationUser.userAutentication, async (req, res) => {
        try {
            let user = req.body
            let result = await infoAddController.UpdatePerfilAdd(user)
            console.log("Hola este es el usuario",user);
            res.send({'token':result});
        } catch (err) {
            res.status(400).send('An unexpected error occurred')
        }
    })

    app.post('/viewPerfilUser',autenticationUser.userAutentication, async (req, res) => {
        try {
            let user = req.body
            console.log("Usuarios", user);
             let result = await infoAddController.perfilUserTeclers(user)
             console.log("la consulta de informacion adicional ",result);
           res.json(result)

        } catch (err) {
            res.status(400).send('An unexpected error occurred')
        }
    })
}