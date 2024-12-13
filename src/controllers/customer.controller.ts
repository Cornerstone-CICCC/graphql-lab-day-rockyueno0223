import { Customer } from "../models/customer.model";
import { ICustomer } from "../types/customer";

const getCustomers = async () => {
  const customers = await Customer.find()
  return customers
}

const getCustomerById = async (id: string) => {
  const customer = await Customer.findById(id)
  return customer
}

const createCustomer = async (data: Omit<ICustomer, 'id'>) => {
  const customer = new Customer(data)
  return await customer.save()
}

const updateCustomer = async (id: string, data: Partial<ICustomer>) => {
  const customer = await Customer.findByIdAndUpdate(id, data, { new: true })
  return customer
}

const deleteCustomer = async (id: string) => {
  return await Customer.findByIdAndDelete(id)
}

export default {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
}
