export type PriorityT = "low" | "high";
export type LevelT = "junior" | "senior" | "manager" | "director";
export type StatusT = "free" | "busy";
export interface EmployeeI {
  id: number;
  name: string;
  level: LevelT;
  status: StatusT;
  changeStatus: (status: StatusT) => void;
}
export interface CallI {
  id: number;
  priority: PriorityT;
  allocatedTo?: number;
  changePriority?: (priority: PriorityT) => void;
}

export interface DispatcherI {
  employees: EmployeeI[];
  callsQueue: CallI[];
}
