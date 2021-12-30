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
      main: "#E84545",
    },
    secondary: {
      main: "#2B2E4A",
    },
  },
});

export const colors = ["#FF8370", "#00B1B0", "#FEC84D", "#E42256", "#54A2D2"]

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
          spacing={10}
          alignContent="stretch"
          alignItems="stretch"
          className={classes.grid}
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
