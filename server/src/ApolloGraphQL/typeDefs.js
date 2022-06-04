const { gql } = require('apollo-server-express')

const typeCommon = require('./types/typeCommon')
const typeBENH_NHAN = require('./types/typeBENH_NHAN')
const typeLOAI_BENH = require('./types/typeLOAI_BENH')
const typeDON_VI = require('./types/typeDON_VI')
const typeCACH_DUNG = require('./types/typeCACH_DUNG')
const typePHIEU_KHAM = require('./types/typePHIEU_KHAM')
const typeTHUOC = require('./types/typeTHUOC')
const typeTAI_KHOAN = require('./types/typeTAI_KHOAN')
const mutations = require('./mutations')
const queries = require('.//queries')

const typeDefs = gql`
    scalar Date
    ${typeCommon}
    ${typeBENH_NHAN}
    ${typeDON_VI}
    ${typeCACH_DUNG}
    ${typePHIEU_KHAM}
    ${typeLOAI_BENH}
    ${typeTHUOC}
    ${typeTAI_KHOAN}
    ${queries}
    ${mutations}
`
module.exports = typeDefs