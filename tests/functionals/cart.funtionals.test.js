import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import CartMongoDbDAO from '../../src/dao/dao.mongodb/cart.mongodb.dao.js';

const requester = supertest(process.env.BASE_URL);
const cartDAO = new CartMongoDbDAO(); 

describe('Cart Functional Testing', function () {
    before(async function () {
        
        await mongoose.connect(process.env.MONGODB_URI_TEST);
        
        await mongoose.connection.collections.carts.drop();
    });

    after(async function () {
        await mongoose.connection.collections.carts.drop();
        await mongoose.connection.close();
    });

    it('should create a cart successfully', async function () {
        const cartData = {
            products: [
                { product: 'product123', quantity: 2 },
                { product: 'product456', quantity: 1 },
            ],
        };

        const createdCart = await cartDAO.create(cartData);
        expect(createdCart).to.have.property('_id');
        expect(createdCart.products).to.have.lengthOf(2);
    });

    it('should get a cart by its ID successfully', async function () {
        const createdCart = await cartDAO.create({
            products: [
                { product: 'product123', quantity: 2 },
                { product: 'product456', quantity: 1 },
            ],
        });

        const retrievedCart = await cartDAO.getById(createdCart._id);
        expect(retrievedCart).to.be.ok;
        expect(retrievedCart.products).to.have.lengthOf(2);
    });

    it('should update a cart by its ID successfully', async function () {
        const createdCart = await cartDAO.create({
            products: [
                { product: 'product123', quantity: 2 },
                { product: 'product456', quantity: 1 },
            ],
        });

        await cartDAO.updateById(createdCart._id, {
            products: [{ product: 'product789', quantity: 3 }],
        });
        const updatedCart = await cartDAO.getById(createdCart._id);
        expect(updatedCart).to.be.ok;
        expect(updatedCart.products).to.have.lengthOf(1);
    });

    it('should delete a cart by its ID successfully', async function () {
        const createdCart = await cartDAO.create({
            products: [
                { product: 'product123', quantity: 2 },
                { product: 'product456', quantity: 1 },
            ],
        });

        await cartDAO.deleteById(createdCart._id);
        const deletedCart = await cartDAO.getById(createdCart._id);
        expect(deletedCart).to.not.be.ok;
    });
});
