import { calculateProgress } from "./calculator.js";

const todo1 = {
    name: 'Take dog for walk',
    isDone: false,
    difficulty: 1,
    time: 30
}

const todo2 = {
    name: 'Learn JavaScript',
    isDone: false,
    difficulty: 4,
    time: 80
}

const todo3 = {
    name: 'Teach Japanese',
    isDone: true,
    difficulty: 2,
    time: 65
}

const todos = [
    todo1,
    todo2,
    todo3
];

let maxDifficulty;

export const initTodos = () => {
    updateTodos();

    initSaveButton();

    toggleOrder();
};

const roundUp = () => document.querySelector('#progress').textContent = `${Math.round(calculateProgress(todos) * 100)}%`;

const countTime = () => {
    for (const checkbox of document.querySelectorAll('input[type = checkbox]')) {
        checkbox.addEventListener('change', () => {
            let timeCont = todos.map( i => i.time);
            const sum = [...document.querySelectorAll(`input[type = checkbox]:checked + ${timeCont}`)]
            .reduce((acc, curr) => acc + curr, 0);
            document.querySelector('.total-time').textContent = sum;
        })
    }
}

const displayTodos = () => {
    const container = document.querySelector('#container');
    container.innerHTML = '';
    todos.forEach((todo, index) => {
        container.innerHTML = container.innerHTML + `
        <div class='${todo.isDone ? "completed" : "incomplete"}'>
        <input ${todo.isDone ? "checked" : ""} type="checkbox">
        ${index + 1}. ${todo.name} - ${todo.time} mins - (${todo.difficulty}) <button class="btn">X</button>
        </div>
        `
    });
};

const toggleOrder = () => {
    document.querySelector('.asc').addEventListener('click', () => changeOrderByTime('ASC'));
    document.querySelector('.dsc').addEventListener('click', () => changeOrderByTime('DSC'));
};

const changeOrderByTime = order => {
    switch(order) {
        case 'ASC':
        todos.sort((t1, t2) => t1.time - t2.time);
        break;
        case 'DSC':
        todos.sort((t1, t2) => (t1.time - t2.time) * -1);
        break;
    }
    updateTodos();
};


const toggleCheckbox = () => {
    document.querySelectorAll('input[type=checkbox]').forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            todos[index].isDone = checkbox.checked;
            updateTodos();
        });
    });
};

const delItem = () => {
    document.querySelectorAll('.btn').forEach((button, index) => {
        button.addEventListener('click', () => {
            todos.splice(index, 1);
            updateTodos();
        });
    })
};

const initSaveButton = () => {
    const sendBtn = document.querySelector('#send');
    sendBtn.addEventListener('click', () => {
        const name = document.querySelector('#name').value;
        const difficulty = Number(document.querySelector('#diff').value);
        const time = Number(document.querySelector('#time').value);
        todos.push({name, time, difficulty});
        updateTodos();
    });
};

const showToughestNumb = () => {
    maxDifficulty = Math.max(...todos.map(t => t.difficulty));
    document.querySelector('.difficulty-deg').textContent = maxDifficulty;
};

const showToughestName = () => {
    document.querySelector('.hardest-item').textContent = todos.find(t => t.difficulty === maxDifficulty).name;
};

const updateTodos = () => {
    displayTodos();
    toggleCheckbox();
    roundUp();
    showToughestNumb();
    showToughestName();
    delItem();
    countTime();
};