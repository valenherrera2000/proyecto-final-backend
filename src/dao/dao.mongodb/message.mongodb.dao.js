import { expect } from 'chai';
import mongoose from 'mongoose';
import MessageMongoDbDao from '../../src/dao/dao.mongodb/message.mongodb.dao'; // Import MessageMongoDbDao

describe('[Unit] Message DAO', function () {
    before(async function () {
        // Connect to the test database
        await mongoose.connect(process.env.MONGODB_URI_TEST);
        // Clear the messages collection
        await mongoose.connection.collections.messages.drop();
    });

    after(async function () {
        // Drop the messages collection and close the connection
        await mongoose.connection.collections.messages.drop();
        await mongoose.connection.close();
    });

    it('should create a message correctly', async function () {
        const messageDAO = new MessageMongoDbDao(); // Use MessageMongoDbDao
        const createdMessage = await messageDAO.create({
            user: 'user123',
            message: 'Hello, how are you?',
        });

        expect(createdMessage).to.have.property('_id');
        expect(createdMessage.user).to.equal('user123');
        expect(createdMessage.message).to.equal('Hello, how are you?');
    });

    it('should get a message by its ID correctly', async function () {
        const messageDAO = new MessageMongoDbDao(); // Use MessageMongoDbDao
        const createdMessage = await messageDAO.create({
            user: 'user123',
            message: 'Hello, how are you?',
        });

        const retrievedMessage = await messageDAO.getById(createdMessage._id);
        expect(retrievedMessage).to.be.ok;
        expect(retrievedMessage.user).to.equal('user123');
        expect(retrievedMessage.message).to.equal('Hello, how are you?');
    });

    it('should update a message by its ID correctly', async function () {
        const messageDAO = new MessageMongoDbDao(); // Use MessageMongoDbDao
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

    it('should delete a message by its ID correctly', async function () {
        const messageDAO = new MessageMongoDbDao(); // Use MessageMongoDbDao
        const createdMessage = await messageDAO.create({
            user: 'user123',
            message: 'Hello, how are you?',
        });

        await messageDAO.deleteById(createdMessage._id);
        const deletedMessage = await messageDAO.getById(createdMessage._id);
        expect(deletedMessage).to.not.be.ok;
    });
});
