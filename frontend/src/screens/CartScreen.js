import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import { shadows } from '@material-ui/system';



function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;
  var today = new Date();
  

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }
  const loginHandler = () => {
    props.history.push('/login/');
  };
  const backHandler = () => {
    props.history.push('/');
  };
  const classes = useStyles();

  return (
    <Container>
      
              {
                cartItems.length === 0 ?
                <Grid container spacing={5} className={classes.container2} justify="flex-start"
                alignItems="flex-start" >
                  <Grid container spacing={2} className={classes.paper}> 
                    <Grid item xs={12}>
                      <h2>Koszyk jest pusty!</h2>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.right2}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={loginHandler} 
                      type="button" 
                      className={classes.loginButton}
                      >
                        Zaloguj się
                    </Button>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.left}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={backHandler} 
                      type="button" 
                      className={classes.backButton}
                      >
                        Kontynuuj zakupy 
                    </Button>
                    </Grid>
                  </Grid>
                </Grid>
             : 
             <Grid container spacing={5} className={classes.container} justify="flex-start"
             alignItems="flex-start" >
               <Grid item xs={12} sm={12} md={8} lg={8}>
                <Grid container spacing={2} className={classes.paper}>   
                  <Grid item xs={12}>
                     <h2>Koszyk  ( {cartItems.reduce((a, c) => a + c.qty, 0)} art.)</h2>
                  </Grid>
                {cartItems.map(item => 
                        
                    <Grid container spacing={1} className={classes.paper2}>
                      <Grid item xs={3}> 
                        <Link to={'/product/' + item.product}>
                          <CardMedia
                            className={classes.img}
                            component="img"
                            image={item.image}
                            title={item.name}
                            alt="product"
                          />
                        </Link>
                      </Grid>
                      <Grid item xs={6} className={classes.paddingLeft}>
                        <div>{item.brand}</div>
                        <div>{item.name}</div>
                        <div>{item.description}</div>
                        <div className={classes.paddingTop}>
                          <Button 
                            variant="contained" 
                            color="primary"
                            type="button"  
                            onClick={() => removeFromCartHandler(item.product)} >
                              Usuń produkt
                          </Button>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div>
                        <NativeSelect
                          className={classes.input}
                          value={item.qty} 
                          id="demo-customized-select-native"
                          onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                          {[...Array(item.countInStock).keys()].map(x =>
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          )}
                          </NativeSelect>
                        </div>
                        <div className={classes.paddingTop}>
                          {item.price} zł
                        </div>
                      </Grid>  
                    </Grid>                                           
                  
               )}
               </Grid>
                          
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Grid container spacing={2} className={classes.paper}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div><h2>Łączna kwota </h2></div>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8}>
                      Kwota tymczasowa
                    </Grid>
                    <Grid item xs={4} sm={4} sm={4} lg={4}>
                      {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} zł
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8}>
                      Kwota przesyłki
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                      GRATIS
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8}>
                      Łączna kwota (w tym VAT)
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                    {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} zł
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={checkoutHandler} 
                        disabled={cartItems.length === 0}
                        className={classes.checkout}
                        type="button" 
                      >
                          Przejdź do kasy
                      </Button>
                    </Grid>  
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <Grid container spacing={2} className={classes.paper}>
                    Przewidywany czas przesyłki : {(today.getDate()+3)+'/'+(today.getMonth()+1)} - {(today.getDate()+7)+'/'+(today.getMonth()+1)}
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <Grid container spacing={2} className={classes.paper}>
                    Akceptujemy płatności za pomocą :
                  </Grid>
                </Grid>
              </Grid>
        
             }
          
    </Container>
  );
}
  

const useStyles = makeStyles((theme) => ({
  img : {
    width : '100%',
    height : '100%',
    paddingRight: theme.spacing(4)
  },
  input: {
    width:"40%",
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: "#ffffffff",
    boxShadow: ' 0px 0px 4px -3px rgba(0,0,0,1)',
    borderRadius: '3px 3px 3px 3px',
    
  },
  paper2: {
    width: "100%",
    height: "100%",
    color: theme.palette.text.secondary,
  },
  container:{
    backgroundColor: "#f0f0f0f0",
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  container2:{
    backgroundColor: "#f0f0f0f0",
    padding: theme.spacing(2),
    marginTop: theme.spacing(10),
    textAlign: 'center',
  },
  right:{
    textAlign:"right",
  },
  right2:{
    textAlign:"right",
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  left:{
    textAlign:"left",
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  paddingTop:{
    paddingTop: theme.spacing(4),
  },
  checkout:{
    width:'100%',
  },
  loginButton:{
    width:'12rem'
  },
  backButton:{
    width:'12rem'
  }

  

}));

export default CartScreen;