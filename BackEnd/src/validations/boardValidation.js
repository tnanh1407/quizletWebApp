import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().message({
      //Customs error
      "any.required": "Title is required",
      "string.empty": "Title is not allowed to be empty",
      "string.min": "Title length must be at least 3 characters long",
      "string.max":
        "Title length must be less than of equal to 5 characters long",
      "string.trim": "Title must not have leading of trailing whitespace",
    }),
    description: Joi.string()
      .required()
      .min(3)
      .max(255)
      .trim()
      .strict()
      .message({
        //Customs error
        "any.required": "Title is required",
        "string.empty": "Title is not allowed to be empty",
        "string.min": "Title length must be at least 3 characters long",
        "string.max":
          "Title length must be less than of equal to 5 characters long",
        "string.trim": "Title must not have leading of trailing whitespace",
      }),
  });

  try {
    // console.log("req.body: ", req.body);

    // Chỉ định abortEarly: flase để TH có nhiều lỗi thì trả về all
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    // Validate du lieu hop le thi request di sang controller
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const boardValidation = {
  createNew,
};
