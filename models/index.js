var path = require('path');

//Cargar modelo ORM
var Sequelize = require('sequelize');


var url, storage;

if(!process.env.DATABASE_URL)	{
	url = 'sqlite:///';
	storage = 'quiz.sqlite';
} else {
	url = process.env.DATABASE_URL;
	storage = process.env.DATABASE_STORAGE || "";
}

var sequelize = new Sequelize(url,
								{storage: storage,
									omitNull: true});

//Importar la definicion de la tabla quiz de quiz.js

var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//Importar la definicion de la tabla Comments de comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

//Importar la definicion de la tabla Users de user.js
var User = sequelize.import(path.join(__dirname,'user'));
//Relacion entre ambos modelos
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);
//Relación 1 a N entre User y Quiz:
User.hasMany(Quiz, {foreignKey:'AuthorId'});
Quiz.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});


exports.Quiz = Quiz; //esportar definicion de tabla quiz
exports.Comment=Comment;
exports.User = User; //exportar definicion de tabla de usuarios