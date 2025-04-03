"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TopicRoutes_1 = __importDefault(require("./routes/TopicRoutes"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const runAuthMiddleware = (req, res, next) => {
    (0, authMiddleware_1.authMiddleware)(req, res, next);
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', AuthRoutes_1.default);
app.use('/topics', runAuthMiddleware, TopicRoutes_1.default);
exports.default = app;
