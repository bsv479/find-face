import React from 'react';

class Register extends React.Component {

  state = {
    name: '',
    email: '',
    password: ''
  }

  onNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
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


  onSubmitRegister = (event) => {
    event.preventDefault();
    fetch('https://sheltered-cove-20234.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
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
          alert(user);
        }
      })
  }


  render() {
    return (
      <article className="br3 shadow-5 ba dark-gray b--black-10 mt5 w-90 w-60-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0 center">Registration</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text" name="name" id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email" name="email-address" id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password" name="password" id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="center">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib"
                type="submit" value="Register"
                onClick={this.onSubmitRegister} />
            </div>
          </form>
        </main>
      </article>
    )
  }
}

export default Register;
