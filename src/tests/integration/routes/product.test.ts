import request from "supertest";
import mongoose from "mongoose";
import config from "../../../config";
import Product from "../../../models/product";
import express from 'express';
import {server} from "../../../index";
// let server : express();
// import app from

describe('/api/product', () => {

    beforeEach(async ()=> {
        // server = require("../../../index");
        await mongoose.connect(config.MONGO_URI);
    });
    afterEach(async ()=> { 
        await Product.deleteMany({});
        // await server.close();
        await mongoose.connection.close();
    });

    describe('GET /', () => {
        it('should return all products', async () => {
            try {
                await Product.insertMany([
                    {          
                        category: "aaa",
                        title: "aaa",
                        image: "aaa",
                        description: "aaa",
                        seo: "aaa",
                        price: 1,                 
                    },
                    {          
                        category: "aaa",
                        title: "bbb",
                        image: "bbb",
                        description: "bbb",
                        seo: "bbb",
                        price: 1,  
                    },
                ]);
            } catch (e) {
                console.log(e);
            }

            const res = await request(server).get('/api/product');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });
    });
});
