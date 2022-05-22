const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

let CACH_DUNGSchema = new mongoose.Schema({
    mo_ta_cach_dung: { type: String },
    is_deleted: {type: Boolean, default: false}
}, { 
    collection : 'CACH_DUNG',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model("CACH_DUNG", CACH_DUNGSchema)