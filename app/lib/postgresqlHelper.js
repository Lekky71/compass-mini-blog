const config = require('../config/settings');
const pgQuery = require('../constants/pgQuery');

/**
 * An helper class for performing database operations.
 */
class PostgresqlHelper {
  /*
    @param pgClient is an instance of a pg connected client
   */
  constructor(pgClient, column){
    this.pgClient = pgClient;
    if(column === pgQuery.postTable){
      this.addQuery = pgQuery.add_post;
      this.getByIdQuery = pgQuery.get_post_by_id;
      this.getAllQuery = pgQuery.get_all_posts;
      this.searchQuery = pgQuery.search_for_posts;
      this.updateQuery = pgQuery.update_post_by_id;
      this.deleteByIdQuery = pgQuery.delete_post_by_id;
    }
    else if(column === pgQuery.commentTable){
      this.addQuery = pgQuery.add_comment;
      this.getByIdQuery = pgQuery.get_comment_by_id;
      this.getAllQuery = pgQuery.get_comments_for_post;
      this.updateQuery = pgQuery.update_comment_by_id;
      this.deleteByIdQuery = pgQuery.delete_comment_by_id;
    }
  }

  add(params){
    return this.pgClient.query(this.addQuery, params.fields)
      .then(results => {
        return results.rows;
      });
  }

  getById(params){
    return this.pgClient.query(this.getByIdQuery, params.fields)
      .then(results => {
        return results.rows;
      });
  }

  getAll(){
    return this.pgClient.query(this.getAllQuery)
      .then(results => {
        return results.rows;
      });
  }

  search(params){
    return new Promise((resolve, reject) => {
      this.pgClient.query(this.searchQuery, params.fields, (err, results) => {
        if(err) reject(err);
        resolve(results.rows);
      });
    });
  }

  update(params){
    return new Promise((resolve, reject) => {
      this.pgClient.query(this.updateQuery, params.fields, (err, results) => {
        if(err) reject(err);
        resolve(results.rows);
      });
    });
  }

  deleteById(params){
    return new Promise((resolve, reject) => {
      this.pgClient.query(this.deleteByIdQuery, params.fields, (err, results) => {
        if(err) reject(err);
        resolve(results.rows);
      });
    });
  }
}

module.exports = PostgresqlHelper;
