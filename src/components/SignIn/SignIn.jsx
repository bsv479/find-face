import React from 'react';

class SignIn extends React.Component {

  state = {
    email: '',
    password: ''
  }

  onEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  onSubmitSignIn = () => {
    fetch('https://sheltered-cove-20234.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.onSetUser(user);
          this.props.onRouteChange('home');
        } else {
          console.log(user);
          alert('Credentials are wrong.')
        }
      })
  }


  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 shadow-5 ba mt5 dark-gray b--black-10 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0 center">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email" name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="center">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib"
                type="submit" value="Sign in"
                onClick={this.onSubmitSignIn} />
            </div>
            <div className="center lh-copy mt3 pointer">
              <p onClick={() => onRouteChange('register')}
                className="f5 link dim black db">Register</p>
            </div>
          </div>
        </main>
      </article>
    )

  }
}


export default SignIn;