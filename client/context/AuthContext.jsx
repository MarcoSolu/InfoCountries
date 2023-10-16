import React, { createContext, useReducer, useEffect } from "react";

const initialUser = null;

export const AuthContext = createContext({
  userData: initialUser,
  dispatch: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const existingFavoriteCountries = state ? state.favoriteCountries : [];
      return {
        name: action.payload?.name ?? "",
        email: action.payload?.email ?? "",
        token: action.payload?.token ?? "",
        location: action.payload?.location ?? null,
        id: action.payload?.id ?? "",
        isLoggedIn: true,
        isAuthenticated: true,
        favoriteCountries: existingFavoriteCountries
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        isAuthenticated: false
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
    case "ADD_FAVORITE_COUNTRY":
      return {
        ...state,
        favoriteCountries: [...state.favoriteCountries, action.payload.country],
      };
    case "REMOVE_FAVORITE_COUNTRY":
      return {
        ...state,
        favoriteCountries: state.favoriteCountries.filter(country => country !== action.payload.country),
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

