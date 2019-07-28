import React from 'react';
import PropTypes from 'prop-types';

import Task from '../../classes/Task';

function TodoListTask(props) {
    return (
        <div>
            {props.task.complete ? <p><strong>{props.task.description}</strong></p> : <p style={{color: 'gray'}}><strong>{props.task.description}</strong></p>}
        </div>
    )
}

TodoListTask.propTypes = {
    task: PropTypes.instanceOf(Task)
};

export default TodoListTask;