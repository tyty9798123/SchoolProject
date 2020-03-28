/*
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const isolationSchema = new schema({
    name: {
        type : String,
        required : true
    },
    identification: {
        type : String,
        default: "Foreigner"
    },
    passport: {
        type : String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mailing_address: {
        type: String,
        required: true
    },
    residence_address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    departure_country: {
        type: String,
        required: true,
    },
    departure_date: {
        type: Date,
        required: true,
    },
    entry_date: {
        type: Date,
        required: true,
    },
    isolation_start_date: {
        type: Date,
        required: true,
    },
    isolation_end_date: {
        type: Date,
        required: true,
    },
    isolation_days: {
        type: Number,
        required: true,
    },
    isolation_type: {
        type: String,
        required: true
    },
    created_at: {
        type : Date,
        default : Date.now
    },
});

module.exports = isolation = mongoose.model("isolation", isolationSchema);
*/