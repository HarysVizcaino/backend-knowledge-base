"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
class Topic {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.content = props.content;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.version = props.version;
        this.parentTopicId = props.parentTopicId;
    }
    updateContent(newContent) {
        return new Topic({
            ...this,
            id: crypto.randomUUID(),
            content: newContent,
            version: this.version + 1,
            updatedAt: new Date(),
            createdAt: new Date(),
        });
    }
}
exports.Topic = Topic;
