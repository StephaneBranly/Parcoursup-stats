import {
    Typography,
    Paper,
    Grid,
    Chip,
    Container,
  } from "@material-ui/core";
import { colors } from "../../App";
import { DataType } from "../../type/DataType";
import { CapaciteEtDemande, MentionBac, NombreCandidats, RepresentationFilles } from "../Graphs";
export interface ComparerProps {
    selectedData: DataType[]
}

const Comparer = (props: ComparerProps) => {
    const tagSchools = () => {
       return props.selectedData.map((entry, index) => <Grid item><Chip style={{ backgroundColor: colors[index]}} label={entry.Établissement}/></Grid>)
    }

    const switchContent = () => {
       const length = props.selectedData.length
       if (!length) return <Typography>Selectionnez des écoles à comparer</Typography>
       if (length > 5) return <Typography>Selectionnez au plus 5 écoles</Typography>
       return <Grid container 
                spacing={10}
                direction="column"
                alignItems="stretch">
           <Grid item><Grid container direction="row" spacing={2}>{tagSchools()}</Grid></Grid>
           <Grid item><CapaciteEtDemande selectedRows={props.selectedData} /></Grid>
           <Grid item><RepresentationFilles selectedRows={props.selectedData} /></Grid>
           <Grid item><NombreCandidats selectedRows={props.selectedData} /></Grid>
           <Grid item><MentionBac selectedRows={props.selectedData} /></Grid>
           </Grid>
    }
    return <Paper><Container>{switchContent()}</Container></Paper>;
}

export default Comparer
