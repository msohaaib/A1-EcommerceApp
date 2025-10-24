import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new ApiError(401, "Unauthorized request");

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );
    if (!user) throw new ApiError(401, "Invalid access token");

    req.user = user;
    next();
  } catch (error) {
    // ✅ Allow expired tokens only for logout
    if (
      error.name === "TokenExpiredError" &&
      req.originalUrl.includes("/logout")
    ) {
      const decoded = jwt.decode(token);
      if (decoded?._id) {
        const user = await User.findById(decoded._id).select(
          "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
        );
        if (user) {
          req.user = user;
          return next();
        }
      }
    }

    console.error("JWT verification failed:", error.message);
    throw new ApiError(401, "Invalid access token");
  }
});
