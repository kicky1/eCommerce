import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
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
    dispatch(register(name, email, password));
  }
  const classes = useStyles();

  return (

    <Container>
      <Grid container spacing={4} className={classes.container} justify="flex-start" alignItems="flex-start" >
        <Grid item xs={12}>
          <div className={classes.title}>Rejestracja,</div>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="component-outlined">Imie</InputLabel>
            <OutlinedInput id="component-outlined" value={name} type={name} id={name} onChange={(e) => setName(e.target.value)} label="name" />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="component-outlined">Email</InputLabel>
            <OutlinedInput id="component-outlined" value={email} type ={email} id={email} onChange={(e) => setEmail(e.target.value)} label="emial" />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="component-outlined">Hasło</InputLabel>
            <OutlinedInput id="component-outlined" value={password} type ={password} id={password} onChange={(e) => setPassword(e.target.value)} label="password" />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="component-outlined">re-Hasło</InputLabel>
            <OutlinedInput id="component-outlined" value={rePassword} type ={rePassword} id={rePassword} onChange={(e) => setRePassword(e.target.value)} label="rePassword" />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={submitHandler} 
            type="button" 
            >
              Zarejestruj się
          </Button>
        </Grid>
        <Grid item xs={12}>
          Masz już konto?
          <div>
          <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} >Zaloguj się</Link>
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
    fontSize: '2.5rem'
  },
}));

export default RegisterScreen;