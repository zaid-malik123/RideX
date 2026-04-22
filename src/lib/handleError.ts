import { ApiResponse } from "./ApiResponse";
import { ApiError } from "./ApiError";

export const handleError = (error: unknown) => {
  if (error instanceof ApiError) {
    return ApiResponse({
      success: false,
      message: error.message,
      status: error.statusCode,
    });
  }

  return ApiResponse({
    success: false,
    message: "Internal Server Error",
    error: error instanceof Error ? error.message : error,
    status: 500,
  });
};