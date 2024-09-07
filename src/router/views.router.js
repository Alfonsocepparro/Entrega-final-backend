const { Router } = require('express')
const { productManagerMongo } = require('../daos/MONGO/productsManager.mongo')

const productsRouter = Router()

// Vista paginada de los productos
productsRouter.get('/', async (req, res) =>{
    //limite de 3
    const limit = parseInt(req.query.limit) || 3;
    //comienza en la pagina 1
    const pageNum = parseInt(req.query.pageNum) || 1;
    const sortField = req.query.sortField || 'title'
    //ascendente
    const sortOrder = parseInt(req.query.sortOrder, 10) || 1
    try {
        // pagina previa, siguiente, actual, totales, campo utilizado para ordenar y modo en que se ordena
        const {
            docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page,
            totalPages
        } = await productManagerMongo.getProducts({
                limit,
                page: pageNum,
                sortField,
                sortOrder
            })
        res.render('products', {
            products: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page,
            totalPages,
            sortField,
            sortOrder
        })

    }catch(err){
        console.log(err)
    } 
})
productsRouter.get('/:pid', async (req, res)=>{
    // Muestro un producto especifico
    const id = req.params.pid
    try {
        //busca un producto por id
        const fetchedProduct = await productManagerMongo.getProductById(id)
        res.render('products', {
            product: fetchedProduct
        })
    }catch(err){
        res.send(err.message)
    }
    
})

module.exports = productsRouter

