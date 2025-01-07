"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderHTML = exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const winston_1 = __importDefault(require("winston"));
const sendMail = (from, to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: config_1.default.MAIL_HOST,
        port: 485,
        secure: true,
        auth: {
            user: config_1.default.MAIL_USERNAME,
            pass: config_1.default.MAIL_PASSWORD
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: html
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            winston_1.default.error(error);
        if (info)
            winston_1.default.info("Mail sent: " + info.response);
    });
});
exports.sendMail = sendMail;
const generateOrderHTML = (order) => {
    const { customer, products, createdAt } = order;
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
                        <td style="text-align:right">${line.product.price * line.quantity},00 DKK</td>
                    </tr>`;
    });
    html += `<tr className="table-light">
                    <td colSpan={3}>Total</td>
                    <td className="text-end">{total},00 DKK</td>
                </tr>
            </tbody>
        </table>`;
    html += '</HTML>';
    return html;
};
exports.generateOrderHTML = generateOrderHTML;
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
