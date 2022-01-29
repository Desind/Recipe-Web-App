import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
    token: "",
    refreshToken: "",
    username: "",
    userRole: "",
    email: "",
    userId: ""
});

export {useGlobalState, setGlobalState}



