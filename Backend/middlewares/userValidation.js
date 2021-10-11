const userServices = require('../services/userToken')
//es una autenticacion 
module.exports.userValidation = async (req, res, next) => {
    try {
        
        if (req.headers.authorization != undefined) {
            const token = req.headers.authorization.split(' ')[1]
            let verifyed = await userServices.userVerifyTecler(token)
            req.params.user = verifyed.data
            return next()
        } else {
            throw new Error('Unauthorized user')
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}