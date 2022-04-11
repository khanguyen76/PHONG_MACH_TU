const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

let PHIEU_KHAMSchema = new mongoose.Schema({
    ngay_kham: { type: Date },
    ma_benh_nhan: { type: String },
    ma_loai_benh: { type: String },
    is_deleted: {type: Boolean, default: false}
}, { 
    collection : 'PHIEU_KHAM',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model("PHIEU_KHAM", PHIEU_KHAMSchema)