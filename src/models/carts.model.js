const { Schema, model } = require('mongoose')

const collectionName = 'carts'

const cartSchema = new Schema({
    products: [
        {   product: { type: Schema.Types.ObjectId, ref: 'products', required: true},//producto y cant
            quantity: { type: Number, required: true}
        }
    ]
})

const cartModel = model(collectionName, cartSchema)

module.exports = {
    cartModel
}