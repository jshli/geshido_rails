import React from "react"
import PropTypes from "prop-types"
import Axios from "axios"
class HelloWorld extends React.Component {
  render () {
    console.log(Axios.get)
    return (
      <React.Fragment>
        Greeting: {this.props.greeting}
      </React.Fragment>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld
