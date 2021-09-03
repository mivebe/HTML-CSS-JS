import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const PaginationBar = ({ setPage, pagesCount, page }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Pagination count={pagesCount} page={page} onChange={(ev, value) => setPage(value)} />
        </div>
    );
}

export default PaginationBar;