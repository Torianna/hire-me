import {Alert, Snackbar} from "@mui/material";
import * as React from "react";

export const CheckOutSnackbar = ({open, onClose}) => {
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
               severity={"error"}
               icon={false}
               sx={{ width: '100%' }}
           >
               {"Child check out"}
           </Alert>
       </Snackbar>
   )
}