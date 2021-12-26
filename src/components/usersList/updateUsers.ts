import { User } from "../../contexts/AppStateProvider";

const updateUsers = (users: User[], userId: string, online: boolean) => {
  const updatedUsers = users.map((user) => {
    if (user.id.toString() === userId.toString()) {
      return {
        ...user,
        isOnline: online
      };
    }
    return user;
  });
  return updatedUsers;
};

export default updateUsers;
