import { UserRole } from "../../models/User";


export function RequireRole(...allowedRoles: UserRole[]) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
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