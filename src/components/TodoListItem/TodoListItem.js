import React from 'react';
import './TodoListItem.css';

const TodoListItem = ({item, onDone, onDeleteItem, onEditItem}) => {

    const editItem = (id) => (e) => {
        e.stopPropagation();
        onEditItem(id);
    };

    const deleteItem = (id) => (e) => {
        e.stopPropagation();
        onDeleteItem(id);
    };


    return (
            <div className='todo-item'
                 onClick={() => onDone(item.id)}
                 style={item.isDone ? {backgroundColor: '#ccc', opacity: '0.5'}: null}
            >
                <span className='item-title' style={item.isDone ? {textDecoration: 'line-through'}: null}>{item.title}</span>
                <div className='btn-wrap'>
                    <button className='edit-btn' onClick={editItem(item.id)}>Edit</button>
                    <button className='del-btn' onClick={deleteItem(item.id)}>Del</button>
                </div>
            </div>
    );
};

export default TodoListItem;
