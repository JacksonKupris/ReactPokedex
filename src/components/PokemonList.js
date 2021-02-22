import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "react-simple-flex-grid/lib/main.css";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import InfoIcon from '@material-ui/icons/Info';


export default function PokemonList({ pokemon, sprite }) {

    const useStyles = makeStyles((theme) => ({
        root: {
        flexGrow: 1,
        },
        paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor:'#303030'
        },

        title: {
            fontSize: 14,
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: 'white'
        },
        InfoIcon: {
            padding: '4px'
        }
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
            {pokemon.map((p, index) => (
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>
                    {/* <Tooltip title="More Info" placement="right-end"><InfoIcon /></Tooltip> */}

                    
                    <Typography className={classes.title}>{p}
                    </Typography>
                    <div>
                    <img src={sprite[index]}></img>
                    </div>
                    </Paper>
                </Grid>
                
            ))}

        </Grid>   
        </div>
    
        
        
    );
}



