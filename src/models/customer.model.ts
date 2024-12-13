import mongoose, { Schema } from "mongoose";

const CustomerSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true }
})

export const Customer = mongoose.model("Customer", CustomerSchema)
