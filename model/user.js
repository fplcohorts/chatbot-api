const mysql = require('mysql');

function User(id,email, name,phone,pass) {       // Accept name and age in the constructor
    this.id = id || null;
    this.name = name || null;
    this.email  = email  || null;
    this.phone  = phone  || null;
    this.password  = pass  || null;
    this.isValid = false;
}
User.prototype.getId = function() {
    return this.id;
   }
User.prototype.setId = function(id) {
    this.id = id;
   }
User.prototype.getName = function() {
    return this.name;
}

User.prototype.setName = function(name) {
    this.name = name;
}

User.prototype.getEmail = function() {
    return this.email;
}

User.prototype.setEmail = function(email) {
    this.email = email;
}
User.prototype.getPhone = function(){
    return this.phone;
}
User.prototype.setPhone = function(phone){
    this.phone = phone;
}

User.prototype.setPassword = function(pass){
    this.password = pass
}

User.prototype.getPhone = function(pass){
    return this.password;
}

User.prototype.verifyPass = function(){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'stud'
      });
      const query = 'SELECT COUNT(*) FROM stud.records where Email = "'+this.email+'" AND Name = "'+this.name+'" AND Mobile = "'+this.phone+'" AND Id = '+this.id+' AND Password = "'+this.password+'"';    
    console.log(query);
    connection.query(query, (err,rows) => {
        if(err) throw err;
        console.log(rows[0]);
        return rows[0];
    });
    
    
}

User.prototype.verify = async function(){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'stud'
    });
    
    const query = 'SELECT COUNT(*) FROM stud.records where Email = "'+this.email+'" AND Name = "'+this.name+'" AND Mobile = "'+this.phone+'" AND Id = '+this.id+'';    
            console.log(query);
            connection.query(query, (err,rows) => {
                if(err) throw err;
            // console.log(rows[0]);
                // console.log(JSON.stringify(rows[0]));
                var result = JSON.stringify(rows[0]).match(/(\d)/);
                console.log("return result " + result);
                return result;
            });
}
        
User.prototype.clear = function(){
    this.id = null;
    this.name = null;
    this.email  = null;
    this.phone  =  null;
    this.password  =  null;
    this.isValid = false;
    }
module.exports = User;