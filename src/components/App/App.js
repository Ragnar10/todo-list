import React, {useState, useEffect} from 'react';
import TodoList from '../TodoList/TodoList';
import ModalForm from "../ModalForm/ModalForm";
import api from '../services/api';
import './App.css';

const App = () => {

    const [todoList, setTodoList] = useState([]);
    const [todoItem, setTodoItem] = useState({id: '', title: '', isDone: false});
    const [openForm, setOpenForm] = useState(false);

    useEffect(() => {
        api.get('').then(resp => setTodoList(resp.data));
    }, []);

    const openModalForm = () => {
      setOpenForm(true);
    };
    const cancelModalForm = () => {
        setOpenForm(false);
        setTodoItem({id: '', title: '', isDone: false});
    };

    const changeItem = (changes) => {
        setTodoItem({
            ...todoItem,
            ...changes
        });
    };

    const editItem = (id) => {
        openModalForm();
        const todoListItem = todoList.find((item) => item.id === id);
        setTodoItem(todoListItem);
    };

    const addItem = (itemTodo) => {
        setOpenForm(false);
        const itemIndex = todoList.findIndex((item) => item.id === itemTodo.id);
        const todoListItem = todoList[itemIndex];
        const changedItem  = {...todoListItem, title: todoItem.title};
        if (itemIndex < 0) {
            api.post('', itemTodo).then((resp) => {
                setTodoList([ ...todoList, {...resp.data}])
            });
            setTodoItem({id: '', title: '', isDone: false});
        } else {
            api.put(todoListItem.id, changedItem).then((resp) => {
                setTodoList([...todoList.slice(0, itemIndex), {...resp.data }, ...todoList.slice(itemIndex + 1)]);
            });
            setTodoItem({id: '', title: '', isDone: false});
        }
    };

    const doneItem = (id) => {
        const itemIndex = todoList.findIndex((item) => item.id === id);
        const todoListItem = todoList[itemIndex];
        const changedItem  = {...todoListItem, isDone: !todoListItem.isDone};
        api.put(id, changedItem).then((resp) => {
            setTodoList([...todoList.slice(0, itemIndex), {...resp.data}, ...todoList.slice(itemIndex + 1)]);
        });
    };

    const deleteItem = (id) => {
        api.delete(id).then((resp) => {
            const itemIndex = todoList.findIndex((item) => item.id === resp.data.id);
            setTodoList([...todoList.slice(0, itemIndex), ...todoList.slice(itemIndex + 1)]);
        });
    };

    return (
        <>
            <div className='container' style={openForm ? {pointerEvents: 'none', opacity: '.3'}: null}>
                <header className='header'>What do I want to do today?</header>
                <button className='add-btn' onClick={openModalForm}>Add item</button>
                <TodoList todoList={todoList}
                          onDone={doneItem}
                          onDeleteItem={deleteItem}
                          onEditItem={editItem}
                />
            </div>
            {openForm? <ModalForm todoItem={todoItem}
                                  onCancelModalForm={cancelModalForm}
                                  onAddItem={addItem}
                                  onChangeItem={changeItem}
            /> : null}
        </>
    );
};

export default App;