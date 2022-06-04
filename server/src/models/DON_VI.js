const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

let DON_VISchema = new mongoose.Schema({
    ten_don_vi: { type: String },
    is_deleted: {type: Boolean, default: false}
}, { 
    collection : 'DON_VI',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model("DON_VI", DON_VISchema)