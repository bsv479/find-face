import React from "react";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import ImageRecognition from "./components/ImageRecognition/ImageRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const { REACT_APP_CLARIFAI_API } = process.env;

const app = new Clarifai.App({
  apiKey: REACT_APP_CLARIFAI_API,
});


const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};


class App extends React.Component {
  state = {
    input: "",
    imageUrl: "",
    boxes: [],
    route: "signin",
    isSignedIn: false,
    userInfo: {
      name: '',
      email: '',
      entries: 0,
      joined: new Date(),
    },
  };

  // componentDidMount() {
  //   fetch("http://localhost:4000/profiles")
  //     .then((res) => res.json())
  //     .then(console.log);
  // }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSetUser = (userData) => {
    this.setState({
      userInfo: {
        name: userData.name,
        email: userData.email,
        entries: userData.entries,
        joined: userData.joined
      },
    });
  }

  calculateFaceLocation = (data) => {
    const boxes = [];

    const inputImage = document.getElementById("input-image");
    const width = Number(inputImage.width);
    const height = Number(inputImage.height);

    data.outputs[0].data.regions.forEach((region) => {
      const box = region.region_info.bounding_box;
      boxes.push({
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - box.right_col * width,
        bottomRow: height - box.bottom_row * height,
      });
    });
    return boxes;
  };

  displayFaceBox = (boxes) => {
    this.setState({ boxes });
  };

  onPictureSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
    });
    const { input } = this.state;

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => {
        this.setState({
          userInfo: {
            ...this.state.userInfo,
            entries: this.state.userInfo.entries + 1
          },
        });
        this.displayFaceBox(this.calculateFaceLocation(response));
      }
      )
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route });
  };

  render() {
    const { boxes, imageUrl, route, isSignedIn } = this.state;

    return (
      <div>
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        <Logo />
        {route === "signin" ? (
          <SignIn
            onSetUser={this.onSetUser}
            onRouteChange={this.onRouteChange}
          />
        ) : route === "register" ? (
          <Register
            onSetUser={this.onSetUser}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <React.Fragment>
            <Rank userInfo={this.state.userInfo} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <ImageRecognition boxes={boxes} imageUrl={imageUrl} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
