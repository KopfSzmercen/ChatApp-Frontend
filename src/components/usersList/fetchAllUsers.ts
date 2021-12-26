import { BASE_API_URL } from "../..";

export interface UserData {
  username: string;
  isOnline: boolean;
  id: string;
  isActive: boolean;
  isUnseenMessage: boolean;
}

export interface FetchUsersResult {
  success: boolean;
  users?: UserData[];
}

const fetchAllUsersBasic = async (authToken: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    if (!response) return { success: false };
    if (response.status === 403) return { success: false };
    const parsedResponse = await response.json();
    return parsedResponse as FetchUsersResult;
  } catch (error) {
    return { success: false };
  }
};

export default fetchAllUsersBasic;
