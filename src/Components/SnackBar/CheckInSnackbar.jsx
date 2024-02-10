import {Alert, Snackbar} from "@mui/material";
import * as React from "react";

export const CheckInSnackbar = ({open, onClose}) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose();
    };

   return(
       <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
           <Alert
               onClose={handleClose}
               severity={"success"}
               icon={false}
               sx={{ width: '100%' }}
           >
               {"Child checked in"}
           </Alert>
       </Snackbar>
   )
}