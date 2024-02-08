import {useChildren} from "../../Querries/useChildren";
import {
    Avatar,
    Button,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import dayjs from "dayjs";
import {useChildrenMutations} from "../../Querries/useChildrenMutations";
import {useState} from "react";
import LoginIcon from '@mui/icons-material/Login';
import Grid from '@mui/material/Unstable_Grid2'
import CheckIcon from '@mui/icons-material/Check';

export const ChildrenList = () => {
    const {data} = useChildren();
    const [showCheckIn, setShowCheckIn] = useState(null)
    const {checkIn, checkOut} = useChildrenMutations();
    console.log('showCheckIn', showCheckIn)
    console.log('data', data)

    const checkInYourChild = (id) => {
        checkIn.mutate(id, {
            onSuccess: ()=> setShowCheckIn(null)
        })
    }

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
                    <Button variant="contained" onClick={()=>checkInYourChild(child.childId)} color="success" style={{width: '150px', margin: 0}} endIcon={<LoginIcon/>}>
                        Check in
                    </Button>
                </Grid>}
            </Grid>
                )}
            </List>
        </Paper>
    )
}