import {
    Grid,
    createStyles,
    makeStyles,
    Theme,
    Paper,
  } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
  }),
);


const About = () => {
    const classes = useStyles(); 
    
    return (
        <Grid item>
            <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="stretch"
            >
                <Grid item>
                    <Paper className={classes.paper}>A propos de l'auteur du site : stephane_branly</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>Informations sur le site : Site en contruction</Paper>
                </Grid>
            </Grid>
        </Grid>
        );
}

export default About
