const parent = require('./javaScriptClassobject');
class child extends parent {

    favorite = "singapore";
    get food(){
        return "non-veg";
    }
    constructor(firstName, LastName, property){
        super(firstName,LastName);
        this.newproperty = property;
    }

    newpropertyuse(){
        return this.newproperty+" "+ "childclassproperty";
    }

    }

    const childobject = new child("Parent", "Child", "Inheritance");
    console.log(childobject.age);
    console.log(childobject.favorite);
    console.log(childobject.food);
    console.log(childobject.newpropertyuse());
    childobject.newpropertyuse();
    console.log(childobject.fullName());
    childobject.fullName();



