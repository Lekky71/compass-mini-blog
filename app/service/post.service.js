const PostgresqlHelper = require('../lib/postgresqlHelper');
const uuidv4 = require('uuid/v4');
class BlogPostService {
  constructor(logger, pgClient) {
    this.logger = logger;
    this.pgClient = pgClient;
    this.postgresqlHelper = new PostgresqlHelper(pgClient, 'posts');
    this.commentsPostgresqlHelper = new PostgresqlHelper(pgClient, 'comments');

  }

  addNewBlogPost(postBody){
    // noinspection JSUnresolvedFunction
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
      .then(post => {
        const param = {fields:[postId]};
        return this.commentsPostgresqlHelper
          .getForId(param)
          .then(rows => {
            post.comments = rows;
            return post;
          });
      });
  }

  getAllBlogPosts(){
    return this.postgresqlHelper
      .getAll()
      .then(rows => {
        return rows;
      });
  }

  searchForBlogPost(queryString){
    const params = {fields:[`%${queryString}%`]};
    return this.postgresqlHelper
      .search(params)
      .then(rows => {
        return rows;
      });
  }

  updateBlogPost(postId, body){
    const {category, title, content} = body;
    const param = {fields:[postId]};
    return this.postgresqlHelper.getById(param)
      .then(blogPost => {
        if(blogPost) {
          let catg = category ? category : blogPost.category;
          let titl = title ? title: blogPost.title;
          let con = content ? content : blogPost.content;
          const params = {fields:[postId, catg, titl, con, blogPost['creator_name'], blogPost['comment_count'], blogPost['created_at']]};
          return this.postgresqlHelper
            .update(params)
            .then(rowCount => {
              return rowCount > 0 ? {status:'success'} : {status:'failure'};
            });
        }
      });

  }

  deleteBlogPost(postId){
    const param = {fields:[postId]};
    return this.postgresqlHelper
      .deleteById(param)
      .then(rowCount => {
        return rowCount > 0 ? {status:'success'} : {status:'failure'};
      });
  }

}

module.exports = BlogPostService;
