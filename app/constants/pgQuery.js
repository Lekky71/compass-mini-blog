/**
 * Query String constants for CRUD operations for posts and comments tables
 * @type {string}
 */

const postColumns = 'post_id, category, title, content, creator_name, comment_count, created_at';
const commentColumns = 'comment_id, post_id, content, creator_name, created_at';
const postTable = 'posts';
const commentTable = 'comments';

module.exports = {
  postColumns,
  commentColumns,
  postTable,
  commentTable,
  create_posts_table: `CREATE TABLE IF NOT EXISTS ${postTable} (post_id TEXT PRIMARY KEY NOT NULL,
                         category TEXT,
                         title TEXT,
                         content TEXT,
                         creator_name TEXT,
                         comment_count INTEGER,
                         created_at TIMESTAMP );`,
  create_comments_table: `CREATE TABLE IF NOT EXISTS ${commentTable} (comment_id TEXT PRIMARY KEY NOT NULL,
                         post_id TEXT REFERENCES ${postTable}(post_id) ON DELETE CASCADE,
                         content TEXT,
                         creator_name TEXT,
                         created_at TIMESTAMP );`,

  add_post: `INSERT INTO ${postTable} (${postColumns}) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ${postColumns}`,
  get_all_posts: `SELECT ${postColumns} FROM ${postTable} ORDER BY created_at DESC;`,
  get_post_by_id: `SELECT ${postColumns} FROM ${postTable} WHERE post_id = $1 ;`,
  search_for_posts: `SELECT ${postColumns}
                        FROM ${postTable}
                        WHERE title LIKE $1 OR content LIKE $1 OR creator_name LIKE $1
                        ORDER BY created_at DESC;`,
  update_post_by_id: `UPDATE ${postTable}
                        SET category = $2, title = $3, content = $4, creator_name = $5, comment_count = $6, created_at = $7
                        WHERE post_id = $1`,
  delete_post_by_id: `DELETE FROM ${postTable}
                          WHERE post_id = $1;`,

  add_comment: `INSERT INTO ${commentTable} (${commentColumns})
               VALUES ($1, $2, $3, $4, $5) RETURNING ${commentColumns}`,
  get_comment_by_id: `SELECT ${commentColumns} FROM ${commentTable} WHERE comment_id = $1 ;`,
  get_comments_for_post: `SELECT ${commentColumns}
                             FROM ${commentTable}
                             WHERE comment_id = $1
                             ORDER BY created_at ASC`,
  update_comment_by_id: `UPDATE ${commentTable}
                        SET content = $2
                        WHERE comment_id = $1`,
  delete_comment_by_id: `DELETE FROM ${commentTable}
                          WHERE comment_id = $1;`,

};
