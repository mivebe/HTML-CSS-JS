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

const SubmitConfirmDialog = ({ submitQuiz }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button className='solve_quiz_submit_quiz_button' variant="outlined" color="primary" onClick={handleClickOpen}>
        Submit Quiz
      </Button>
      <Dialog className='solve_quize_submit_dialog_modal' onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Are you sure you want to submit your answers?
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You only have 1 attempt at solving this quiz.
            Once you submit, you can't go back and change your answers!
          </Typography>
          <Typography gutterBottom>
            Make sure you have carefully read all the questions and answers.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClose();
            submitQuiz();
          }} color="primary">
            Yes, I am sure
          </Button>
          <Button onClick={handleClose} color="primary">
            No, I will check my answers
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SubmitConfirmDialog;