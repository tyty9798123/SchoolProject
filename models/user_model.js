const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type : String,
        required : true
    },
    account: {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "active"
    },
    date: {
        type : Date,
        default : Date.now
    },
});

module.exports = user = mongoose.model("users", userSchema);