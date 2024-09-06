const { productModel } = require("../../models/products.model.js")

class ProductManagerMongo {
    constructor(){
        this.model = productModel
    }
    // solo para la vista en tiempo real
    getProductsRealTime   = async () => await this.model.find().lean()

    getProducts = async ({limit, page, sortField, sortOrder}) => {
        try {
            // Opciones de paginacion
            const options = {
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
                lean: true,
                sort: sortField ? {[sortField] : sortOrder} : {}
            };
            const result = await this.model.paginate({}, options);
            return result;
        } catch (error) {
            throw new Error('Error al obtener productos: ' + error.message);    
        }
    }
    // buscar producto por id
    getProductById = async id => await this.model.findById(id).lean()

    // Creo producto en tiempo real completando form y boton 
    createProduct = async newProduct => await this.model.create(newProduct)

    // Borramos el producto, por id con boton 
    deleteProduct = async productId => {
        const result = await this.model.findByIdAndDelete(productId);
        if (!result) {
            throw new Error('Producto no encontrado');
        }
    }
}
//instancio la clase ProductManagerMongo
const productManagerMongo = new ProductManagerMongo()

module.exports = {
    ProductManagerMongo,
    productManagerMongo
}