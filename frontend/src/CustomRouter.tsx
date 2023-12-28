import { Router } from "react-router-dom";
import { useLayoutEffect, useState } from 'react';

export const CustomRouter = ({ history, ...props }: any) => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location
    });

    useLayoutEffect(() => history.listen(setState), [history]);
    
    return (
        <Router
            {...props}
            location={history.location}
            navigationType={state.action}
            navigator={history}
        />
    );
};