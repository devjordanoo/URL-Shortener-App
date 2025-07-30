import { resolve } from "../utils/di/container";

export const Inject = (tokens: Record<string, string>): ClassDecorator => {
  return function (target: Function) {
    function newConstructor(this: any, ...args: any[]) {
      // Cria a instância corretamente usando Reflect.construct
      const instance = Reflect.construct(target, args);
      for (const [propertyKey, token] of Object.entries(tokens)) {
        instance[propertyKey] = resolve(token);
      }
      return instance;
    }
    newConstructor.prototype = target.prototype;
    return newConstructor as any;
  };
};
