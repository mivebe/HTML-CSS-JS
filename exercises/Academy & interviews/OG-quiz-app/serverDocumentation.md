# QuizApplication

1. **Register a new student**
- URL - /users
- Method - POST
- Requires: body - {username: String[3,25], password: String[3,25], firstName: String[3,25], lastName: String[3,25]}
- Success response : Code 200,
 Content - { refreshToken, token }
- Error response : Code 400,
 Content - { msg: reason for the error}

 2. **Login**
- URL - /users/login
- Method - POST
- Requires: body - {username: String[3,25], password: String[3,25]}
- Success response : Code 200,
 Content - { refreshToken, token }
- Error response : Code 400,
 Content - { msg: reason for the error}

3. **Refresh your access token**
- URL - /users/login
- Method - POST
- Requires: header - Authorization : Bearer {your refresh token}
- Success response : Code 200,
 Content - { refreshToken, token }
- Error response : Code 400,
 Content - { msg: reason for the error}

4. **Get leaderboard**
- URL - /users/leaderboard
- Method - GET
- Requires: header - Authorization : Bearer {your access token}
- Optional: query params - {search: String, offset: Integer, limit: Integer}
- Success response : Code 200,
 Content - { leaderboard( with pagination and filtered by search word) }
- Error response : Code 400,
 Content - { msg: Invalid offset value!/ Invalid limit value!}
 
5. **Get user's history**
- URL - /users/history
- Method - GET
- Requires: header - Authorization : Bearer {your access token}
- Optional: query params - {search: String, offset: Integer, limit: Integer}
- Success response : Code 200,
 Content - { user's history( with pagination and filtered by search word) }
- Error response : Code 400,
 Content - { msg: Invalid offset value!/ Invalid limit value!}

6. **Get teacher's quizzes**
- URL - /users/quizzes
- Method - GET
- Requires: header - Authorization : Bearer {your access token},
User role: Teacher
- Success response : Code 200,
 Content - { teacher's quizzes }
- Error response : Code 400,
 Content - { msg: Invalid role}

7. **Get all categories**
- URL - /categories
- Method - GET
- Requires: header - Authorization : Bearer {your access token}
- Success response : Code 200,
 Content - { All the categories }
- Error response : Code 401,
 Content - Unauthorized

8. **Create category**
- URL - /categories
- Method - POST
- Requires: header - Authorization : Bearer {your access token}
 User role: Teacher
- body: {categoryName: String}
- Success response : Code 200,
 Content - { the created category }
- Error response : Code 400,
 Content - { msg: 'Category with that name already exist!'}

9. **Get all the quizzes in category**
- URL - /categories/:id/quizzes
- Method - GET
- Requires: header - Authorization : Bearer {your access token}
- Optional: query params - {offset: Integer, limit: Integer}
- Success response : Code 200,
 Content - { quizzes in category ( with pagination, sorted by date of solving) }
- Error response : Code 400,
 Content - { msg: Invalid offset value!/ Invalid limit value!/ Invalid quiz id}

10. **Get all the quizzes**
- URL - /quizzes
- Method - GET
- Requires: header - Authorization : Bearer {your access token}
- Success response : Code 200,
 Content - { Array of single quizzes }
- Error response : Code 401,
Content - Unauthorized

11. **Get specific quiz full info**
- URL - /quizzes/:id
- Method - GET
- Requires: header - Authorization : Bearer {your access token}
- Info: You can access it only once as a student and as many times as you like as a teacher
- Success response : Code 200,
 Content - { quizName, timeLimit, questions[], category,(names the teacher that has made the quiz ) }
- Error response : Code 400,
 Content - { msg: Invalid quiz id/ You cannot access this quiz more than once}

12. **Get specific quiz full info**
- URL - /quizzes/:id/users
- Method - GET
- Requires: header - Authorization : Bearer {your access token},
User role : 'teacher'
- Success response : Code 200,
 Content - { Array of users solved the quiz and their scores}
- Error response : Code 400,
 Content - { msg: Invalid quiz id}

13. **Create unlisted empty quiz**
- URL - /quizzes
- Method - POST
- Requires: header - Authorization : Bearer {your access token},
User role : 'teacher',
Body: {name, timeLimit, categoryId}
- Success response : Code 200,
 Content - { quizId, quizName, timeLimit, category }
- Error response : Code 400,
 Content - { msg: Quiz with that name already exists/ There are no categories yet/ Invalid category id}

14. **Add question to the quiz you are making**
- URL - /quizzes/:id/questions
- Method - POST
- Requires: header - Authorization : Bearer {your access token},
User role : 'teacher',
Body: {question, points, type, answers[]}
- Success response : Code 200,
 Content - { the submited question and its answers }
- Error response : Code 400,
 Content - { msg: Invalid quiz id/ Invalid question/ Invalid answers}

15. **Submit your quiz for everyone**
- URL - /quizzes/:id
- Method - POST
- Requires: header - Authorization : Bearer {your access token},
User role : 'teacher',
- Success response : Code 200,
 Content - { quiz with questions and answers }
- Error response : Code 400,
 Content - { msg: Invalid quiz id/ Quiz should have atleast 2 questions to be valid}

16. **Submit your quiz for everyone**
- URL - /quizzes/:id/answers
- Method - POST
- Requires: header - Authorization : Bearer {your access token},
Body : {[questions id, [answers ids] ] }
- Info: You can access it only once as a student and as many times as you like as a teacher
- Success response : Code 200,
 Content - { Your score }
- Error response : Code 400,
 Content - { msg: Invalid quiz id/ You cannot solve this quiz more than once}