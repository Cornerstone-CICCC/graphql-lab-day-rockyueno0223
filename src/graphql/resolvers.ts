import customerController from "../controllers/customer.controller";
import orderController from "../controllers/order.controller";
import productController from "../controllers/product.controller";
import { ICustomer } from "../types/customer";
import { IOrder } from "../types/order";
import { IProduct } from "../types/product";

// Finish the resolvers
export const resolvers = {
  Query: {
    products: async () => await productController.getProducts(),
    customers: async () => await customerController.getCustomers(),
    orders: async () => await orderController.getOrders(),
    getProductById: async (_: unknown, { id }: { id: string }) => await productController.getProductById(id),
    getCustomerById: async (_: unknown, { id }: { id: string }) => await customerController.getCustomerById(id),
  },
  Product: {
    customers: async (parent: { id: string }) => {
      const orders = await orderController.getOrders()
      const filteredOrders = orders.filter(order => order.productId._id.toString() === parent.id.toString())
      return filteredOrders.map(order => order.customerId)
    }
  },
  Customer: {
    products: async (parent: { id: string }) => {
      const orders = await orderController.getOrders()
      const filteredOrders = orders.filter(order => order.customerId._id.toString() === parent.id)
      return filteredOrders.map(order => order.productId)
    }
  },
  Order: {
    product: async (parent: { productId: string }) => {
      return await productController.getProductById(parent.productId)
    },
    customer: async (parent: { customerId: string }) => {
      return await customerController.getCustomerById(parent.customerId)
    }
  },
  Mutation: {
    addProduct: async (_: unknown, { productName, productPrice }: Omit<IProduct, 'id'>) => await productController.createProduct({ productName, productPrice }),
    editProduct: async (_: unknown, { id, productName, productPrice }: IProduct) => await productController.updateProduct(id, { productName, productPrice }),
    removeProduct: async (_: unknown, { id }: { id: string }) => await productController.deleteProduct(id),

    addCustomer: async (_: unknown, { firstname, lastname, email }: Omit<ICustomer, 'id'>) => await customerController.createCustomer({ firstname, lastname, email }),
    editCustomer: async (_: unknown, { id, firstname, lastname, email}: ICustomer) => await customerController.updateCustomer(id, { firstname, lastname, email }),
    removeCustomer: async (_: unknown, { id }: { id: string }) => await customerController.deleteCustomer(id),

    addOrder: async (_: unknown, { productId, customerId }: Omit<IOrder, 'id'>) => await orderController.createOrder({ productId, customerId }),
    editOrder: async (_: unknown, { id, productId, customerId }: IOrder) => await orderController.updateOrder(id, { productId, customerId }),
    removeOrder: async (_: unknown, { id }: { id: string }) => await orderController.deleteOrder(id)
  }
}
