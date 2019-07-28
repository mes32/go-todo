import React from 'react';
import PropTypes from 'prop-types';

import StyledParagraph from './style';
import Task from '../../classes/Task';

function TodoListTask(props) {
    return (
        <StyledParagraph complete={props.task.complete}>
            {props.task.description}
        </StyledParagraph>
    )
}

TodoListTask.propTypes = {
    task: PropTypes.instanceOf(Task)
};

export default TodoListTask;