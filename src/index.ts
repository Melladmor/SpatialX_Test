import { EmployeeI, PriorityT } from "../type";
import Employee from "./classes/Employee";
import Call from "./classes/Call";
import Dispatcher from "./classes/Dispatcher";
import { fetchData } from "./utlis/utlis";

const fileName = "employees.json";
fetchData(fileName)
  .then((employeesData: EmployeeI[]) => {
    const employees: EmployeeI[] = employeesData.map(
      (employee) => new Employee(employee)
    );

    const dispatcher = new Dispatcher(employees);
    const simulateCalls = () => {
      setInterval(() => {
        const priority: PriorityT = Math.random() < 0.5 ? "low" : "high";
        const call = new Call({
          id: Math.floor(Math.random() * 1000),
          priority,
        });
        dispatcher.dispatchCall(call);

        setTimeout(() => {
          dispatcher.deallocateCall(call);
        }, Math.random() * 15000);
      }, Math.random() * 10000);
    };

    simulateCalls();
  })
  .catch((error: Error) => {
    console.error(`Error reading file ${fileName}:`, error);
    process.exit(1);
  });
