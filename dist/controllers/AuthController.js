"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const authService = new AuthService_1.AuthService();
class AuthController {
    constructor() {
        this.login = async (req, res, next) => {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }
            try {
                const token = await authService.login(email, password);
                return res.json({ token });
            }
            catch (error) {
                return res.status(401).json({ error: error.message });
            }
        };
        this.register = async (req, res) => {
            const { name, email, password, role } = req.body;
            if (!name || !email || !password || !role) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            try {
                const token = await authService.register(name, email, password, role);
                return res.status(201).json({ token });
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        };
    }
}
exports.AuthController = AuthController;
