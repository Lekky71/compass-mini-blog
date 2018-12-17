const PostgresqlHelper = require('../lib/postgresqlHelper');
const uuidv4 = require('uuid/v4');
class CommentService {
  constructor(logger, pgClient) {
    this.logger = logger;
    this.pgClient = pgClient;
    this.postgresqlHelper = new PostgresqlHelper(pgClient, 'comments');

  }

  addNewComment(postBody){
    // noinspection JSUnresolvedFunction
    const commentId = uuidv4().toString();
    const {postId, content, creatorName} = postBody;
    const params = {fields:[commentId, postId, content, creatorName, new Date()]};
    return this.postgresqlHelper
      .add(params)
      .then(rows=> {
        this.logger.info(`Successfully added new comment to: ${postId} post`);
        return rows;
      })

  }

  getCommentById(commentId){
    const params = {fields:[commentId]};
    return this.postgresqlHelper
      .getById(params)
      .then(rows => {
        this.logger.info(`Successfully retrieved comment`);
        return rows;
      });
  }

  getAllCommentsForPost(postId){
    const params = {fields:[postId]};
    return this.postgresqlHelper
      .getForId(params)
      .then(rows => {
        this.logger.info(`Successfully retrieved all comments for ${postId} blog post`);
        return rows;
      });
  }

  updateComment(commentId, body){
    const {content} = body;
    const param = {fields:[commentId]};
    return this.postgresqlHelper.getById(param)
      .then(rows => {
        this.logger.info(`Retrieved comment row to update`);
        const comment = rows[0];
        if(comment) {
          let con = content ? content : comment.content;
          const params = {fields:[commentId, con]};
          return this.postgresqlHelper
            .update(params)
            .then(rowCount => {
              this.logger.info(`Successfully updated comment with id ${commentId}`);
              return rowCount > 0 ? {status:'success'} : {status:'failure'};
            });
        }
      });
  }

  deleteCommentById(commentId){
    const param = {fields:[commentId]};
    return this.postgresqlHelper
      .deleteById(param)
      .then(rowCount => {
        this.logger.info(`Successfully deleted comment with id ${commentId}`);
        return rowCount > 0 ? {status:'success'} : {status:'failure'};
      });
  }

}

module.exports = CommentService;
