import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TodoListTask from './TodoListTask';

import TaskGroup from '../classes/TaskGroup';

const darken = (colorString) => {
    const coefficient = 0.85;
    let red = parseInt(coefficient * parseInt(colorString.slice(1, 3), 16));
    let green = parseInt(coefficient * parseInt(colorString.slice(3, 5), 16));
    let blue = parseInt(coefficient * parseInt(colorString.slice(5, 7), 16));
    
    return '#' + red.toString(16) + green.toString(16) + blue.toString(16);
};

function TodoListGroup({ group, color, completeTask }) {
    return (
        <div>
            <HeadingDiv color={darken(color)}>
                <div><h3>{group.name}</h3></div>
                <div>EDIT</div>
            </HeadingDiv>
            {group.tasks.map(
                task => <TodoListTask key={task.id} task={task} color={color} completeTask={completeTask} />
            )}
        </div>
    )
}

TodoListGroup.propTypes = {
    group: PropTypes.instanceOf(TaskGroup).isRequired,
    color: PropTypes.string.isRequired,
    completeTask: PropTypes.func.isRequired
};

const HeadingDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;

    padding: 0 4px;
    margin: 1.8rem 0 1.2rem 0;
    border-bottom: 2px solid ${props => props.color};
    h3 {
        color: ${props => props.color};
        margin: 0;
    }
`;

export default TodoListGroup;