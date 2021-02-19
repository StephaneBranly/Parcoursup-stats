import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Helmet } from "react-helmet";
import { Button, Container, Grid } from "@material-ui/core";


import { createMuiTheme, ThemeProvider, createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import  About from "./components/about";
import  Header  from "./components/header";
import DataViewer from './components/dataViewer';



export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ba2d1a",
    },
    secondary: {
      main: "#2f60d4",
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      padding: theme.spacing(2),
    }
  }),
);




function App() {
  const classes = useStyles(); 
  
  return (
    <ThemeProvider theme={theme}>
        <Helmet>
            <title>Parcoursup - Statistiques</title>
            <meta name="description" content="Visualiseur des données publiques de Parcoursup" />
          </Helmet>
        <Header></Header>
        <Grid 
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          className={classes.grid}
          spacing={2}
        >
          <About></About>
          <Grid item>
            <DataViewer></DataViewer>
          </Grid>
        </Grid>
    </ThemeProvider>
  );
}

export default App;
