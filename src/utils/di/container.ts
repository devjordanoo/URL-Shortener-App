const container = new Map<string, any>();

export function register<T>(token: string, instance: T) {
  container.set(token, instance);
}

export function resolve<T>(token: string): T {
  const instance = container.get(token);
  if (!instance) {
    throw new Error(`Dependency "${token}" not found`);
  }
  return instance;
}
