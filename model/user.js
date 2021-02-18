const mysql = require('mysql');
const currentUser = require('../server');
const connection = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stud'
  });

function User(id,email, name,phone,pass) {       // Accept name and age in the constructor
    this.id = id || null;
    this.name = name || null;
    this.email  = email  || null;
    this.phone  = phone  || null;
    this.password  = pass  || null;
    this.isValid = false;
    this.isDetailVerified = false;
    this.isDetailFailed = false;
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

User.prototype.verifyPass = function(res,pvtAns){
      const query = 'SELECT COUNT(*) FROM stud.records where Email = "'+this.email+'" AND Name = "'+this.name+'" AND Mobile = "'+this.phone+'" AND Id = '+this.id+' AND Password = "'+this.password+'"';    
    console.log(query);
    connection.query(query, (err,rows) => {
        console.log("passverify");
        var result;
        if(err) {
            result =  0
        };
        // console.log(rows[0]);
        // return rows[0];
        result = JSON.stringify(rows[0]).match(/(\d)/);
        result = result.toString().split(",")[0];
        console.log("verify pass result " + result)
        if(result == 1)
        {
            res.status(200).json(pvtAns);
            this.isValid = true;
        }
        else{
            res.status(200).json("Sorry your are not authorized to ask this question");
            this.clear();
        }
    });
    
    
}

User.prototype.verify = function(res){
    // const connection = mysql.createPool({
    //     connectionLimit : 10,
    //     host: 'localhost',
    //     user: 'root',
    //     password: '',
    //     database: 'stud'
    // });
    
    const query = 'SELECT COUNT(*) FROM stud.records where Email = "'+this.email+'" AND Name = "'+this.name+'" AND Mobile = "'+this.phone+'" AND Id = '+this.id+'';    
            console.log(query);
            // // var final_result = JSON.stringify(connection.query(query)).match(/(\d)/); 
            connection.query(query, 
                (err,rows) => {
                var result;
                if (err){
                    result =  0;
                    res.status(200).json("Sorry the entered details don't match please re-enter your details");
                    currentUser.isDetailFailed = true;
                    return;
                };
                // console.log(rows[0]);
                // console.log(JSON.stringify(rows[0]));
                result = JSON.stringify(rows[0]).match(/(\d)/);
                result = result.toString().split(",")[0];
                // return result;
                if(result == 1)
                    {
                        res.status(200).json("Please enter your Password");
                       this.isDetailVerified = true;
                    }
                    else{
                        res.status(200).json("Sorry the entered details don't match please re-enter your details");
                        currentUser.isDetailFaild = true;
                    }
            }
            );
        }
        
User.prototype.clear = function(){
    this.id = null;
    this.name = null;
    this.email  = null;
    this.phone  =  null;
    this.password  =  null;
    this.isValid = false;
    this.isDetailVerified = false;
    this.isDetailFailed = false;
    }
module.exports = User;