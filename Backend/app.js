let express = require('express');
let app = express();
const cors = require('cors');
require('dotenv').config()
const sequelize = require('./db/conexion');
const viewUserTeclers = require('./view/viewUsersTeclers')

app.use(express.json())
app.use(cors());
async function serverStart() {
  try {
    await sequelize.authenticate();
    console.log('Correct conexion');
    app.listen(process.env.PORT, function () {
      console.log(`Sistem start http://${process.env.HOST}:${process.env.PORT}`);
    });
  } catch (error) {
    console.error('DB conexion error:', error);
  }
}
serverStart();

//Routes
viewUserTeclers(app)