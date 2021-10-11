const midd = require('../middlewares/userValidation')
const userService = require('../services/userToken')
const loginController= require('../controllers/loginController')
//debemos guardar el token desde el fronten desde un local storage
module.exports = (app) => {
    app.post('/login', async (req, res) => {
        let user = req.body
        console.log(user);
        try {
            //res.send(await loginController.login(user));
             let result = await loginController.login(user);
             console.log(result);
             res.json(result)
            // if (result) {
            //     let token = await loginController.login(user.emailUsr)
            //     res.json(token)
            // }
        } catch (err) {
            res.status(400).send('Unregistered user')
        }
    })
    //Ruta para obtener los usuarios 
    //le enviamos el token que recimimos
    app.get('/users', midd.userValidation, async (req, res) => {
        try {
            let result = await userService.userList()
            res.json(result)
        } catch (err) {
            res.status(400).send('An unexpected error occurred')
        }
    })

    app.post('/newuser', async (req, res) => {
        try {
            let user = req.body
            let result = await userService.userCreator(user)
            res.json(result)

        } catch (err) {
            res.status(400).send('An unexpected error occurred')
        }
    })
}