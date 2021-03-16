import React from "react";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import ImageRecognition from "./components/ImageRecognition/ImageRecognition";

const app = new Clarifai.App({
  apiKey: "da268c85433647d8ab6233f81b8a2408",
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
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (data) => {
    console.log(data);
    const boxes = [];

    const inputImage = document.getElementById("input-image");
    const width = Number(inputImage.width);
    const height = Number(inputImage.height);

    data.outputs[0].data.regions.map((region) => {
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

  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
    });
    const { input } = this.state;

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => 
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <ImageRecognition
          boxes={this.state.boxes}
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;
