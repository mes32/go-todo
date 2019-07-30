import styled from 'styled-components';

const TodoListTask = styled.div`
    display: block;
    margin: 0 0 1.2rem 4px;
    font-size: 1.2rem;
    color: ${props => props.complete ? 'gray' : 'black'};
`;

export default TodoListTask;