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
    height: 100vh;
    overflow: hidden;
`;

export default PageWrapper