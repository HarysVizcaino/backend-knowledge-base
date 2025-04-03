"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const router = (0, express_1.Router)();
const controller = new AuthController_1.AuthController();
router.post('/login', (req, res, next) => {
    controller.login(req, res, next);
});
router.post('/register', (req, res) => {
    controller.register(req, res);
});
exports.default = router;
