import { startChecking } from "@/actions/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Dispatch({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  return <>{children}</>;
}
