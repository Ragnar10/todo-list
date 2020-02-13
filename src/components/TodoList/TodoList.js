import React from 'react';
import TodoListItem from "../TodoListItem/TodoListItem";
import './TodoList.css';

const TodoList = ({todoList, onDone, onDeleteItem,onEditItem}) => {
    return (
        <div className='list-wrap'>
            {
                todoList.map((item) => {
                    return <TodoListItem  key={item.id}
                                          item={item}
                                          onDone={onDone}
                                          onDeleteItem={onDeleteItem}
                                          onEditItem={onEditItem}
                    />;
                })
            }
        </div>
    );
};

export default TodoList;
