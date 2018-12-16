const config = require('../config/settings');

/**
 * An helper class for performing database operations.
 */
class PostgresqlHelper {
  /*
    @param pgClient is an instance of a pg connected client
   */
  constructor(pgClient){
    this.client = pgClient;
  }

  add(){
    return new Promise((resolve, reject) => {

    });
  }

  getById(){
    return new Promise((resolve, reject) => {

    });
  }

  getAll(){
    return new Promise((resolve, reject) => {

    });
  }

  edit(){
    return new Promise((resolve, reject) => {

    });
  }

  deleteById(){
    return new Promise((resolve, reject) => {

    });
  }
}
