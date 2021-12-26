import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import SearchField from "./SearchField";
import UserListItem from "./UserListItem";
import { appBarHeight } from "../drawer/DrawerAppBar";
import { useAppContext } from "../../contexts/AppStateProvider";
import fetchAllUsersBasic from "./fetchAllUsers";

const UserList: React.FC<{}> = () => {
  const { appState } = useAppContext();
  const [users, setUsers] = useState(appState.users);
  const [searchValue, setSearchValue] = useState("");

  const handleFetchingUsers = useCallback(async () => {
    const result = await fetchAllUsersBasic(appState.authToken);
    if (result.success) {
      const fetchedUsers = result.users || [];
      setUsers([...fetchedUsers]);
    }
  }, [appState.authToken]);

  useEffect(() => {
    handleFetchingUsers();
  }, [handleFetchingUsers]);

  return (
    <Box>
      <Typography
        color="#fafafa"
        variant="h5"
        align="center"
        sx={{
          marginY: "6px",
          overflowY: "auto"
        }}
      >
        Users
      </Typography>
      <Box sx={{ height: `${appBarHeight - 55}px` }}></Box>
      <SearchField setSearchValue={setSearchValue} />
      {users.length > 0 &&
        // eslint-disable-next-line
        users.map((user) => {
          if (searchValue !== "" && user.username.includes(searchValue)) {
            return (
              <UserListItem
                username={user.username}
                userId={user.id}
                isOnline={user.isOnline}
                key={user.id}
                display={true}
              />
            );
          } else if (searchValue === "") {
            return (
              <UserListItem
                username={user.username}
                userId={user.id}
                isOnline={user.isOnline}
                key={user.id}
                display={true}
              />
            );
          } else {
            return (
              <UserListItem
                username={user.username}
                userId={user.id}
                isOnline={user.isOnline}
                key={user.id}
                display={false}
              />
            );
          }
        })}
    </Box>
  );
};

export default React.memo(UserList);
