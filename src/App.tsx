import { useEffect, useState } from 'react';

import './App.css';

import data from "./data/parcoursup2019.json"

import { Helmet } from "react-helmet";

import { Container, Grid } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";


import { Header, DataViewer, Comparer, MapWrapper } from './components';
import { DataType } from './type/DataType';
import { theme } from './theme/theme';

function App() {
  const [selectedRows, setSelectedRows] = useState<Array<unknown>>([])

  const [rows, setRows] = useState([]);
  const [dataAttribution, setDataAttribution] = useState("Parcoursup - 2019");
   
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
        <Container><Grid 
          container
          direction="column"
          spacing={10}
          alignContent="stretch"
          alignItems="stretch"
        >
          <Grid item>
            <DataViewer setSelectedRows={setSelectedRows} rows={rows}></DataViewer>
          </Grid>
          <Grid item>
            <MapWrapper selectedData={selectedRows as DataType[]} dataAttribution={dataAttribution} />
          </Grid>
          <Grid item>
            <Comparer selectedData={selectedRows as DataType[]} dataAttribution={dataAttribution}/>
          </Grid>
        </Grid>
        </Container>
    </ThemeProvider>
  );
}

export default App;
