"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonUserRepository = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const DATA_FILE = path_1.default.join(__dirname, '../../data/users.json');
class JsonUserRepository {
    async getAll() {
        try {
            const data = await promises_1.default.readFile(DATA_FILE, 'utf-8');
            return JSON.parse(data);
        }
        catch {
            return [];
        }
    }
    async findByEmail(email) {
        const users = await this.getAll();
        return users.find(u => u.email === email);
    }
    async save(user) {
        const users = await this.getAll();
        users.push(user);
        await promises_1.default.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
    }
}
exports.JsonUserRepository = JsonUserRepository;
