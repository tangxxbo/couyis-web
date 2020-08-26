let astring = "Hello World!";
let atype = typeof(astring);
console.log(atype);

let arr1 = { a: "A", b: "B" }; //无引号的key是JS对象,{}是定义对象，
// let ct1 = typeof(arr1);
// console.log(arr1);
// console.log(ct1);
let arr2 = [{
    "aa": "Aa",
    "b": "Bb",
    "c": {
        "ca": "10",
        "cb": "11",
        "cc": "12",
    },
    "d": {
        "da": "110",
        "db": "111",
        "dc": "112",
    }
}]; //双引号的key是JSON对象[{},{}]JSON数组格式
// let ct2 = typeof(arr2);
// console.log(arr2);
// console.log(ct2);

// for (const iterator of object) {

// }

// for (const key in object) {
//     if (object.hasOwnProperty(key)) {
//         const element = object[key];

//     }
// }

for (const arry1 of arr2) {
    for (const key in arry1) {
        console.log(arry1[key]);
        // if (object.hasOwnProperty(key)) {
        //     const element = object[key];

        // }
    }
}