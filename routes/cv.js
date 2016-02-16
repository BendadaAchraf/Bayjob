/**
 * Created by Antoine Lecoustre on 09/02/2016.
 */
var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:idCv', function(req, res, next) {


  models.CV.findOne({
    where:{id: req.params.idCv},
    include:[{model: models.Competence_CV},
              {model: models.Candidat},
              {model: models.Langue},
              {model: models.Centre_interet},
              {model: models.Experience_pro, include : [{model: models.Mission_CV}, {model: models.Contrat_type}]},
              {model: models.Formation}
              ]
  }).then(function(cv){
    console.log(JSON.stringify(cv));

    //Liste des mois
      var mois = ["Janvier","F�vrier","Mars","Avril","Mai","Juin","Juillet","Ao�t","Septembre","Octobre","Novembre","D�cembre"];
    res.render('cv', { title: 'CV', cv: cv, mois: mois});
  });




  /*models.CV.findById(req.params.idCv).then(function(cv){
    models.CV.findById(cv.CandidatId).then(function(candidat){
      nom =candidat.nom;
      res.render('cv', { title: 'CV' });
    });

  });*/


});

module.exports = router;
