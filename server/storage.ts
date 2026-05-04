import { type User, type InsertUser, type Admin, type InsertAdmin, type Customer, type InsertCustomer, type Provider, type InsertProvider } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Admin methods
  getAdmin(id: string): Promise<Admin | undefined>;
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  
  // Customer methods
  getAllCustomers(): Promise<Customer[]>;
  getCustomersByStatus(status: string): Promise<Customer[]>;
  getCustomer(id: string): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomerStatus(id: string, status: string, reason?: string): Promise<Customer>;
  
  // Provider methods
  getAllProviders(): Promise<Provider[]>;
  getProvidersByStatus(status: string): Promise<Provider[]>;
  getProvider(id: string): Promise<Provider | undefined>;
  createProvider(provider: InsertProvider): Promise<Provider>;
  updateProviderStatus(id: string, status: string, reason?: string): Promise<Provider>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private admins: Map<string, Admin>;
  private customers: Map<string, Customer>;
  private providers: Map<string, Provider>;

  constructor() {
    this.users = new Map();
    this.admins = new Map();
    this.customers = new Map();
    this.providers = new Map();
    // Initialize admin synchronously to ensure it's ready for production start
    const adminId = randomUUID();
    const admin = {
      id: adminId,
      username: "mangat.kuttys",
      password: "Mangatram@1979",
      role: "admin" as const,
      createdAt: new Date(),
    };
    this.admins.set(adminId, admin);
    this.addTestData();
  }

  private addTestData() {
    // Add test customers
    const testCustomers = [
      { name: "Priya Sharma", email: "priya.sharma@gmail.com", phone: "9876543210" },
      { name: "Rajesh Kumar", email: "rajesh.kumar@gmail.com", phone: "9765432109" },
      { name: "Sunita Patel", email: "sunita.patel@gmail.com", phone: "9654321098" },
    ];

    testCustomers.forEach(customer => {
      const customerId = randomUUID();
      this.customers.set(customerId, {
        id: customerId,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        status: "pending",
        createdAt: new Date(),
      });
    });

    // Add test providers
    const testProviders = [
      { name: "Plumbing Expert Co.", email: "plumber@company.com", phone: "9111111111", category: "plumbing" },
      { name: "Deep Clean Services", email: "cleaning@company.com", phone: "9222222222", category: "cleaning" },
      { name: "AC Repair Pro", email: "acrepair@company.com", phone: "9333333333", category: "repair" },
      { name: "Beauty Salon Plus", email: "salon@company.com", phone: "9444444444", category: "beauty" },
    ];

    testProviders.forEach(provider => {
      const providerId = randomUUID();
      this.providers.set(providerId, {
        id: providerId,
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        category: provider.category,
        status: "pending",
        createdAt: new Date(),
      });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Admin methods
  async getAdmin(id: string): Promise<Admin | undefined> {
    return this.admins.get(id);
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(
      (admin) => admin.username === username,
    );
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = randomUUID();
    const admin: Admin = { 
      ...insertAdmin, 
      id,
      createdAt: new Date(),
    };
    this.admins.set(id, admin);
    return admin;
  }

  // Customer methods
  async getAllCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }

  async getCustomersByStatus(status: string): Promise<Customer[]> {
    return Array.from(this.customers.values()).filter(c => c.status === status);
  }

  async getCustomer(id: string): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = randomUUID();
    const customer = {
      ...insertCustomer,
      id,
      status: "pending" as const,
      reason: undefined as any,
      createdAt: new Date(),
    };
    this.customers.set(id, customer);
    return customer;
  }

  async updateCustomerStatus(id: string, status: string, reason?: string): Promise<Customer> {
    const customer = this.customers.get(id);
    if (!customer) throw new Error("Customer not found");
    
    const updated = { ...customer, status, reason: reason || null };
    this.customers.set(id, updated);
    return updated;
  }

  // Provider methods
  async getAllProviders(): Promise<Provider[]> {
    return Array.from(this.providers.values());
  }

  async getProvidersByStatus(status: string): Promise<Provider[]> {
    return Array.from(this.providers.values()).filter(p => p.status === status);
  }

  async getProvider(id: string): Promise<Provider | undefined> {
    return this.providers.get(id);
  }

  async createProvider(insertProvider: InsertProvider): Promise<Provider> {
    const id = randomUUID();
    const provider = {
      ...insertProvider,
      id,
      status: "pending" as const,
      reason: undefined as any,
      createdAt: new Date(),
    };
    this.providers.set(id, provider);
    return provider;
  }

  async updateProviderStatus(id: string, status: string, reason?: string): Promise<Provider> {
    const provider = this.providers.get(id);
    if (!provider) throw new Error("Provider not found");
    
    const updated = { ...provider, status, reason: reason || null };
    this.providers.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
