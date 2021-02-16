import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Helmet } from "react-helmet";
import { Button, Container, Grid } from "@material-ui/core";


import { createMuiTheme, ThemeProvider, createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import  About from "./components/about";
import  Header  from "./components/header";



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
    root: {
      backgroundColor: "#edf3fc",
      padding: 0,
    },
  }),
);




function App() {
  const classes = useStyles(); 
  
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.root}>
        <Helmet>
            <title>Parcoursup - Statistiques</title>
            <meta name="description" content="Visualiseur des données publiques de Parcoursup" />
          </Helmet>
        <Header></Header>
        <Grid 
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch">
          <About></About>
          <Grid item>
            <p>
              Hello world
            </p>
          <Button color="primary">Test</Button>
          </Grid>
        </Grid>

      </Container>
    </ThemeProvider>
  );
}

export default App;
