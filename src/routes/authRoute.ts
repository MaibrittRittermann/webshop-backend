import { Router, Request, Response } from "express";
import Auth,{ validateAuth } from "../models/auth";
import validateObjectId from "./../middleware/validateObjectId";
import auth from "../middleware/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

const router = Router();

router.get('/', auth, async (req, res) => {
    res.json(await Auth.find());
});

router.get('/:id', [auth, validateObjectId], async (req: Request, res: Response) => {
    res.json(await Auth.findById(req.params.id));
});

router.post('/register', async (req: Request, res: any) => {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.message);

    const exist = await Auth.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
    if (exist) return res.status(400).send("En bruger med de angivne oplysninger er allerede oprettet.");

    const newUser = new Auth(req.body);

    try {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash){
                newUser.password = hash;

                const token = jwt.sign(
                    {_id: newUser._id, access: newUser.access},
                    config.JWTPKWEBSHOP
                )

                newUser.save().then(() => {
                    res
                        .status(201)
                        .header("access-control-expose-headers", "x-auth-token")
                        .header("x-auth-token", token)
                        .send(`Bruger ${newUser.username} med email ${newUser.email} er oprettet`);
                });
            });
        });
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

router.delete('/:id', [auth, validateObjectId], async(req: any, res : any) => {
    try {
        const user = await Auth.findByIdAndDelete(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('Brugeren fandtes ikke.');
        }
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

export default router;