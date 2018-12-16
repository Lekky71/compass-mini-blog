/**
 * Created by Oluwaleke Fakorede on 15/12/2018.
 * objective: building to scale
 */
const config = require('../config/settings');

const routes = function routes(server, serviceLocator) {
  const triangle = serviceLocator.get('triangleController');
  const blog = serviceLocator.get('blogPostController');
  const blogPost = '/blog/post';

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
    path: `${blogPost}`,
    name: 'Add new blog post',
    version: '1.0.0'
  }, (req, res) => blog.receiveNewBlogPost(req, res));

  server.get({
    path: `${blogPost}/all`,
    name: 'Get all blog posts',
    version: '1.0.0'
  }, (req, res) => blog.getAllBlogPosts(req, res));

  server.get({
    path: `${blogPost}/:postId`,
    name: 'Get blog posts by id',
    version: '1.0.0'
  }, (req, res) => blog.getBlogPostById(req, res));

   server.get({
    path: `${blogPost}/search`,
    name: 'Search for blog posts',
    version: '1.0.0'
  }, (req, res) => blog.searchForBlogPost(req, res));

   server.put({
    path: `${blogPost}/:postId`,
    name: 'Update a blog post',
    version: '1.0.0'
  }, (req, res) => blog.updateBlogPost(req, res));

   server.del({
    path: `${blogPost}/:postId`,
    name: 'Delete a blog post',
    version: '1.0.0'
  }, (req, res) => blog.deleteBlogPost(req, res));


};

module.exports = routes;
