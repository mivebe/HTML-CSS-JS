import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const GenresTable = ({genre,setGenre })=> {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    return (
        <div>
            <Button aria-controls="simple-menu"  aria-haspopup="true" size="large" onClick={handleClick}>
                {genre}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { setGenre('Action and Adventure');handleClose()}}>Action and Adventure</MenuItem>
                <MenuItem onClick={() => { setGenre('Biographies');handleClose()}}>Biographies</MenuItem>
                <MenuItem onClick={() => { setGenre('Classics');handleClose()}}>Classics</MenuItem>
                <MenuItem onClick={() => { setGenre('Comics');handleClose()}}>Comics</MenuItem>
                <MenuItem onClick={() => { setGenre('Comedy');handleClose()}}>Comedy</MenuItem>
                <MenuItem onClick={() => { setGenre('Detective and Mystery');handleClose()}}>Detective and Mystery</MenuItem>
                <MenuItem onClick={() => { setGenre('Fantasy');handleClose()}}>Fantasy</MenuItem>
                <MenuItem onClick={() => { setGenre('Horror');handleClose()}}>Horror</MenuItem>
                <MenuItem onClick={() => { setGenre('Romance');handleClose()}}>Romance</MenuItem>
                <MenuItem onClick={() => { setGenre('Science Fiction');handleClose()}}>Science Fiction</MenuItem>
                <MenuItem onClick={() => { setGenre('Thrillers');handleClose()}}>Thrillers</MenuItem>
                <MenuItem onClick={() => { setGenre('Cookbooks');handleClose()}}>Cookbooks</MenuItem>
                <MenuItem onClick={() => { setGenre('History');handleClose()}}>History</MenuItem>
                <MenuItem onClick={() => { setGenre('Poetry');handleClose()}}>Poetry</MenuItem>
                <MenuItem onClick={() => { setGenre('Self-Help');handleClose()}}>Self-Help</MenuItem>
                <MenuItem onClick={() => { setGenre('Mythology');handleClose()}}>Mythology</MenuItem>
            </Menu>
        </div>
    );
}

export default GenresTable;