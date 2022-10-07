const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

//Cors
app.use(cors())


//Puerto 8080
const port = process.env.PORT || 8080

//Inicializa el servidor 3000
app.listen(port, () => {
    console.log("El servidor se inicia en el puerto " + port);
})

//Api
app.get('/', async (req, res) => {
    const urlToken = `https://uc-cl.libwizard.com/api/v1/oauth/token`
    const urlForm = `https://uc-cl.libwizard.com/api/v1/public/forms`

    const credentials = {
        client_id: 44,
        client_secret: "0d8b9b19960632e9ffef20fce829a8a4",
        grant_type: "client_credentials"
    }

    try {
        //Se enviará la petición para obtener el token de acceso
        const response = await axios.post(`${urlToken}`, credentials, {
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        });

        //Se enviará la petición para obtener el JSON del formulario con el token de acceso ya obtenido
        const dataForm = await axios.get(`${urlForm}`,{
            headers: {
                "Authorization": `Bearer ${response.data.access_token}`,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            }
        })
        res.send(dataForm.data)
        return response.data;

    } catch (error) {
        console.error("Ha ocurrido un error al solicitar el token", error)
    }
});