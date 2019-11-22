// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Utils from "../utils/utils";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Custom Actions


// START IMPORT ACTIONS
import FilmMakerActions from "../redux/actions/FilmMakerActions";
import FilmActions from "../redux/actions/FilmActions";

// END IMPORT ACTIONS

/** APIs

* actionsFilmMaker.create
*	@description CRUD ACTION create
*
* actionsFilm.findByfilmMaker
*	@description CRUD ACTION findByfilmMaker
*	@param Objectid key - Id della risorsa filmMaker da cercare
*
* actionsFilmMaker.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsFilmMaker.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*

**/

class FilmMakerEdit extends Component {
  // Init filmmaker
  constructor(props) {
    super(props);
    this.state = {
      filmmaker: {}
    };
  }

  // Load data on start
  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsFilmMaker.loadFilmMaker(this.props.match.params.id);
      this.props.actionsFilm.findByfilmMaker(this.props.match.params.id);
    }
    
  }

  // Insert props filmmaker in state
  componentWillReceiveProps(props) {
    this.setState(...this.state, {
      filmmaker: props.filmmaker
    });
  }

  // Save data
  save(event) {
    event.preventDefault();
    if (this.state.filmmaker._id) {
      this.props.actionsFilmMaker.saveFilmMaker(this.state.filmmaker).then(data => {
        this.props.history.push("/filmmakers/");
      });
    } else {
      this.props.actionsFilmMaker.createFilmMaker(this.state.filmmaker).then(data => {
        this.props.history.push("/filmmakers/");
      });
    }
  }

  // Show content
  render() {
    return (
      <div>
        <h1>FilmMaker Edit</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>

          
          <TextField
            id="name"
            label="Name"
            value={this.state.filmmaker.name || ""}
            onChange={Utils.handleChange.bind(this, "filmmaker")}
            margin="normal"
            fullWidth
            required
            {...(!this.state.filmmaker.name && this.state.filmmaker.name === ""
              ? { error: true }
              : {})}
          />
          
          
          <TextField
            id="surname"
            label="Surname"
            value={this.state.filmmaker.surname || ""}
            onChange={Utils.handleChange.bind(this, "filmmaker")}
            margin="normal"
            fullWidth
          />
          
          {/* RELATIONS */}

          {/* EXTERNAL RELATIONS */}
          
          {/* External relation with Film */}
          
          <h3>Film</h3>
          {(!this.props.listFilm || this.props.listFilm.length === 0) && 
            <div>No Film associated</div>
          }
          {this.props.listFilm &&
            this.props.listFilm.map((item, i) => {
              return (
                <Link to={"/films/" + item._id} key={item._id}>
                  {item._id}
                </Link>
              );
            })}

          
          {/* Footer */}
          <div className="footer-card">
            <Link to="/filmmakers/">Back to list</Link>

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsFilmMaker: bindActionCreators(FilmMakerActions, dispatch),
    actionsFilm: bindActionCreators(FilmActions, dispatch),
  };
};

// Validate types
FilmMakerEdit.propTypes = { 
  actionsFilmMaker: PropTypes.object.isRequired,
  actionsFilm: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    filmmaker: state.FilmMakerEditReducer.filmmaker,
    listFilm: state.FilmMakerEditReducer.listFilm
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmMakerEdit);
