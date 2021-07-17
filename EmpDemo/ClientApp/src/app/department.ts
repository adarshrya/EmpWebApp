import { Employee } from "./employee";

export interface Department {
  id: number;
  name: string;
  employees: Array<Employee>
}
