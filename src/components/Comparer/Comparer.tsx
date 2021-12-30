import {
    Typography,
    Paper,
    Grid,
    Chip,
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
       return <Grid container>
           <Grid item><Grid container direction="row" spacing={1}>{tagSchools()}</Grid></Grid>
           <CapaciteEtDemande selectedRows={props.selectedData} />
           <RepresentationFilles selectedRows={props.selectedData} />
           <NombreCandidats selectedRows={props.selectedData} />
           <MentionBac selectedRows={props.selectedData} />
           </Grid>
    }
    return <Paper>{switchContent()}</Paper>;
}

export default Comparer
