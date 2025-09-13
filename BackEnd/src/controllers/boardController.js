import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";
// import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  try {
    console.log("req.body: ", req.body);
    console.log("req.query: ", req.query);
    console.log("req.params: ", req.params);
    console.log("req.files: ", req.files);
    console.log("req.cookies: ", req.cookies);
    console.log("req.jwtDecoded: ", req.jwtDecoded);

    // Dieu huong du lieu sang tang Service
    const createBoard = await boardService.createNew(req.body);

    // Co ket qua thi tra ve phia Client
    // throw new ApiError(StatusCodes.BAD_GATEWAY, "thien dev test error");
    res.status(StatusCodes.CREATED).json(createBoard);
  } catch (error) {
    next(error);
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message,
    // });
  }
};

export const boardController = {
  createNew,
};
