import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
    token: "",
    refreshToken: "",
    username: "",
    userRole: "",
    email: ""
});

export {useGlobalState, setGlobalState}
