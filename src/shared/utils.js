export function handleError(error) {
  if (error.status) {
    throw error;
  }
  console.error("Unexpected error: ", error);
  throw { message: "Error running query", status: 500 };
}
