import { CallI, PriorityT } from "../../type";

class Call implements CallI {
  id: number;
  priority: PriorityT;

  constructor(call: CallI) {
    this.id = call.id;
    this.priority = call.priority;
  }

  changePriority(priority: PriorityT): void {
    this.priority = priority;
  }
}

export default Call;