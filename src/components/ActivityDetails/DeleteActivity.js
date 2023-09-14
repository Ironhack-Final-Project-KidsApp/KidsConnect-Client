import { useNavigate } from "react-router";
import activityService from "../../services/activity.services";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';

const DeleteActivity = (props) => {

    const navigate = useNavigate();
    const handleDelete = async () => {
        await activityService.deleteActivity(props.idactivity);
        navigate(`/profile/${props.userid}`)
    };
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button
                variant="contained"
                color="error"
                sx={{ mt: 2, width: '30%' }}
                onClick={handleClickOpen}
                >
                Delete Activity
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this activity?"}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
          <CloseIcon />
        </IconButton>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this activity? This action cannot be undone. Please confirm 'Yes' to proceed with the deletion, or 'No' to cancel.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDelete} variant="outlined" color="error" startIcon={<DeleteIcon />}>Yes</Button>
                <Button onClick={handleClose} autoFocus variant="outlined" color="success" startIcon={<FavoriteIcon />}>
                    No
                </Button>
                </DialogActions>
            </Dialog>
        </div>   
    )
}
 
export default DeleteActivity;