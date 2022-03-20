import { Response, Request, NextFunction } from "express";
import { CardModel } from "../models/Card";
import { UserModel } from "../models/User";
import mongoose from "mongoose"

/**
 * List all cards.
 * @route GET /cards
 */
export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await CardModel.find({});
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json((error as Error).message);
  }
};

/**
 * List card by id.
 * @route GET /cards/:id
 */
export const getCardById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const card = await CardModel.findById(id);
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json((error as Error).message);
  }
};

/**
 * Update card.
 * @route PUT /cards/:id
 */
export const updateCardById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const card = await CardModel.findOneAndUpdate(
      { _id: id },
      {
        ...update,
      },
      {
        new: true,
      }
    );
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json((error as Error).message);
  }
};

/**
 * Buy card.
 * @route POST /cards/:id
 */
export const buyCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req.body;

  const client = mongoose.connection;
  
  const session = client.startSession();

  const transactionOptions = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
  };
  
  try {
    const transactionResults = await session.withTransaction(async () => {
      
    }, transactionOptions);
    if (transactionResults) {
      console.log("The reservation was successfully created.");
    } else {
      console.log("The transaction was intentionally aborted.");
    }
  } catch (e) {
    console.log("The transaction was aborted due to an unexpected error: " + e);
  } finally {
    await session.endSession();
  }
};
