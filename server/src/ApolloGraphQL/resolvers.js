const BENH_NHAN = require('../models/BENH_NHAN');
const PHIEU_KHAM = require('../models/PHIEU_KHAM');
const LOAI_BENH = require('../models/LOAI_BENH');
const DON_VI = require('../models/DON_VI');
const CACH_DUNG = require('../models/CACH_DUNG');
const THUOC = require('../models/THUOC');
const TAI_KHOAN = require('../models/TAI_KHOAN');
const QUY_DINH = require('../models/QUY_DINH');
const { sendMail } = require('../ultils/mailer');
const { createToken, verifyToken, decodeToken } = require('../ultils/jwt');
const { encode, compare } = require('../ultils/bcrypt');
// Vendors
var moment = require('moment');
const disableVerify = true
const resolvers = {
    // QUERY
    Query: {
        DS_BENH_NHAN: async (_,{search,page,pageSize},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                if(search?.ho_ten){
                    search.ho_ten = new RegExp(`${search.ho_ten}`,'i')
                }
                let count = await BENH_NHAN.countDocuments({ ...search, is_deleted: false })
                let doc = await BENH_NHAN.find({ ...search , is_deleted: false },{},{skip:(page-1)*pageSize,limit:pageSize})
                return { success: true, code: 200, message: "Successful", total: count, pages: pageSize ? Math.ceil(count/pageSize):null, doc }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        BENH_NHAN: async (_,{_id},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                console.log(_id);
                let doc = await BENH_NHAN.findOne({ _id, is_deleted: false })
                console.log(doc);
                if (!doc) {
                    throw new Error("Data not found")
                }
                return doc
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        DS_PHIEU_KHAM: async (_,{search,page,pageSize},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            console.log(search);
            if (isValid) {
                if(search?.ngay_kham){
                    search.ngay_kham = {$gte: search.ngay_kham,$lte: moment(search.ngay_kham).add(1,'days')}
                }
                let count = await PHIEU_KHAM.countDocuments({ ...search , is_deleted: false })
                let doc = await PHIEU_KHAM
                .find({ ...search , is_deleted: false },{},{skip:(page-1)*pageSize,limit:pageSize})
                .sort({ 'updated_at': -1 })
                return { success: true, code: 200, message: "Successful", total: count, pages: pageSize ? Math.ceil(count/pageSize):null, doc }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        PHIEU_KHAM: async (_,{_id},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res = await PHIEU_KHAM.findOne({ _id, is_deleted: false })
                if (!res) {
                    throw new Error("Data not found")
                }
                return res
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        DS_LOAI_BENH: async (_,{},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let docs = await LOAI_BENH.find({ is_deleted: false })
                return docs
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        LOAI_BENH: async (_,{_id},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res = await LOAI_BENH.findOne({ _id, is_deleted: false })
                if (!res) {
                    throw new Error("Data not found")
                }
                return res
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        DS_DON_VI: async (_,{},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let count = await DON_VI.countDocuments({ is_deleted: false })
                let list = await DON_VI.find({ is_deleted: false })
                return list
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        DON_VI: async (_,{_id},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res = await DON_VI.findOne({ _id, is_deleted: false })
                if (!res) {
                    throw new Error("Data not found")
                }
                return res
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        DS_CACH_DUNG: async (_,{},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let count = await CACH_DUNG.countDocuments({ is_deleted: false })
                let list = await CACH_DUNG.find({ is_deleted: false })
                return list
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        CACH_DUNG: async (_,{_id},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res = await CACH_DUNG.findOne({ _id, is_deleted: false })
                if (!res) {
                    throw new Error("Data not found")
                }
                return res
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        DS_THUOC: async (_,{search,page,pageSize},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                if(search?.ten_thuoc){
                    search.ten_thuoc = new RegExp(`${search.ten_thuoc}`,'i')
                }
                let count = await THUOC.countDocuments({ ...search, is_deleted: false })
                let doc = await THUOC.find({ ...search, is_deleted: false },{},{skip:(page-1)*pageSize,limit:pageSize})
                return { success: true, code: 200, message: "Successful", total: count, pages: pageSize ? Math.ceil(count/pageSize):null, doc }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        THUOC: async (_,{_id},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res = await THUOC.findOne({ _id, is_deleted: false })
                if (!res) {
                    throw new Error("Data not found")
                }
                return res
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        DS_TAI_KHOAN: async (_,{page,pageSize},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let count = await TAI_KHOAN.countDocuments({ is_deleted: false })
                let doc = await TAI_KHOAN
                .find({ is_deleted: false },{},{skip:(page-1)*pageSize,limit:pageSize})
                return { success: true, code: 200, message: "Successful", total: count, pages: pageSize ? Math.ceil(count/pageSize):null, doc }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        TAI_KHOAN: async (_,{token}) => {
            let args = await decodeToken(token)
            if (args) {
                let doc = await TAI_KHOAN.findOne({ email: args.email, is_deleted: false })
                if(doc)
                return doc
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        }
    },
    PHIEU_KHAM: {
        benh_nhan: (_) => BENH_NHAN.findOne({ _id: _.ma_benh_nhan }),
        loai_benh: async (_) => {
            console.log(_.ma_loai_benh);
            let res = await LOAI_BENH.findOne({ _id: _.ma_loai_benh })
            console.log(res);
            return res
        },
        don_thuoc: async (_) => {
            let ds_ma_thuoc = _.don_thuoc.map(i=>i.ma_thuoc)
            let docs = await THUOC.find({ _id: ds_ma_thuoc })
            console.log(docs);
            return docs.map(t=>{
                let _this = _.don_thuoc.find(i=>i.ma_thuoc == t._id)
                return {
                    thuoc: new THUOC(t),
                    so_luong: _this.so_luong,
                    don_gia: _this.don_gia,
                    thanh_tien: _this.thanh_tien
                }
            })
        },
    },
    THUOC: {
        don_vi: (_) => DON_VI.findOne({ _id: _.ma_don_vi }),
        cach_dung: (_) => CACH_DUNG.findOne({ _id: _.ma_cach_dung })
    },
    Mutation: {
        THEM_BENH_NHAN: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                const BENH_NHAN_MOI = new BENH_NHAN(args)
                await BENH_NHAN_MOI.save()
                return { success: true, code: 200, message: "Successful" }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        CAP_NHAT_BENH_NHAN: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res1 = await BENH_NHAN.findOne({ _id: args._id, is_deleted: false })
                if (!res1) {
                    throw new Error("Data not found")
                }
                await BENH_NHAN.findOneAndUpdate({ _id: args._id }, { ...args }, { new: true })
                return { success: true, code: 200, message: "Successful" }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        XOA_BENH_NHAN: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res1 = await BENH_NHAN.findOne({ _id: args._id }, { is_deleted: false })
                if (res1) {
                    await BENH_NHAN.findOneAndUpdate({ _id: args._id }, { is_deleted: true },{ new: true })
                    return { success: true, code: 200, message: "Successfully"}
                }
                else {
                    throw new Error("Data not found")
                }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        THEM_LOAI_BENH: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                const LOAI_BENH_MOI = new LOAI_BENH(args)
                await LOAI_BENH_MOI.save()
                return { success: true, code: 200, message: "Successful" }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        CAP_NHAT_LOAI_BENH: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res1 = await LOAI_BENH.findOne({ _id: args._id, is_deleted: false })
                if (!res1) {
                    throw new Error("Data not found")
                }
                await LOAI_BENH.findOneAndUpdate({ _id: args._id }, { ...args }, { new: true })
                return { success: true, code: 200, message: "Successful" }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        XOA_LOAI_BENH: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res1 = await LOAI_BENH.findOne({ _id: args._id }, { is_deleted: false })
                if (res1) {
                    await LOAI_BENH.findOneAndUpdate({ _id: args._id }, { is_deleted: true },{ new: true })
                    return { success: true, code: 200, message: "Successfully"}
                }
                else {
                    throw new Error("Data not found")
                }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        THEM_DON_VI: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                const DON_VI_MOI = new DON_VI(args)
                let doc = await DON_VI_MOI.save()
                return doc
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        CAP_NHAT_DON_VI: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res = await DON_VI.findOne({ _id: args._id, is_deleted: false })
                if (!res) {
                    throw new Error("Data not found")
                }
                let doc = await DON_VI.findOneAndUpdate({ _id: args._id }, { ...args }, { new: true })
                return doc
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        XOA_DON_VI: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res1 = await DON_VI.findOne({ _id: args._id }, { is_deleted: false })
                if (res1) {
                    await DON_VI.findOneAndUpdate({ _id: args._id }, { is_deleted: true },{ new: true })
                    return { success: true, code: 200, message: "Successfully"}
                }
                else {
                    throw new Error("Data not found")
                }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        THEM_THUOC: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                const THUOC_MOI = new THUOC(args)
                let doc = await THUOC_MOI.save()
                return doc
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        CAP_NHAT_THUOC: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res = await THUOC.findOne({ _id: args._id, is_deleted: false })
                if (!res) {
                    throw new Error("Data not found")
                }
                let doc = await THUOC.findOneAndUpdate({ _id: args._id }, { ...args }, { new: true })
                return doc
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        XOA_THUOC: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res1 = await THUOC.findOne({ _id: args._id }, { is_deleted: false })
                if (res1) {
                    await THUOC.findOneAndUpdate({ _id: args._id }, { is_deleted: true },{ new: true })
                    return { success: true, code: 200, message: "Successfully"}
                }
                else {
                    throw new Error("Data not found")
                }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        THEM_CACH_DUNG: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                const CACH_DUNG_MOI = new CACH_DUNG(args)
                let doc = await CACH_DUNG_MOI.save()
                return doc
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        CAP_NHAT_CACH_DUNG: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res = await CACH_DUNG.findOne({ _id: args._id, is_deleted: false })
                if (!res) {
                    throw new Error("Data not found")
                }
                let doc = await CACH_DUNG.findOneAndUpdate({ _id: args._id }, { ...args }, { new: true })
                return doc
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        XOA_CACH_DUNG: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res1 = await CACH_DUNG.findOne({ _id: args._id }, { is_deleted: false })
                if (res1) {
                    await CACH_DUNG.findOneAndUpdate({ _id: args._id }, { is_deleted: true },{ new: true })
                    return { success: true, code: 200, message: "Successfully"}
                }
                else {
                    throw new Error("Data not found")
                }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        THEM_PHIEU_KHAM: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let benh_nhan = await BENH_NHAN.findOne({ _id: args.ma_benh_nhan })
                if(!benh_nhan){
                    throw new Error("Data not found")
                }
                let tien_kham = await QUY_DINH.findOne({ _id: "6288a739480a642eebd04e13" })
                const PHIEU_KHAM_MOI = new PHIEU_KHAM({...args,tien_kham: tien_kham.gia_tri, tong_tien:  tien_kham.gia_tri})
                let doc = await PHIEU_KHAM_MOI.save()
                return doc
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        CAP_NHAT_PHIEU_KHAM: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let phieu_kham = await PHIEU_KHAM.findOne({ _id: args._id, is_deleted: false })
                if (!phieu_kham) {
                    throw new Error("Data not found")
                }
                if(args.don_thuoc){
                    let ds_ma_thuoc = args.don_thuoc.map(thuoc=>thuoc.ma_thuoc)
                    let ds_gia_thuoc = await THUOC.find({ _id: ds_ma_thuoc, is_deleted: false }, '_id don_gia')
                    if(!ds_gia_thuoc || (ds_gia_thuoc.length != ds_ma_thuoc.length))
                    {
                        throw new synrror("Data unsynchronized")
                    }
                    let tong_tien = 0 
                    let don_thuoc = args.don_thuoc.map(item=>{
                        let don_gia = ds_gia_thuoc.find(t=>t._id == item.ma_thuoc).don_gia
                        let thanh_tien = item.so_luong*don_gia
                        tong_tien += thanh_tien
                        return {
                            ma_thuoc: item.ma_thuoc,
                            so_luong: item.so_luong,
                            don_gia,
                            thanh_tien
                        }
                    })
                    args.don_thuoc = don_thuoc
                    args.tong_tien = tong_tien + phieu_kham.tien_kham
                }
                let doc = await PHIEU_KHAM.findOneAndUpdate({ _id: args._id }, { ...args }, { new: true })
                return doc
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        XOA_PHIEU_KHAM: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res = await PHIEU_KHAM.findOne({ _id: args._id }, { is_deleted: false })
                if (res) {
                    await PHIEU_KHAM.findOneAndUpdate({ _id: args._id }, { is_deleted: true },{ new: true })
                    return { success: true, code: 200, message: "Successfully"}
                }
                else {
                    throw new Error("Data not found")
                }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        TAO_TAI_KHOAN: async (_, args) => {
            let res = await TAI_KHOAN.findOne({ email: args.email })
            if (res) {
                throw new UserInputError("Địa chỉ email đã tồn tại")
            }

            let hash = await encode(args.mat_khau);
            const TAI_KHOAN_MOI = new TAI_KHOAN({ ...args, mat_khau: hash })
            let doc = await TAI_KHOAN_MOI.save()
            return doc
        },
        CAP_NHAT_TAI_KHOAN: async (_, args) => {
            let res = await TAI_KHOAN.findOne({ _id: args._id, is_deleted: false })
            if (!res) {
                throw new Error("Data not found")
            }
            if (args.mat_khau) {
                let hash = await encode(args.mat_khau);
                if (!hash) {
                    throw new UserInputError("Địa chỉ email hoặc mật khẩu không đúng")
                }
                args.mat_khau = hash
            }
            let doc = await TAI_KHOAN.findOneAndUpdate({ _id: args._id }, { ...args }, { new: true })
            return doc
        },
        XOA_TAI_KHOAN: async (_, args) => {
            let res = await TAI_KHOAN.findOne({ _id: args._id }, { is_deleted: false })
            if (res) {
                await TAI_KHOAN.findOneAndUpdate({ _id: args._id }, { is_deleted: true }, { new: true })
                return { success: true, code: 200, message: "Successfully" }
            }
            else {
                throw new Error("Data not found")
            }
        },
        KHOI_PHUC_TAI_KHOAN: async (_, args) => {
            let res = await TAI_KHOAN.findOne({ _id: args._id }, { is_deleted: true })
            if (res) {
                await TAI_KHOAN.findOneAndUpdate({ _id: args._id }, { is_deleted: false }, { new: true })
                return { success: true, code: 200, message: "Successfully" }
            }
            else {
                throw new Error("Data not found")
            }
        },
        DANG_NHAP: async (_, args) => {
            let doc = await TAI_KHOAN.findOne({ email: args.email, is_deleted: false })
            if (!doc) {
                throw new Error("Địa chỉ email hoặc mật khẩu không đúng")
            }
            let valid = await compare(args.mat_khau, doc.mat_khau);
            if (!valid) {
                throw new Error("Địa chỉ email hoặc mật khẩu không đúng")
            }
            let accessToken = createToken({ payload: args, settings: { expiresIn: '1h' } })
            return { accessToken, doc }
        },
        QUEN_MAT_KHAU: async (_, args) => {
            let res = await TAI_KHOAN.findOne({ email: args.email, is_deleted: false })
            if (!res) {
                throw new Error("Data not found")
            }
            await sendMail(args.email, "Xác thực email tài khoản Phòng Mạch Tư", "Đường dẫn đổi lại mật khẩu là: https://abc.com/change-password")
            return { success: true, code: 200, message: "Successfully" }
        },
        DOI_MAT_KHAU: async (_, args) => {
            let res = await TAI_KHOAN.findOne({ _id: args._id, is_deleted: false })
            if (!res) {
                throw new Error("Data not found")
            }
            let valid = await compare(args.mat_khau_cu, res.mat_khau);
            if (!valid) {
                throw new UserInputError("Mật khẩu không đúng")
            }
            let hash = await encode(args.mat_khau);
            let doc = await TAI_KHOAN.findOneAndUpdate({ _id: args._id }, { mat_khau: hash }, { new: true })
            return doc
        }

    }
}

module.exports = resolvers