const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

let LOAI_BENHSchema = new mongoose.Schema({
    ten_loai_benh: { type: String },
    is_deleted: {type: Boolean, default: false}
}, { 
    collection : 'LOAI_BENH',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model("LOAI_BENH", LOAI_BENHSchema)