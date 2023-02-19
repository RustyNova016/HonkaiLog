import React, {PropsWithChildren} from 'react';

export const Wrapper: React.FC = function ({children}: PropsWithChildren) {
    return <>
        <div style={{height: "200px", width: "300px", backgroundColor: "#444444"}}>
            {children}
        </div>
    </>;
};