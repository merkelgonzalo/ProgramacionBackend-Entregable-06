import { Router } from 'express';
import CartManager from '../CartManager.js';

const router = Router();
const cartManager = new CartManager("/src/carts.json");


router.get('/', async (req,res) => {
    const limit = req.query.limit;
    const carts = await cartManager.getCarts();
    if(!limit){
        res.send(carts);
    }else{
        const cartsLimit = carts.filter(cart => cart.id <= limit);
        res.send(cartsLimit);
    }
});

router.get('/:cid', async (req,res)=>{
    const idCart = req.params.cid;
    const cart = await cartManager.getCartById(idCart);

    if(cart != -1){
        res.send({
            status: 'Success',
            cart
        });
    }else{
        res.send({
            status: 'Error: ID not found'
        });
    }
});

router.post('/', async (req,res) => {
    await cartManager.addCart();
    res.send({
        status: 'Success'
    })
});

router.post('/:cid/product/:pid', async (req,res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const quantity = req.body.quantity;

    const cart = await cartManager.addProduct(idCart, idProduct, quantity);

    if(cart != -1){
        res.send({
            status: 'Success',
            cart
        });
    }else{
        res.send({
            status: 'Error: ID not found'
        });
    }
});


export default router;