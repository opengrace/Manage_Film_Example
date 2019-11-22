/**
 *
 *
  _____                      _              _ _ _     _   _     _        __ _ _
 |  __ \                    | |            | (_) |   | | | |   (_)      / _(_) |
 | |  | | ___    _ __   ___ | |_    ___  __| |_| |_  | |_| |__  _ ___  | |_ _| | ___
 | |  | |/ _ \  | '_ \ / _ \| __|  / _ \/ _` | | __| | __| '_ \| / __| |  _| | |/ _ \
 | |__| | (_) | | | | | (_) | |_  |  __/ (_| | | |_  | |_| | | | \__ \ | | | | |  __/
 |_____/ \___/  |_| |_|\___/ \__|  \___|\__,_|_|\__|  \__|_| |_|_|___/ |_| |_|_|\___|

 * DO NOT EDIT THIS FILE!!
 *
 *  TO CUSTOMIZE APIS IN FilmApiGenerated.js PLEASE EDIT ../FilmApi.js
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */
 
// Dependencies
import axios from "axios";
import { properties } from "../../config/properties";

class FilmApiGenerated {

  static contextUrl = properties.endpoint + "/film";

  // CRUD METHODS

  /**
  * FilmService.create
  *   @description CRUD ACTION create
  *
  */
  static createFilm(film) {
    return axios.post(FilmApiGenerated.contextUrl, film )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * FilmService.delete
  *   @description CRUD ACTION delete
  *   @param ObjectId id Id
  *
  */
  static deleteFilm(id) {
    return axios.delete(FilmApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * FilmService.findBycast
  *   @description CRUD ACTION findBycast
  *   @param Objectid key Id della risorsa cast da cercare
  *
  */
  static findBycast(id) {
    return axios.get(FilmApiGenerated.contextUrl + "/findBycast/" + id )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * FilmService.findByfilmMaker
  *   @description CRUD ACTION findByfilmMaker
  *   @param Objectid key Id della risorsa filmMaker da cercare
  *
  */
  static findByfilmMaker(id) {
    return axios.get(FilmApiGenerated.contextUrl + "/findByfilmMaker/" + id )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * FilmService.get
  *   @description CRUD ACTION get
  *   @param ObjectId id Id resource
  *
  */
  static getOneFilm(id) {
    return axios.get(FilmApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * FilmService.list
  *   @description CRUD ACTION list
  *
  */
  static getFilmList() {
    return axios.get(FilmApiGenerated.contextUrl)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
  * FilmService.update
  *   @description CRUD ACTION update
  *   @param ObjectId id Id
  *
  */
  static saveFilm(film) {
    return axios.post(FilmApiGenerated.contextUrl + "/" + film._id, film )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }



    // Custom APIs
}

export default FilmApiGenerated;
