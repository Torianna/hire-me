import {useChildren} from "../../Querries/useChildren";
import {
    Avatar,
    Button, IconButton,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper, Snackbar,
    Typography
} from "@mui/material";
import dayjs from "dayjs";
import {useChildrenMutations} from "../../Querries/useChildrenMutations";
import {useState} from "react";
import * as React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Grid from '@mui/material/Unstable_Grid2'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const ChildrenList = () => {
    const {data} = useChildren();
    const [showCheckIn, setShowCheckIn] = useState(null)
    const {checkIn, checkOut} = useChildrenMutations();
    const [open, setOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] =  useState('Child checked in');


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const checkInYourChild = (id) => {
        setSnackBarMessage('Child checked in')
        checkIn.mutate(id, {
            onSuccess: ()=> {
                setShowCheckIn(null);
                handleClick()
            }
        })
    }

    const checkOutYourChild = (id) => {
        setSnackBarMessage('Child checked out')
        checkOut.mutate(id, {
            onSuccess: ()=> {
                setShowCheckIn(null);
                handleClick()
            }
        })
    }

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Paper sx={{width: '100%', maxWidth: 500}}>
            <Typography align={'left'} variant="h4" gutterBottom>
            Children of Famly
        </Typography>
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {data?.children?.map((child) =>
            <Grid container spacing={2}>
                <Grid item xs={10} style={{flexDirection: 'row'}}>
                    <ListItemButton key={child.childId} onClick={()=>setShowCheckIn(child.childId)}>
                        <ListItemAvatar>
                            <Avatar alt={child.name.fullName} src={child.image?.small ?? ''}/>
                        </ListItemAvatar>
                        <ListItemText primary={child.name.fullName}
                                      secondary={child.birthday ? dayjs(child.birthday).format('MMM DD, YYYY') : ''}/>
                        {child.checkedIn && <CheckIcon color="success" />}
                    </ListItemButton>

                </Grid>
                {showCheckIn === child.childId &&
                <Grid item xs={2} style={{alignSelf: 'center'}}>
                    { child.checkedIn ?
                        <Button variant="contained" onClick={()=>checkOutYourChild(child.childId)} color="error" style={{width: '150px', margin: 0}} endIcon={<LogoutIcon/>}>
                            Check out
                        </Button>
                    :<Button variant="contained" onClick={()=>checkInYourChild(child.childId)} color="success" style={{width: '150px', margin: 0}} endIcon={<LoginIcon/>}>
                        Check in
                    </Button>}
                </Grid>}
            </Grid>
                )}
            </List>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackBarMessage}
                action={action}
            />
        </Paper>
    )
}