import React from "react";
import { useState } from "react";
import Registration from "./Registation";
import { Button, Modal } from "antd";
import MediaList from "./MediaList";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function CenteredModal(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link onClick={handleOpen} style={{ color: "white" }} to="">
        List
      </Link>

      <Modal
        title="List"
        visible={open}
        footer={null}
        onCancel={handleClose}
        centered={true}
        width={1300}
      >
        {props.type == "Registration" ? (
          <Registration close={handleClose}></Registration>
        ) : (
          <MediaList></MediaList>
        )}
      </Modal>
    </div>
  );
}

export default CenteredModal;
