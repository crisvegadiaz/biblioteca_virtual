import UsersModel from "./model.js";
import { handleError } from "../shared/utils.js";

export async function addUser(user) {
  if (!Object.hasOwn(user, "name") || !Object.hasOwn(user, "email")) {
    throw {
      message: "invalid object name and email are required",
      status: 400,
    };
  }

  const expName = /^[A-Za-z][A-Za-z0-9 ._-]{2,49}$/;
  const expEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  if (!expName.test(user.name)) {
    throw { message: `Invalid name: ${user.name}`, status: 400 };
  }

  if (!expEmail.test(user.email)) {
    throw { message: `Invalid email: ${user.email}`, status: 400 };
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
    throw { message: `Invalid id: ${id}`, status: 400 };
  }

  try {
    const res = await new UsersModel().searchUser(id);
    if (!res) {
      throw { message: `User not found ${id}`, status: 404 };
    }

    return res;
  } catch (error) {
    handleError(error);
  }
}
