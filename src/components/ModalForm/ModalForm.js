import React from 'react';
import './ModalForm.css';

const ModalForm = ({todoItem, onCancelModalForm, onAddItem, onChangeItem}) => {

    const onChangeInput = (e) => {
        onChangeItem({
            [e.target.name]: e.target.value
        });
    };

    const onSaveItem = (e) => {
        e.preventDefault();
        onAddItem(todoItem);
    };

    return (
        <form className='modal-form' onSubmit={onSaveItem}>
            <div className='input-wrap'>
                <label htmlFor='title'>Title:</label>
                <input type='text' value={todoItem.title} name='title' maxLength='30' onChange={onChangeInput} required='required'/>
            </div>
            <div className='btn-wrap'>
                <button type='submit' className='save-btn'>Save</button>
                <button  className='cancel-btn' onClick={onCancelModalForm}>Cancel</button>
            </div>
        </form>
    );
};

export default ModalForm;
