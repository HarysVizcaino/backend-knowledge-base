"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonTopicRepository = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const DATA_FILE = path_1.default.join(__dirname, '../../data/topics.json');
class JsonTopicRepository {
    async readData() {
        try {
            const data = await promises_1.default.readFile(DATA_FILE, 'utf-8');
            return JSON.parse(data);
        }
        catch {
            return [];
        }
    }
    async writeData(topics) {
        await promises_1.default.writeFile(DATA_FILE, JSON.stringify(topics, null, 2), 'utf-8');
    }
    async getAll() {
        return await this.readData();
    }
    async getById(id) {
        const topics = await this.readData();
        return topics.find(t => t.id === id) || null;
    }
    async getByParentId(parentId) {
        const topics = await this.readData();
        return topics.filter(t => t.parentTopicId === parentId);
    }
    async getVersionsByName(name) {
        const topics = await this.readData();
        return topics.filter(t => t.name === name);
    }
    async save(topic) {
        const topics = await this.readData();
        topics.push(topic);
        await this.writeData(topics);
    }
}
exports.JsonTopicRepository = JsonTopicRepository;
