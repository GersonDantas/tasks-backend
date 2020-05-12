const bodyParse = require('body-parser')
const cors = require('cors')// atender requisições vindas de outras urls

module.exports = app => {
    app.use(bodyParse.json())
    app.use(cors({
        origin: '*'
    }))
}