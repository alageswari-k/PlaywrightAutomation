const {Userincallingscript} = require('./javaScriptClassobject');

let user = {
    firstName : 'TestFirst',
    lastName : 'TestLast',
    age : 25,
    fullName : function(){
        console.log(this.firstName+this.lastName)

    },
    gender : 'male',
    preference : 'vegeterian'
};

/*console.log(user);
console.log(user.age);
console.log(user['age']);
console.log(user['gender']);
console.log(user['firstName']);
console.log(user.lastName);
console.log(user.fullName());
console.log(user['fullName']());
console.log(user['preference']);
user.preference = 'non-vegeterian';
console.log(user.preference);*/

for (let key in user)
{
    //console.log(user[key]);
}

let obj = {
    job : 'playwright automation engineer',
    salary : '150000 USD annually',
    experience : 14.5,
    company : 'pwC',
    work : 'remote'
}
console.log(obj.salary);
console.log(obj['company']);
console.log(obj.job);
console.log(obj.work);

for (let i in obj){
    console.log(obj[i]);
    //console.log(obj.i);
}

//let userobj3 = new Userincallingscript("White", "Black");
//console.log(userobj3.fullName());
//console.log(userobj3.lastname);