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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";

// Custom Actions


// START IMPORT ACTIONS
import FilmActions from "../redux/actions/FilmActions";
import FilmMakerActions from "../redux/actions/FilmMakerActions";
import ActorActions from "../redux/actions/ActorActions";

// END IMPORT ACTIONS

/** APIs

* actionsFilm.create
*	@description CRUD ACTION create
*
* actionsFilm.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsFilmMaker.list
*	@description CRUD ACTION list
*
* actionsActor.list
*	@description CRUD ACTION list
*
* actionsFilm.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*

**/

class FilmEdit extends Component {
  // Init film
  constructor(props) {
    super(props);
    this.state = {
      film: {}
    };
  }

  // Load data on start
  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsFilm.loadFilm(this.props.match.params.id);
    }
    
    this.props.actionsActor.loadActorList();
    this.props.actionsFilmMaker.loadFilmMakerList();
  }

  // Insert props film in state
  componentWillReceiveProps(props) {
    this.setState(...this.state, {
      film: props.film
    });
  }

  // Save data
  save(event) {
    event.preventDefault();
    if (this.state.film._id) {
      this.props.actionsFilm.saveFilm(this.state.film).then(data => {
        this.props.history.push("/films/");
      });
    } else {
      this.props.actionsFilm.createFilm(this.state.film).then(data => {
        this.props.history.push("/films/");
      });
    }
  }

  // Show content
  render() {
    return (
      <div>
        <h1>Film Edit</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>

          <FormControl fullWidth>
            <InputLabel shrink htmlFor="genre">
              Genre
            </InputLabel>
            <Select
              value={this.state.film.genre || ""}
              onChange={Utils.handleChangeSelect.bind(this, "film")}
              inputProps={{
                id: "genre",
                name: "genre"
              }}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Action"}>Action</MenuItem>
              <MenuItem value={"Crime"}>Crime</MenuItem>
              <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
              <MenuItem value={"Horror"}>Horror</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            id="title"
            label="Title"
            value={this.state.film.title || ""}
            onChange={Utils.handleChange.bind(this, "film")}
            margin="normal"
            fullWidth
            required
            {...(!this.state.film.title && this.state.film.title === ""
              ? { error: true }
              : {})}
          />
          
          
          <TextField
            id="year"
            label="Year"
            value={this.state.film.year || ""}
            onChange={Utils.handleChange.bind(this, "film")}
            type="number"
            margin="normal"
            fullWidth
          />
          
          {/* RELATIONS */}

          <h2 className="mb-20">Relations</h2>
          
          {/* Relation m:m cast with Actor */}
          
          <FormControl fullWidth className="mb-20">
            <InputLabel htmlFor="cast">Cast</InputLabel>
            <Select
              multiple
              value={this.state.film.cast || []}
              onChange={Utils.handleChangeSelect.bind(this, "film")}
              input={<Input id="cast" name="cast" />}
              renderValue={selected => (
                <div>
                  {selected.map(value => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {this.props.listActor && this.props.listActor.map(item => (
                <MenuItem
                  key={item._id}
                  value={item._id}
                  style={{
                    fontWeight:
                      this.state.film.cast &&
                      this.state.film.cast.indexOf(item._id) === -1
                        ? "regular"
                        : "bold"
                  }}
                >
                  {item._id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Relation 1:m filmMaker with FilmMaker */}
          
          <FormControl fullWidth className="mb-20" required
              {...(!this.state.film.filmMaker && !this.state.film.filmMaker
                ? { error: true }
                : {})}>
            <InputLabel shrink htmlFor="filmMaker">
              FilmMaker
            </InputLabel>
            <Select
              value={this.state.film.filmMaker || ""}
              onChange={Utils.handleChangeSelect.bind(this, "film")}
              inputProps={{
                id: "filmMaker",
                name: "filmMaker"
              }}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.listFilmMaker && this.props.listFilmMaker.map(row => (
                <MenuItem value={row._id} key={row._id}>
                  {row._id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          
          {/* Footer */}
          <div className="footer-card">
            <Link to="/films/">Back to list</Link>

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
    actionsFilm: bindActionCreators(FilmActions, dispatch),
    actionsFilmMaker: bindActionCreators(FilmMakerActions, dispatch),
    actionsActor: bindActionCreators(ActorActions, dispatch),
  };
};

// Validate types
FilmEdit.propTypes = { 
  actionsFilm: PropTypes.object.isRequired,
  actionsFilmMaker: PropTypes.object.isRequired,
  actionsActor: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    film: state.FilmEditReducer.film,
    listActor: state.FilmEditReducer.listActor,
    listFilmMaker: state.FilmEditReducer.listFilmMaker
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmEdit);
