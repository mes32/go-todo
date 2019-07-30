import React from 'react';
import PropTypes from 'prop-types';

import StyledDiv from './style';
import TaskGroup from '../../classes/TaskGroup';
import TodoListTask from '../TodoListTask';

function TodoListGroup({ group, color, completeTask }) {
    return (
        <StyledDiv color={color}>
            <h3>{group.name}</h3>
            {group.tasks.map(
                task => <TodoListTask key={task.id} task={task} color={color} completeTask={completeTask} />
            )}
        </StyledDiv>
    )
}

TodoListGroup.propTypes = {
    group: PropTypes.instanceOf(TaskGroup).isRequired,
    color: PropTypes.string.isRequired,
    completeTask: PropTypes.func.isRequired
};

export default TodoListGroup;