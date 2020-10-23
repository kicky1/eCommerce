import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push('/');
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));

  }
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={4} className={classes.container} justify="flex-start" alignItems="flex-start" >
        <Grid item xs={12}>
          <div className={classes.title}>Witaj ponownie,</div>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="component-outlined">Email</InputLabel>
            <OutlinedInput id="component-outlined" value={email} type={email} id={email} onChange={(e) => setEmail(e.target.value)} label="email" />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="component-outlined">Hasło</InputLabel>
            <OutlinedInput id="component-outlined" value={password} type ={password} id={password} onChange={(e) => setPassword(e.target.value)} label="password" />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={submitHandler} 
            type="button" 
            >
              Zaloguj się
          </Button>
        </Grid>
        <Grid item xs={12}>
          Jesteś tu pierwszy raz?
          <div>
          <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} >Zarejestruj się</Link>
          </div>
        </Grid>
      </Grid>
    </Container>






    );
}

const useStyles = makeStyles((theme) => ({
  container : {
    paddingTop: theme.spacing(4),
    textAlign : 'center',
  },
  title : {
    fontSize: '3rem'
  },
}));

export default SigninScreen;