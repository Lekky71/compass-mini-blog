const PostgresqlHelper = require('../lib/postgresqlHelper');
const uuidv4 = require('uuid/v4');
const config = require('../config/settings');
class BlogPostService {
  constructor(logger, pgClient) {
    this.logger = logger;
    this.pgClient = pgClient;
    this.postgresqlHelper = new PostgresqlHelper(pgClient, 'posts');

  }

  addNewBlogPost(postBody){
    const postId = uuidv4().toString();
    const {category, title, content, creatorName} = postBody;
    const params = {fields:[postId, category, title, content, creatorName, 0, new Date()]};
    return this.postgresqlHelper
      .add(params)
      .then(rows=> {
        this.logger.info(`Successfully added new blog post`);
        return rows;
      })

  }

  getBlogPostById(postId){
    const params = {fields:[postId]};
    return this.postgresqlHelper
      .getById(params)
      .then(rows => {
        this.logger.info(`Successfully retrieved blog post`);
        return rows;
      });
  }

  getAllBlogPosts(){
    return this.postgresqlHelper
      .getAll()
      .then(rows => {
        this.logger.info(`Successfully retrieved all blog posts`);
        return rows;
      });
  }

  searchForBlogPost(req, res ){

  }

  updateBlogPost(req, res ){

  }

  deleteBlogPost(req, res ){

  }

}

module.exports = BlogPostService;
