const { connect } = require('mongoose')

exports.connectDB = async() => {
    console.log('base conectada')
    await connect ('mongodb://127.0.0.1:27017/ecommerce')
}