import mongoose from "mongoose";

export type CardDocument = mongoose.Document & {
  name: string;
  hp: string;
  supertype: string;
  subtypes: [string];
  types: [string];
  abilities: IAbilities[];
  attacks: IAttacks[];
  weaknesses: [
    {
      type: string;
      value: string;
    }
  ];
  resistances: [
    {
      type: string;
      value: string;
    }
  ];
  convertedRetreatCost: string;
  images: [
    {
      small: string;
      large: string;
    }
  ];
  availability: IAvailability
};

interface IAvailability {
  sold: {
    type: boolean;
    default: false;
  }
  owner: {
    id: string;
    name: string;
    purchased: Date
  }
}

interface IAbility {
  name: string;
  text: string;
  type: string;
}

interface IAbilities extends Array<IAbility> {
  [index: number]: IAbility;
}

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
  resistances: Array,
  convertedRetreatCost: String,
  images: Array,
  availability: Object
});

export const CardModel = mongoose.model<CardDocument>("Card", cardSchema);
