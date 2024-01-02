import mongoose, { Schema, model, models } from 'mongoose';

const ExtraPriceSchema = new Schema({
  name: { type: String, trim: true },
  price: Number,
});

const MenuItemSchema = new Schema(
  {
    image: { type: String, trim: true },
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    category: { type: mongoose.Types.ObjectId },
    basePrice: { type: Number },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredients: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);
