import UsersModel from "./model.js";
import { handleError } from "../shared/utils.js";

export async function addUser(user) {
  if (!Object.hasOwn(user, "name") || !Object.hasOwn(user, "email")) {
    handleError("invalid object name and email are required.");
  }

  const expName = /^[A-Za-z][A-Za-z ._-]{2,49}$/;
  const expEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  if (!expName.test(user.name)) {
    handleError(`Invalid name: ${user.name}.`);
  }

  if (!expEmail.test(user.email)) {
    handleError(`Invalid email: ${user.email}.`);
  }

  try {
    const res = await new UsersModel().addUser(user);
    return res;
  } catch (error) {
    handleError(error);
  }
}

export async function searchUser(id) {
  if (!/^\d+$/.test(id)) {
    handleError(
      `The provided user ID (${id}) is not valid. IDs must be numeric.`
    );
  }

  try {
    const res = await new UsersModel().searchUser(id);
    if (res.error) handleError(res.error);

    return res;
  } catch (error) {
    handleError(error);
  }
}
