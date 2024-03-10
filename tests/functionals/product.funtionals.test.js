import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import ProductMongoDbDAO from '../../src/dao/dao.mongodb/product.mongodb.dao.js'; 

const requester = supertest(process.env.BASE_URL);
const productDao = new ProductMongoDbDAO(); 

describe('Product Functional Testing', function () {
    before(async function () {

        await mongoose.connect(process.env.MONGODB_URI_TEST);

        await mongoose.connection.collections.products.drop();
    });

    after(async function () {

        await mongoose.connection.collections.products.drop();
        await mongoose.connection.close();
    });

    it('should create a product successfully', async function () {
        const productData = {
            title: 'Sample Product',
            description: 'This is a sample product',
            price: 19.99,
            thumbnail: 'sample.jpg',
            code: 'PR123',
            stock: 50,
        };

        const createdProduct = await productDao.create(productData);
        expect(createdProduct).to.have.property('_id');
        expect(createdProduct).to.have.property('title', 'Sample Product');
    });

    it('should get a product by its ID successfully', async function () {
        const createdProduct = await productDao.create({
            title: 'Sample Product',
            description: 'This is a sample product',
            price: 19.99,
            thumbnail: 'sample.jpg',
            code: 'PR123',
            stock: 50,
        });

        const retrievedProduct = await productDao.getById(createdProduct._id);
        expect(retrievedProduct).to.be.ok;
        expect(retrievedProduct.title).to.equal('Sample Product');
    });

    it('should update a product by its ID successfully', async function () {
        const createdProduct = await productDao.create({
            title: 'Sample Product',
            description: 'This is a sample product',
            price: 19.99,
            thumbnail: 'sample.jpg',
            code: 'PR123',
            stock: 50,
        });

        await productDao.updateById(createdProduct._id, { title: 'Updated Product' });
        const updatedProduct = await productDao.getById(createdProduct._id);
        expect(updatedProduct).to.be.ok;
        expect(updatedProduct.title).to.equal('Updated Product');
    });

    it('should delete a product by its ID successfully', async function () {
        const createdProduct = await productDao.create({
            title: 'Sample Product',
            description: 'This is a sample product',
            price: 19.99,
            thumbnail: 'sample.jpg',
            code: 'PR123',
            stock: 50,
        });

        await productDao.deleteById(createdProduct._id);
        const deletedProduct = await productDao.getById(createdProduct._id);
        expect(deletedProduct).to.not.be.ok;
    });
});
