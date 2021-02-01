const welcome = require("./apis/welcome")
const project = require("./apis/project")
const shopCar = require("./apis/shopCar")
module.exports = (app) => {
    app.use('/api/welcome', welcome)
    app.use('/api/project', project)
    app.use('/api/shopCar', shopCar)
}
