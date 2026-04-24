import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin Login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const admin = await storage.getAdminByUsername(username);
      
      if (!admin || admin.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      return res.json({ 
        success: true, 
        admin: { id: admin.id, username: admin.username, role: admin.role } 
      });
    } catch (error) {
      return res.status(500).json({ error: "Login failed" });
    }
  });

  // Get all customers with filters
  app.get("/api/admin/customers", async (req, res) => {
    try {
      const { status } = req.query;
      
      if (status) {
        const customers = await storage.getCustomersByStatus(status as string);
        return res.json(customers);
      }
      
      const customers = await storage.getAllCustomers();
      return res.json(customers);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch customers" });
    }
  });

  // Approve/Reject customer
  app.post("/api/admin/customers/:id/approve", async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await storage.updateCustomerStatus(id, "approved");
      return res.json(updated);
    } catch (error) {
      return res.status(500).json({ error: "Failed to approve customer" });
    }
  });

  app.post("/api/admin/customers/:id/reject", async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const updated = await storage.updateCustomerStatus(id, "rejected", reason);
      return res.json(updated);
    } catch (error) {
      return res.status(500).json({ error: "Failed to reject customer" });
    }
  });

  // Get all providers with filters
  app.get("/api/admin/providers", async (req, res) => {
    try {
      const { status } = req.query;
      
      if (status) {
        const providers = await storage.getProvidersByStatus(status as string);
        return res.json(providers);
      }
      
      const providers = await storage.getAllProviders();
      return res.json(providers);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch providers" });
    }
  });

  // Approve/Reject provider
  app.post("/api/admin/providers/:id/approve", async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await storage.updateProviderStatus(id, "approved");
      return res.json(updated);
    } catch (error) {
      return res.status(500).json({ error: "Failed to approve provider" });
    }
  });

  app.post("/api/admin/providers/:id/reject", async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const updated = await storage.updateProviderStatus(id, "rejected", reason);
      return res.json(updated);
    } catch (error) {
      return res.status(500).json({ error: "Failed to reject provider" });
    }
  });

  // Get admin dashboard stats
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const allCustomers = await storage.getAllCustomers();
      const allProviders = await storage.getAllProviders();
      
      const pendingCustomers = allCustomers.filter(c => c.status === "pending").length;
      const approvedCustomers = allCustomers.filter(c => c.status === "approved").length;
      const rejectedCustomers = allCustomers.filter(c => c.status === "rejected").length;
      
      const pendingProviders = allProviders.filter(p => p.status === "pending").length;
      const approvedProviders = allProviders.filter(p => p.status === "approved").length;
      const rejectedProviders = allProviders.filter(p => p.status === "rejected").length;
      
      return res.json({
        customers: {
          total: allCustomers.length,
          pending: pendingCustomers,
          approved: approvedCustomers,
          rejected: rejectedCustomers,
        },
        providers: {
          total: allProviders.length,
          pending: pendingProviders,
          approved: approvedProviders,
          rejected: rejectedProviders,
        }
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
