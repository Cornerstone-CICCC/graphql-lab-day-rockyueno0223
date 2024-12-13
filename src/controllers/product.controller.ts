import { Product } from "../models/product.model";
import { IProduct } from "../types/product";

const getProducts = async () => {
  const products = await Product.find()
  return products
}

const getProductById = async (id: string) => {
  const product = await Product.findById(id)
  return product
}

const createProduct = async (data: Omit<IProduct, 'id'>) => {
  const product = new Product(data)
  return await product.save()
}

const updateProduct = async (id: string, data: Partial<IProduct>) => {
  const product = await Product.findByIdAndUpdate(id, data, { new: true })
  return product
}

const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id)
}

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
