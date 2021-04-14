import React from "react";

import Toastify from "./index";
import { toast } from "react-toastify";

function Success(id,text,autoClose=2500,draggable = true,icon = 'fas fa-check'){
    if (toast.isActive(id)) {
    } else {
        toast.success(
            <Toastify
              className={icon}
              description={text}
            />,
            { toastId: id, autoClose, draggable  }
          );
    }
}
function Error(id,text,autoClose=2500,draggable = true,icon = 'fas fa-exclamation-triangle'){
    if (toast.isActive(id)) {
    } else {
        toast.error(
            <Toastify
              className={icon}
              description={text}
            />,
            { toastId: id, autoClose, draggable }
          );
    }
}
function Warn(id,text,autoClose=2500,draggable = true,icon = 'fas fa-exclamation-circle'){
    if (toast.isActive(id)) {
    } else {
        toast.warn(
            <Toastify
              className={icon}
              description={text}
            />,
            { toastId: id, autoClose, draggable }
          );
    }
}

export { Success, Error, Warn }