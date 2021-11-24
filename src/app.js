App = {
  contracts: {},
  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },


  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
  },

  loadAccount: async () => {
    const account = await ethereum.request({ method: 'eth_accounts' });
    App.account = account[0];
  },

  loadContract: async () => {
    const todolist = await $.getJSON('TodoList.json');
    App.contracts.TodoList = TruffleContract(todolist);
    App.contracts.TodoList.setProvider(web3.currentProvider);
    //get deployed smart contract from Blockchain
    App.todolistContract = await App.contracts.TodoList.deployed();
  },

  render: async () => {
    if (App.loading) {
      return
    }

    App.setLoading(true)
    $('#account').html(App.account)
    console.log(App.account)
    await App.renderTasks();
    App.setLoading(false)
  },

  renderTasks: async () => {
    const taskCount = (await App.todolistContract.taskCount()).toNumber();
    const taskTemplate = $('.taskTemplate');

    console.log(taskCount);
    //Get task info from Truffle contract
    for (var i = 1; i <= taskCount; i++) {
      const task = await App.todolistContract.tasks(i);
      const taskId = task[0].toNumber();
      const taskContent = task[1];
      const taskCompleted = task[2];

      const newTaskTemplate = taskTemplate.clone();
      newTaskTemplate.find('.content').html(taskContent);
      newTaskTemplate.find('input').prop('name', taskId)
        .prop('checked', taskCompleted);

      if (taskCompleted) {
        $('#taskListCompleted').append(newTaskTemplate);
      }
      else {
        $('#taskList').append(newTaskTemplate);
      }

      newTaskTemplate.show();
    }
  },

  createTask: async () => {
    App.setLoading(true);
    const content = $('#newTask').val();
    console.log(App.account);
    await App.todolistContract.createTask(content, {from: App.account});
    window.location.reload();
  },

  setLoading: (isLoading) => {
    App.loading = isLoading;
    const loader = $('#loader')
    const content = $('#content')
    if (isLoading) {
      loader.show()
      content.hide()
    }
    else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load();
  })
})