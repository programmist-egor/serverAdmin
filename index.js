import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/auth-routes.js";
import managementRoute from "./router/management-route.js";
import { sequelizeExtranet } from "./config/db-connect.js";
import cookieParser from "cookie-parser";
import { errorMiddlewares } from "./middlewares/error-middlewares.js";
import http from "http";
import ApiError from "./exceptions/api-error.js";
import statisticRouter from "./router/statistic-route.js";
import technicalSupportRoute from "./router/technical_support-route.js";
import contractRouter from "./router/contract-route.js";
import accountantRouter from "./router/accountant-route.js";
import settingPageRouter from "./router/setting-page-route.js";
import { Server as SocketIOServer } from "socket.io";

dotenv.config();

const corsOptions = {
    credentials: true,
    origin: [process.env.API_CLIENT, "http://192.168.0.106:8081", "http://localhost:3000"],
};

const app = express();
// Обслуживание статических файлов React
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

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Непредвиденная ошибка' });
});
app.use(errorMiddlewares);

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: [process.env.API_CLIENT, "http://192.168.0.106:8081"],
    },
});

const PORT = process.env.PORT || 5001;

// Обработка соединений Socket.IO
io.on('connection', (socket) => {
    console.log('a user connected', socket.handshake.headers.origin);

    socket.on('message', (message) => {
        console.log('message: ', message.user.name);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
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
