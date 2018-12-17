const Response = require('../lib/responseManager');
const HttpStatus = require('../constants/httpStatus');

class CommentController {
  constructor(logger, service){
    this.logger = logger;
    this.commentService = service;
  }
  // const commentColumns = 'comment_id, post_id, content, creator_name, created_at';

  receiveNewComment(req, res){
    const {postId, content, creatorName} = req.body;
    const messages = [];

    if(!postId){
      messages.push('enter postId');
    }
    if(!content){
      messages.push('enter content');
    }
    if(!creatorName){
      messages.push('enter creator name');
    }
    if(messages.length > 0){
      return Response.failure(res, { message: messages}, HttpStatus.BAD_REQUEST);
    }
    return this.commentService.addNewComment({postId, content, creatorName})
      .then(response => {
        return Response.success(res, {
          message: 'Successfully added comment.',
          response
        }, HttpStatus.OK);
      })
      .catch(error => {
        this.logger.error(error);
        return Response.failure(res, { message: 'Error occurred during comment creation' }, HttpStatus.INTERNAL_SERVER_ERROR);

      });

  }

  getCommentById(req, res){
    const {commentId} = req.params;
    if(!commentId){
      return Response.failure(res, { message: ['enter commentId'] }, HttpStatus.BAD_REQUEST);
    }
    return this.commentService.getCommentById(commentId)
      .then(response => {
        return Response.success(res, {
          message: 'Successfully retrieved comment.',
          response
        }, HttpStatus.OK);
      })
      .catch(error => {
        this.logger.error(error);
        return Response.failure(res, { message: 'Error occurred during comment retrieval' }, HttpStatus.INTERNAL_SERVER_ERROR);

      });

  }
  getAllCommentsForPost(req, res){
    const {postId} = req.params;
    if(!postId){
      return Response.failure(res, { message: ['enter postId'] }, HttpStatus.BAD_REQUEST);
    }
    return this.commentService.getAllCommentsForPost(postId)
      .then(response => {
        return Response.success(res, {
          message: 'Successfully retrieved all comments.',
          response
        }, HttpStatus.OK);
      })
      .catch(error => {
        this.logger.error(error);
        return Response.failure(res, { message: 'Error occurred during comments retrieval' }, HttpStatus.INTERNAL_SERVER_ERROR);

      });
  }

  updateComment(req, res){
    const { commentId } = req.params;
    const messages = [];
    if(!commentId) {
      messages.push('enter post id param');
    }
    if((!req.body) || (req.body === {})){
      messages.push('enter at least one parameter to update');
    }
    if(messages.length > 0){
      return Response.failure(res, { message: messages}, HttpStatus.BAD_REQUEST);
    }
    return this.commentService.updateComment(commentId, req.body)
      .then(response => {
        return Response.success(res, {
          message: 'Successfully updated comment.',
          response
        }, HttpStatus.OK);
      })
      .catch(error => {
        this.logger.error(error);
        return Response.failure(res, { message: 'Error occurred during comment update' }, HttpStatus.INTERNAL_SERVER_ERROR);

      });
  }

  deleteComment(req, res){
    const { commentId } = req.params;
    if(!commentId) {
      return Response.failure(res, { message: 'enter commentId param'}, HttpStatus.BAD_REQUEST);
    }
    return this.commentService.deleteCommentById(commentId)
      .then(response => {
        return Response.success(res, {
          message: 'Successfully deleted comment.',
          response
        }, HttpStatus.OK);
      })
      .catch(error => {
        this.logger.error(error);
        return Response.failure(res, { message: 'Error occurred during comment deletion' }, HttpStatus.INTERNAL_SERVER_ERROR);

      });
  }

}


module.exports = CommentController;
