const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
var db     = require('../db-config');
var Person     = require('../models/person');
var Area     = require('../models/area');
var Province     = require('../models/province');
var District     = require('../models/district');
var Setting     = require('../models/setting');
var Activity     = require('../models/activity');
var Admin     = require('../models/admin');
var Point     = require('../models/point');
var Audit     = require('../models/audit');
var AdminPointHistory = require('../models/adminpointhistory');
var Formfield     = require('../models/form-field');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const app = express();
var appRoot = require('app-root-path');
var uuid  = require('uuid');
var mong = require('mongoose');

app.set('superSecret',"datacenter");

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

var addPersonPointsAdmin=0;
var addPointPointsAdmin=0;
var addActivityPointsAdmin=0;

function loadAdminPoints()
{
    Setting.findOne({}).exec()
            .then(function(result){
                addPersonPointsAdmin = result.addPersonPointsAdmin;
                addPointPointsAdmin = result.addPointPointsAdmin;
                addActivityPointsAdmin = result.addActivityPointsAdmin;
            })
            .catch(function(err){
                return 0;
            });

}

function saveAdminPoints(adminid, activity, points)
{

    var adminpointhistory = new AdminPointHistory();      
    adminpointhistory.adminid = adminid;  
    adminpointhistory.point = points; 
    adminpointhistory.activity = activity; 
    adminpointhistory.date = Date.now(); 
    
    adminpointhistory.save(function(err, data) {
        if (err)
            res.send(err);

        return "Saved";
    });

}

function saveAudit(activity, date, adminid )
{

    var audit = new Audit();      
    audit.activity = activity; 
    audit.date = date; 
    audit.adminid = adminid;  
    
    audit.save(function(err, data) {
        if (err)
            res.send(err);

        return "Saved";
    });

}

router.route('/audit/:adminid')
    .get(function(req, res) {

        Audit.find({ adminid: req.params.adminid })        
        .sort({'date': -1})
        .limit(10)
        .exec(function(err, audits) {
            res.json(audits);
        });

    });

router.route('/point/:adminid')
    // create a point 
    .post(function(req, res) {

        var point = new Point();      
        point.users = req.body.users; 
        point.province = req.body.province; 
        point.area = req.body.area;  
        point.district = req.body.district;
        point.points = req.body.points;  

        loadAdminPoints();

        point.save(function(err, data) {
            if (err)
                res.send(err);
            
            saveAdminPoints(req.params.adminid, "Point added" , addPointPointsAdmin);

            saveAudit("Point added", Date.now(), req.params.adminid);

            res.json(data);
        });

    });

router.route('/point')
    .get(function(req, res) {

        Point.find(function (err, docs) {
            res.json(docs);
        });

    });

router.route('/point/:id')
    .delete(function(req, res) {

        Point.remove({
            _id: req.params.id
        }, function(err, point) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    });

router.route('/dashboard/topadmin')
    .get(function(req, res) {   
             AdminPointHistory.aggregate(
                [                    
                    {                      
                      $group : {
                        _id : "$adminid",
                        //  totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
                        //  averageQuantity: { $avg: "$quantity" },
                        count: { $sum: "$point" }                    
                    }},                     
                    { $lookup: {from: 'admins', localField: '_id', foreignField: '_id', as: 'admin'} }                                                              
                ], function(err, data){
                    res.json(data);
                });
    
    });

router.route('/dashboard/topadminchart/:adminid')
    .get(function(req, res) {   

        var id = req.params.adminid;
        const ObjectId = mong.Types.ObjectId;
        AdminPointHistory.aggregate(
        [     
            { $match : { adminid : ObjectId(id) } },                           
            {                      
                $group : {
                _id : { year: { $year : "$date" }, month: { $month : "$date" }},
                //totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
                //  averageQuantity: { $avg: "$quantity" },
                count: { $sum: "$point" }                    
            }},
            { $sort : { date : -1 }}, 
            { $limit: 6 }
        ], function(err, data){
            res.json(data);
        });
});

router.route('/dashboard/province')
    
    .get(function(req, res) {        
        Province.find({}, function (err, docs) {            
                res.json(docs);
        });

    });

router.route('/lookup/area')
    
    .get(function(req, res) {        
        
        Area.find(function (err, docs) {            
            //console.log(docs);
            res.json(docs);
        });

    });


router.route('/lookup/province')
    
    .get(function(req, res) {                
        Province.find(function (err, docs) {                    
            res.json(docs);
        });

    });

router.route('/lookup/district')
    
    .get(function(req, res) {                
        District.find(function (err, docs) {                    
            res.json(docs);
        });

    });

router.route('/setting')
    
    .get(function(req, res) {                
        Setting.findOne(function (err, docs) {              
            res.json(docs);
        });

    });

router.route('/setting')
    // create a person 
    .post(function(req, res) {
        var setting = new Setting();      // create a new instance of the Bear model
        setting.noOfUserInProvince = req.body.noOfUserInProvince;  // set the bears name (comes from the request)
        setting.noOfUserInArea = req.body.noOfUserInArea;  // set the bears name (comes from the request)
        setting.noOfUserInDistrict = req.body.noOfUserInDistrict;  // set the bears name (comes from the request)
        setting.noOfUserInSocial = req.body.noOfUserInSocial;  // set the bears name (comes from the request)
        setting.noOfUsers = req.body.noOfUsers;  // set the bears name (comes from the request)
        setting.addPersonPointsAdmin = req.body.addPersonPointsAdmin;  // set the bears name (comes from the request)
        setting.addPointPointsAdmin = req.body.addPointPointsAdmin;  // set the bears name (comes from the request)
        setting.addActivityPointsAdmin = req.body.addActivityPointsAdmin;  // set the bears name (comes from the request)
        setting.addhashtagPoints = req.body.addhashtagPoints;  // set the bears name (comes from the request)
        setting.addfacebookPoints = req.body.addfacebookPoints;  // set the bears name (comes from the request)
        setting.addtelegramPoints = req.body.addtelegramPoints;  // set the bears name (comes from the request)
        setting.addOtherPoints = req.body.addOtherPoints;  // set the bears name (comes from the request)
        setting.websiteTitle = req.body.websiteTitle;  // set the bears name (comes from the request)

        // save the person and check for errors
        Setting.findOne(function (err, out) {

            if (out!=null)
            {
                out.noOfUserInProvince = req.body.noOfUserInProvince;  // set the bears name (comes from the request)
                out.noOfUserInArea = req.body.noOfUserInArea;  // set the bears name (comes from the request)
                out.noOfUserInDistrict = req.body.noOfUserInDistrict;  // set the bears name (comes from the request)
                out.noOfUserInSocial = req.body.noOfUserInSocial;  // set the bears name (comes from the request)
                out.noOfUsers = req.body.noOfUsers;  // set the bears name (comes from the request)
                out.addPersonPointsAdmin = req.body.addPersonPointsAdmin;  // set the bears name (comes from the request)
                out.addPointPointsAdmin = req.body.addPointPointsAdmin;  // set the bears name (comes from the request)
                out.addActivityPointsAdmin = req.body.addActivityPointsAdmin;  // set the bears name (comes from the request)
                out.addhashtagPoints = req.body.addhashtagPoints;  // set the bears name (comes from the request)
                out.addfacebookPoints = req.body.addfacebookPoints;  // set the bears name (comes from the request)
                out.addtelegramPoints = req.body.addtelegramPoints;  // set the bears name (comes from the request)
                out.addOtherPoints = req.body.addOtherPoints;  // set the bears name (comes from the request)
                out.websiteTitle = req.body.websiteTitle;  // set the bears name (comes from the request)
                out.save(function(err, data) {
                    if (err)
                        res.send(err);

                    res.json(data);
                });
            }
            else
            {
                setting.save(function(err, data) {
                    if (err)
                        res.send(err);

                    res.json(data);
                });
            }
        });        

    });


router.route('/person/:adminid')
    // create a person 
    .post(function(req, res) {

        var person = new Person();      // create a new instance of the Bear model
        person.person = req.body;  // set the bears name (comes from the request)

        // save the person and check for errors
        loadAdminPoints();
        person.save(function(err, data) {
            if (err)
                res.send(err);
            
            saveAdminPoints(req.params.adminid, "Person added", addPersonPointsAdmin);

            saveAudit("Person added", Date.now(), req.params.adminid);

            res.json(data);
        });

    });

router.route('/person')
    .get(function(req, res) {

        Person.find(function (err, docs) {
            res.json(docs);
        });

    });


router.route('/person/province/:province')
    .get(function(req, res) {

        Person.find({ "person.province": req.params.province }, function (err, docs) {
            res.json(docs);
        });

    });

router.route('/person/social/:search')
    .get(function(req, res) {

        var search = req.params.search;
        
        if (search=="facebook"){
            
            Person.find({ $and: [{"person.facebook_url": { $ne: '' } }, {"person.facebook_url": { $ne: null } }] } , function (err, docs) {
                res.json(docs);
            });
        }
        else if (search=="twitter"){
            Person.find({ $and: [{"person.twitter_url": { $ne: '' } }, {"person.twitter_url": { $ne: null } }] } , function (err, docs) {
                res.json(docs);
            });
        }
        else if (search=="telegram"){
            Person.find({ $and: [{"person.telegram_url": { $ne: '' } }, {"person.telegram_url": { $ne: null } }] } , function (err, docs) {
                res.json(docs);
            });
        }
        else if (search=="others"){
            Person.find({ $and: [{"person.whatsApp_url": { $ne: '' } }, {"person.whatsApp_url": { $ne: null } }] } , function (err, docs) {
                res.json(docs);
            });
        }
    });

router.route('/person/socialcount/:search')
    .get(function(req, res) {

        var search = req.params.search;
        
        if (search=="facebook"){
            
            Person.find({ $and: [{"person.facebook_url": { $ne: '' } }, {"person.facebook_url": { $ne: null } }] } , function (err, docs) {
                res.json(docs.length);
            });
        }
        else if (search=="twitter"){
            Person.find({ $and: [{"person.twitter_url": { $ne: '' } }, {"person.twitter_url": { $ne: null } }] } , function (err, docs) {
                res.json(docs.length);
            });
        }
        else if (search=="telegram"){
            Person.find({ $and: [{"person.telegram_url": { $ne: '' } }, {"person.telegram_url": { $ne: null } }] } , function (err, docs) {
                res.json(docs.length);
            });
        }
        else if (search=="others"){
            Person.find({ $and: [{"person.whatsApp_url": { $ne: '' } }, {"person.whatsApp_url": { $ne: null } }] } , function (err, docs) {
                res.json(docs.length);
            });
        }
    });


router.route('/person/provincecount')
    .get(function(req, res) {
        
        Person.aggregate(
                [
                    {
                      $group : {
                        _id : "$person.province",
                        count: { $sum: 1 }
                      }
                    }
                ], function(err, data){
                    res.json(data);
                });
    });

router.route('/person/:id')
    
    .get(function(req, res) {

       if (req.params.id) {
            Person.findById(req.params.id, function (err, docs) {
                res.json(docs);
            });
       }
    });

router.route('/person/:id')
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Person.findById(req.params.id, function(err, person) {

            if (err)
                res.send(err);

            person.person = req.body;  // set the person

            // save the bear
            person.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Person updated!' });
            });

        });
    });

router.route('/person/:id')
    .delete(function(req, res) {

        Person.remove({
            _id: req.params.id
        }, function(err, person) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    });

router.route('/formfield/add')

    // create a formfield 
    .post(function(req, res) {

        var formfield = new Formfield();      // create a new instance of the Bear model
        formfield.formname = req.body.formname;  // set the bears name (comes from the request)        
        formfield.fieldtype = req.body.fieldtype;
        formfield.lookupdata = req.body.lookupdata;
        formfield.displayname = req.body.displayname;
        formfield.labelname = req.body.labelname;
        formfield.description = req.body.description;
        formfield.isMandatory = req.body.isMandatory;
        formfield.issystemfield = req.body.issystemfield;
        formfield.isDisplayOnList = req.body.isDisplayOnList;
        formfield.formorder = req.body.formorder;

        // save the formfield and check for errors
        formfield.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'formfield created!' });
        });

    });

router.route('/formfield/:formname')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {

       if (req.params.formname) {
            Formfield.find({ formname: req.params.formname })
                    .sort({'formorder': 1})                    
                    .exec(function(err, formfields) {
                        res.json(formfields);
                    });

       }
    });

router.route('/formfieldByID/:id')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {
       if (req.params.id) {
            Formfield.findById(req.params.id, function (err, docs) {
                res.json(docs);
            });
       }
    });

router.route('/formfield/:id')
    .put(function(req, res) {
        // use our bear model to find the bear we want
        Formfield.findById(req.params.id, function(err, formfield) {
            if (err)
                res.send(err);

            formfield.formname = req.body.formname;  // set the bears name (comes from the request)        
            formfield.fieldtype = req.body.fieldtype;
            formfield.lookupdata = req.body.lookupdata;
            formfield.displayname = req.body.displayname;
            formfield.labelname = req.body.labelname;
            formfield.description = req.body.description;
            formfield.isMandatory = req.body.isMandatory;
            formfield.issystemfield = req.body.issystemfield;
            formfield.isDisplayOnList = req.body.isDisplayOnList;
            formfield.formorder = req.body.formorder;

            // save the bear
            formfield.save(function(err, data) {
                if (err)
                    res.send(err);

                res.json(data);
            });

        });
    });

router.route('/formfield/:id')
    .delete(function(req, res) {

        Formfield.remove({
            _id: req.params.id
        }, function(err, formfield) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    });


router.route('/admin/login')

    .post(function(req, res) {
        Admin.findOne({ "admin.username": req.body.username }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

        // check if password matches
            if (user.admin.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                console.log("secret:" + app.get('superSecret'));
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 60*60*24 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    admin:user
                });
            }   

        }

    });
});


router.route('/admin')
    // create a person 
    .post(function(req, res) {

        var admin = new Admin();      // create a new instance of the Bear model
        admin.admin = req.body;  // set the bears name (comes from the request)
        admin.save(function(err, data) {
            if (err)
                res.send(err);

            res.json(data);
        });

    });

router.route('/admin')
    .get(function(req, res) {

        Admin.find(function (err, docs) {
            res.json(docs);
        });

    });

router.route('/admin/:id')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {

       if (req.params.id) {
            Admin.findById(req.params.id, function (err, docs) {
                res.json(docs);
            });
       }
    });

router.route('/admin/:id')
    .put(function(req, res) {
        // use our bear model to find the bear we want
        Admin.findById(req.params.id, function(err, admin) {

            if (err)
                res.send(err);

            admin.admin = req.body;  // set the person

            // save the bear
            admin.save(function(err, data) {
                if (err)
                    res.send(err);

                res.json(data);
            });

        });
    });

router.route('/admin/:id')
    .delete(function(req, res) {

        Admin.remove({
            _id: req.params.id
        }, function(err, admin) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    });


router.route('/activity/:adminid')
    // create a person 
    .post(function(req, res) {

        var activity = new Activity();      // create a new instance of the Bear model
        activity.name = req.body.name;  // set the bears name (comes from the request)
        activity.description = req.body.description;  // set the bears name (comes from the request)
        activity.type = req.body.type;  // set the bears name (comes from the request)
        activity.persons = req.body.persons;  // set the bears name (comes from the request)
        activity.profileimage = req.body.profileimage;  // set the bears name (comes from the request)
        activity.url = req.body.url;  // set the bears name (comes from the request)
        activity.points = req.body.points;  // set the bears name (comes from the request)
        activity.province = req.body.province;  // set the bears name (comes from the request)
        activity.district = req.body.district;  // set the bears name (comes from the request)
        activity.area = req.body.area;  // set the bears name (comes from the request)

        // save the person and check for errors
        loadAdminPoints();

        activity.save(function(err, data) {
            if (err)
                res.send(err);

            saveAdminPoints(req.params.adminid, "Activity added", addActivityPointsAdmin);

            saveAudit("Activity added", Date.now(), req.params.adminid);

            res.json(data);
        });

    });

router.route('/activity/:id')
    .put(function(req, res) {
        // use our bear model to find the bear we want
        console.log(req.params.id);
        Activity.findById(req.params.id, function(err, activity) {
            if (err)
                res.send(err);

            activity.name = req.body.name;  // set the bears name (comes from the request)
            activity.description = req.body.description;  // set the bears name (comes from the request)
            activity.type = req.body.type;  // set the bears name (comes from the request)
            activity.persons = req.body.persons;  // set the bears name (comes from the request)
            activity.profileimage = req.body.profileimage;  // set the bears name (comes from the request)
            activity.url = req.body.url;  // set the bears name (comes from the request)
            activity.points = req.body.points;  // set the bears name (comes from the request)
            activity.province = req.body.province;  // set the bears name (comes from the request)
            activity.district = req.body.district;  // set the bears name (comes from the request)
            activity.area = req.body.area;  // set the bears name (comes from the request)

            // save the bear
            activity.save(function(err, data) {
                if (err)
                    res.send(err);
                res.json(data);
            });

        });
    });

router.route('/activity')
    .get(function(req, res) {

        Activity.find(function (err, docs) {
            res.json(docs);
        });

    });

router.route('/activity/:person')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {

       if (req.params.id) {
            Person.find({persons: { "$in" : [person]} }, function (err, docs) {
                res.json(docs);
            });
       }
    });

router.use(fileUpload());
router.route('/activityById/:id')
   // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {

       if (req.params.id) {
            Activity.findById(req.params.id, function (err, docs) {
                res.json(docs);
            });
       }
    });



router.route('/activity/:id')
    .delete(function(req, res) {

        Activity.remove({
            _id: req.params.id
        }, function(err, point) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    });

app.use(fileUpload());
 
router.route('/upload')

    .post(function(req, res) {

        if (!req.files)
        {                   
            return res.status(400).send('No files were uploaded.');
        }
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
        let sampleFile = req.files.sampleFile;        
        var fileextn = sampleFile.name.substring(sampleFile.name.lastIndexOf("."));
        var filename = uuid.v1() + fileextn;
        // Use the mv() method to place the file somewhere on your server 
        
        sampleFile.mv(appRoot + '/public/uploads/' + filename, function(err) {
            if (err)
            {
                console.log(err);
                return res.status(500).send(err);
            }
            res.send('/uploads/' + filename);
        });        
});
module.exports = router;
