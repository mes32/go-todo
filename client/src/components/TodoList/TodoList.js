import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

import TaskGroup from '../../classes/TaskGroup';
import TodoListGroup from '../TodoListGroup';

function TodoList(props) {
    return (
        <div>
            {props.taskGroups.map(
                group => <TodoListGroup key={group.id} group={group} />
            )}
        </div>
    );
}

TodoList.propTypes = {
    taskGroups: PropTypes.arrayOf(PropTypes.instanceOf(TaskGroup))
};

export default TodoList;
