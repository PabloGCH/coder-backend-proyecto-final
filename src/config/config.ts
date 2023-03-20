import express from 'express';
import session from "express-session";
import MongoStore from "connect-mongo";
import { configurePassport } from './passport/passport.config';
import { infoLogger } from "../services/logger.service";
import path from "path";
import cookieParser from "cookie-parser";
import { args } from './minimist/minimist.config';
import os from "os";

export class Config {
    public static readonly PORT: number = args.p;
    public static readonly MONGODB_URL: string = process.env.MONGODB_URL || "";
    public static readonly DATABASE_NAME: string = args.d;
    public static readonly RUN_MODE: string = args.m;
    public static readonly NUMBER_OF_CORES: number = os.cpus().length;
    public static configServer(app: express.Application) {
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(express.static(path.join(__dirname, '../public')));
        app.use((req :any, res :any, next :any) => {infoLogger.info({message: "Request",url: req.url,method: req.method}); next();});
        app.use(cookieParser());
        app.use(session({
            store: MongoStore.create({mongoUrl: process.env.DB_MONGO_URL}),
            secret: "dfvartg4wfqR3EFRQ3",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 10 // 1 segundo * 60 * 10 = 10 minutos
            }
        }))
        configurePassport(app);
    };
    private constructor() {

    }
}
