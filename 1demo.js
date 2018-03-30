var foo = function (a,b){
    console.log(arguments);//���������һ������
    //arguments ��Symbol���ͣ���һ�޶��ģ�����μ�����ES6����

    console.log(arguments.length);//4
    var args = Array.prototype.splice.call(arguments,0);
    console.log(args);//[1,2,3,4]
};
foo(1,2,3,4);


//������������֮length �β���
function checkVarCount(a, b) {
    if (checkVarCount.length !== arguments.length) {
        alert("The count of the parameters you passed into the function doesn't match the function definition.");
    }else{
        alert("Successfully call the function");
    }

}
checkVarCount(1, 2);//Successfully call the function
checkVarCount(1);//The count of the parameters you passed into the function doesn't match the function definition.


//������������֮caller ��ȡ���õ�ǰ�����ĺ�������һ
function test() {
    if (test.caller == null) {
        console.log("test is called from the toppest level");
    } else {
        console.log("test is called from the function:");
        console.log(test.caller.toString());
    }
}
//caller����ֻ�е���������ִ��ʱ�ű�����


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



//������������֮callee ��������ִ�е� Function ����
//��ָ���� Function ���������
//callee ������ arguments �����һ����Ա
//�����Խ�����غ�������ִ��ʱ�ſ��á�ͨ��������Ա������ݹ������������
var func = function(n){
    if (n <= 0)
        return 1;
    else
        return n * func(n - 1);
        //return n * arguments.callee(n - 1);
};
console.log(func(4));//24


//�ŵ㣬��������������
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


//������������֮ constructor ��ȡ����ĳ������Ĺ��캯�������������ж϶�������һ��
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



//�������󷽷�֮ call ����һ����ͨ���������ķ���ʱ������һ�������滻��ǰ����
//call([thisObj[, arg1[, arg2[, [, argN]]]]])
//���������������� this ����ӳ�ʼ�����ı�Ϊ�� thisObj ָ�����¶���
// ���û���ṩ thisObj �������� global �������� thisObj��
// ��apply������ͬ�ĵط��ǣ�apply�ĵڶ����������ͱ�����Array��
// ��call�����ǽ����еĲ����оٳ������ö��ŷָ�
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