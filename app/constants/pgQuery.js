const userReturn = 'user_id, username, email, first_name, last_name, created_at';
const questionReturn = 'question_id, category, title, content, preferred_answer_id, user_id, answer_count, created_at';
const commentReturn = 'comment_id, answer_id, content, poster_user_id, created_at';
const answerReturn = 'answer_id, question_id, content, answerer_user_id, up_votes, down_votes, created_at';

module.exports = {
  create_question_table: `CREATE TABLE IF NOT EXISTS questions (question_id TEXT PRIMARY KEY NOT NULL,
                         category TEXT,
                         title TEXT,
                         content TEXT,
                         preferred_answer_id TEXT,
                         user_id TEXT REFERENCES users(user_id),
                         answer_count INTEGER,
                         created_at TIMESTAMP );`,
  create_answers_table: `CREATE TABLE IF NOT EXISTS answers (answer_id TEXT PRIMARY KEY NOT NULL,
                         question_id TEXT REFERENCES questions(question_id) ON DELETE CASCADE,
                         content TEXT,
                         answerer_user_id TEXT REFERENCES users(user_id) ON DELETE RESTRICT,
                         up_votes INTEGER,
                         down_votes INTEGER, 
                         created_at TIMESTAMP );`,
  create_comments_table: `CREATE TABLE IF NOT EXISTS comments (comment_id TEXT PRIMARY KEY NOT NULL,
                          answer_id TEXT REFERENCES answers(answer_id) ON DELETE CASCADE,
                          content TEXT,
                          poster_user_id TEXT REFERENCES users(user_id) ON DELETE RESTRICT,
                          created_at TIMESTAMP );`,

  add_question: `INSERT INTO questions (question_id, category, title, content, user_id, answer_count, created_at) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ${questionReturn}`,
  get_all_questions: `SELECT ${questionReturn} FROM questions ORDER BY created_at DESC;`,
  get_question_by_id: `SELECT ${questionReturn} FROM questions WHERE question_id = $1 ;`,
  delete_question_by_id: `DELETE FROM questions
                          WHERE question_id = $1;`,
  add_answer: `INSERT INTO answers (answer_id, question_id, content, answerer_user_id, up_votes, down_votes, created_at)
               VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ${answerReturn}`,

  get_all_user_questions: `SELECT ${questionReturn} FROM questions WHERE user_id = $1 ORDER BY created_at DESC;`,
  search_for_question: `SELECT ${questionReturn}
                        FROM questions
                        WHERE title LIKE '%$1%' OR content LIKE $1 
                        ORDER BY created_at DESC;`,
  add_comment: `INSERT INTO comments(comment_id, answer_id, content, poster_user_id, created_at)
                VALUES($1, $2, $3, $4, $5) RETURNING ${commentReturn}`,
  get_answers_for_question: `SELECT ${answerReturn}
                             FROM answers
                             WHERE question_id = $1
                             ORDER BY created_at ASC`,
};
