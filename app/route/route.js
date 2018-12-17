/**
 * Created by Oluwaleke Fakorede on 15/12/2018.
 * objective: building to scale
 */
const config = require('../config/settings');

const routes = function routes(server, serviceLocator) {
  const triangle = serviceLocator.get('triangleController');
  const blog = serviceLocator.get('blogPostController');
  const comment = serviceLocator.get('commentController');
  const blogUrl = '/blog/post';
  const commentUrl = '/blog/comment';

  server.get({
    path: '/',
    name: 'home',
    version: '1.0.0'
  }, (req, res) => res.send(`Welcome to ${config.appName} API`));

  server.get({
    path: '/triangle',
    name: 'Triangle type check',
    version: '1.0.0'
  }, (req, res) => triangle.receiveTriangle(req, res));

  /**
   * Routes for blog posts
   */
  server.post({
    path: `${blogUrl}`,
    name: 'Add new blog post',
    version: '1.0.0'
  }, (req, res) => blog.receiveNewBlogPost(req, res));

  server.get({
    path: `${blogUrl}/all`,
    name: 'Get all blog posts',
    version: '1.0.0'
  }, (req, res) => blog.getAllBlogPosts(req, res));

  server.get({
    path: `${blogUrl}/:postId`,
    name: 'Get blog posts by id',
    version: '1.0.0'
  }, (req, res) => blog.getBlogPostById(req, res));

   server.get({
    path: `${blogUrl}/search`,
    name: 'Search for blog posts',
    version: '1.0.0'
  }, (req, res) => blog.searchForBlogPost(req, res));

   server.put({
    path: `${blogUrl}/:postId`,
    name: 'Update a blog post',
    version: '1.0.0'
  }, (req, res) => blog.updateBlogPost(req, res));

   server.del({
    path: `${blogUrl}/:postId`,
    name: 'Delete a blog post',
    version: '1.0.0'
  }, (req, res) => blog.deleteBlogPost(req, res));

  /**
   * Routes for comments
   */
  server.post({
    path: `${commentUrl}`,
    name: 'Add new comment',
    version: '1.0.0'
  }, (req, res) => comment.receiveNewComment(req, res));

  server.get({
    path: `${commentUrl}/:commentId`,
    name: 'Get comment by id',
    version: '1.0.0'
  }, (req, res) => comment.getCommentById(req, res));

  server.get({
    path: `${commentUrl}/post/:postId`,
    name: 'Get all comments for a post',
    version: '1.0.0'
  }, (req, res) => comment.getAllCommentsForPost(req, res));

  server.put({
    path: `${commentUrl}/:commentId`,
    name: 'Update a comment by id',
    version: '1.0.0'
  }, (req, res) => comment.updateComment(req, res));

  server.del({
    path: `${commentUrl}/:commentId`,
    name: 'Delete a comment by id',
    version: '1.0.0'
  }, (req, res) => comment.deleteComment(req, res));


};

module.exports = routes;
