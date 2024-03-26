import { EmployeeI, LevelT, StatusT } from "../../type";

class Employee implements EmployeeI {
  id: number;
  name: string;
  level: LevelT;
  status: StatusT;

  constructor(employee: EmployeeI) {
    this.id = employee.id;
    this.name = employee.name;
    this.level = employee.level;
    this.status = "free";
  }

  changeStatus(status: StatusT): void {
    this.status = status;
  }
}

export default Employee;
