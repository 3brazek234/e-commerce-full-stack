const successResponse = (data, message, res) => {
  return res.status(200).json({
    status: "success",
    message,
    data,
  });
};

const errorResponse = (message, status, res) => {
  return res.status(status).json({
    status: "error",
    message,
  });
};
module.exports = {
  successResponse,
  errorResponse,
};
