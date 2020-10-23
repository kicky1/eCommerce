import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';



function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  const classes = useStyles();

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <Container>
          <Grid 
            container
            spacing={2}
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <img src={product.image} className={classes.img} alt="product"/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid item xs={12}>
                <div className={classes.brand}>{product.brand}</div>
                <div className={classes.name}>{product.name}</div>
                <div className={classes.price}>Price: <b>${product.price}</b> </div>
                <Rating value={product.rating} className={classes.reviews}/>
                <div className={classes.reviews}>{product.numReviews + ' reviews'} </div>
                <div>Description: {product.description}</div>
              </Grid>
              <Grid item xs={12} className={classes.paddingx2}>
                <Card className={classes.card}>
                  <div className={classes.ststus}>Status:{' '}
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}</div>
                  <div className={classes.qty}>
                    Qty:{' '}
                    <NativeSelect
                      id="demo-customized-select-native"
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.value);
                      }}               
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                    </NativeSelect>
                </div>
                <div className={classes.addButton}>
                      {product.countInStock > 0 && (
                        <Button 
                          variant="contained"
                          onClick={handleAddToCart}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </div>
                </Card>
              </Grid>
              <Grid item = {12}>
                <Typography>
                  <div className={classes.rew}>Reviews</div>
                
                <GridList cellHeight={180} className={classes.gridList}>
                  <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                  {!product.reviews.length && <div>There is no review</div>}
                  {product.reviews.map((review) => (
                    <li key={review._id}>
                      <div className={classes.revName} >{review.name}</div>
                      <div className={classes.revDate}>Data: {review.createdAt.substring(0, 10)}</div>
                      <div className={classes.revRating}><Rating value={review.rating}></Rating></div>
                      <div className={classes.revComment}>~ {review.comment}</div>
                    </li>
                    ))}   
                  </GridListTile>
                </GridList>
                  </Typography>
                  <Typography className={classes.writeReview}>
                    Write a customer review
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.padding}>
                {userInfo ? (
                  <Card className={classes.cardReview}> 
                  
                      <form>
                        <div> 
                          Rating:{' '}
                          <NativeSelect
                            id="demo-customized-select-native"
                            value={rating}
                            onChange={(e) => {
                              setRating(e.target.value);
                            }}               
                          >
                            <option value="1">1- Poor</option>
                            <option value="2">2- Fair</option>
                            <option value="3">3- Good</option>
                            <option value="4">4- Very Good</option>
                            <option value="5">5- Excelent</option>
                          </NativeSelect>
                        </div>
                        <div>
                        <textarea
                          aria-label="minimum height" 
                          className={classes.textArea}
                          placeholder="Minimum 3 rows" 
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}/>                            
                        </div>
                        <Button 
                        variant="contained"
                        onClick={submitHandler}>
                          Submit
                        </Button>
                      </form>
                      </Card>
                    ) : (
                      <div>
                        Please <Link to="/signin">Sign-in</Link> to write a review.
                      </div>
                    )}
                

                  

                </Grid>
              <Grid item = {12}>
                
              
              </Grid>
            </Grid>
          </Grid>
          </Container>
        </>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  img : {
    width : 400,
    height : 600,
  },
  card : {
    width : 400,
    height : 180,
    padding : 20,
  }, 
  cardReview : {
    width : 400,
    height : 240,
    padding : 20,
    
  },
  gridList: {
    width: 400,
    height: 150,
    backgroundColor: '#f0f0f0f0'

  },

  addButton: {
    display: 'flex',
    paddingTop: 20,
    justifyContent: 'center',
  },
  padding: {
    paddingTop : 10,
  },
  paddingx2: {
    paddingTop : 40,
  },

  brand: {
    fontSize : '2.5rem'
  },
  name: {
    fontSize: '3.5rem'
  },
  price:{
    fontSize: '1.5rem'
  },
  reviews:{
    fontSize: '1.5rem'
  },
  ststus:{
    fontSize: '1.2rem'
  },
  qty:{
    fontSize: '1rem'
  },
  rating:{
    fontSize: '1rem'
  },
  rew:{
    paddingBottom: 10,
    paddingTop: 40,
    fontSize: '1.3rem',
  },
  revDate:{
    fontSize: '0.9rem',
  },
  revComment:{
    fontSize: '0.9rem',
    paddingBottom: 10
  },
  textArea:{
    height:100,
    width:350,

  },
  writeReview:{
    paddingTop:'1rem'
  }
  

}));
export default ProductScreen;
