import {
    Typography,
    Paper,
    Grid,
    Chip,
    Container,
  } from "@material-ui/core";
import { colors } from "../../theme/colors";
import { DataType } from "../../type/DataType";
import { CapaciteEtDemande, MentionBac, NombreCandidats, RepresentationFilles } from "../Graphs";
export interface ComparerProps {
    selectedData: DataType[]
    dataAttribution: string
}

const Comparer = (props: ComparerProps) => {
    const tagSchools = () => {
       return props.selectedData.map((entry, index) => <Grid item><Chip style={{ backgroundColor: colors[index]}} label={entry.Établissement}/></Grid>)
    }

    const switchContent = () => {
       const length = props.selectedData.length
       const graphProps = { 
           dataAttribution: props.dataAttribution,
           selectedData: props.selectedData
       }
       if (!length) return <Typography>Selectionnez des écoles à comparer</Typography>
       if (length > 5) return <Typography>Selectionnez au plus 5 écoles</Typography>
       return <Grid container 
                spacing={10}
                direction="column"
                alignItems="stretch">
           <Grid item><Grid container direction="row" spacing={2}>{tagSchools()}</Grid></Grid>
           <Grid item><CapaciteEtDemande {...graphProps} /></Grid>
           <Grid item><RepresentationFilles {...graphProps} /></Grid>
           <Grid item><NombreCandidats {...graphProps} /></Grid>
           <Grid item><MentionBac {...graphProps} /></Grid>
           </Grid>
    }
    return <Paper><Container>{switchContent()}</Container></Paper>;
}

export default Comparer
