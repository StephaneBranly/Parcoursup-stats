import React, { useState } from "react";
import { DataGrid, ColDef, ValueGetterParams, GridToolbar } from '@material-ui/data-grid';
import { Container, createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import data from "./parcoursup2019.json"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        Height: theme.spacing(60),
      },
  }),
);


const columns: ColDef[] = [
  { field: "id", type: 'number'},
  { field: "Session", hide: true},
  { field: "Statut de l’établissement de la filière de formation (public, privé…)", hide: false, width: 50},
  { field: "Code UAI de l'établissement", hide: true},
  { field: "Établissement", hide: false, width: 300},
  { field: "Code départemental de l’établissement", hide: true, type: 'number'},
  { field: "Département de l’établissement", hide: false, width: 200},
  { field: "Région de l’établissement", hide: false, width: 200},
  { field: "Académie de l’établissement", hide: false, width: 100},
  { field: "Filière de formation très agrégée", hide: false, width: 200},
  { field: "Filière de formation", hide: false, width: 200},
  { field: "Concours communs et banques d'épreuves", hide: true},
  { field: "Filière de formation détaillée", hide: true},
  { field: "Filière de formation très détaillée", hide: true},
  { field: "Lien de la formation sur la plateforme Parcoursup", hide: true},
  { field: "Coordonnées GPS de la formation", hide: true},
  { field: "Capacité de l’établissement par formation", hide: true, type: 'number'},
  { field: "Effectif total des candidats pour une formation", hide: true, type: 'number'},
  { field: "Dont effectif des candidates pour une formation", hide: true, type: 'number'},
  { field: "Effectif total des candidats en phase principale", hide: true, type: 'number'},
  { field: "Dont effectif des candidats ayant postulé en internat", hide: true, type: 'number'},
  { field: "Effectif des candidats néo bacheliers généraux en phase principale", hide: true, type: 'number'},
  { field: "Dont effectif des candidats boursiers néo bacheliers généraux en phase principale", hide: true, type: 'number'},
  { field: "Effectif des candidats néo bacheliers technologiques en phase principale", hide: true, type: 'number'},
  { field: "Dont effectif des candidats boursiers néo bacheliers technologiques en phase principale", hide: true, type: 'number'},
  { field: "Effectif des candidats néo bacheliers professionnels en phase principale", hide: true, type: 'number'},
  { field: "Dont effectif des candidats boursiers néo bacheliers professionnels en phase principale", hide: true, type: 'number'},
  { field: "Effectif des autres candidats en phase principale", hide: true, type: 'number'},
  { field: "Effectif total des candidats en phase complémentaire", hide: true, type: 'number'},
  { field: "Effectif des candidats néo bacheliers généraux en phase complémentaire", hide: true, type: 'number'},
  { field: "Effectif des candidats néo bacheliers technologique en phase complémentaire", hide: true, type: 'number'},
  { field: "Effectif des candidats néo bacheliers professionnels en phase complémentaire", hide: true, type: 'number'},
  { field: "Effectifs des autres candidats en phase complémentaire", hide: true, type: 'number'},
  { field: "Effectif total des candidats classés par l’établissement en phase principale", hide: true, type: 'number'},
  { field: "Effectif des candidats classés par l’établissement en phase complémentaire", hide: true, type: 'number'},
  { field: "Effectif des candidats classés par l’établissement en internat (CPGE)", hide: true, type: 'number'},
  { field: "Effectif des candidats classés par l’établissement hors internat (CPGE)", hide: true, type: 'number'},
  { field: "Effectif des candidats néo bacheliers généraux classés par l’établissement", hide: true, type: 'number'},
  { field: "Dont effectif des candidats boursiers néo bacheliers généraux classés par l’établissement", hide: true, type: 'number'},
  { field: "Effectif des candidats néo bacheliers technologiques classés par l’établissement", hide: true, type: 'number'},
  { field: "Dont effectif des candidats boursiers néo bacheliers technologiques classés par l’établissement", hide: true, type: 'number'},
  { field: "Effectif des candidats néo bacheliers professionnels classés par l’établissement", hide: true, type: 'number'},
  { field: "Dont effectif des candidats boursiers néo bacheliers professionnels classés par l’établissement", hide: true, type: 'number'},
  { field: "Effectif des autres candidats classés par l’établissement", hide: true, type: 'number'},
  { field: "Effectif total des candidats ayant reçu une proposition d’admission de la part de l’établissement", hide: true, type: 'number'},
  { field: "Rang du dernier appelé", hide: true, type: 'number'},
  { field: "Effectif total des candidats ayant accepté la proposition de l’établissement (admis)", hide: true, type: 'number'},
  { field: "Dont effectif des candidates admises", hide: true, type: 'number'},
  { field: "Effectif des admis en phase principale", hide: true, type: 'number'},
  { field: "Effectif des admis en phase complémentaire", hide: true, type: 'number'},
  { field: "Dont effectif des admis ayant reçu leur proposition d’admission à l'ouverture de la procédure principale", hide: true, type: 'number'},
  { field: "Dont effectif des admis ayant reçu leur proposition d’admission avant le baccalauréat", hide: true, type: 'number'},
  { field: "Dont effectif des admis ayant reçu leur proposition d’admission avant la fin de la procédure principale", hide: true, type: 'number'},
  { field: "Dont effectif des admis en internat", hide: true, type: 'number'},
  { field: "Dont effectif des admis boursiers néo bacheliers", hide: true, type: 'number'},
  { field: "Effectif des admis néo bacheliers", hide: true, type: 'number'},
  { field: "Effectif des admis néo bacheliers généraux", hide: true, type: 'number'},
  { field: "Effectif des admis néo bacheliers technologiques", hide: true, type: 'number'},
  { field: "Effectif des admis néo bacheliers professionnels", hide: true, type: 'number'},
  { field: "Effectif des autres candidats admis", hide: true, type: 'number'},
  { field: "Dont effectif des admis néo bacheliers sans information sur la mention au bac", hide: true, type: 'number'},
  { field: "Dont effectif des admis néo bacheliers sans mention au bac", hide: true, type: 'number'},
  { field: "Dont effectif des admis néo bacheliers avec mention Assez Bien au bac", hide: true, type: 'number'},
  { field: "Dont effectif des admis néo bacheliers avec mention Bien au bac", hide: true, type: 'number'},
  { field: "Dont effectif des admis néo bacheliers avec mention Très Bien au bac", hide: true, type: 'number'},
  { field: "Effectif des admis néo bacheliers généraux ayant eu une mention au bac", hide: true, type: 'number'},
  { field: "Effectif des admis néo bacheliers technologiques ayant eu une mention au bac", hide: true, type: 'number'},
  { field: "Effectif des admis néo bacheliers professionnels ayant eu une mention au bac", hide: true, type: 'number'},
  { field: "Dont effectif des admis issus du même établissement (BTS/CPGE)", hide: true, type: 'number'},
  { field: "Dont effectif des admises issues du même établissement (BTS/CPGE)", hide: true, type: 'number'},
  { field: "Dont effectif des admis issus de la même académie", hide: true, type: 'number'},
  { field: "Dont effectif des admis issus de la même académie (Paris/Créteil/Versailles réunies)", hide: true, type: 'number'},
  { field: "% d’admis ayant reçu leur proposition d’admission à l'ouverture de la procédure principale", hide: true, type: 'number'},
  { field: "% d’admis ayant reçu leur proposition d’admission avant le baccalauréat", hide: true, type: 'number'},
  { field: "% d’admis ayant reçu leur proposition d’admission avant la fin de la procédure principale", hide: true, type: 'number'},
  { field: "% d’admis dont filles", hide: true, type: 'number'},
  { field: "% d’admis néo bacheliers issus de la même académie", hide: true, type: 'number'},
  { field: "% d’admis néo bacheliers issus de la même académie (Paris/Créteil/Versailles réunies)", hide: true, type: 'number'},
  { field: "% d’admis néo bacheliers issus du même établissement (BTS/CPGE)", hide: true, type: 'number'},
  { field: "% d’admis néo bacheliers boursiers", hide: true, type: 'number'},
  { field: "% d’admis néo bacheliers", hide: true, type: 'number'},
  { field: "% d’admis néo bacheliers sans information sur la mention au bac", hide: true, type: 'number'},
  { field: "% d’admis néo bacheliers sans mention au bac", hide: true, type: 'number'},
  { field: "% d’admis néo bacheliers avec mention Assez Bien au bac", hide: true, type: 'number'},
  { field: "% d’admis néo bacheliers avec mention Bien au bac", hide: true, type: 'number'},
  { field: "% d’admis néo bacheliers avec mention Très Bien au bac", hide: true, type: 'number'},
  { field: "% d’admis néo bacheliers généraux", hide: true, type: 'number'},
  { field: "Dont % d’admis avec mention", hide: true, type: 'number'},
  { field: "% d’admis néo bacheliers technologiques", hide: true, type: 'number'},
  { field: "Dont % d’admis avec mention__1", hide: true, type: 'number'},
  { field: "% d’admis néo bacheliers professionnels", hide: true, type: 'number'},
  { field: "Dont % d’admis avec mention__2", hide: true, type: 'number'},
  { field: "tri", hide: true},
];

export default function DataViewer(){
  const classes = useStyles(); 

  const [rows, setRows] = useState([]);
   

  React.useEffect(() => {
    var content = (data as any).object;
    for(var i=0; i < content.length; i++){
      (content[i] as any).id = i+1;
  }
    setRows(content);
    console.log("Loaded");
  },[]);
 
  

  return (
    <Paper className={classes.paper}>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid 
          rows={rows} 
          columns={columns}
          pageSize={50}
          density="compact"
          // checkboxSelection 
          showToolbar
          localeText={{
            toolbarDensity: 'Size',
            toolbarDensityLabel: 'Size',
            toolbarDensityCompact: 'Small',
            toolbarDensityStandard: 'Medium',
            toolbarDensityComfortable: 'Large',
          }}
          components={{
            Toolbar: GridToolbar,
          }}/>
      </div> 
    </Paper>
  );
}