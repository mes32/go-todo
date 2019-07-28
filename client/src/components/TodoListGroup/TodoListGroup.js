import React from 'react';
import PropTypes from 'prop-types';

import StyledDiv from './style';
import TaskGroup from '../../classes/TaskGroup';
import TodoListTask from '../TodoListTask';

function TodoListGroup(props) {
    return (
        <StyledDiv color={props.color}>
            <h3>{props.group.name}</h3>
            {props.group.tasks.map(
                task => <TodoListTask key={task.id} task={task} color={props.color} />
            )}
        </StyledDiv>
    )
}

TodoListGroup.propTypes = {
    group: PropTypes.instanceOf(TaskGroup).isRequired,
    color: PropTypes.string.isRequired
};

export default TodoListGroup;