const { assert, AssertionError } = require("chai");

const TodoList = artifacts.require("TodoList");

contract('TodoList', (account) => {
    before(async() => {
        this.todoList = await TodoList.deployed();
    })

    //deployment test
    it('deploys succeessfully', async() => {
        const address = await this.todoList.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    });

    //get list tasks test
    it('list tasks', async() => {
        const taskCount = await this.todoList.taskCount();
        const task = await this.todoList.tasks(taskCount);
        assert.equal(task.id.toNumber(),taskCount.toNumber());
<<<<<<< HEAD
        assert.equal(task.content, 'First Task');
        assert.equal(task.completed, false);
        assert.equal(taskCount, 1);
=======
        assert.equal(task.content, 'Second Task');
        assert.equal(task.completed, false);
        assert.equal(taskCount, 2);
>>>>>>> da9fc50f9079f26592335db253184f4d54561029
    })

    //insert test 
    it('create task', async () => {
<<<<<<< HEAD
        const result = await this.todoList.createTask('Second Task');
        const taskCount = await this.todoList.taskCount();
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(),taskCount.toNumber());
        assert.equal(event.content, 'Second Task');
        assert.equal(event.completed, false);
        assert.equal(taskCount , 2);
=======
        const result = await this.todoList.createTask('Third Task');
        const taskCount = await this.todoList.taskCount();
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(),taskCount.toNumber());
        assert.equal(event.content, 'Third Task');
        assert.equal(event.completed, false);
        assert.equal(taskCount , 3);
>>>>>>> da9fc50f9079f26592335db253184f4d54561029
    });
});
