import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme)=>({
    root: {
      flexGrow: 1,
    },
    card:{
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  
export default function Bookmarked(){
    const [products,setProducts] = useState([])
    const classes = useStyles();

    useEffect(()=>{
        if(localStorage.getItem('bookmarks')!==null){
            let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
            setProducts(bookmarks)
        }   
    },[])



    return(
        <div className={classes.root} style={{width:'100%'}}>
        <Container maxWidth="lg">
        <Grid container spacing={3}>
        {products.map( product => {
    
        return (
            
                <Grid key={product.id}  item xs={4}>
                    <Card className={classes.card}>
                        <CardActionArea component={Link} to={`/product/${product.id}`}>
                            <CardMedia
                                className={classes.media}
                                image={product.image}
                                title={product.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                {product.title}
                                </Typography>
                                <Typography noWrap variant="body2" color="textSecondary" component="p">
                                {product.description}
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <Button size="small" color="primary">
                                <Link to={`/product/${product.id}`}>More</Link>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
       )
    })}
     </Grid>
     </Container>
   </div>
   )
}

