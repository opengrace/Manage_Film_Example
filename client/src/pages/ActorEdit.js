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
import { DateTimePicker } from "material-ui-pickers";

// Custom Actions


// START IMPORT ACTIONS
import ActorActions from "../redux/actions/ActorActions";
import FilmActions from "../redux/actions/FilmActions";

// END IMPORT ACTIONS

/** APIs

* actionsActor.create
*	@description CRUD ACTION create
*
* actionsFilm.findBycast
*	@description CRUD ACTION findBycast
*	@param Objectid key - Id della risorsa cast da cercare
*
* actionsActor.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsActor.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*

**/

class ActorEdit extends Component {
  // Init actor
  constructor(props) {
    super(props);
    this.state = {
      actor: {}
    };
  }

  // Load data on start
  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsActor.loadActor(this.props.match.params.id);
      this.props.actionsFilm.findBycast(this.props.match.params.id);
    }
    
  }

  // Insert props actor in state
  componentWillReceiveProps(props) {
    this.setState(...this.state, {
      actor: props.actor
    });
  }

  // Save data
  save(event) {
    event.preventDefault();
    if (this.state.actor._id) {
      this.props.actionsActor.saveActor(this.state.actor).then(data => {
        this.props.history.push("/actors/");
      });
    } else {
      this.props.actionsActor.createActor(this.state.actor).then(data => {
        this.props.history.push("/actors/");
      });
    }
  }

  // Show content
  render() {
    return (
      <div>
        <h1>Actor Edit</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>

          <DateTimePicker
            id="birthDate"
            label="BirthDate"
            className="mt-20 mb-20"
            ampm={false}
            value={
              this.state.actor.birthDate
                ? new Date(this.state.actor.birthDate)
                : null
            }
            onChange={Utils.handleChangeDate.bind(this, "actor", "birthDate")}
            fullWidth
            autoOk
            disableFuture
          />
          
          
          <TextField
            id="name"
            label="Name"
            value={this.state.actor.name || ""}
            onChange={Utils.handleChange.bind(this, "actor")}
            margin="normal"
            fullWidth
            required
            {...(!this.state.actor.name && this.state.actor.name === ""
              ? { error: true }
              : {})}
          />
          
          
          <TextField
            id="surname"
            label="Surname"
            value={this.state.actor.surname || ""}
            onChange={Utils.handleChange.bind(this, "actor")}
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
            <Link to="/actors/">Back to list</Link>

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
    actionsActor: bindActionCreators(ActorActions, dispatch),
    actionsFilm: bindActionCreators(FilmActions, dispatch),
  };
};

// Validate types
ActorEdit.propTypes = { 
  actionsActor: PropTypes.object.isRequired,
  actionsFilm: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    actor: state.ActorEditReducer.actor,
    listFilm: state.ActorEditReducer.listFilm
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActorEdit);
