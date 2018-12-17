# sport-compass-test
[![Build Status](https://travis-ci.org/Lekky71/compass-mini-blog.svg?branch=staging)](https://travis-ci.org/Lekky71/compass-mini-blog)    
 <br/>
A mini project.

To start api  
 <br/>
 `npm install`
`npm run api`  
 <br/>
 <br/>
 Testing
  <br/>
  <br/>
 `npm install -g mocha`  
  <br/>
 `npm run test`    
 <br/>
 Full API Documentation is available on Swaggerhub via this [link](https://app.swaggerhub.com/apis/Oluwalekae/sport-compass_test/1.0).

## Codebase Structure
<pre>
sport-compass-test/
├── README.md
├── app
│   ├── config
│   │   ├── di.js
│   │   └── settings.js
│   ├── constants
│   │   ├── httpStatus.js
│   │   └── pgQuery.js
│   ├── controllers
│   │   ├── comment.controller.js
│   │   ├── post.controller.js
│   │   └── triangle.controller.js
│   ├── index.js
│   ├── lib
│   │   ├── postgresqlHelper.js
│   │   ├── responseManager.js
│   │   └── serviceLocator.js
│   ├── route
│   │   └── route.js
│   ├── service
│   │   ├── comment.service.js
│   │   ├── post.service.js
│   │   └── triangle.service.js
│   └── tests
│       ├── blog.test.js
│       └── triangle.test.js
├── package-lock.json
└── package.json
</pre>
