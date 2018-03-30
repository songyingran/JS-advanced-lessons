var foo = function (a,b){
    console.log(arguments);//类似数组的一个对象
    //arguments 是Symbol类型，独一无二的，具体参见后续ES6部分

    console.log(arguments.length);//4
    var args = Array.prototype.splice.call(arguments,0);
    console.log(args);//[1,2,3,4]
};
foo(1,2,3,4);


//函数对象属性之length 形参数
function checkVarCount(a, b) {
    if (checkVarCount.length !== arguments.length) {
        alert("The count of the parameters you passed into the function doesn't match the function definition.");
    }else{
        alert("Successfully call the function");
    }

}
checkVarCount(1, 2);//Successfully call the function
checkVarCount(1);//The count of the parameters you passed into the function doesn't match the function definition.


//函数对象属性之caller 获取调用当前函数的函数。例一
function test() {
    if (test.caller == null) {
        console.log("test is called from the toppest level");
    } else {
        console.log("test is called from the function:");
        console.log(test.caller.toString());
    }
}
//caller属性只有当函数正在执行时才被定义


var obj = {
    foo1:function(){
        console.log(this.foo1.caller);
    },
    foo2:function abc(){
        this.foo1();
    }
};
obj.foo1();//null
obj.foo2();//abc(){}



//函数对象属性之callee 返回正被执行的 Function 对象，
//即指定的 Function 对象的正文
//callee 属性是 arguments 对象的一个成员
//该属性仅当相关函数正在执行时才可用。通常这个属性被用来递归调用匿名函数
var func = function(n){
    if (n <= 0)
        return 1;
    else
        return n * func(n - 1);
        //return n * arguments.callee(n - 1);
};
console.log(func(4));//24


//优点，可以是匿名函数
(function(n){
    if (n <= 0)
        return 1;
    else
        return n * arguments.callee(n - 1);
}(4));


function Man(name, age) {
    this.name = name;
    this.age = age;
}
Man.prototype.sex = "M";
Man.prototype.sayHi = function () {
    console.log("Hi,i'm",this.name);
};
var li = new Man("Leo", 10);
li.sayHi();//
console.log(li.sex);//M

Man.prototype.isStrong = true;
console.log(li.isStrong);//true


//函数对象属性之 constructor 获取创建某个对象的构造函数。可以用来判断对象是哪一类
var x = new String("Hello");
if (x.constructor == String){
    console.log("Object is a String.");
}

function MyObj() {
    this.number = 1;
}
var y = new MyObj();
if (y.constructor == MyObj){
    console.log("Object constructor is MyObj.");
}



//函数对象方法之 call 调用一个普通函数或对象的方法时，用另一个对象替换当前对象
//call([thisObj[, arg1[, arg2[, [, argN]]]]])
//它允许您将函数的 this 对象从初始上下文变为由 thisObj 指定的新对象。
// 如果没有提供 thisObj 参数，则 global 对象被用作 thisObj。
// 与apply方法不同的地方是，apply的第二个参数类型必须是Array，
// 而call方法是将所有的参数列举出来，用逗号分隔
function swim(m,n){
    console.log("i'm:"+this.name+" i can swim ___",m,n);
}
var bird = {
    name:"polly",
    fly:function(m,n){
        console.log("i'm:"+this.name+" i can fly ___",m,n);
    }
};

var me = {
    name:"ABC"
};
swim(1,2);
swim.call(me,3,4);
bird.fly(5,6);
bird.fly.call(me,7,8);
bird.fly.apply(me,[7,8]);
swim.call(null,1,2);




var x = 45;
var obj = {
    x:23,
    test:function(){
		function foo(){
			console.log(this.x);
		}
		foo.bind(this)();//var fee = foo.bind(this); fee();
		foo();
    }
};
obj.test();