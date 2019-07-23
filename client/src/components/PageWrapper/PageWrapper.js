import React from 'react';
import PageWrapperStyle from './style';

function PageWrapper(props) {
    return (
        <PageWrapperStyle>
            {props.children}
        </PageWrapperStyle>
    );
}

export default PageWrapper