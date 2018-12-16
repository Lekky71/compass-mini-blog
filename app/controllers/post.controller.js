const Response = require('../lib/responseManager');
const HttpStatus = require('../constants/httpStatus');

class PostController {
  constructor(logger, service){
    this.logger = logger;
    this.blogPostService = service;
  }

  receiveNewBlogPost(req, res){
    const {category, title, content, creatorName} = req.body;
    const messages = [];
    if(!category) {
      messages.push('enter category');
    }
    if(!title){
      messages.push('enter title');
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
    return this.blogPostService.addNewBlogPost({category, title, content, creatorName})
      .then(response => {
        return Response.success(res, {
          message: 'Successfully created blog post.',
          response
        }, HttpStatus.OK);
      })
      .catch(error => {
        return Response.failure(res, { message: 'Error occurred during post creation' }, HttpStatus.INTERNAL_SERVER_ERROR);

      });

  }

  getBlogPostById(req, res ){
    const {postId} = req.params;
    if(!postId){
      return Response.failure(res, { message: ['enter postId'] }, HttpStatus.BAD_REQUEST);
    }
    return this.blogPostService.getBlogPostById(postId)
      .then(response => {
        return Response.success(res, {
          message: 'Successfully retrieved blog post.',
          response
        }, HttpStatus.OK);
      })
      .catch(error => {
        return Response.failure(res, { message: 'Error occurred during post retrieval' }, HttpStatus.INTERNAL_SERVER_ERROR);

      });

  }
  getAllBlogPosts(req, res ){
    return this.blogPostService.getAllBlogPosts()
      .then(response => {
        return Response.success(res, {
          message: 'Successfully retrieved all blog posts.',
          response
        }, HttpStatus.OK);
      })
      .catch(error => {
        return Response.failure(res, { message: 'Error occurred during posts retrieval' }, HttpStatus.INTERNAL_SERVER_ERROR);

      });
  }

  searchForBlogPost(req, res){
    const {queryString} = req.query;
    if(!queryString) {
      return Response.failure(res, { message: ['enter query string'] }, HttpStatus.BAD_REQUEST);
    }
    return this.blogPostService.searchForBlogPost(queryString)
      .then(response => {
        return Response.success(res, {
          message: 'Successfully retrieved all blog posts searched for.',
          response
        }, HttpStatus.OK);
      })
      .catch(error => {
        return Response.failure(res, { message: 'Error occurred during posts retrieval' }, HttpStatus.INTERNAL_SERVER_ERROR);

      });
  }

  updateBlogPost(req, res){
    const { postId } = req.params;
    const messages = [];
    if(!postId) {
      messages.push('enter post id param');
    }
    if((!req.body) || (req.body === {})){
      messages.push('enter at least one parameter to update');
    }
    if(messages.length > 0){
      return Response.failure(res, { message: messages}, HttpStatus.BAD_REQUEST);
    }
    return this.blogPostService.updateBlogPost(postId, req.body)
      .then(response => {
        return Response.success(res, {
          message: 'Successfully updated blog post.',
          response
        }, HttpStatus.OK);
      })
      .catch(error => {
        return Response.failure(res, { message: 'Error occurred during blog post update' }, HttpStatus.INTERNAL_SERVER_ERROR);

      });


  }

  deleteBlogPost(req, res){
    const { postId } = req.params;
    if(!postId) {
      return Response.failure(res, { message: 'enter postId param'}, HttpStatus.BAD_REQUEST);
    }
    return this.blogPostService.deleteBlogPost(postId)
      .then(response => {
        return Response.success(res, {
          message: 'Successfully deleted blog post.',
          response
        }, HttpStatus.OK);
      })
      .catch(error => {
        return Response.failure(res, { message: 'Error occurred during blog post deletion' }, HttpStatus.INTERNAL_SERVER_ERROR);

      });;
  }

}


module.exports = PostController;
