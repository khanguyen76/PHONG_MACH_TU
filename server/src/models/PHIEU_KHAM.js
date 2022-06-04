const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

let PHIEU_KHAMSchema = new mongoose.Schema({
    ma_benh_nhan: { type: String },
    ma_loai_benh: { type: String },
    ma_don_thuoc: { type: String },
    ngay_kham: { type: Date , default: new Date()},
    trieu_chung: { type: String },
    don_thuoc: { type: Array},
    tien_kham: { type: Number, default: 0 },
    tong_tien: { type: Number, default: 0 },
    is_deleted: {type: Boolean, default: false}
}, { 
    collection : 'PHIEU_KHAM',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model("PHIEU_KHAM", PHIEU_KHAMSchema)