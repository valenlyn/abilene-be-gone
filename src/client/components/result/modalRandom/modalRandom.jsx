import React from 'react';
import styles from './style.scss'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function rand() {
  return Math.round(Math.random() * 20) - 8;
}

function getModalStyle() {
  // const top = 50 + rand();
  // const left = 50 + rand();
  const top = 40;
  let left;

  window.screen.availWidth > 600 ? left = 48 : left = 42;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    borderRadius: '5px'
  },
}));

function ModalRandom(props) {
  const [open, setOpen] = React.useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
    props.generateRandomOption();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div>

      <button onClick={handleOpen} className={styles.randomButton}>Generate random option</button>
      <Grid item xs={1}>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >

            <div style={modalStyle} className={`${classes.paper} ${styles.paper}`}>
              <p className={styles.randomOption}>{props.randomOption}</p>
            </div>

      </Modal>
      </Grid>
    </div>
  );
}

export default ModalRandom;