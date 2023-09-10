import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Marker } from '@react-google-maps/api';

const GooglemapsPopover = ({title, position, clusterer}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
      <Marker position={position} aria-describedby={id} clusterer={clusterer} onClick={e=>handleClick(e)}/>
      <Popover
        anchorReference="anchorPosition"
        anchorPosition={{ top: 200, left: 400 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>{title}</Typography>
      </Popover>
    </div>
  );
}
 
export default GooglemapsPopover;