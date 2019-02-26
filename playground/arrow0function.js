var square = x => x * x;
console.log(square(9));

var user = {
  name: 'Yonglin Li',
  sayHi: () => {
    console.log(this);
    // console.log(`Hi. I'm $name` + name);
  },

  sayHiAlt (){
    console.log(arguments);
    console.log(this);
    console.log(`Hi. I'm ${this.name}`);
  }
};

user.sayHi(1, 2, 3);
user.sayHiAlt(1, 2, 3);


// A curried function
const multiply = x=>y=>x*y;

console.log(22, multiply(5)(6));

console.log("line 27");
setTimeout(()=>{console.log("line 28");}, 0);
console.log("line 29");

