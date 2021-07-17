import { Department } from "./department";

export interface Employee {
  id: number;
  name: string;
  departments: Array< Department> 
 
}
