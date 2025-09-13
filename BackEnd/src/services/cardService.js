// import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatters";
import { cardModel } from "~/models/cardModel";

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    const createdCard = await cardModel.createNew(newCard);
    console.log(createdCard);

    const getNewCard = await cardModel.findOneById(createdCard.insertedId);
    console.log(getNewCard);

    // Luon phai co return,
    return getNewCard;
  } catch (error) {
    throw error;
  }
};

export const cardService = {
  createNew,
};
