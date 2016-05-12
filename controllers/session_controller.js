var userController = require('./user_controller');
var models = require('../models');
var url = require('url');
var authenticate = function(login,password){
    return models.User.findOne({where: {username:login}})
         .then(function(user){
            if(user&&user.verifyPassword(password)){
                return user;
            }
            else{
                return null;
            }
         });
};


// GET /session   -- Formulario de login
exports.new = function(req, res, next) {
    var redir = req.query.redir || url.parse(req.headers.referer||"/").pathname;

    if(redir==='session' || redir === '/users/new') {redir ='/';}
    res.render('session/new', {redir: redir});
};


// POST /session   -- Crear la sesion si usuario se autentica
exports.create = function(req, res, next) {

    var redir=req.body.redir || '/'

    var login     = req.body.login;
    var password  = req.body.password;

    authenticate(login, password)
        .then(function(user) {
            if(user){

	        req.session.user = {id:user.id, username:user.username};

	        res.redirect(redir); // redirección a la raiz
		}
        else {
            req.flash('error', 'La autenticación ha fallado.Reintentelo.');
            res.redirect("/session?redir="+redir);
        }
    })
		.catch(function(error) {
            req.flash('error', 'Se ha producido un error: ' + error);
            res.redirect("/session");        
    });
};


// DELETE /session   -- Destruir sesion 
exports.destroy = function(req, res, next) {

    delete req.session.user;
    
    res.redirect("/session"); // redirect a login
};