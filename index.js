import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/auth-routes.js";
import managementRoute from "./router/management-route.js";
import {sequelizeExtranet} from "./config/db-connect.js";
import cookieParser from "cookie-parser";
import {errorMiddlewares} from "./middlewares/error-middlewares.js";
import http from "http";
import ApiError from "./exceptions/api-error.js";
import statisticRouter from "./router/statistic-route.js";
import technicalSupportRoute from "./router/technical_support-route.js";
import contractRouter from "./router/contract-route.js";
import accountantRouter from "./router/accountant-route.js";
import settingPageRouter from "./router/setting-page-route.js";
import {Server as SocketIOServer} from "socket.io";
import * as bodyParser from "express";
import cron from "node-cron";
import MailService from "./service/mail-service.js";
import SettingAccount from "./models/setting-account-model.js";
import Settlement from "./models/settlement-model.js";
import {Op} from "sequelize";
import ObjectService from "./service/object-service.js";
import InvoiceModel from "./models/invoice-model.js";
import UsersExtranet from "./models/users-extranet-model.js";
import UserExtranetService from "./service/user-extranet-service.js";

dotenv.config();

const corsOptions = {
    credentials: true,
    origin: [process.env.API_CLIENT, "http://localhost:3000"]
};

const app = express();
// Обслуживание статических файлов React
app.use(bodyParser.json({limit: '10mb'})); // Увеличьте лимит, если нужно
app.use('/static', express.static('client/public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/', router);
app.use('/management', managementRoute);
app.use('/edit_object', managementRoute);
app.use('/edit_number', managementRoute);
app.use('/statistic', statisticRouter);
app.use('/technical_support', managementRoute);
app.use('/chat_support', managementRoute);
app.use('/contract', contractRouter);
app.use('/accountant', accountantRouter);
app.use('/setting_page', settingPageRouter);

const dateSendMail = {
    date: null
}

export const scheduleMail = (data) => {
    const parseDate = JSON.parse(data.date)
    if(data.countDate === "one") {
        dateSendMail.date = `0 16 ${parseDate[0]} * *`
    }
    if(data.countDate === "two") {
        dateSendMail.date = `0 16 ${parseDate[0]},${parseDate[1]} * *`
    }
    console.log("UPDATE DATE SEND MAIL", dateSendMail.date)
}


const fallbackOption = async () => {
    const accounts = await SettingAccount.findOne({where: {chooseAccount: true}});
    const parseDate = JSON.parse(accounts.dataValues.date)
    if(accounts.dataValues.countDate === "one") {
        dateSendMail.date = `0 16 ${parseDate[0]} * *`
    }
    if(accounts.dataValues.countDate === "two") {
        dateSendMail.date = `0 16 ${parseDate[0]},${parseDate[1]} * *`
    }
    console.log("Fallback Option DATE SEND MAIL", dateSendMail.date)
    return dateSendMail.date
}




const setupCronJob = async () => {
    // Убедитесь, что dateSendMail.date установлен или получите его через fallbackOption
    if (!dateSendMail.date) {
        await fallbackOption(); // Теперь функция обновляет dateSendMail.date
    }

    // Запускаем планировщик с уверенностью, что dateSendMail.date это строка
    cron.schedule(dateSendMail.date, async () => {
        const countInvoice = await InvoiceModel.count();

        class Bank {
            constructor() {
                this.lastAccountNumber = countInvoice;
            }

            generateAccountNumber() {
                this.lastAccountNumber += 1;
                const accountNumber = this.lastAccountNumber.toString().padStart(9, '0');
                return accountNumber;
            }
        }

        const accounts = await SettingAccount.findOne({ where: { chooseAccount: true } });
        const settlement = await Settlement.findAll({
            where: {
                checked: true,
                partnerAmount: { [Op.gt]: 0 }
            }
        });

        settlement.forEach(async (item) => {
            const accountNumber = new Bank();
            const requisites = await ObjectService.getDataUserObject(item.idObject);
            const email = await UserExtranetService.getUserExtranet(requisites.dataValues.userId);
            console.log("email", email);
            await MailService.SendingCheckForPayment(email.dataValues.email, accounts.dataValues, requisites.dataValues, item.dataValues, accountNumber);
        });
    });
};

// Вызовите setupCronJob вместо непосредственного использования cron.schedule
setupCronJob();


// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'});
});
app.use(errorMiddlewares);

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: ["http://admin.yooking.ru", "http://extranet.yooking.ru", "http://yooking.ru", "http://localhost:3000"]
    },
});

const PORT = process.env.PORT || 5001;

io.on('connection', (socket) => {
    console.log('A user connected', socket.handshake.headers.origin);

    // Присоединение к комнате
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
        // socket.to(room).emit('message', {user: 'system', text: `User has joined the room: ${room}`});
    });

    // Обработка сообщений
    socket.on('message', (message) => {
        console.log('message: ', message.user, 'room:', message.user.roomID);
        io.to(message.user.roomID).emit('message', message);
    });

    // Отсоединение от комнаты
    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`User left room: ${room}`);
        // socket.to(room).emit('message', {user: 'system', text: `User has left the room: ${room}`});
    });

    // Обработка отключения
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Запускаем сервер
const start = async () => {
    try {
        await sequelizeExtranet.sync();
        server.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
