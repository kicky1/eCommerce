import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '@material-ui/lab/Rating';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';



function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const classes = useStyles();

  return (

    <Container>

      {category && <h2>{category}</h2>}

      <Grid 
        container
        spacing={2}
        justify="flex-start"
        alignItems="flex-start">
        <Grid item xs={12} className={classes.searchLabel}>
          <Paper component="form" className={classes.search} onSubmit={submitHandler}>
              <InputBase
                className={classes.input}
                name="searchKeyword"
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={sortHandler}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value='lowest'>Lowest</MenuItem>
                  <MenuItem value='highest'>Highest</MenuItem>
                </Select>
              </FormControl>
          </Paper>
        </Grid>
        {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} className={classes.items}>
          <Card className={classes.card}>
            <CardHeader
              title={product.name}
              src={product.image}
            />
            <Link to={'/product/' + product._id}>
              <CardMedia
                className={classes.media}
                component="img"
                image={product.image}
                title={product.name}
                alt="product"
              />
            </Link>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                <div>
                  {product.brand}
                </div>
                <div>
                  ${product.price}
                </div>
                <div>
                <Rating
                  name="hover-feedback"
                  value={product.rating}
                />
                </div>
                <div>
                {product.numReviews + ' reviews'}
                </div>

                
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        ))}
      </Grid>
    </Container>

  );
}

const useStyles = makeStyles((theme) => ({
  search: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    width: 400,
  },
  searchLabel: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  items:{
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  card:{
    width: 250,
    height: 500,
    padding: '5%'
  },
  media: {
    height: 300,
    paddingTop: '5%', // 16:9
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default HomeScreen;
