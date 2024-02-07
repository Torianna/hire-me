import {useChildren} from "../../Querries/useChildren";
import {Avatar, Box, List, ListItemAvatar, ListItemButton, ListItemText, Typography} from "@mui/material";
import dayjs from "dayjs";
import {useChildrenMutations} from "../../Querries/useChildrenMutations";

export const ChildrenList = () => {
    const {data} = useChildren();
    const {checkIn, checkOut} = useChildrenMutations();

    return (
        <Box sx={{width: '100%', maxWidth: 500}}> <Typography align={'left'} variant="h4" gutterBottom>
            Children of Famly
        </Typography>
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {data?.children?.map((child) =>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar alt={child.name.fullName} src={child.image?.small ?? ''}/>
                        </ListItemAvatar>
                        <ListItemText primary={child.name.fullName}
                                      secondary={child.birthday ? dayjs(child.birthday).format('MMM DD, YYYY') : ''}/>
                    </ListItemButton>)

                }
            </List>
        </Box>
    )
}