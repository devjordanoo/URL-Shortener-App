import { resolve } from "../utils/di/container";

export const Inject = (token: string): PropertyDecorator => {
  return (target: any, propertyKey: string | symbol) => {
    if (!target.__injections) target.__injections = [];
    target.__injections.push({ propertyKey, token });
  };
};

// Novo utilitário para injetar dependências
export function injectDependencies(instance: any) {
  const injections = instance.__proto__.__injections || [];
  for (const { propertyKey, token } of injections) {

    if (!instance[propertyKey]) {
      instance[propertyKey] = resolve(token);
    }
  }
}
