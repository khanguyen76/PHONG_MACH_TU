const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

let TAI_KHOANSchema = new mongoose.Schema({
    ho_ten: { type: String },
    email: { type: String },
    mat_khau: {type: String},
    gioi_tinh: { type: String },
    ngay_sinh: { type: Date },
    quyen: {type: String},
    is_deleted: {type: Boolean, default: false}
}, { 
    collection : 'TAI_KHOAN',
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    },
    versionKey: false
})

module.exports = mongoose.model("TAI_KHOAN", TAI_KHOANSchema)