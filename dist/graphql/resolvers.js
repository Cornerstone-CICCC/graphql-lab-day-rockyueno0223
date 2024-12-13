"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
// Finish the resolvers
exports.resolvers = {
    Query: {
        products: () => { },
        customers: () => { },
        orders: () => { },
        getProductById: () => { },
        getCustomerById: () => { },
    },
    Product: {
        customers: () => { }
    },
    Customer: {
        products: () => { }
    },
    Order: {
        product: () => { },
        customer: () => { }
    },
    Mutation: {
        addProduct: () => { },
        editProduct: () => { },
        removeProduct: () => { },
        addCustomer: () => { },
        editCustomer: () => { },
        removeCustomer: () => { },
        addOrder: () => { },
        editOrder: () => { },
        removeOrder: () => { }
    }
};
