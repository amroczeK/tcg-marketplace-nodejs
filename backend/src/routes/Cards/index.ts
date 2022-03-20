import express from "express";
import * as controller from "../../controllers/cards";

export const router = express.Router();

router.route("/").get(controller.getCards);
router.route("/:id").get(controller.getCardById).put(controller.updateCardById).post(controller.buyCard);
