module.exports = class user {
    name = 'Testerfirst'
    lastname = 'Testerlast'
    age = 35
    get location()
    {
        return "australia"
    }

    constructor(name , lastName){
        this.name = name;
        this.lastname = lastName;
    }

    fullName(){
        let fullName = this.name + " " + this.lastname;
        console.log(fullName);
    }

}

/* const user_obj = new user("Abacus", "training");
const user_obj2 = new user("Memory", "training");

console.log(user_obj.age);
console.log(user_obj.name);
console.log(user_obj.lastname);
console.log(user_obj.location);
console.log(user_obj.fullName());
console.log(user_obj2.fullName());
console.log(user_obj2.age);
console.log(user_obj2.name); */