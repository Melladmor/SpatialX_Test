import { EmployeeI } from "../../type";
import * as fs from "fs";
import * as path from "path";

export const fetchData = async (fileName: string): Promise<EmployeeI[]> => {
  try {
    const filePath = path.join(__dirname, "..", "..", "data", fileName);

    const data = await fs.promises.readFile(filePath, "utf-8");

    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};
