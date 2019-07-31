import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TodoListTask from './TodoListTask';

import TaskGroup from '../classes/TaskGroup';


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

const StyledDiv = styled.div`
    margin: 0 20px;
    h3 {
        color: ${props => props.color};
        border-bottom: 2px solid ${props => props.color};
        padding-left: 4px;
    }
`;

export default TodoListGroup;