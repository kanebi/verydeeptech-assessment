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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Load environment variables
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const clientOptions = {
        serverApi: { version: "1", strict: true, deprecationErrors: true },
    };
    const DB_URI = process.env.NODE_ENV === "development"
        ? process.env.MONGODB_URI_DEV
        : process.env.MONGODB_URI_PROD;
    try {
        const conn = yield mongoose_1.default.connect(DB_URI, clientOptions);
        yield mongoose_1.default.connection.db.admin().command({ ping: 1 });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        yield mongoose_1.default.disconnect();
        process.exit(1);
    }
});
exports.default = connectDB;
//# sourceMappingURL=db.js.map