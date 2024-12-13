import { Customer } from "../models/customer.model";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { IOrder } from "../types/order";

const getOrders = async () => {
  const orders = await Order.find()
    .populate('productId')
    .populate('customerId')
  return orders
}

const createOrder = async (data: Omit<IOrder, 'id'>) => {
  const { productId, customerId } = data
  const product = await Product.findById(productId)
  if (!product) return

  const customer = await Customer.findById(customerId)
  if (!customer) return

  const order = new Order({ productId, customerId })
  return await order.save()
}

const updateOrder = async (id: string, data: Partial<IOrder>) => {
  const order = await Order.findByIdAndUpdate(id, data, { new: true })
  return order
}

const deleteOrder = async (id: string) => {
  return await Order.findByIdAndDelete(id)
}

export default {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder
}
