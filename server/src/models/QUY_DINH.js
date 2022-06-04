const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

let QUY_DINHSchema = new mongoose.Schema({
    ten_quy_dinh: { type: String },
    gia_tri: mongoose.Schema.Types.Mixed,
}, { 
    collection : 'QUY_DINH',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model("QUY_DINH", QUY_DINHSchema)