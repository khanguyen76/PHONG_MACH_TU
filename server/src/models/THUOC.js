const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

let THUOCSchema = new mongoose.Schema({
    ten_thuoc: { type: String },
    is_deleted: {type: Boolean, default: false}
}, { 
    collection : 'THUOC',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model("THUOC", THUOCSchema)