import {useChildren} from "../../Querries/useChildren";
import {
    Avatar, Box,
    Button,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText, Pagination,
    Paper,
} from "@mui/material";
import dayjs from "dayjs";
import {useChildrenMutations} from "../../Querries/useChildrenMutations";
import {useState} from "react";
import * as React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Grid from '@mui/material/Unstable_Grid2'
import CheckIcon from '@mui/icons-material/Check';
import {Header} from "../Header/Header";
import {CheckInSnackbar} from "../SnackBar/CheckInSnackbar";
import {CheckOutSnackbar} from "../SnackBar/CheckOutSnackbar";

export const ChildrenList = () => {
    const {query, page, setPage, pageSize, children} = useChildren();
    const {data,} = query;
    const [showCheckIn, setShowCheckIn] = useState(null)
    const {checkIn, checkOut} = useChildrenMutations();

    const checkInYourChild = (id) => {
        checkIn.mutate(id, {
            onSuccess: () => {
                setShowCheckIn(null);
            }
        })
    }

    const checkOutYourChild = (id) => {
        checkOut.mutate(id, {
            onSuccess: () => {
                setShowCheckIn(null);
            }
        })
    }

    return (
        <Paper sx={{width: '100%', maxWidth: showCheckIn ? 500 : 360}}>
            <Header/>
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {children?.map(({childId, name, image, birthday, checkedIn}) =>
                    <Grid container spacing={2}>
                        <Grid item xs={10} style={{flexDirection: 'row'}}>
                            <ListItemButton key={childId} onClick={() => setShowCheckIn(childId)}>
                                <ListItemAvatar>
                                    <Avatar alt={name.fullName} src={image?.small ?? ''}/>
                                </ListItemAvatar>
                                <ListItemText primary={name.fullName}
                                              secondary={birthday ? dayjs(birthday).format('MMM DD, YYYY') : ''}/>
                                {checkedIn && <CheckIcon color="success"/>}
                            </ListItemButton>

                        </Grid>
                        {showCheckIn === childId &&
                            <Grid item xs={2} style={{alignSelf: 'center'}}>
                                {checkedIn ?
                                    <Button variant="contained" onClick={() => checkOutYourChild(childId)}
                                            color="error" style={{width: '150px', margin: 0}} endIcon={<LogoutIcon/>}>
                                        Check out
                                    </Button>
                                    : <Button variant="contained" onClick={() => checkInYourChild(childId)}
                                              color="success" style={{width: '150px', margin: 0}}
                                              endIcon={<LoginIcon/>}>
                                        Check in
                                    </Button>}
                            </Grid>}
                    </Grid>
                )}
            </List>
            <Box sx={{display: 'flex', justifyContent: 'center', padding: '2em 1em'}}>
                <Pagination count={Math.ceil(data?.children.length / pageSize)} color="secondary" page={page}
                            onChange={(event, value) => setPage(value)}/>
            </Box>
            <CheckInSnackbar open={checkIn.isSuccess } onClose={checkIn.reset}/>
            <CheckOutSnackbar open={checkOut.isSuccess } onClose={checkOut.reset}/>
        </Paper>
    )
}