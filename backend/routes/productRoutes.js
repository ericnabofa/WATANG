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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// ✅ Create a new product
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, categoryId, brandId, flavorId, volumeId, packSizeId, price, stock } = req.body;
        const newProduct = yield prisma.product.create({
            data: { name, categoryId, brandId, flavorId, volumeId, packSizeId, price, stock },
        });
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}));
// ✅ Get all products (Fix: Explicitly select name, price, and stock)
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                stock: true,
                category: { select: { id: true, name: true } },
                brand: { select: { id: true, name: true } },
                flavor: { select: { id: true, name: true } },
                volume: { select: { id: true, name: true } },
                packSize: { select: { id: true, name: true } },
            },
        });
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}));
// ✅ Get a single product by ID (Fix: Explicitly select name, price, and stock)
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield prisma.product.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                price: true,
                stock: true,
                category: { select: { id: true, name: true } },
                brand: { select: { id: true, name: true } },
                flavor: { select: { id: true, name: true } },
                volume: { select: { id: true, name: true } },
                packSize: { select: { id: true, name: true } },
            },
        });
        if (!product)
            return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}));
// ✅ Update a product by ID
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, categoryId, brandId, flavorId, volumeId, packSizeId, price, stock } = req.body;
        const updatedProduct = yield prisma.product.update({
            where: { id },
            data: { name, categoryId, brandId, flavorId, volumeId, packSizeId, price, stock },
        });
        res.json(updatedProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}));
// ✅ Delete a product by ID
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.product.delete({ where: { id } });
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}));
exports.default = router;
