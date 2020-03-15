function sayHi() {
    console.log('Hello');
    setTimeout(sayHi, 1000);
}
  
setTimeout(sayHi, 1000);