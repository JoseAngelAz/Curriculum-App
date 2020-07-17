//port
process.env.PORT = process.env.PORT || 3001;
//enviroment
process.env.NODE_ENV = process.env.NODE_ENV||'dev';

//DataBase
let urlDB = 'mongodb://localhost:27017/curriculumTEST';
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/curriculumTEST';
}else{
    urlDB = 'mongodb+srv://Angel:admin@cluster0-hapbl.mongodb.net/resumesApp?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB;

//token expiration
process.env.TOKEN_EXPIRATION = '48h';

//auth seed
process.env.AUTHENTICATION_SEED = process.env.AUTHENTICATION_SEED || 'this-is-the-authentication-seed';