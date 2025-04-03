"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const JsonUserRepository_1 = require("../repositories/JsonUserRepository");
const JWT_SECRET = process.env.JWT_SECRET ?? 'default-secret';
class AuthService {
    constructor() {
        this.userRepository = new JsonUserRepository_1.JsonUserRepository();
    }
    generateToken(user) {
        return jsonwebtoken_1.default.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }, JWT_SECRET, {
            expiresIn: '1h' // Token expiration time
        });
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            throw new Error('Invalid email or password');
        const isValid = await bcrypt_1.default.compare(password, user.password);
        if (!isValid)
            throw new Error('Invalid email or password');
        return this.generateToken(user);
    }
    async register(name, email, password, role) {
        const existing = await this.userRepository.findByEmail(email);
        if (existing)
            throw new Error('User already exists');
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = {
            id: crypto.randomUUID(),
            name,
            email,
            role,
            password: hashedPassword
        };
        await this.userRepository.save(user);
        return this.generateToken(user);
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
}
exports.AuthService = AuthService;
