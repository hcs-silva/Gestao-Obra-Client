// Type definitions for Obra (Construction Work) management

export interface CadernoEncargos {
  _id?: string;
  fileName: string;
  fileUrl: string;
  uploadDate: Date;
}

export interface Fatura {
  _id?: string;
  description: string;
  amount: number;
  date: Date;
  category?: string;
}

export interface Obra {
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
