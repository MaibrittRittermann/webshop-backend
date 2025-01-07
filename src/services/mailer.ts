import nodemailer from 'nodemailer';
import config from '../config';
import winston from "winston";
import { IProduct } from '../models/product';

interface IOrderBody {
    customer: {
        name:string,
        address: string,
        zip: number,
        city: string,
        email: string
    };
    products: {
        product: {
            _id: string,
            sku: string,
            name: string,
            image: string,
            price: number,
            },
        quantity: number
    }[];
    createdAt: Date;
}

export const sendMail = async (from: string, to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: config.MAIL_HOST,
        port: 485,
        secure: true,
        auth: {
            user: config.MAIL_USERNAME,
            pass: config.MAIL_PASSWORD
        },
        tls: {
            ciphers:'SSLv3'
        }
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) winston.error(error);
        if(info) winston.info("Mail sent: " + info.response);
    })
}

export const generateOrderHTML = (order : IOrderBody): string => {

    const {customer, products, createdAt} = order;

    let html = '<HTML>';

    html += `<div>Tak for din ordre den ${new Date(createdAt).toLocaleDateString()}</div>
        <div style="margin: 15px 0;">
            ${customer.name}<br/>
            ${customer.address}<br/>
            ${customer.zip} ${customer.city}<br/>
        </div>

        <table style="border-collapse: collapse;">
            <thead>
                <tr style="background-color: black; color: white">
                    <th>Vare</th>
                    <th>Antal</th>
                    <th style="text-align:center">Pris</th>
                    <th style="text-align:center">Total</th>
                </tr>
            </thead>
            <tbody>`;

        products.map(line => {
            html += `<tr key={line.product.sku}>
                        <td>
                            ${line.product.name}
                        </td>
                        <td>${line.quantity}</td>
                        <td style="text-align:right">${line.product.price},00 DKK</td>
                        <td style="text-align:right">${line.product.price*line.quantity},00 DKK</td>
                    </tr>`;
        });

        html += `<tr className="table-light">
                    <td colSpan={3}>Total</td>
                    <td className="text-end">{total},00 DKK</td>
                </tr>
            </tbody>
        </table>`;

    html += '</HTML>'

    return html;
}

/*
 customer: {
            name: Joi.string().min(2).max(50).required(),
            address: Joi.string().min(2).max(72).required(),
            zip: Joi.number().required(),
            city: Joi.string().required(),
            phone: Joi.string().required(),
            email: Joi.string().email().required(),
        },
        products: Joi.array().items(Joi.object({product: Joi.object({
            _id: Joi.custom(objectIdValidator, 'Validate ObjectID').required(),
            sku: Joi.string().required(),
            name: Joi.string().required(),
            image: Joi.string(),
            price: Joi.number(),
            }),
            quantity: Joi.number().required()
        })).required(),
        total: Joi.number().required(),
        status: Joi.string(),
*/