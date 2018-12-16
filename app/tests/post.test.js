const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const app = require('../index');

const expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Blog Post Test Suite', () => {

  let postId;

  it('should create a new blog post', (done) => {
    chai.request(app)
      .post('/blog/post')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        category:'Soccer',
        title:'How to sprint',
        content:'This drill simulates field movements, like when a defender has to read a play and attack the ball. It also reinforces proper acceleration' +
          ' mechanics when changing from a backpedal to a sprint.Set up five cones in a straight line 5 yards apart. Number them 1-5.Standing at Cone 1, ' +
          'lean and sprint to Cone 3.Backpedal to Cone 2. Keep your core set, posture low and weight on the balls of your feet.Change direction by driving' +
          ' with your legs and pushing into a full forward sprint toward Cone 4. When sprinting, get your knees up to produce force and punch the ground with ' +
          'the balls of your feet.Backpedal to Cone 3.Change direction one last time and sprint past Cone 5.',
        creatorName:'Oluwaleke Fakorede'
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.code)
          .to
          .have
          .equal(200);
        expect(res.body)
          .to
          .have
          .property('message');
        expect(res.body)
          .to
          .have.property('data');
        postId = res.body.data[0]['post_id'];
        done();
      });
  });

  it('should fail to create a new blog post because content and category not sent', (done) => {
    chai.request(app)
      .post('/blog/post')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        title:'How to sprint',
        creatorName:'Oluwaleke Fakorede'
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.code)
          .to
          .have
          .equal(400);
        expect(res.body)
          .to
          .have
          .property('message');
        expect(res.body.message)
          .to
          .have.include('enter category');
        expect(res.body.message)
          .to
          .have.include('enter content');
        done();
      });
  });

  it('should get all blog posts', (done) => {
    chai.request(app)
      .get('/blog/post/all')
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.code)
          .to
          .have
          .equal(200);
        expect(res.body)
          .to
          .have.property('data');
        done();
      });
  });

  it('should get a blog post by its id', (done) => {
    chai.request(app)
      .get(`/blog/post/${postId}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.code)
          .to
          .have
          .equal(200);
        expect(res.body)
          .to
          .have.property('data');
        done();
      });
  });

  it('should search for blog posts and return a list', (done) => {
    chai.request(app)
      .get(`/blog/post/search?queryString=pushing`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.code)
          .to
          .have
          .equal(200);
        expect(res.body)
          .to
          .have.property('data');
        done();
      });
  });

  it('should fail search for blog posts because query string is not sent', (done) => {
    chai.request(app)
      .get(`/blog/post/search`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.code)
          .to
          .have
          .equal(400);
        expect(res.body.message)
          .to
          .have.include('enter query string');
        done();
      });
  });

  it('should update a blog post using its id', (done) => {
    chai.request(app)
      .put(`/blog/post/${postId}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        title:'Sprinting made easy',
        content: 'Edited short content'
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.code)
          .to
          .have
          .equal(200);
        expect(res.body)
          .to
          .have.property('data');
        expect(res.body.data.status)
          .to
          .have
          .equal('success');
        done();
      });
  });

  it('should fail to update blog post because body content not sent', (done) => {
    chai.request(app)
      .put('/blog/post/${postId}')
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.code)
          .to
          .have
          .equal(400);
        expect(res.body.message)
          .to
          .have.include('enter at least one parameter to update');
        done();
      });
  });

  it('should delete a blog post using its id', (done) => {
    chai.request(app)
      .del(`/blog/post/${postId}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.code)
          .to
          .have
          .equal(200);
        expect(res.body)
          .to
          .have.property('data');
        expect(res.body.data.status)
          .to
          .have
          .equal('success');
        done();
      });
  });


});
