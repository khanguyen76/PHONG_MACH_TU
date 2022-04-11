const express = require("express");
const Patrient = require('../models/BENH_NHAN');
const router = express.Router();

router.get("/list",(req, res) => {
    Patrient.find({is_deleted:false},(err,docs)=>{
        if(err) return res.json({status:false,message:err})
        if(docs) return res.json({status:true,docs})
    })
});
router.post("/",(req, res) => {
    let patrient = new Patrient({
        "ho_ten": "Nguyễn Thị C",
        "gioi_tinh": "Nữ",
        "nam_sinh": 1991
    })
    patrient.save({},(err,doc)=>{
        if(err) return res.json({status:false,message:err})
        if(doc) return res.json({status:true,doc})
    })
});
router.put("/:id",(req, res) => {
    var id = req.params.id;
    console.log(id);
    Patrient.findOneAndUpdate({_id:id},{nam_sinh: 1967},{new:true})
    .then(doc=>{
        res.json({
            status:false,
            result:doc
        })
    })
    .catch(err=>{
        res.json({
            status:false,
            message:err
        })
    })
});
router.delete("/:id",(req, res) => {
    var id = req.params.id;
    console.log(id);
    Patrient.findOneAndUpdate({_id:id},{is_deleted:true},{new:true})
    .then(doc=>{
        res.json({
            status:false,
            result:doc
        })
    })
    .catch(err=>{
        res.json({
            status:false,
            message:err
        })
    })
});
module.exports = router