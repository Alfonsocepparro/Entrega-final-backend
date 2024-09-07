const { Router } = require('express')
const { ProductManagerMongo, productManagerMongo } = require('../../daos/MONGO/productsManager.mongo')

const router = Router()
const productService = new ProductManagerMongo()

// GET
router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 3;
    const pageNum = parseInt(req.query.pageNum) || 1;
    try {
        const products = await productService.getProducts({limit, page: pageNum})
        res.send({status: 'success', payload: products})
    } catch (error) {
        console.log(error)
    }
})

// POST añadir productos(tambien por realTimeProducts)
router.post('/', async (req, res) => {
    try {
        const {body} = req
        const response = await productService.createProduct(body)
        res.send({status: 'success', payload: response})
    } catch (error) {
        console.log(error)
    }
})

// GET por ID
router.get('/:pid', async (req, res)=>{
    const id = req.params.pid
    try {
        //buscar un producto por id
        const fetchedProduct = await productManagerMongo.getProductById(id)
        res.send({status: 'success', payload: fetchedProduct})
    }catch(err){
        res.status(404).send(err.message)
    }
})

// DELETE por pid
router.delete('/:pid', async (req, res)=>{
    const id = req.params.pid
    console.log(id)
    try {
        await productManagerMongo.deleteProduct(id);
        res.status(200).send({ status: 'success', message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).send({ status: 'error', message: err.message });
    }
})

module.exports = router