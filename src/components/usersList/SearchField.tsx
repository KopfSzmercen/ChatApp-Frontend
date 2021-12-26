import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Search as SearchIcon } from "@mui/icons-material";
import React, { useRef } from "react";
import { Dispatch, SetStateAction } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.95)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",

  overflow: "hidden"
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));

const SearchField: React.FC<{
  setSearchValue: Dispatch<SetStateAction<string>>;
}> = (props) => {
  const ref = useRef<HTMLDivElement>();
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        ref={ref}
        placeholder="Search a user.."
        inputProps={{ "aria-label": "Search a user" }}
        onChange={(event: any) => {
          props.setSearchValue(event.target.value);
        }}
      />
    </Search>
  );
};

export default SearchField;
