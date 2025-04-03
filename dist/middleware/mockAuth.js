"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockAuth = void 0;
// You can change this mock user to test different roles
const mockUser = {
    id: 'u1',
    name: 'Alice',
    email: 'alice@example.com',
    role: 'Viewer' // Change to 'Viewer' or 'Admin' to test
};
const mockAuth = (_req, _res, next) => {
    _req.user = mockUser;
    next();
};
exports.mockAuth = mockAuth;
