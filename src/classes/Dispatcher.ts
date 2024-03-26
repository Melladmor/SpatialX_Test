import { CallI, EmployeeI, PriorityT, LevelT, DispatcherI } from "../../type";

class Dispatcher implements DispatcherI {
  employees;
  callsQueue: CallI[];

  constructor(employees: EmployeeI[]) {
    this.employees = employees;
    this.callsQueue = [];
  }

  dispatchCall(call: CallI): void {
    if (call.priority === "low") {
      this.handlePriorityCall(call, "low");
    } else {
      this.handlePriorityCall(call, "high");
    }
  }

  handlePriorityCall(call: CallI, priority: PriorityT): void {
    const availableEmployee = this.getAvailableEmployeeForPriority(priority);
    if (availableEmployee) {
      this.allocateCallToEmployee(call, availableEmployee);
    } else {
      this.handleCallHold(call, priority);
    }
  }

  handleCallHold(call: CallI, priority: PriorityT): void {
    const numberOfCallHold =
      this.callsQueue.filter((queuedCall) => queuedCall.priority === priority)
        .length + 1;
    this.callsQueue.push(call);
    console.log(
      "------------------------------------------------------------------------------------------------------------"
    );
    console.log(
      `All employees on ${priority} priority line are busy. Call ${call.id} is on hold. Number of ${priority} call hold ${numberOfCallHold}`
    );
  }

  getAvailableEmployeeForPriority(priority: PriorityT): EmployeeI | undefined {
    const validLevels: LevelT[] =
      priority === "low"
        ? ["junior", "senior", "manager"]
        : ["manager", "director"];
    const availableEmployee = this.employees.find(
      (employee) =>
        employee.status === "free" && validLevels.includes(employee.level)
    );
    return availableEmployee;
  }

  allocateCallToEmployee(call: CallI, employee: EmployeeI): void {
    employee.changeStatus("busy");
    call.allocatedTo = employee.id;
    console.log(
      "****************************************************************************************************"
    );
    console.log(
      `Call ${call.id} with priority ${call.priority} assigned to ${employee.level} ${employee.name}`
    );
  }

  deallocateCall(call: CallI): void {
    const employee = this.employees.find(
      (employee) => employee.id === call.allocatedTo
    );
    if (employee) {
      employee.changeStatus("free");
      console.log(
        `Call ${call.id} finished, ${employee.level} ${employee.name} is now free`
      );

      if (this.callsQueue.length > 0) {
        const nextCall = this.callsQueue.shift();
        if (nextCall) {
          this.dispatchCall(nextCall);
        }
      }
    }
  }
}

export default Dispatcher;
