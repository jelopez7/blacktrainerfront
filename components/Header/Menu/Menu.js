import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Icon, Image, Menu as Menuweb } from "semantic-ui-react";
import { startLogout } from "../../../actions/auth";
import { useRouter } from "next/router";

export default function Menu() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    dispatch(startLogout());
    router.push("/auth");
  };

  return (
    <div className="menu">
      <div className="content">
        <Grid>
          <Grid.Column width={2} className="menu__left">
            <Logo />
          </Grid.Column>
          <Grid.Column width={9} className="menu__mid">
            <Menuoptions user={!!user} logout={logout} />
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/">
      <Image className="logo" src="/logo.png" alt="Blackfitness" />
    </Link>
  );
}

function Menuoptions({ user, logout }) {
  return (
    <Menuweb>
      {user ? (
        <Menuweb.Item className="m-0" onClick={logout}>
          <Icon name="power off" />
        </Menuweb.Item>
      ) : (
        <Link href="/auth">
          <Menuweb.Item>
            <Icon name="user outline" />
            Iniciar sesión
          </Menuweb.Item>
        </Link>
      )}
    </Menuweb>
  );
}
