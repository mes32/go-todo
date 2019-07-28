import styled from 'styled-components';

const TodoListTask = styled.p`
    margin: inherit 20px;
    font-size: 1.2rem;
    color: ${props => props.complete ? 'gray' : 'black'};
`;

export default TodoListTask;