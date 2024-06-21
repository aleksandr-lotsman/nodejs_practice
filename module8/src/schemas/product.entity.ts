import mongoose, {Schema} from "mongoose";

export interface ProductEntity {
  id: string; // uuid
  title: string;
  description: string;
  price: number;
}

export const ProductSchema: Schema = new Schema<ProductEntity>({
  id: Schema.Types.UUID,
  title: String,
  description: String,
  price: Number
})

export default mongoose.model<ProductEntity>('Product', ProductSchema);