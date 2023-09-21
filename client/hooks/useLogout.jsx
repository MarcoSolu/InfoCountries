import { useRouter } from "next/router"
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useLogin } from "./useLogin";

const useLogout = () => {

    const router = useRouter();

    const { dispatch } = useContext(AuthContext);

    const logout = () => {
        console.log(localStorage);
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        router.push('/login');
    }

  return { logout };
}

export default useLogout;