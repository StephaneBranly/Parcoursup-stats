import {
    Grid,
    Paper,
    Typography,
  } from "@material-ui/core";import { DataType } from "../../type/DataType";
import { CapaciteFormation, MentionBac, NombreCandidats } from "../Graphs";
;

export interface ComparerProps {
    selectedData: DataType[]
}

const Comparer = (props: ComparerProps) => {
    const switchContent = () => {
       const length = props.selectedData.length
       if (!length) return <Typography>Selectionnez des écoles à comparer</Typography>
       if (length > 5) return <Typography>Selectionnez au plus 5 écoles</Typography>
       return <div><Grid container spacing={4}>
           <Grid item><CapaciteFormation selectedRows={props.selectedData} /></Grid>
           <Grid item><NombreCandidats selectedRows={props.selectedData} /></Grid>
           <Grid item><MentionBac selectedRows={props.selectedData} /></Grid>
           </Grid></div>
    }
    return <Paper>{switchContent()}</Paper>;
}

export default Comparer
