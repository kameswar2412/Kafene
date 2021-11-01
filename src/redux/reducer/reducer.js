const initialState = {
    
    loginStatus:JSON.parse(localStorage.getItem("logInStatus")) || false

}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
    switch (type) {

    case "LOG_IN_STATUS":
        return { ...state, loginStatus:payload }

    default:
        return state
    }
}
