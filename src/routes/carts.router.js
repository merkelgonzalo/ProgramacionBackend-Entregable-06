import { Router } from 'express';
import ManagerAccess from '../Dao/managers/ManagerAccess.js';
import { cartModel } from '../Dao/models/carts.model.js';

const router = Router();
const managerAccess = new ManagerAccess();

router.get('/', async (req,res) => {
    try{
        await managerAccess.saveLog('GET all carts');
        const limit = req.query.limit;
        const carts = await cartModel.find();
        if(!limit){
            res.send({result: "success", payload: carts});
        }else{
            const cartsLimit = carts.filter(cart => cart.id <= limit);
            res.send({result: "success", payload: cartsLimit});
        }
    }catch(error){
        console.log('Cannot get carts with mongoose: '+error)
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
    try{
        await managerAccess.saveLog('POST a cart');
        let result = await cartModel.create({});
        res.send({
            status: 'success',
            payload: result
        }); 
    }catch(error){
        console.log('Cannot post the cart with mongoose: '+error)
    }

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