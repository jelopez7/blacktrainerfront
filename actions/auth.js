import { httpConToken, httpSinToken } from "../helpers/http";
import { types } from "../types/types";
import { toast } from "react-toastify";
import { getToken, setToken } from "../utils/token";

export const startChecking = () => {
  return async (dispatch) => {
    try {
      if (getToken()) {
        const data = await getMeApi();
        if (data) {
          const send = {
            token: getToken(),
            user: data,
          };
          dispatch(Login(send));
        } else {
          dispatch(Login(send));
        }
      } else {
        dispatch(checkingFinish());
      }
    } catch (error) {
      console.log(error);
      dispatch(checkingFinish());
      return null;
    }
  };
};

export const updateUserApi = (idUser, formData, setLoading) => {
  return async (dispath) => {
    setLoading(true);
    try {
      const { data } = await httpConToken.put(`/api/users/${idUser}`, formData);
      const dataEnv = {
        user: data,
      };
      dispath(updateUser(dataEnv));
      setLoading(false);
      return data ? data : null;
    } catch (error) {
      console.log(error);
      toast.error("puede que el dato que ingresasate ya este");
      setLoading(false);
    }
  };
};

export const startLogin = (formData) => {
  return async (dispath) => {
    try {
      const { data } = await httpSinToken.post("/admin/login", formData);
      if (data) {
        dispath(Login(data.data));
        setToken(data.data.token);
      }
    } catch (error) {
      console.log(error);
      toast.error("Código o Contraseña inválida");
    }
  };
};

export async function getMeApi() {
  try {
    const { data } = await httpConToken.get("/admin/users/me");
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const startRegister = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await httpSinToken.post(
        "/api/auth/local/register",
        formData
      );
      if (data) {
        setToken(data.jwt);
        dispatch(Login(data));
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(Logout());
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const Login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const updateUser = (user) => ({
  type: types.authLogin,
  payload: user,
});

const Logout = () => ({
  type: types.authLogout,
});
