import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "react-simple-flex-grid/lib/main.css";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';


// Figure out how to set a key on each item of whatever you press more info on and be able to pass it down to the modal underneath. So that the correct info shows up when you press it


export default function PokemonList({ pokemon, sprite, height, weight, type, type2, id }) {
    // console.log(pokemon["Name"])
    const useStyles = makeStyles((theme) => ({
        
        root: {
        flexGrow: 1,
        },


        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        
        paper: {
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        textAlign: 'center',
        backgroundColor:'#303030'
        },

        title: {
            fontSize: 14,
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: 'white'
        },

        typeTitle: {
            fontSize: 12,
            textTransform: 'uppercase',
            fontWeight: 'bold',
            marginRight:5,
            marginLeft:5
                },


    }));

    const classes = useStyles();


    // const [open, setOpen] = React.useState(false);

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <div id='container'>
        <div>

        <Grid container spacing={3}>
            {pokemon.map((p, index) => (
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>
                    
                    <Typography className={classes.title}>
                    # {id[index]} - {p} 
                    </Typography>
                    
                    {/* <Typography className={classes.title}>
                        {height[index]}
                    </Typography>
                    <Typography className={classes.title}>
                        {weight[index]}KG
                    </Typography> */}
                    <div>
                    <img src={sprite[index]}></img>

                    </div>
                    <Chip className={classes.typeTitle} label={type[index]}/>
                    <Chip className={classes.typeTitle} label={type2[index]}/>


                    </Paper>
                </Grid>
                
            ))}

        </Grid>   


        
                            {/* <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            
                            <DialogTitle  id="customized-dialog-title" className={classes.modalTitle} onClose={handleClose}>
                            Title
                            </DialogTitle>

                            <DialogContent dividers>
                            <Typography gutterBottom>
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                            </Typography>
                            <Typography gutterBottom>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                                lacus vel augue laoreet rutrum faucibus dolor auctor.
                            </Typography>
                            <Typography gutterBottom>
                                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                                auctor fringilla.
                            </Typography>
                            </DialogContent>
                            <DialogActions>
                            <Button autoFocus onClick={handleClose} color="primary" variant="contained">
                                CLOSE
                            </Button>
                            </DialogActions>
                            </Dialog> */}


        </div>
        </div>


    );
}



