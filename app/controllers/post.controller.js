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
      return Response.failure(res, { message: ['enter postId'] }, HttpStatus.INTERNAL_SERVER_ERROR);
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

  searchForBlogPost(req, res ){

  }

  updateBlogPost(req, res ){

  }

  deleteBlogPost(req, res ){

  }

}


module.exports = PostController;
