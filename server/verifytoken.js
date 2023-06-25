import jwt from "jsonwebtoken";
import { handleError } from "./error.js";

export const verifyToken = (req, res, next) => {

  const bearer_token=req.headers['authorization'];
  const match = bearer_token.match(/Bearer\s(.+)/)
  const token = match ? match[1] : null;
  if (!token) return next(handleError(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(handleError(403, "Token is invalid"));
    req.user = user;
    next();
  });
};



// import jwt from "jsonwebtoken";
// import { handleError } from "./error.js";

// export const verifyToken = (req, res, next) => {

//   const bearer_token=req.headers['authorization'];
//   const match = bearer_token.match(/Bearer\s(.+)/)
//   const token = match ? match[1] : null;
//   if (!token) return next(handleError(401, "You are not authenticated"));

//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return next(handleError(403, "Token is invalid"));
//     req.user = user;
//     next();
//   });
// };



// import jwt from "jsonwebtoken";
// import { handleError } from "./error.js";

// export const verifyToken = (req, res, next) => {

//   const bearer_token=req.headers['authorization'];
//   const match = bearer_token.match(/Bearer\s(.+)/)
//   const token = match ? match[1] : null;

//   if (!token) return next(handleError(401, "You are not authenticated"));

//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return next(createError(403, "Token is invalid"));
//     req.user = user;
//     next();
//   });
// };