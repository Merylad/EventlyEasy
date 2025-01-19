import { createSelector } from "@reduxjs/toolkit";
import { selectUser } from "./usersSlice";

export const selectorUserState = createSelector(
    [selectUser],
    (userState) => userState.user
  );