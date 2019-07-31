import React from 'react';
import styled from 'styled-components';

function PageWrapper(props) {
    return (
        <StyledDiv>
            {props.children}
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    /* max-width: 600px; */
    margin-left: auto;
    margin-right: auto;

    height: 100vh;
    overflow: hidden;
`;

export default PageWrapper