import React, { useState } from 'react';
import Footer from '../components/Footer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import '../styles/Login.scss';
import axios from 'axios';

const useTextFieldStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 400,
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

const useRadioStyles = makeStyles({
  root: {
    color: '#233559',
    '&$checked': {
      color: '#233559',
    },
  },
  checked: {},
});

const SignUp = (props) => {
  const [secretCode, setSecretCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmedPassword] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [secretCodeError, setSecretCodeError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmedPasswordError, setConfirmedPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [cityError, setCityError] = useState('');
  const [isProducer, setIsProductor] = useState(false);
  const [isSecretCodeUnvalid, setIsSecretcodeUnvalid] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validation();
    if (password === confirmPassword) {
      if (isValid) {
        let datas = {
          checkSecretCode: secretCode,
          username,
          password,
          confirmPassword,
          email,
          city,
          isProducer,
        };
        setSecretCode('');
        setUsername('');
        setPassword('');
        setConfirmedPassword('');
        setEmail('');
        setCity('');
        setSecretCodeError('');
        setUsernameError('');
        setPasswordError('');
        setConfirmedPasswordError('');
        setEmailError('');
        setCityError('');

        axios
          .post('http://192.168.68.111:5000/signup', datas)
          .then(() => props.history.push('/signin'))
          .catch((err) => {
            err == 'Error: Request failed with status code 403'
              ? setIsSecretcodeUnvalid(true)
              : setIsSecretcodeUnvalid(false);
          });
      }
    } else {
      setPasswordError('Passwords are not same');
      setConfirmedPasswordError('Passwords are not same');
      setPassword('');
      setConfirmedPassword('');
    }
  };

  const validation = () => {
    if (!secretCode) {
      setSecretCodeError('Please, enter the secret code');
    }
    if (!username) {
      setUsernameError('Please, enter a username');
    }
    if (!password) {
      setPasswordError('Please, enter a password');
    }
    if (!confirmPassword) {
      setConfirmedPasswordError('Please, enter a password');
    }
    if (!email) {
      setEmailError('Please, enter an email');
    }
    if (!city) {
      setCityError('Please, enter a city');
    }
    if (
      secretCode &&
      username &&
      password &&
      confirmPassword &&
      email &&
      city
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className='signup-wrapper'>
        <h1>Sign up</h1>
        <p>All fields are required</p>
        <form
          className={useTextFieldStyles().root}
          noValidate
          autoComplete='off'
        >
          <div className='secret-code'>
            <TextField
              value={secretCode}
              error={secretCodeError ? true : false}
              type='password'
              label='Secret Code'
              placeholder='Enter the secret code'
              variant='outlined'
              onChange={(event) => setSecretCode(event.target.value)}
              InputLabelProps={{
                style: { fontFamily: 'IBM Plex Serif, serif' },
              }}
              InputProps={{
                style: { fontFamily: 'IBM Plex Serif, serif' },
              }}
            />
          </div>
          <div className='username'>
            <TextField
              value={username}
              error={usernameError ? true : false}
              label='Username'
              placeholder='Enter your username'
              variant='outlined'
              onChange={(event) => setUsername(event.target.value)}
              InputLabelProps={{
                style: { fontFamily: 'IBM Plex Serif, serif' },
              }}
              InputProps={{
                style: { fontFamily: 'IBM Plex Serif, serif' },
              }}
            />
          </div>
          <div className='password'>
            <TextField
              value={password}
              error={passwordError ? true : false}
              type='password'
              label='Password'
              placeholder='Enter your password'
              variant='outlined'
              onChange={(event) => setPassword(event.target.value)}
              InputLabelProps={{
                style: { fontFamily: 'IBM Plex Serif, serif' },
              }}
              InputProps={{
                style: { fontFamily: 'IBM Plex Serif, serif' },
              }}
            />
          </div>
          <div className='confirm-password'>
            <TextField
              value={confirmPassword}
              error={confirmedPasswordError ? true : false}
              type='password'
              label='Confirm your password'
              placeholder='Confirm your password'
              variant='outlined'
              onChange={(event) => setConfirmedPassword(event.target.value)}
              InputLabelProps={{
                style: { fontFamily: 'IBM Plex Serif, serif' },
              }}
              InputProps={{
                style: { fontFamily: 'IBM Plex Serif, serif' },
              }}
            />
          </div>
          <div className='email'>
            <TextField
              value={email}
              error={emailError ? true : false}
              type='email'
              label='Email'
              placeholder='Enter your email'
              variant='outlined'
              onChange={(event) => setEmail(event.target.value)}
              InputLabelProps={{
                style: { fontFamily: 'IBM Plex Serif, serif' },
              }}
              InputProps={{
                style: { fontFamily: 'IBM Plex Serif, serif' },
              }}
            />
          </div>
          <div className='city'>
            <TextField
              value={city}
              error={cityError ? true : false}
              type='text'
              label='City'
              placeholder='Enter your city'
              variant='outlined'
              onChange={(event) => setCity(event.target.value)}
              InputLabelProps={{
                style: { fontFamily: 'IBM Plex Serif, serif' },
              }}
              InputProps={{
                style: { fontFamily: 'IBM Plex Serif, serif' },
              }}
            />
          </div>

          <FormControl component='fieldset'>
            <FormLabel component='legend'style={{ fontFamily: 'IBM Plex Serif, serif' }}>I'm a</FormLabel>
            <RadioGroup aria-label='isProducer' name='isProducer'>
              <FormControlLabel
                value='producer'
                control={<Radio classes={useRadioStyles()}/>}
                label={<span style={{ fontFamily: 'IBM Plex Serif, serif' }}>Producer</span>}
                onChange={(event) => setIsProductor(true)}
              
              />
              <FormControlLabel
                value='customer'
                control={<Radio classes={useRadioStyles()}/> }
                label={<span style={{ fontFamily: 'IBM Plex Serif, serif' }}>Customer</span>}
                onChange={(event) => setIsProductor(false)}
                
              />
            </RadioGroup>
          </FormControl>
          {isSecretCodeUnvalid && (
            <p className='wrong-secret-code'>Wrong secret code</p>
          )}
          <div className='signup-button'>
            <Button
              variant='contained'
              onClick={handleSubmit}
              style={{ fontFamily: 'IBM Plex Serif, serif' }}
            >
              Sign up
            </Button>
          </div>
        </form>

        <Link to={`/signin`}>
          <Button
            variant='contained'
            style={{ fontFamily: 'IBM Plex Serif, serif' }}
          >
            Already have an account ? Sign-in
          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
