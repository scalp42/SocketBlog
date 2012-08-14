/*
 * Node-powered, Socket.IO driven web blog as a proof of concept. Loads blog posts extremely fast.
 */

var express = require('express'),
    app = express.createServer(),
    io = require('socket.io'),
    sio,

    // underscore
    _ = require('underscore'),

    // load config options
    config = require('./config/config.js').options,

    // connect cookie parser
    connect = require('connect'),

    // cookie library
    cookie = require('cookie'),

    // gzippo static file server
    gzippo = require('gzippo'),

    // Passport
    passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy,

    // mongo
    DB = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server =require('mongodb').Server,
    host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : config.DB_ip,
    port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : config.DB_port,
    db = new DB('mkeas', new Server(host, port, {}), {native_parser:false}),

    // memory store that we can manage sessions in, instead of Express doing it automatically
    MemoryStore = express.session.MemoryStore,
    sessionStore = new MemoryStore(),

    // session secret
    secret = config.session_secret,

    // admins that can post to blog
    admins = config.admins;

// Configuration
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ store: sessionStore, secret: secret, key: 'connect.sid' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    // app.use(express.static(__dirname + '/public'));
    app.use(gzippo.staticGzip(__dirname + '/public'));
});

app.set('view options', {
    layout: false
});

// implementation
console.log("Express server listening on port %d", config.http_port);

app.listen(config.http_port);
sio = io.listen(app);

sio.configure(function(){
    sio.set('log level', 1);
    sio.set('transports', ['websocket', 'flashsocket']);
    sio.enable('flash policy server');
    sio.set('flash policy port', config.http_port);
    sio.enable('browser client minification');
    // sio.enable('browser client gzip');
    sio.enable('browser client etag');
    sio.set('authorization', function (data, accept) {
        // check if there's a cookie header
        if (data.headers.cookie) {
            data.cookies = cookie.parse(data.headers.cookie);
            data.signedCookies = connect.utils.parseJSONCookies( connect.utils.parseSignedCookies(data.cookies, secret) );
            data.sessionID = data.signedCookies['connect.sid'] || data.cookies['connect.sid'];
            sessionStore.get(data.sessionID, function (err, session) {
                if (err || !session) {
                    // if we cannot grab a session, turn down the connection
                    accept(null, false);
                } else {
                    // save the session data and accept the connection
                    data.session = session;
                    accept(null, true);
                }
            });
        } else {
           // if there isn't, turn down the connection with a message
           // and leave the function.
           return accept('No cookie transmitted.', true);
        }
        // accept the incoming connection
        accept(null, true);
    });
});

sio.sockets.on('connection', function(socket){
    socket.on('_getPosts', function(){
        var update = function(_err, db){
                db.collection('posts', function(err, collection) {
                    collection.find().sort({date: -1}).toArray(function(err, posts) { //.sort({date: -1})
                        for(var i in posts){
                            socket.emit('getPosts',{posts:[posts[i]]});    
                        }
                        db.close();
                    });
                });
            };

        try{
            db.open(update);
        } catch(E){
            update(null, db);
        }
    });
    socket.on('editPosts', function(args){
        if(!ensureAuthenticatedWS(this)) return;

        var title = args.title,
            subtitle = args.subtitle,
            tags = args.tags,
            body = args.body,
            _id = args._id,
            post = {
                title: title,
                subtitle: subtitle,
                tags : tags,
                body : body
            };
        
        if(!_id){
            post.date = new Date();
            db.open(function(err, db) {
                db.collection('posts', function(err, collection) {
                    collection.save(post, {safe:true}, function(err, posts) {
                        if(err){
                            console.log(err);
                        } else {
                            socket.emit('getPosts', {posts: [posts]});
                        }
                        db.close();
                    });
                });
            });
        } else {
            // post._id = _id;
            db.open(function(err, db) {
                db.collection('posts', function(err, collection) {
                    collection.findOne({_id: new db.bson_serializer.ObjectID(_id)}, function(err, p) {
                        _.extend(p, post);
                        collection.save(p, {safe:true}, function(err, posts) {
                            if(err){
                                console.log(err);
                            } else {
                                socket.emit('getPosts', {posts: [p]});
                            }
                            db.close();
                        });
                    });
                });
            });
        }
    });
    socket.on('removePosts', function(_id){
        if(!ensureAuthenticatedWS(this)) return;

        db.open(function(err, db) {
            db.collection('posts', function(err, collection) {
                collection.findAndModify({_id:new db.bson_serializer.ObjectID(_id)}, {}, {}, {remove:true}, function(err, post){
                    db.close();
                });
            });
        });
    });
    socket.on('_setAdmin', function(){
        var b = ensureAuthenticatedWS(this);
        socket.emit('setAdmin', b);
    });
});

function ensureAuthenticatedWS(a) {
    var y = a.handshake 
            && a.handshake.session
            && a.handshake.session.passport
            && a.handshake.session.passport.user 
            && a.handshake.session.passport.user.emails 
            && a.handshake.session.passport.user.emails[0] 
            && admins.indexOf(a.handshake.session.passport.user.emails[0].value) !== -1;
    return y;
}

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(
    new GoogleStrategy(
        {
            returnURL: config.google_return_url,
            realm: config.root_url
        },
        function(identifier, profile, done) {
            process.nextTick(function () {
                profile.identifier = identifier;
                return done(null, profile);
            });
        }
    )
);

app.get('/auth/google', passport.authenticate('google'));
app.get( '/auth/google/return', passport.authenticate('google', { failureRedirect: 'https://google.com' }), function(req, res) { res.redirect('/'); } );

app.get('/([a-zA-Z0-9]+)?', function(req, res){
    res.setHeader('Vary', 'Accept-Encoding');
    res.render('index.jade', {
        title: config.title
    });
});