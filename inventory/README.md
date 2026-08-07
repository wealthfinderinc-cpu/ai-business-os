# Inventory Enterprise

This module implements an Enterprise Inventory scaffold with the following features:

- Stock management
- Warehouses
- Transfers between warehouses
- Purchase orders
- Suppliers
- Barcode / QR generation
- Low stock alerts
- Reports and export stubs (Excel/PDF)

Current implementation uses in-memory API route handlers (app/api/inventory/*) to enable local UI testing. Replace with database-backed persistence (Prisma) and robust export generation (XLSX/PDF) for production.

Commit: Inventory Enterprise
