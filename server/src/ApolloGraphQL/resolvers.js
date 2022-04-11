const BENH_NHAN = require('../models/BENH_NHAN');
const PHIEU_KHAM = require('../models/PHIEU_KHAM');
const LOAI_BENH = require('../models/LOAI_BENH');

const resolvers = {
    // QUERY
    Query: {
        DS_BENH_NHAN: () => BENH_NHAN.find({is_deleted:false}),
        BENH_NHAN: (parent,args) => BENH_NHAN.findOne(args),

        DS_PHIEU_KHAM: () => PHIEU_KHAM.find({is_deleted:false}),
        PHIEU_KHAM: (parent,args) => PHIEU_KHAM.findOne(args),

        DS_LOAI_BENH: () => LOAI_BENH.find({is_deleted:false}),
        LOAI_BENH: (parent,args) => LOAI_BENH.findOne(args),
    },
    PHIEU_KHAM: {
        benh_nhan: (parent) => BENH_NHAN.findOne({_id:parent.ma_benh_nhan}),
        loai_benh: (parent) => LOAI_BENH.findOne({_id:parent.ma_loai_benh})
    },
    Mutation: {
        THEM_BENH_NHAN: async (parent,args) => {
            const BENH_NHAN_MOI = new BENH_NHAN(args)
            return await BENH_NHAN_MOI.save()
        },
        THEM_LOAI_BENH: async (parent,args) => {
            const LOAI_BENH_MOI = new LOAI_BENH(args)
            return await LOAI_BENH_MOI.save()
        }
    }
}

module.exports = resolvers