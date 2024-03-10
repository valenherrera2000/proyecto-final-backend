import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import MessageMongoDbDao from '../../src/dao/dao.mongodb/message.mongodb.dao';

const requester = supertest(process.env.BASE_URL);
const messageDAO = new MessageMongoDbDao();

describe('Message Functional Testing', function () {
    before(async function () {

        await mongoose.connect(process.env.MONGODB_URI_TEST);

        await mongoose.connection.collections.messages.drop();
    });

    after(async function () {

        await mongoose.connection.collections.messages.drop();
        await mongoose.connection.close();
    });

    it('should create a message successfully', async function () {
        const messageData = {
            user: 'user123',
            message: 'Hello, how are you?',
        };

        const createdMessage = await messageDAO.create(messageData);
        expect(createdMessage).to.have.property('_id');
        expect(createdMessage.user).to.equal(messageData.user);
        expect(createdMessage.message).to.equal(messageData.message);
    });

    it('should get a message by its ID successfully', async function () {
        const createdMessage = await messageDAO.create({
            user: 'user123',
            message: 'Hello, how are you?',
        });

        const retrievedMessage = await messageDAO.getById(createdMessage._id);
        expect(retrievedMessage).to.be.ok;
        expect(retrievedMessage.user).to.equal(createdMessage.user);
        expect(retrievedMessage.message).to.equal(createdMessage.message);
    });

    it('should update a message by its ID successfully', async function () {
        const createdMessage = await messageDAO.create({
            user: 'user123',
            message: 'Hello, how are you?',
        });

        await messageDAO.updateById(createdMessage._id, {
            message: 'Updated message content',
        });
        const updatedMessage = await messageDAO.getById(createdMessage._id);
        expect(updatedMessage).to.be.ok;
        expect(updatedMessage.message).to.equal('Updated message content');
    });

    it('should delete a message by its ID successfully', async function () {
        const createdMessage = await messageDAO.create({
            user: 'user123',
            message: 'Hello, how are you?',
        });

        await messageDAO.deleteById(createdMessage._id);
        const deletedMessage = await messageDAO.getById(createdMessage._id);
        expect(deletedMessage).to.not.be.ok;
    });
});
