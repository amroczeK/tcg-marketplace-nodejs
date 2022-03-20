import mongoose from "mongoose";

export type CardDocument = mongoose.Document & {
  name: string;
  hp: string;
  supertype: string;
  subtypes: [string];
  types: [string];
  attacks: IAttacks[];
  weaknesses: [
    {
      type: string;
      value: string;
    }
  ];
  resistance: [
    {
      type: string;
      value: string;
    }
  ];
  convertedRetreatCost: string;
  image: string;
};

interface IAttack {
  name: string;
  cost: [string];
  convertedEnergyCost: string;
  damage: string;
  text: string;
}

interface IAttacks extends Array<IAttack> {
  [index: number]: IAttack;
}

const cardSchema = new mongoose.Schema<CardDocument>({
  name: { type: String, unique: true },
  hp: String,
  supertype: String,
  subtypes: Array,
  types: Array,
  attacks: Array,
  weaknesses: Array,
  resistance: Array,
  convertedRetreatCost: String,
  image: String
});

export const Card = mongoose.model<CardDocument>("Card", cardSchema);
