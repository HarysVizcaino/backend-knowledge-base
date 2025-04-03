"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireRole = RequireRole;
function RequireRole(...allowedRoles) {
    return function (_target, _propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const req = args[0];
            const role = req.user?.role;
            if (!role || !allowedRoles.includes(role)) {
                const res = args[1];
                return res.status(403).json({ error: 'Forbidden: insufficient role' });
            }
            return originalMethod.apply(this, args);
        };
    };
}
