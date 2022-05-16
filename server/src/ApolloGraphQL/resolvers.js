const BENH_NHAN = require('../models/BENH_NHAN');
const PHIEU_KHAM = require('../models/PHIEU_KHAM');
const LOAI_BENH = require('../models/LOAI_BENH');
const TAI_KHOAN = require('../models/TAI_KHOAN');
const {sendMail} = require('../ultils/mailer');
// Vendor
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const resolvers = {
    // QUERY
    Query: {
        DS_BENH_NHAN: () => BENH_NHAN.find({ is_deleted: false }),
        BENH_NHAN: (parent, args) => BENH_NHAN.findOne(args),

        DS_PHIEU_KHAM: () => PHIEU_KHAM.find({ is_deleted: false }),
        PHIEU_KHAM: (parent, args) => PHIEU_KHAM.findOne(args),

        DS_LOAI_BENH: () => LOAI_BENH.find({ is_deleted: false }),
        LOAI_BENH: (parent, args) => LOAI_BENH.findOne(args),
    },
    PHIEU_KHAM: {
        benh_nhan: (parent) => BENH_NHAN.findOne({ _id: parent.ma_benh_nhan }),
        loai_benh: (parent) => LOAI_BENH.findOne({ _id: parent.ma_loai_benh })
    },
    PHIEU_KHAM: {
        benh_nhan: (parent) => BENH_NHAN.findOne({ _id: parent.ma_benh_nhan }),
        loai_benh: (parent) => LOAI_BENH.findOne({ _id: parent.ma_loai_benh })
    },
    Mutation: {
        THEM_BENH_NHAN: async (_, args) => {
            const BENH_NHAN_MOI = new BENH_NHAN(args)
            return await BENH_NHAN_MOI.save()
        },
        THEM_LOAI_BENH: async (_, args) => {
            const LOAI_BENH_MOI = new LOAI_BENH(args)
            return await LOAI_BENH_MOI.save()
        },
        TAO_TAI_KHOAN: async (_, args) => {
            let res = await TAI_KHOAN.findOne({ email: args.email })
            if (res) {
                return { success: false, code: 401, message: "Địa chỉ email đã tồn tại" }
            }
            const saltRounds = 10;
            let hash = await new Promise((resolve, reject) => {
                bcrypt.hash(args.mat_khau, saltRounds, function (err, hash) {
                    if (err) console.log("ERROR HASH", err);
                    resolve(hash)
                })
            });
            const TAI_KHOAN_MOI = new TAI_KHOAN({...args,mat_khau:hash})
            let doc2 = await TAI_KHOAN_MOI.save()
            return { success: true, code: 200, message: "Successfully", doc: doc2 }
        },
        SUA_TAI_KHOAN: async (_, args) => {
            let res1 = await TAI_KHOAN.findOne({_id: args._id,is_deleted: false})
            if (!res1) {
                return { success: false, code: 404, message: "Not found" }
            }
            if(args.mat_khau){
                const saltRounds = 10;
                let hash = await new Promise((resolve, reject) => {
                    bcrypt.hash(args.mat_khau, saltRounds, function (err, hash) {
                        if (err) console.log("ERROR HASH", err);
                        resolve(hash)
                    })
                });
                if(!hash){
                    return { success: false, code: 401, message: "Hash password failed"}
                }
                args.mat_khau = hash
            }
            let res2 = await TAI_KHOAN.findOneAndUpdate({_id: args._id},{...args})
            console.log(res2);
            return { success: true, code: 200, message: "Successfully", doc: res2 }
        },
        XOA_TAI_KHOAN: async (_, args) => {
            let res1 = await TAI_KHOAN.findOne({_id: args._id},{is_deleted: false})
            if (res1) {
                let res2 = await TAI_KHOAN.findOneAndUpdate({_id: args._id},{is_deleted: true })
                return { success: true, code: 200, message: "Successfully", doc: res2 }
            }
            else {
                return { success: false, code: 404, message: "Not found" }
            }
        },
        KHOI_PHUC_TAI_KHOAN: async (_, args) => {
            let res1 = await TAI_KHOAN.findOne({_id: args._id},{is_deleted: true})
            if (res1) {
                let res2 = await TAI_KHOAN.findOneAndUpdate({_id: args._id},{is_deleted: false})
                return { success: true, code: 200, message: "Successfully", doc: res2 }
            }
            else {
                return { success: false, code: 404, message: "Not found" }
            }
        },
        DANG_NHAP: async (_, args) => {
            const privateKey = "secret"
            var accessToken = jwt.sign(args, privateKey, { expiresIn: '30s' });
            let res = await TAI_KHOAN.findOne({ email: args.email, is_deleted: false })
            if (!res) {
                return { success: false, code: 401, message: "Địa chỉ email hoặc mật khẩu không đúng" }
            }
            let valid = await bcrypt.compare(args.mat_khau, res.mat_khau);
            if (!valid) {
                return { success: false, code: 401, message: "Địa chỉ email hoặc mật khẩu không đúng" }

            }
            return { success: true, code: 200, message: "Successfully", doc: res, accessToken }
        },
        QUEN_MAT_KHAU: async (_, args) => {
            let res = await TAI_KHOAN.findOne({ email: args.email, is_deleted: false })
            if (!res) {
                return { success: false, code: 404, message: "Not found" }
            }
            let status = await sendMail(args.email,"Xác thực email tài khoản Phòng Mạch Tư","Đường dẫn đổi lại mật khẩu là: https://abc.com/change-password")
            console.log(status);
            return { success: true, code: 200, message: "Successfully"}
        },
        DOI_MAT_KHAU: async (_, args) => {
            let res1 = await TAI_KHOAN.findOne({ _id: args._id, is_deleted: false })
            if (!res1) {
                return { success: false, code: 404, message: "Not found" }
            }
            let valid = await bcrypt.compare(args.mat_khau_cu, res1.mat_khau);
            if (!valid) {
                return { success: false, code: 401, message: "Mật khẩu không đúng" }

            }
            const saltRounds = 10;
            let hash = await new Promise((resolve, reject) => {
                bcrypt.hash(args.mat_khau_moi, saltRounds, function (err, hash) {
                    if (err) console.log("ERROR HASH", err);
                    resolve(hash)
                })
            });
            let res2 = await TAI_KHOAN.findOneAndUpdate({ _id: args._id },{mat_khau: hash})
            if (!res2) {
                return { success: false, code: 401, message: res2.message }
            }
            return { success: true, code: 200, message: "Successfully", doc: res2 }
        }
        
    }
}

module.exports = resolvers