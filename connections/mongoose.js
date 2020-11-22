require('dotenv').config();
var con = {
    mongoURI : `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-nuoqa.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
}

module.exports = con;