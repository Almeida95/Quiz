var models = require('../models');

// GET /quizzes/
exports.index = function(req, res, next){
	models.Quiz.findAll//Busca la primera pregunta en la tabla Quiz,  si la busqueda findOne() tiene exito se ejecutara la funcio de then
	.then(function(quiz){
			res.render('quizzes/index.ejs', {quizzes: quizzes});
	}).catch(function(error) {
	next(error);
	});  //Esto por sio hubiere errores
};

// GET /quizzes/:id/check
exports.check = function(req,res,next){
	models
	.Quiz
	.findById(req.params.quizId)  //Busca la primera pregunta
	.then(function(quiz){
		if (quiz){
			var answer = req.query.answer || "";
			var result = answer === quiz.answer ? 'Correcta' : 'Incorrecta';
			res.render('quizzes/result', {result:result,
		                        		  answer: answer});
		}
		else {
			throw new Error('No hay preguntas en la BBDD');
		}
	}).catch(function(error){ next(error); });
};

exports.show = function(req, res, next) {
 	models.Quiz.findById(req.params.quizId)
  		.then(function(quiz) {
  			if (quiz) {
  				var answer = req.query.answer || '';
  				res.render('quizzes/show', {quiz: quiz,
 											answer: answer});
 			} else {
 		    	throw new Error('No existe ese quiz en la BBDD.');
  		    }
  		})
  		.catch(function(error) {
			next(error);
 		});
  };

  // GET /quizzes/:id/check
 exports.check = function(req, res) {
 	models.Quiz.findById(req.params.quizId)
  		.then(function(quiz) {
  			if (quiz) {
  				var answer = req.query.answer || "";
  				var result = answer === quiz.answer ? 'Correcta' : 'Incorrecta';
  				res.render('quizzes/result', { quiz: quiz, 
 											   result: result, 
  											   answer: answer });
  						} 
  						else {
 				throw new Error('No existe ese quiz en la BBDD.');
 			}
  		})
  		.catch(function(error) {
  			next(error);
  			});	
  };
