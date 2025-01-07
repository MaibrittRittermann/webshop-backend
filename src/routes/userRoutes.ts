import { Router, Request, Response } from "express";
import User,{ validateUser } from "../models/user";
import validateObjectId from "./../middleware/validateObjectId";
import auth from "./../middleware/auth";

const router = Router();

router.get('/', async (req, res) => {
    res.json(await User.find());
});

router.get('/:id', validateObjectId, async (req: Request, res: Response) => {
    res.json(await User.findById(req.params.id));
});

router.post('/', async (req: Request, res: any) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    const exist = await User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] });
    if (exist) return res.status(400).send("En brugeren med de angivne oplysninger er allerede oprettet.");

    const newUser = new User(req.body);

    try {
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

router.put('/:id', [auth, validateObjectId], async (req : any, res : any) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('Brugeren fandtes ikke.');
        }
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

router.delete('/:id', [auth, validateObjectId], async(req: any, res : any) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('Brugeren fandtes ikke.');
        }
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})


module.exports = router;