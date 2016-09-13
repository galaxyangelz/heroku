var express = require('express');
var bodyParser = require('body-parser');
var students = require('./routes/students.js');
var courses = require('./routes/courses.js');
var grades = require('./routes/grades.js');
var app = express();

app.set('port', (process.env.PORT || 80));

app.use(bodyParser.json());

app.use('/api', students);

//
//ROUTE
//
//Route for students
app.get('/students', students).post('/students', students);
app.get('/students/:sid', students).delete('/students/:sid', students);
app.put('/students/:sid/edit', students);

//Route for courses
app.get('/courses', courses).post('/courses', courses);
app.get('/courses/:sid', courses).delete('/courses/:sid', courses);
app.put('/courses/:sid/edit', courses);

//Route for grades
app.get('/grades',grades);

//Route homepage
app.get('/', function(req, res) {
	res.send("Hello world");
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});