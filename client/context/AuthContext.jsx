import React, { createContext, useReducer, useEffect } from "react";

const initialUser = null;

export const AuthContext = createContext({
  userData: initialUser,
  dispatch: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        name: action.payload?.name ?? "",
        email: action.payload?.email ?? "",
        token: action.payload?.token ?? "",
        location: action.payload?.location ?? null,
        id: action.payload?.id ?? "",
        isLoggedIn: true
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false
      }
    case "CHANGE_PASSWORD":
      return {
        ...state,
        passwordChangeSuccess: action.payload.success,
        passwordChangeMessage: action.payload.message,
      };
    case "CLEAR_PASSWORD_RESET_MESSAGE":
      return {
        ...state,
        passwordChangeSuccess: undefined,
        passwordChangeMessage: undefined,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [userData, dispatch] = useReducer(authReducer, initialUser);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.token) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

