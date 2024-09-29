import nodeMailer from "nodemailer";
import React from "react";
import dotenv from "dotenv";
import {formatMoney} from "../utils/formating-money.js";
import {numberToText} from "../utils/numberToText.js";
import {getCurrentDate} from "../utils/createDataNow.js";
import InvoiceModel from "../models/invoice-model.js";


dotenv.config();


class MailService {
    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: 'smtp.beget.com',
            port: 2525,
            secure: false,
            auth: {
                user: "info@yooking.ru",
                pass: "vw4Yn&Zu",
            },
        });
    }

    async SendingCheckForPayment(to, accounts, req, item, accountNumber) {
        console.log("user", to + " " + accounts.name + " " + req.director + " " + item.partnerAmount + " " + accountNumber);
        const requisites = JSON.parse(req.requisites)
        console.log("req", req)
        console.log("requisites", requisites)
        const number = accountNumber.generateAccountNumber()
        const invoiceData = {
            bank: JSON.stringify({
                name: requisites?.bank,
                bik: "044525225",
                inn: "7707083893",
                kpp: "773601001",
                amount: requisites.amount,
                amountCorr: "30101810400000000225"
            })
            ,
            provider: JSON.stringify({
                name: "ООО ЮКИНГ",
                bik: "044030653",
                inn: 7807258459,
                kpp: 780701001,
                amount: 40702810055000088901,
                amountCorr: 30101810500000000653,
                address: "198330, г. Санкт-Петербург, вн.тер.г. муниципальный округ Юго-запад, ш. Петергофское, д.3, к.3, литера А, пом. 7Н офис 17"
            })
            ,
            customer: JSON.stringify({
                name: requisites?.name,
                bik: requisites?.bik,
                inn: requisites?.inn,
                kpp: requisites?.kpp,
                amount: requisites?.amount,
                amountCorr: requisites.amountCorr,
                address: requisites?.address
            })
            ,
            hotelId: item.idObject,
            nameObject: item.name,
            invoiceNumber: number,
            date: getCurrentDate(),
            buyer: requisites.name,
            seller: "ООО ЮКИНГ.РУ",
            services: JSON.stringify([{id: 1, name: "Комиссия за использование сервиса", amount: item.partnerAmount}]),
            totalAmount: item.partnerAmount,
            totalAmountWords: numberToText(item.partnerAmount),
            accountName: JSON.stringify(accounts),
            supervisor: "Абдулджалилов Эхтирам Джалил оглы"
        }

        await InvoiceModel.create(invoiceData)

        return await this.transporter.sendMail({
            from: "info@yooking.ru",
            to,
            subject: "Чек на оплату",
            html: `
            <div style="font-family: 'Arial', sans-serif; background: #f2f2ec; padding: 20px; max-width: 600px; margin: auto;">
                <table style="width: 100%;">
                    <tr>
                        <td colspan="2">
                            <img src="" style="float: right; width: 120px;" />
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 10px;">СЕВЕРО-ЗАПАДНЫЙ БАНК ПАО СБЕРБАНК</td>
                        <td style="text-align: right; font-size: 10px;">БИК 044030653</td>
                    </tr>
                    <tr>
                        <td style="font-size: 10px;">ИНН 7707083893</td>
                        <td style="text-align: right; font-size: 10px;">КПП 773601001</td>
                    </tr>
                    <tr>
                        <td colspan="2"><hr></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="font-size: 12px; font-weight: bold;">Покупатель: ${requisites.name}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="font-size: 12px;">ИНН ${requisites.inn}, КПП ${requisites.kpp}, ${requisites.address}</td>
                    </tr>
                         <tr>
                        <td colspan="2" style="font-size: 12px; font-weight: bold;">Поставщик: ООО ЮКИНГ"</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="font-size: 12px;">ИНН 7807258459, КПП 780701001,  198330, г. Санкт-Петербург, вн.тер.г. муниципальный округ Юго-запад, ш. Петергофское, д.3, к.3, литера А, пом. 7Н офис 17</td>
                    </tr>
                    <tr>
                        <td colspan="2"><hr></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="font-size: 16px; font-weight: bold;">Счет на оплату №${number} от ${getCurrentDate()}</td>
                    </tr>
                       <tr>
                        <td colspan="2" style="font-size: 14px;">Наименование объекта: <span style="font-size: 14px; font-weight: bold;">${item.name}</span></td>
                        </tr>
                    <tr>
                      <td colspan="2" style="text-align: left; font-size: 14px; ">Сумма к оплате: ${formatMoney(item.partnerAmount)}  ₽ (${numberToText(item.partnerAmount)})</td>
                    </tr>
                    <tr>
                        <td colspan="2"><hr></td>
                    </tr>
                    
                    <tr>
                        <td colspan="2" style="font-size: 12px;">Наименование услуги: Комиссия за использование сервиса</td>
                    </tr>
                    <tr>
                        <td colspan="2"><hr></td>
                    </tr>
                    <tr>
                        <td style="font-size: 12px;">Бухгалтер __________(${accounts.name})</td>
                        <td style="text-align: right; font-size: 12px;">Главный директор __________(Абдулджалилов Эхтирам Джалил оглы)</td>
                    </tr>
                    <tr>
                        <td><img src={accounts.sealImage} style="width: 100px;" /></td>
                        <td style="text-align: right;"><img src={accounts.signatureImage} style="width: 120px;" /></td>
                    </tr>
                </table>
            </div>
         `,
            //     attachments: [
            //         {
            //             filename: 'signature.png',
            //             path: signature,
            //             cid: 'signature' // same cid value as in the html img src
            //         },
            //         {
            //             filename: 'stamp.png',
            //             path: seal,
            //             cid: 'stamp' // same cid value as in the html img src
            //         }
            //     ]
        });
    }
}

// Экземпляр класса MailService


// Планируем задачу с использованием node-cron


export default new MailService();
