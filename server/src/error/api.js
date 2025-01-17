const errorRouter = (_, res) => {
  try {
    res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "Invalid route or parameters.",
    });
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

export default errorRouter;
