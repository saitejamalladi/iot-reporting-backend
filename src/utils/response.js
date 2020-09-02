
const handleBadRequest = errorMessage => {
  return {
    "is_error": true,
    "status_code": 400,
    "display_msg": errorMessage,
  };
};
const handleRequestTooLargeRequest = errorMessage => {
  return {
    "is_error": true,
    "status_code": 400,
    "display_msg": errorMessage,
  };
};
const handleUnauthorizedRequest = errorMessage => {
  return {
    "is_error": true,
    "status_code": 401,
    "display_msg": errorMessage,
  };
};
const handleGoneRequest = errorMessage => {
  return {
    "is_error": true,
    "status_code": 410,
    "display_msg": errorMessage,
  };
};
const handleSuccessResponse = successMessage => {
  return {
    "is_error": false,
    "status_code": 200,
    "display_msg": successMessage,
  };
};
const handleSuccessResponseWithData = (successMessage, responseData) => {
  return {
    "is_error": false,
    "status_code": 200,
    "display_msg": successMessage,
    "res_data": responseData
  };
};
const handleNotFoundRequest = errorMessage => {
  return {
    "is_error": true,
    "status_code": 404,
    "display_msg": errorMessage,
  };
};

module.exports = {
  handleBadRequest: handleBadRequest,
  handleUnauthorizedRequest: handleUnauthorizedRequest,
  handleNotFoundRequest: handleNotFoundRequest,
  handleSuccessResponse: handleSuccessResponse,
  handleSuccessResponseWithData: handleSuccessResponseWithData,
  handleGoneRequest: handleGoneRequest,
  handleRequestTooLargeRequest: handleRequestTooLargeRequest
};