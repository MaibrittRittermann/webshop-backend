import express, { Request } from 'express';
import Order, { validateOrder } from '../models/order'; 
import validateObjectId from '../middleware/validateObjectId';
import { sendMail, generateOrderHTML } from '../services/mailer';
import config from '../config';

const router = express.Router();

// Opret en ny ordre
router.post('/', async (req, res: any) => {

    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const order = new Order(req.body);
    try {
        await order.save();
        const mail = generateOrderHTML(req.body);
        sendMail(config.MAIL_USERNAME, req.body.email, `Tak for din ordre ${req.body.name}`, mail);

        res.status(201).send(order);
    } catch (err : any) {
        res.status(500).send(err.message);
    }
});

// Hent alle ordrer
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Hent en specifik ordre
router.get('/:id', [validateObjectId], async (req: Request, res: any) => {

    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).send('Order not found.');
        res.send(order);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Opdater en ordre
router.put('/:id', [validateObjectId], async (req: Request, res: any) => {

    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {

        const order = await Order.findByIdAndUpdate(req.params.id, {...req.body, updatedAt: new Date()}, { new: true, runValidators: true });
        if (!order) return res.status(404).send('Order not found.');
        res.send(order);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Slet en ordre
router.delete('/:id', [validateObjectId], async (req: Request, res: any) => {

    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).send('Order not found.');
        res.send(order);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

export default router;