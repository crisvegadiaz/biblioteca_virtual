export function handleError(error) {
  if (error.status) {
    throw error;
  }

  if (typeof error === "string") {
    throw { success: false, message: error, status: 400 };
  }

  console.error("Unexpected error: ", error);
  throw { success: false, message: "Error running query", status: 500 };
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
