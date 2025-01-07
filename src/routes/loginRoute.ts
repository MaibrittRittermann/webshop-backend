import {Router} from "express";
import Auth from "../models/auth";
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const route = Router();

route.post("/", async(req, res: any) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const admin = await Auth.findOne().or([{email: req.body.username}, {username: req.body.username}]);
    if(!admin) return res.status(400).send("Invalid username and password!");

    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    if(!validPassword)
        return res.status(400).send("Invalid username and password!");

    res.send(admin.generateAuthToken());
});

function validate(body : any) {
    const schema = Joi.object({
        username: Joi.string().min(8).max(255).required(),
        password: Joi.string().min(8).max(255).required()
    });
    return schema.validate(body);
}

export default route;