import axios from "axios";
import { UserData } from "types/chart";

const API_URL = "http://localhost:5000/api"; // Backend URL

export const fetchUserData = async (): Promise<UserData[]> => {
  const response = await axios.get<UserData[]>(`${API_URL}/users`);
  return response.data;
};