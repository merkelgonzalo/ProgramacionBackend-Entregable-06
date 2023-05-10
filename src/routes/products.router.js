import { Router } from 'express';
//import ProductManager from '../ProductManager.js';
import { productModel } from '../models/products.model.js';

const router = Router();
//const productManager = new ProductManager("/src/products.json");

router.get('/', async (req,res) => {
    try{
        const limit = req.query.limit;
        const products = await productModel.find();
        if(!limit){
            res.send({result: "success", payload: products});
        }else{
            const productsLimit = products.filter(product => product.id <= limit);
            res.send({result: "success", payload: productsLimit});
        }
    }catch(error){
        console.log('Cannot get products with mongoose: '+error)
    }
});

router.get('/:pid', async (req,res)=>{
    try{
        const idProduct = req.params.pid;
        const result = await productModel.find({_id:idProduct});
        
        res.send({
            status: 'success',
            payload: result
        });
    }catch(error){
        console.log('Cannot get the product with mongoose: '+error);
        return res.send({status:"error", error: "ID not found"});
    }
        
});

router.post('/', async (req,res) => {
    try{
        let {title, description, price, thumnail, code, stock, category} = req.body;
    
        if(!title || !price || !code || !category){
            return res.send({status:"error", error: "Incomplete values"});
        }else{
            let result = await productModel.create({
                title,
                description,
                price,
                thumnail,
                code,
                stock,
                category,
                status: true
            });
        
            res.send({
                status: 'success',
                payload: result
            });
        } 
    }catch(error){
        console.log('Cannot post the product with mongoose: '+error)
    }
});

router.put('/:pid', async (req,res) => {
    try{
        const product = req.body;
        const idProduct = req.params.pid;
        
        if(!product.title || !product.price || !product.code || !product.category){
            return res.send({status:"error", error: "Incomplete values"});
        }else{
            let result = await productModel.updateOne({_id:idProduct}, {$set:product});
            res.send({status: 'success', payload: result})
        }
    }catch(error){
    console.log('Cannot get the product with mongoose: '+error);
    return res.send({status:"error", error: "ID not found"});
    }
});

router.delete('/:pid', async (req,res) => {
    try{
        const idProduct = req.params.pid;
        let result = await productModel.deleteOne({_id:idProduct})
        res.send({status: 'success', payload: result})
    }catch(error){
        console.log('Cannot delete the product with mongoose: '+error);
        return res.send({status:"error", error: "ID not found"});
    }
});

export default router;