import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { setLocalStorage } from '../../account/localStorageService';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CustomizedDialogs = ({ quizId }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    setOpen(false);
    setLocalStorage('currentQuiz', quizId);
    history.push(`/quizzes/${quizId}`)
  };

  return (
    <div>
      <Button variant="outlined" color="default" className='category_quizzes_solve_button' onClick={handleClickOpen}>
        Solve
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Are you sure?
        </DialogTitle>
        <DialogContent >
          <Typography gutterBottom>
            You only have 1 attempt at solving this quiz!
            If your time runs out or you close your browser tab the quiz will be automatically be sumbited with the answers you have given so far.
          </Typography>
          <Typography gutterBottom>
            Are you sure you want to start now?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomizedDialogs;