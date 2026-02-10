# Obra Management Features - Documentation

## Overview
This document describes the Obra (Construction Work) management features implemented in the Admin Dashboard.

## Features Implemented

### 1. Obra CRUD Operations

#### Create Obra
- **Route**: `/addobra`
- **Component**: `CreateObra`
- **Features**:
  - Form for creating new construction works
  - Fields: Name, Description, Location, Start Date, End Date, Status
  - File upload for "Caderno de Encargos" (.xls/.xlsx files)
  - Cloudinary integration for file storage
  - Form validation

#### List Obras
- **Route**: `/allobras`
- **Component**: `ObraList`
- **Features**:
  - Display all obras in a table format
  - Search functionality (by name, location, or status)
  - View total expenses for each obra
  - Quick actions: Edit, Manage, Delete
  - Delete with confirmation prompt

#### Edit Obra
- **Route**: `/editobra/:obraId`
- **Component**: `EditObra`
- **Features**:
  - Edit all obra details
  - Update or replace Caderno de Encargos file
  - Shows existing file information
  - Form validation

#### Manage Obra
- **Route**: `/manageobra/:obraId`
- **Component**: `ManageObra`
- **Features**:
  - View detailed obra information
  - Download Caderno de Encargos (if available)
  - Add invoices (faturas) to the obra
  - View all invoices in a table
  - Delete invoices
  - Calculate and display total expenses
  - Navigation to edit obra

### 2. Invoice (Fatura) Management

#### Add Invoice
- Add invoices directly from the Manage Obra page
- Fields: Description, Amount, Date, Category (optional)
- Automatic calculation of total expenses

#### Delete Invoice
- Delete invoices from the Manage Obra page
- Confirmation prompt before deletion
- Automatic recalculation of total expenses

### 3. File Upload
- Support for .xls and .xlsx files
- File type validation
- Cloudinary integration for file storage
- File download links in Manage Obra page

### 4. Search and Filtering
- Real-time search in ObraList
- Search by: Name, Location, Status
- Case-insensitive search

### 5. Status Management
Four status options:
- **Planeada** (Planned)
- **Em Progresso** (In Progress)
- **Concluída** (Completed)
- **Cancelada** (Cancelled)

## User Roles and Access

### Master Admin
- Full access to all obra management features
- Can create, read, update, and delete obras
- Can manage all invoices

### Admin
- Full access to all obra management features
- Can create, read, update, and delete obras
- Can manage all invoices

## Navigation

### Master Dashboard
New button added: "Obras List"

### Navbar
New menu item added for Admin and Master Admin roles: "Obras"

## API Endpoints Expected

The frontend expects the following backend API endpoints:

### Obras
- `GET /obras/` - List all obras
- `GET /obras/:obraId` - Get obra details
- `POST /obras/` - Create new obra
- `PUT /obras/:obraId` - Update obra
- `DELETE /obras/:obraId` - Delete obra

### Faturas (Invoices)
- `POST /obras/:obraId/faturas` - Add invoice to obra
- `DELETE /obras/:obraId/faturas/:faturaId` - Delete invoice from obra

## Data Models

### Obra
```typescript
interface Obra {
  _id?: string;
  clientId: string;
  name: string;
  description?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  cadernoEncargos?: CadernoEncargos;
  faturas: Fatura[];
  totalExpenses: number;
  createdAt?: Date;
  updatedAt?: Date;
}
```

### CadernoEncargos
```typescript
interface CadernoEncargos {
  _id?: string;
  fileName: string;
  fileUrl: string;
  uploadDate: Date;
}
```

### Fatura
```typescript
interface Fatura {
  _id?: string;
  description: string;
  amount: number;
  date: Date;
  category?: string;
}
```

## Styling
- Uses existing design system from the project
- Consistent with Client management pages
- Reuses styles from:
  - `clientlist.module.css` for lists
  - `createclient.module.scss` for forms
  - `common.module.css` for common elements
  - `table.module.css` for tables

## Future Enhancements

Potential future improvements:
1. OCR support for scanning physical documents
2. Additional file format support (PDF, images)
3. Export obra data to PDF/Excel
4. Obra statistics and analytics dashboard
5. Obra timeline visualization
6. Email notifications for obra updates
7. File preview functionality
8. Bulk operations (delete multiple, export multiple)
9. Advanced filtering (by date range, expense range)
10. Invoice categorization with pre-defined categories

## Testing Checklist

To test the implementation:
1. ✓ Login as Admin or Master Admin
2. ✓ Navigate to Obras List
3. ✓ Create a new obra with all fields
4. ✓ Upload a Caderno de Encargos file
5. ✓ Search for obras using different criteria
6. ✓ Edit an existing obra
7. ✓ Manage an obra and add invoices
8. ✓ Verify total expenses calculation
9. ✓ Delete an invoice
10. ✓ Delete an obra
11. ✓ Verify file download functionality
