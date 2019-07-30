import React from 'react';
import PropTypes from 'prop-types';

import StyledParagraph from './style';
import CheckBox from '../CheckBox';
import Task from '../../classes/Task';

function TodoListTask({ task, color }) {
    const onChange = () => {
        console.log('In TodoListTask onChange()');
    }
    return (
        <StyledParagraph complete={task.complete}>
            <CheckBox checked={task.complete} onChange={onChange} color={color} /> {task.description}
        </StyledParagraph>
    )
}

TodoListTask.propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    color: PropTypes.string.isRequired
};

export default TodoListTask;