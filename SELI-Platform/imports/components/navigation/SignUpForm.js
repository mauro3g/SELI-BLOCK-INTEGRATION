import React from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';

import {noSpecialCharacters} from '../../../lib/textFieldValidations';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInformation: {
        fullname: '',
        username: '',
        email: '',
        password: '',
      },
      passwordToConfirm: '',
      emailResult: false,
      validEmail: false,
      passwordResult: false,
      equalPasswords: false,
    }
  }

  handleChange = name => event => {
    let userInformation = this.state.userInformation;
    if (name === "fullname") {
      userInformation.fullname = event.target.value;
    }
    if (name === "username") {
      userInformation.username = event.target.value;
    }
    if (name === "email") {
      userInformation.email = event.target.value;
    }
    if (name === "password") {
      userInformation.password = event.target.value;
    }
    if (name === "confirmPassword") {
      this.setState({
        passwordToConfirm: event.target.value,
      }, () => {
        this.confirmPassword();
      })
    }
    this.setState({
      userInformation: userInformation,
    });
  }

  validateSignUp = () => {
    if (
      this.state.userInformation.fullname === '' || this.state.userInformation.email === '' ||
      this.state.userInformation.username === '' || this.state.userInformation.password === '' ||
      this.state.passwordToConfirm === ''
    ) {
      this.setState({
        showError: true,
      }, () => {
        console.log('required');
      });
      return;
    }
    if (!this.state.validEmail) {
      console.log('valid mail');
      return;
    }
    if (!this.state.equalPasswords) {
      console.log('passwords');
      return;
    }
    else {
      //Validate
    }
  }

  validateEmail = ()  => {
    this.state.userInformation.email !== '' ?
      this.setState({
        validatingEmail: true,
        emailHelperMessage: 'Validating email, please wait'
      }, () => {
        Meteor.call("ValidateEmail", this.state.userInformation.email, (error, response) =>  {
          let message;
          response ? message = "Valid email" : message = "Invalid email";
          this.setState({
            emailResult: true,
            validEmail: response,
            emailHelperMessage: message,
          }, () => {
            this.setState({
              validatingEmail: false,
            });
          })
        });
      })
    :
    this.setState({
      emailResult: false,
      validatingEmail: false,
    })
  }

  confirmPassword = () => {
    this.state.passwordToConfirm !== '' ?
      this.setState({
        equalPasswords: this.state.passwordToConfirm === this.state.userInformation.password,
        passwordResult: false,
      }, () => {
        let message;
        this.state.equalPasswords ? message = "Passwords match" : message = "Passwords doesn't match";
        this.setState({
          passwordHelperMessage: message,
          passwordResult: true,
        });
      })
    :
    this.setState({
      passwordResult: false,
    })
  }

  keyController = (event) => {
    if (event.which == 32 || event.keyCode == 32) {
      event.preventDefault();
      return false;
    }
    else {
      noSpecialCharacters(event);
    }
  }

  redirect = url => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  render() {
    return(
      <div className="sign-form-container">
        <TextField
          id="fullname-input"
          className="signin-input"
          label="Full name"
          margin="normal"
          variant="outlined"
          fullWidth
          autoFocus={true}
          autoComplete={"off"}
          required
          value={this.state.userInformation.fullname}
          error={this.state.showError && this.state.userInformation.fullname === ''}
          onChange={this.handleChange('fullname')}
        />
        <TextField
          id="username-input"
          className="signin-input"
          label="Username"
          margin="normal"
          variant="outlined"
          fullWidth
          autoComplete={"off"}
          required
          value={this.state.userInformation.username}
          error={this.state.showError && this.state.userInformation.username === ''}
          onChange={this.handleChange('username')}
          onKeyPress={() => this.keyController(event)}
        />
        <TextField
          id="email-input"
          className="helper-signin-input"
          label="Email"
          margin="normal"
          variant="outlined"
          fullWidth
          type="email"
          required
          disabled={this.state.validatingEmail}
          onBlur={() => this.validateEmail()}
          value={this.state.userInformation.email}
          error={this.state.showError && this.state.userInformation.email === ''}
          onChange={this.handleChange('email')}
          helperText={
            <div>
              {
                this.state.emailResult && !this.state.validatingEmail ?
                  <div className="form-helper-container">
                    {
                      this.state.validEmail ?
                        <div className="success-helper-text">
                          <p>{this.state.emailHelperMessage}</p>
                        </div>
                      :
                      <div className="error-helper-text">
                        <p>{this.state.emailHelperMessage}</p>
                      </div>
                    }
                  </div>
                :
                undefined
              }
              {
                this.state.validatingEmail ?
                  <div className="form-helper-container">
                    <p>{this.state.emailHelperMessage}</p>
                    <LinearProgress className="helper-progress"/>
                  </div>
                :
                undefined
              }
            </div>
          }
        />
        <TextField
          id="password-input"
          className="signin-input"
          label="Password"
          margin="normal"
          variant="outlined"
          type="password"
          fullWidth
          required
          error={this.state.showError && this.state.userInformation.password === ''}
          onChange={this.handleChange('password')}
        />
        <TextField
          id="-confirm-password-input"
          className="helper-signin-input"
          label="Confirm password"
          margin="normal"
          variant="outlined"
          type="password"
          fullWidth
          disabled={this.state.userInformation.password === ''}
          error={this.state.showError && this.state.passwordToConfirm === ''}
          required
          onChange={this.handleChange('confirmPassword')}
          helperText={
            this.state.passwordResult ?
              <div className="form-helper-container">
                {
                  this.state.equalPasswords ?
                    <div className="success-helper-text">
                      <p>{this.state.passwordHelperMessage}</p>
                    </div>
                  :
                  <div className="error-helper-text">
                    <p>{this.state.passwordHelperMessage}</p>
                  </div>
                }
              </div>
            :
            undefined
          }
        />
        <div className="sign-buttons-container">
          <Button
            onClick={() => this.redirect('/tutorRegistration')}
            className="sign-button"
          >
            Teach on SELI
          </Button>
          <Button
            onClick={() => this.validateSignUp()}
            className="sign-button"
            color="secondary"
            variant="contained"
          >
            Sign up
          </Button>
        </div>
      </div>
    );
  }
}
