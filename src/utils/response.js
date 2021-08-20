class Response {
  handleBadRequest(errorMessage) {
    return {
      is_error: true,
      status_code: 400,
      display_msg: errorMessage,
    };
  }
  handleBadRequestWithData(errorMessage, responseData) {
    return {
      is_error: true,
      status_code: 400,
      display_msg: errorMessage,
      res_data: responseData,
    };
  }
  handleRequestTooLargeRequest(errorMessage) {
    return {
      is_error: true,
      status_code: 400,
      display_msg: errorMessage,
    };
  }
  handleUnauthorizedRequest(errorMessage) {
    return {
      is_error: true,
      status_code: 401,
      display_msg: errorMessage,
    };
  }
  handleGoneRequest(errorMessage) {
    return {
      is_error: true,
      status_code: 410,
      display_msg: errorMessage,
    };
  }
  handleSuccessResponse(successMessage) {
    return {
      is_error: false,
      status_code: 200,
      display_msg: successMessage,
    };
  }
  handleSuccessResponseWithData(successMessage, responseData) {
    return {
      is_error: false,
      status_code: 200,
      display_msg: successMessage,
      res_data: responseData,
    };
  }
  handleNotFoundRequest(errorMessage) {
    return {
      is_error: true,
      status_code: 404,
      display_msg: errorMessage,
    };
  }
  handleValidationError(errorArray) {
    return {
      is_error: true,
      status_code: 400,
      display_msg: errorArray[0]["msg"] + " in " + errorArray[0]["location"],
    };
  }
  handleInternalServerError(errorMessage) {
    return {
      is_error: true,
      status_code: 500,
      display_msg: errorMessage,
    };
  }
}

module.exports = new Response();
