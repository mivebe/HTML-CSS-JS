# QuizApplication

**How to set up and run**

**Database**

A MariaDB instance was used. You can find a sql script for creation of the database schema in the [database folder](https://gitlab.com/HristofarDimitrov/quizapplication/-/tree/master/database).

**Server**

The server needs a pool.js file placed in the [data folder](https://gitlab.com/HristofarDimitrov/quizapplication/-/tree/master/api/src/data) with the following format:

```js
import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'quiz_application',
});

export default pool;
```
Run **`npm install`** and then **`npm start`** from inside the [api folder](https://gitlab.com/HristofarDimitrov/quizapplication/-/tree/master/api). The server will start on `localhost:5000`.

**Client**

Run **`npm install`** and then **`npm start`** from inside the [client folder](https://gitlab.com/HristofarDimitrov/quizapplication/-/tree/master/frontend/my-app). The client will be accessible from the browser at `localhost:3000`.

There is a preset teacher account with
**username** - Teacher,
**password** - Teacher,
Or you can make a normal account and make it a teacher from the database.

Enjoy!