import LoansModel from "./model.js";
import { handleError, formatDate } from "../shared/utils.js";

export async function bookLoan(datos) {
  if (!datos.idUser || !datos.idBook) {
    handleError(`Invalid loan data must have an idUser and an idBook`);
  }

  if (!/^\d+$/.test(datos.idUser)) {
    handleError(
      `The provided user ID (${datos.idUser}) is not valid. IDs must be numeric.`
    );
  }

  if (!/^\d+$/.test(datos.idBook)) {
    handleError(
      `The provided book ID (${datos.idBook}) is not valid. IDs must be numeric.`
    );
  }

  datos.loanDate = formatDate(new Date());

  try {
    const res = await new LoansModel().bookLoan(datos);
    if (res.error) handleError(res.error);

    return res;
  } catch (error) {
    handleError(error);
  }
}

export async function returnLoan(id) {
  if (!/^\d+$/.test(id)) {
    handleError(
      `The provided book ID (${id}) is not valid. IDs must be numeric.`
    );
  }

  try {
    const res = await new LoansModel().returnLoan(id, formatDate(new Date()));
    if (res.error) handleError(res.error);

    return res;
  } catch (error) {
    handleError(error);
  }

  return { message: "Loan returned" };
}

export async function historyLoan(id) {
  if (!/^\d+$/.test(id)) {
    handleError(
      `The provided user ID (${id}) is not valid. IDs must be numeric.`
    );
  }

  try {
    const res = await new LoansModel().historyLoan(id);
    if (res.error) handleError(res.error);

    return res;
  } catch (error) {
    handleError(error);
  }
}
