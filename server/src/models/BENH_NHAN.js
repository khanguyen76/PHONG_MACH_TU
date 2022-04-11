const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

let BENH_NHANSchema = new mongoose.Schema({
    ho_ten: { type: String },
    nam_sinh: { type: Number },
    gioi_tinh: { type: String },
    dia_chi: { type: String },
    is_deleted: {type: Boolean, default: false}
}, { 
    collection : 'BENH_NHAN',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model("BENH_NHAN", BENH_NHANSchema)