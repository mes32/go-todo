import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CheckBox from './CheckBox';
import Task from '../classes/Task';

function TodoListTask({ task, color, completeTask }) {
    const onChange = () => {
        completeTask(task.id, !task.complete);
    }
    return (
        <StyledDiv complete={task.complete}>
            <CheckBox checked={task.complete} onChange={onChange} color={color} /> <span className="description">{task.description}</span>
        </StyledDiv>
    )
}

TodoListTask.propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    color: PropTypes.string.isRequired,
    completeTask: PropTypes.func.isRequired
};

const StyledDiv = styled.div`
    display: block;
    margin: 0 0 1.2rem 4px;
    font-size: 1.2rem;
    color: ${props => props.complete ? 'gray' : 'black'};
    font-weight: ${props => props.complete ? 400 : 600};
    .description {
        margin-left: 4px;
    }
`;

export default TodoListTask;