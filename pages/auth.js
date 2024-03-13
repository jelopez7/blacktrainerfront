import LoginForm from "@/components/Auth/LoginForm";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Auth() {
  const [selectedForm, setSelectedForm] = useState("login");
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (user && window !== "undefined") {
      router.push("/"); // Redirige a la página de inicio de sesión si el usuario no está autenticado
    }
  }, [user, router]);

  const handleForm = () => {
    switch (selectedForm) {
      case "login":
        return <LoginForm />;
    }
  };

  return (
    <div className="auth" style={{ backgroundImage: `url('./fondo.jpg')` }}>
      <div className="auth__dark"></div>
      <div className="auth__box">
        <div className="auth__box-log">
          <Link href="/">
            <img src="./logo.PNG" alt="Blacktrainer" />
          </Link>

          {handleForm()}
        </div>
      </div>
    </div>
  );
}
