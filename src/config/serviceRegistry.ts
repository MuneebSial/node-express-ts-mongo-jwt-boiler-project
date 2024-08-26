class ServiceRegistry {
  private services = new Map();

  register<T>(name: string, service: T) {
    this.services.set(name, service);
  }

  get<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found`);
    }
    return service;
  }
}

const serviceRegistry = new ServiceRegistry();
export { serviceRegistry };
