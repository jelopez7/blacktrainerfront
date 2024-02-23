import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Icon, Image, Menu as Menuweb, Modal } from "semantic-ui-react";
import { startLogout } from "../../../actions/auth";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MenuMovil() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showModal, setshowModal] = useState(false);
  const router = useRouter();

  const onShowModal = () => setshowModal(true);

  const logout = () => {
    dispatch(startLogout());
    router.replace("/auth");
  };

  return (
    <div className="menuMovil">
      <div className="content">
        <Grid>
          <Grid.Column width={7} className="menuMovil__left">
            <Logo />
          </Grid.Column>
          <Grid.Column width={9} className="menuMovil__right">
            <Icon
              size="big"
              onClick={onShowModal}
              link
              color="yellow"
              name={showModal ? "close" : "options"}
            />
          </Grid.Column>
        </Grid>
      </div>
      <ModalBasic show={showModal} setShow={setshowModal} size="small">
        <Menuweb vertical>
          {user ? (
            <>
              <Menuweb.Item className="m-0" onClick={logout}>
                <Icon name="power off" />
                Cerrar sesión
              </Menuweb.Item>
            </>
          ) : (
            <Link href="/auth">
              <Menuweb.Item>
                <Icon name="user outline" />
                Iniciar sesión
              </Menuweb.Item>
            </Link>
          )}
        </Menuweb>
      </ModalBasic>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/">
      <Image className="logo" src="/logo.png" alt="animecol" />
    </Link>
  );
}

function ModalBasic({ show, setShow, children, ...rest }) {
  const nodeRef = useRef(null);
  const onClose = () => setShow(false);

  return (
    <>
      <Modal
        centered={false}
        ref={nodeRef}
        className="basic-modal"
        open={show}
        onClose={onClose}
        {...rest}
      >
        <Modal.Content>{children}</Modal.Content>
      </Modal>
    </>
  );
}
