const createErrorsMiddleware = (toastr) => {
  return () => (next) => (action) => {
    if (action.error) {
      toastr.error(`[${action.type}] ${action.payload.message}`);
    }
    return next(action);
  };
};

export default createErrorsMiddleware;
