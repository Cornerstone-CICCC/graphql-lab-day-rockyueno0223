"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const customer_controller_1 = __importDefault(require("../controllers/customer.controller"));
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
// Finish the resolvers
exports.resolvers = {
    Query: {
        products: () => __awaiter(void 0, void 0, void 0, function* () { return yield product_controller_1.default.getProducts(); }),
        customers: () => __awaiter(void 0, void 0, void 0, function* () { return yield customer_controller_1.default.getCustomers(); }),
        orders: () => __awaiter(void 0, void 0, void 0, function* () { return yield order_controller_1.default.getOrders(); }),
        getProductById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield product_controller_1.default.getProductById(id); }),
        getCustomerById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield customer_controller_1.default.getCustomerById(id); }),
    },
    Product: {
        customers: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield order_controller_1.default.getOrders();
            const filteredOrders = orders.filter(order => order.productId._id.toString() === parent.id.toString());
            return filteredOrders.map(order => order.customerId);
        })
    },
    Customer: {
        products: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield order_controller_1.default.getOrders();
            const filteredOrders = orders.filter(order => order.customerId._id.toString() === parent.id);
            return filteredOrders.map(order => order.productId);
        })
    },
    Order: {
        product: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            return yield product_controller_1.default.getProductById(parent.productId);
        }),
        customer: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            return yield customer_controller_1.default.getCustomerById(parent.customerId);
        })
    },
    Mutation: {
        addProduct: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { productName, productPrice }) { return yield product_controller_1.default.createProduct({ productName, productPrice }); }),
        editProduct: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, productName, productPrice }) { return yield product_controller_1.default.updateProduct(id, { productName, productPrice }); }),
        removeProduct: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield product_controller_1.default.deleteProduct(id); }),
        addCustomer: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { firstname, lastname, email }) { return yield customer_controller_1.default.createCustomer({ firstname, lastname, email }); }),
        editCustomer: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, firstname, lastname, email }) { return yield customer_controller_1.default.updateCustomer(id, { firstname, lastname, email }); }),
        removeCustomer: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield customer_controller_1.default.deleteCustomer(id); }),
        addOrder: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { productId, customerId }) { return yield order_controller_1.default.createOrder({ productId, customerId }); }),
        editOrder: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, productId, customerId }) { return yield order_controller_1.default.updateOrder(id, { productId, customerId }); }),
        removeOrder: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield order_controller_1.default.deleteOrder(id); })
    }
};
