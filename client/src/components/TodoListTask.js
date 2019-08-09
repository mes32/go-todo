import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CheckBox from './CheckBox';
import Task from '../classes/Task';
import EditButton from './EditButton';

function TodoListTask({ task, color, completeTask, editMode }) {
    const handleChange = () => {
        completeTask(task.id, !task.complete);
    }

    const stopPropagation = (event) => {
        event.stopPropagation();
    }

    return (
        <StyledDiv complete={task.complete} onClick={handleChange}>
            <span>
                <CheckBox checked={task.complete} onChange={handleChange} color={color} />
                <span className="description">{task.description}</span>
            </span>
            <span>
                {editMode ?
                    <NonwrappingSpan onClick={stopPropagation}>
                        <EditButton value="DELETE" onClick={() => { }} />
                        <EditButton value="▼" onClick={() => { }} />
                        <EditButton value="▲" onClick={() => { }} />
                    </NonwrappingSpan>
                    : ''
                }
            </span>
        </StyledDiv>
    )
}

TodoListTask.propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    color: PropTypes.string.isRequired,
    completeTask: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired
};

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;

    cursor: pointer;

    margin: 0 0 1.2rem 4px;
    font-size: 1.2rem;
    color: ${props => props.complete ? 'gray' : 'black'};
    font-weight: ${props => props.complete ? 400 : 600};

    .description {
        margin-left: 4px;
    }
`;

const NonwrappingSpan = styled.span`
    white-space: pre;
`;

export default TodoListTask;