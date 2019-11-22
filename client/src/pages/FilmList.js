// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import DialogDelete from "../components/DialogDelete";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import Button from "@material-ui/core/Button";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";

// Table
import EnhancedTable from "../components/EnhancedTable";

// Custom Actions


// START IMPORT ACTIONS
import FilmActions from "../redux/actions/FilmActions";

// END IMPORT ACTIONS

/** APIs

* actionsFilm.delete
*	@description CRUD ACTION delete
*	@param ObjectId id - Id
*
* actionsFilm.list
*	@description CRUD ACTION list
*

**/


class FilmList extends Component {
  // Init component
  constructor(props) {
    super(props);
    this.state = {
      openDialogDelete: false
    };
  }

  // Load data on start
  componentWillMount() {
    this.props.actionsFilm.loadFilmList();
  }

  // Delete data
  delete(id) {
    this.setState({ openDialogDelete: true, idDelete: id });
  }

  closeDialogDelete() {
    this.setState({ openDialogDelete: false, idDelete: null });
  }

  confirmDialogDelete(id) {
    this.props.actionsFilm.deleteFilm(this.state.idDelete).then(data => {
      this.props.actionsFilm.loadFilmList();
      this.setState({ openDialogDelete: false, idDelete: null });
    });
  }

  // Show content
  render() {
    const columns = [ 
      {
        id: "genre",
        type: "string",
        label: "Genre"
      }, 
      {
        id: "title",
        type: "string",
        label: "Title"
      }, 
      {
        id: "year",
        type: "number",
        label: "Year"
      },
    ];
    const link = "/films/";

    return (
      <div>
        <h1>Film List</h1>

        <EnhancedTable
          data={this.props.list}
          columns={columns}
          link={link}
          onDelete={this.delete.bind(this)}
        />

        <DialogDelete
          open={this.state.openDialogDelete}
          onClose={this.closeDialogDelete.bind(this)}
          onConfirm={this.confirmDialogDelete.bind(this)}
        />

        {/*
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Genre</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.list.map(row => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  <Link to={"/films/" + row._id} key={row._id}>
                    {row._id}
                  </Link>
                </TableCell>
                <TableCell align="right">{ row.genre }</TableCell>
                <TableCell align="right">{ row.title }</TableCell>
                <TableCell align="right">{ row.year }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        */}

        <div className="footer-card">
          <Link to="/films/new">
            <Button variant="contained" color="primary">
              Add
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsFilm: bindActionCreators(FilmActions, dispatch),
  };
};

// Validate types
FilmList.propTypes = { 
  actionsFilm: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    list: state.FilmListReducer.listFilm
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmList);
