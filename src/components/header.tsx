import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    createStyles,
    Theme,
  } from "@material-ui/core";
  import BarChartIcon from '@material-ui/icons/BarChart';
  import React, { Component } from "react";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(4),
    },
    iconChart: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);


export default function Header(){
    const classes = useStyles(); 
    
    return (
        <div className={classes.root}>
            <AppBar position="static">
            <Toolbar>
                <BarChartIcon className={classes.iconChart}/>
                <Typography variant="h6" className={classes.title}>
                    Parcoursup - Statistiques
                </Typography>
            </Toolbar>
            </AppBar>
        </div>
        );
    
}