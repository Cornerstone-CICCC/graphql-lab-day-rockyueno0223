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
Object.defineProperty(exports, "__esModule", { value: true });
const customer_model_1 = require("../models/customer.model");
const order_model_1 = require("../models/order.model");
const product_model_1 = require("../models/product.model");
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find()
        .populate('productId')
        .populate('customerId');
    return orders;
});
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, customerId } = data;
    const product = yield product_model_1.Product.findById(productId);
    if (!product)
        return;
    const customer = yield customer_model_1.Customer.findById(customerId);
    if (!customer)
        return;
    const order = new order_model_1.Order({ productId, customerId });
    return yield order.save();
});
const updateOrder = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findByIdAndUpdate(id, data, { new: true });
    return order;
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.findByIdAndDelete(id);
});
exports.default = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder
};
