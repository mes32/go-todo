import React from 'react';
import PropTypes from 'prop-types';

import TaskGroup from '../../classes/TaskGroup';
import TodoListTask from '../TodoListTask';

function TodoListGroup(props) {
    return (
        <div>
            <h3>{props.group.name}</h3>
            {props.group.tasks.map(
                task => <TodoListTask key={task.id} task={task} />
            )}
        </div>
    )
}

TodoListGroup.propTypes = {
    group: PropTypes.instanceOf(TaskGroup)
};

export default TodoListGroup;