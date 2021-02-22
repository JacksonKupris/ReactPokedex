import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function PokemonList({ pokemon, sprite }) {

    const useStyles = makeStyles({
        root: {
          minWidth: 275,
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
          textTransform: 'uppercase',
        },
      });


    const divStyle = {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 20,        
    };

    const classes = useStyles();

    return (
        <div>
            <Row>
            <Row>
            {pokemon.map((p, index) => (
                <Col span={3} key={p} style={divStyle} className={classes.title}>
                    <Card className={classes.root}>
                    
                    <Typography className={classes.title}>{p}</Typography>
                    <div>
                    <img src={sprite[index]}></img>
                    </div>
                    </Card>
                </Col>
                
            ))}
            </Row>
            </Row>
            
        </div>
    
        
        
    );
}



