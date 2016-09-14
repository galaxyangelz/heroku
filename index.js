var express = require('express');
var bodyParser = require('body-parser');
var students = require('./routes/students.js');
var courses = require('./routes/courses.js');
var grades = require('./routes/grades.js');
var app = express();

app.set('port', (process.env.PORT || 80));

app.use(bodyParser.json());

app.use('/api', students);
app.use('/api', courses);
app.use('/api', grades);

//
//ROUTE
//
//Route for students
app.get('/students', students)
	.post('/students', students);

app.get('/students/:sid', students)
	.delete('/students/:sid', students)
	.put('/students/:sid/', students);

//Route for courses
app.get('/courses', courses)
	.post('/courses', courses);

app.get('/courses/:cid', courses)
	.delete('/courses/:cid', courses)
	.put('/courses/:cid/', courses);

//Route for grades
app.get('/courses/:cid/grades', grades)
	.post('/courses/:cid/grades',grades);

app.get('/courses/:cid/grades/:sid',grades)
	.put('/courses/:cid/grades/:sid',grades)
	.delete('/courses/:cid/grades/:sid',grades);

//Route homepage
app.get('/', function(req, res) {
	res.send("Welcome to my API");
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});