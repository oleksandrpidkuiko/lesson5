(function () {
    let tasks = {
            current: [{
                taskId: doId(),
                taskContent: "Прийти на лекцію з geekhub",
                taskState: "current"
            }
            ],
            done: [{
                taskId: doId(),
                taskContent: "Винести щось корисне і чосусь навчитися",
                taskState: "done"
            }],
            get allTasks() {
                return this.current.length + this.done.length;
            },
            get doneTasks() {
                return this.done.length;
            }
        };
    let tasksList = document.getElementById("list");
    let allTasks = document.getElementById("all-tasks");
    let doneTasks = document.getElementById("done-tasks");
    let newTask = document.getElementById("new-task");

    function startList() {
        for (let item of tasks.current) {
            createItem(item);
        }
        for (let item of tasks.done) {
            createItem(item);
        }
        allTasks.innerHTML = tasks.allTasks;
        doneTasks.innerHTML = tasks.doneTasks;
    }

    function createItem(element) {
        let item = document.createElement('li');
        let remove = document.createElement('div');
        let text = document.createElement('span');
        remove.classList.add('list-remove');
        remove.addEventListener('click', function () {
            removeTask(this);
        });
        text.classList.add('list-text');
        text.addEventListener('click', function () {
            doneTask(this);
        });
        switch (element.taskState) {
            case 'done':
                item.classList.add('list-item', 'list-item--done');
                break;
            default:
                    item.classList.add('list-item');
        }
        item.id = element.taskId;
        text.innerHTML = element.taskContent;
        item.appendChild(text);
        item.appendChild(remove);
        tasksList.appendChild(item);
    }

    function doneTask(element) {
        let elem = element.parentNode,
            elemId = elem.id,
            elemState = elem.classList.contains('list-item--done');

        const [itemsRemove, itemsAdd] = elemState ? [tasks.done, tasks.current] : [tasks.current, tasks.done];
        elem.classList.toggle('list-item--done');
        for (const [index, item] of itemsRemove.entries()) {
            if (item.taskId !== elemId) continue;
            itemsAdd.push(item);
            itemsRemove.splice(index, 1);
        }
        doneTasks.innerHTML = tasks.doneTasks;
    }

    function removeTask(element) {
        let removeEl = element.parentNode,
            removeElId = removeEl.id,
            removeElState = removeEl.classList.contains('list-item--done');

        removeEl.remove();
        const items = removeElState ? tasks.done : tasks.current;
        for (const [index, item] of items.entries()) {
            if (item.taskId !== removeElId) continue;
            items.splice(index, 1);
        }
        allTasks.innerHTML = tasks.allTasks;
        doneTasks.innerHTML = tasks.doneTasks;
    }

    function addTasks(str) {
        let elem = {
            taskId: doId(),
            taskContent: str,
            taskState: "current"
        };
        tasks.current.push(elem);
        createItem(elem);
        allTasks.innerHTML = tasks.allTasks;
    }

    function doId() {
        return Math.random().toString(36).substr(2, 16);
    }

    startList();

    newTask.addEventListener('keyup',function (e) {
        if(e.keyCode === 13) {
            addTasks(this.value);
            this.value = "";
        }
    })
})();