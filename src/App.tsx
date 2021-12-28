import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import data from "./data/parcoursup2019.json"

import { Helmet } from "react-helmet";
import { Grid } from "@material-ui/core";


import { createMuiTheme, ThemeProvider, createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Header, DataViewer, Comparer } from './components';
import { DataType } from './type/DataType';



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
  const [selectedRows, setSelectedRows] = useState<Array<unknown>>([])

  const [rows, setRows] = useState([]);
   
  useEffect(() => {
    var content = (data as any).object;
    for(var i=0; i < content.length; i++){
      (content[i] as any).id = i+1;
  }
    setRows(content);
  },[]);
  
  return (
    <ThemeProvider theme={theme}>
        <Helmet>
            <title>Parcoursup - Statistiques</title>
            <meta name="description" content="Visualiseur des données publiques de Parcoursup" />
        </Helmet>
        <Header/>
        <Grid 
          container
          direction="column"
          justify="space-between"
          alignContent="stretch"
          alignItems="stretch"
          className={classes.grid}
          spacing={2}
        >
          <Grid item>
            <DataViewer setSelectedRows={setSelectedRows} rows={rows}></DataViewer>
          </Grid>
          <Grid item>
            <Comparer selectedData={selectedRows as DataType[]} />
          </Grid>
        </Grid>
    </ThemeProvider>
  );
}

export default App;
