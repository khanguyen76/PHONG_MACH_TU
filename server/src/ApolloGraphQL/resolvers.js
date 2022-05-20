const BENH_NHAN = require('../models/BENH_NHAN');
const PHIEU_KHAM = require('../models/PHIEU_KHAM');
const LOAI_BENH = require('../models/LOAI_BENH');
const THUOC = require('../models/THUOC');
const TAI_KHOAN = require('../models/TAI_KHOAN');
const { sendMail } = require('../ultils/mailer');
const { createToken, verifyToken } = require('../ultils/jwt');
const { encode, compare } = require('../ultils/bcrypt');
const disableVerify = true
const resolvers = {
    // QUERY
    Query: {
        DS_BENH_NHAN: async (_,{page,size},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let count = await BENH_NHAN.count({ is_deleted: false })
                let doc = await BENH_NHAN.find({ is_deleted: false },{},{skip:(page-1)*size,limit:size})
                return { success: true, code: 200, message: "Successful", total: count, pages: size ? Math.ceil(count/size):null, doc }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        BENH_NHAN: async (_,{_id},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res = await BENH_NHAN.findOne({ _id, is_deleted: false })
                if (!res) {
                    throw new PersistedQueryNotFoundError("Query not found")
                }
                return { success: true, code: 200, message: "Successful", doc: res }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        DS_PHIEU_KHAM: async (_,{page,size},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let count = await PHIEU_KHAM.count({ is_deleted: false })
                let doc = await PHIEU_KHAM.find({ is_deleted: false },{},{skip:(page-1)*size,limit:size})
                return { success: true, code: 200, message: "Successful", total: count, pages: size ? Math.ceil(count/size):null, doc }
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
                    throw new PersistedQueryNotFoundError("Query not found")
                }
                return { success: true, code: 200, message: "Successful", doc: res }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },

        DS_LOAI_BENH: async (_,{page,size},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let count = await LOAI_BENH.count({ is_deleted: false })
                let doc = await LOAI_BENH.find({ is_deleted: false },{},{skip:(page-1)*size,limit:size})
                return { success: true, code: 200, message: "Successful", total: count, pages: size ? Math.ceil(count/size):null, doc }
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
                    throw new PersistedQueryNotFoundError("Query not found")
                }
                return { success: true, code: 200, message: "Successful", doc: res }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
        DS_THUOC: async (_,{page,size},headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let count = await THUOC.count({ is_deleted: false })
                let doc = await THUOC.find({ is_deleted: false },{},{skip:(page-1)*size,limit:size})
                return { success: true, code: 200, message: "Successful", total: count, pages: size ? Math.ceil(count/size):null, doc }
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
                    throw new PersistedQueryNotFoundError("Query not found")
                }
                return { success: true, code: 200, message: "Successful", doc: res }
            }
            else {
                throw new AuthenticationError("Access is denied")
            }
        },
    },
    PHIEU_KHAM: {
        benh_nhan: (_) => BENH_NHAN.findOne({ _id: _.ma_benh_nhan }),
        loai_benh: (_) => LOAI_BENH.findOne({ _id: _.ma_loai_benh })
    },
    PHIEU_KHAM: {
        benh_nhan: (_) => BENH_NHAN.findOne({ _id: _.ma_benh_nhan }),
        loai_benh: (_) => LOAI_BENH.findOne({ _id: _.ma_loai_benh })
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
        SUA_BENH_NHAN: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res1 = await BENH_NHAN.findOne({ _id: args._id, is_deleted: false })
                if (!res1) {
                    throw new PersistedQueryNotFoundError("Query not found")
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
                    throw new PersistedQueryNotFoundError("Query not found")
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
        SUA_LOAI_BENH: async (_, args,headers) => {
            let isValid = disableVerify || await verifyToken(headers['access-token'])
            if (isValid) {
                let res1 = await LOAI_BENH.findOne({ _id: args._id, is_deleted: false })
                if (!res1) {
                    throw new PersistedQueryNotFoundError("Query not found")
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
                    throw new PersistedQueryNotFoundError("Query not found")
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
        SUA_TAI_KHOAN: async (_, args) => {
            let res = await TAI_KHOAN.findOne({ _id: args._id, is_deleted: false })
            if (!res) {
                throw new PersistedQueryNotFoundError("Query not found")
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
                throw new PersistedQueryNotFoundError("Query not found")
            }
        },
        KHOI_PHUC_TAI_KHOAN: async (_, args) => {
            let res = await TAI_KHOAN.findOne({ _id: args._id }, { is_deleted: true })
            if (res) {
                await TAI_KHOAN.findOneAndUpdate({ _id: args._id }, { is_deleted: false }, { new: true })
                return { success: true, code: 200, message: "Successfully" }
            }
            else {
                throw new PersistedQueryNotFoundError("Query not found")
            }
        },
        DANG_NHAP: async (_, args) => {
            let doc = await TAI_KHOAN.findOne({ email: args.email, is_deleted: false })
            if (!doc) {
                throw new UserInputError("Địa chỉ email hoặc mật khẩu không đúng")
            }
            let valid = await compare(args.mat_khau, doc.mat_khau);
            if (!valid) {
                throw new UserInputError("Địa chỉ email hoặc mật khẩu không đúng")
            }
            let accessToken = createToken({ payload: args, settings: { expiresIn: '1h' } })
            return { accessToken, doc }
        },
        QUEN_MAT_KHAU: async (_, args) => {
            let res = await TAI_KHOAN.findOne({ email: args.email, is_deleted: false })
            if (!res) {
                throw new PersistedQueryNotFoundError("Query not found")
            }
            await sendMail(args.email, "Xác thực email tài khoản Phòng Mạch Tư", "Đường dẫn đổi lại mật khẩu là: https://abc.com/change-password")
            return { success: true, code: 200, message: "Successfully" }
        },
        DOI_MAT_KHAU: async (_, args) => {
            let res = await TAI_KHOAN.findOne({ _id: args._id, is_deleted: false })
            if (!res) {
                throw new PersistedQueryNotFoundError("Query not found")
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