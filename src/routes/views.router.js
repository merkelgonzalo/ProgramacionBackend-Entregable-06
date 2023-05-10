import {Router} from 'express';
import ProductManager from '../ProductManager.js';

const router = Router();

const productManager = new ProductManager("/src/products.json");

router.get('/', async (req, res) => { 
    const products = await productManager.getProducts();
    res.render('home', {products: products});
});

router.get('/realTimeProducts', async (req, res) => { 
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {products: products});
});

export default router;