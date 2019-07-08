class Person {
    constructor(name='Anonymous',age = 0){
        this.name = name;
        this.age = age;
    }

    getGreeting(){
        return `Hi I am ${this.name}!`;
    }

    getDescription(){
        return `${this.name} is ${this.age} years old`;
    }

}

class Student extends Person{
    constructor(name,age,major){
        super(name,age);
        this.major =major;
    }

    hasMajor() {
        return !!this.major
    }

    getDescription(){
        let description = super.getDescription()
        if(this.hasMajor()){
            return `${description} majoring in ${this.major}`
        }else{
            return description
        }
        
    }

}

class Traveller extends Person {
    constructor(name,age,homeLocation){
        super(name,age);
        this.homeLocation = homeLocation;
    }

    getGreeting(){
        let greeting = super.getGreeting();
        if(!!this.homeLocation){
            return `${greeting}. I am from ${this.homeLocation}`
        }else{
            return greeting
        }
    }

}

const me = new Traveller('Yuvraj',18, 'Pune');

const other = new Student();
console.log(me.getGreeting());
console.log(other.getGreeting());
