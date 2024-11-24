import { Router } from 'express';
import Product, {validateProduct } from '../models/product';
import validateObjectId from '../middleware/validateObjectId';

const router = Router();

router.get('/', async (req, res) => {
    res.json(await Product.find());
});

router.get('/:id', validateObjectId, async (req, res: any) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Produktet blev ikke fundet");
    
    res.json(product);
});

router.get('/sku/:id', async (req, res: any) => {
    const product = await Product.findOne({sku: req.params.id});
    if (!product) return res.status(404).send("Produktet blev ikke fundet");
    
    res.json(product);
});

router.post('/', async (req, res: any) => {
    const {error} = validateProduct(req.body);
    if(error) return res.status(400).send(error.message);

    const newProduct = new Product(req.body);

    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    }catch (err: any){
        res.status(500).send(err.message);
    }
});

router.put('/:id', async (req, res: any) => {
    const {error} = validateProduct(req.body);
    if(error) return res.status(400).send(error.message);

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.status(204).json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

export default router;