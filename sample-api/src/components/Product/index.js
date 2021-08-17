import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  useParams
  } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

  
export default function Product(){
    let { id } = useParams();
    const [product,setProduct] = useState({})
    const classes = useStyles();
    const [bookmarked,setBookmarked] = useState(false)

    useEffect(()=>{
        if(localStorage.getItem('products')===null){
            axios.get(`https://fakestoreapi.com/products/${id}`).then((result)=>{
                setProduct(result.data)
            })
        }
        else{
            let products = JSON.parse(localStorage.getItem('products'))
            let filteredProduct = products.filter((product)=>{
                return product.id===+id
            })
            setProduct(...filteredProduct)
            if(localStorage.getItem('bookmarks')!==null){
                let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
                let bookmarkedProduct = bookmarks.filter((product)=>{
                    return product.id===+id
                })
                if(bookmarkedProduct.length>0) setBookmarked(true)
            }   
        }
    },[id,bookmarked])

    function toggleBookmark(){
        let bookmarks = []
        if(localStorage.getItem('bookmarks')!==null){

             bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

        }
        if(bookmarked){
            console.log("remove")
            bookmarks = bookmarks.filter((product)=>{
                return product.id!==+id
            })
            console.log(bookmarks)
            localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
            setBookmarked(false)
        }
        else{
            bookmarks.push(product)
            localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
            setBookmarked(true)
        }
    }

    return(
        <Container maxWidth="lg">
            <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="complex" src={product.image} />
                        </ButtonBase>
                    </Grid>
                    <Grid item lg={6} container>
                        <Grid item lg container direction="column" spacing={2}>
                            <Grid item lg>
                                <Typography gutterBottom variant="subtitle1">
                                {product.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                ID: {product.id}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                {product.description}
                                </Typography>
                                
                            </Grid>
                            <Grid item>
                                <Typography onClick={toggleBookmark} variant="body2" style={{ cursor: 'pointer' }}>
    {bookmarked?<BookmarkIcon/>:<BookmarkBorderIcon/>}Bookmark
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">₹{product.price}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            </div>

    </Container>)
}

