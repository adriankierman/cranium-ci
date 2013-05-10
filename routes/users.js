var User = require('../lib/user')
  , _ = require('underscore')
  ;


function showAll (req, res, next) {
  var values = req.renderValues || {}
    , partials = { content: '{{>pages/usersShowAll}}' }
    ;

  values.settingsPage = true;

  User.getAllUsers(function (err, users) {
    values.users = users;

    return res.render('layout', { values: values
                                , partials: partials
                                });
  });
}


function userCreationForm (req, res, next) {
  var values = req.renderValues || {}
    , partials = { content: '{{>pages/userCreationForm}}' }
    ;

  values.settingsPage = true;

  return res.render('layout', { values: values
                              , partials: partials
                              });
}


function createUser (req, res, next) {
  var userData = { login: req.body.login, password: req.body.password }

  User.createUser(userData, function (err, user) {
    if (err) {
      if (err.validationErrors) {
        req.renderValues.userInput = userData;
        req.renderValues.validationErrors = true;
        req.renderValues.errors = _.values(err.validationErrors);
        return userCreationForm(req, res, next);
      } else {
        return res.send(500);
      }
    }

    req.session.userId = user._id;
    res.redirect(302, '/users');
  });
}


function userEditionForm (req, res, next) {
  User.getUser(req.params.login, function (err, user) {
    if (err || !user) { return res.redirect(302, '/users'); }

    var values = req.renderValues || {}
      , partials = { content: '{{>pages/userEditionForm}}' }
      ;

    values.login = user.login;
    values.settingsPage = true;

    return res.render('layout', { values: values
                                , partials: partials
                                });
  });
}


function editUser (req, res, next) {
  User.changePassword(req.params.login, req.body.password, req.body.newPassword, function (err) {
    if (err) {
      req.renderValues.validationErrors = true;
      req.renderValues.errors = [err];
    } else {
      req.renderValues.userEditSuccess = true
    }

    return userEditionForm(req, res, next);
  });
}


// Interface
module.exports.showAll = showAll;
module.exports.userCreationForm = userCreationForm;
module.exports.createUser = createUser;
module.exports.userEditionForm = userEditionForm;
module.exports.editUser = editUser;
