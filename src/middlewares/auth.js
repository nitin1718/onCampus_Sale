import ErrorHandler from "@/utils/ErrorHandler";

const isAuthenticatedUser = async (req, res, next) => {

    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(" ")[1]

    const user = verifyJwtToken(token)

  if (!user) {
    return next(new ErrorHandler("Login first to access this route", 401));
  }

  req.user = user;

  
  next();
};

export { isAuthenticatedUser };