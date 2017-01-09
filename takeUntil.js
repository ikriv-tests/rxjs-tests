// Demonstrates takeUntil with hot timer vs cold timer
let {Observable, Subject, Scheduler, Observer} = require("rx")
let start = new Date().getTime();
function timeMs() { return new Date().getTime() - start };

function log(name, value) { 
	console.log(timeMs(), name, value);
}

var logObserver =  function(name) {
	return Observer.create( 
      v=>log(name,v), 
      err=>log(name, "ERROR "+err.message), 
      ()=>log(name, "DONE"));
}

Observable.prototype.log = function(name) { return this.do(logObserver(name)); }
Observable.prototype.start = function() { var hot = this.publish(); hot.connect(); return hot; }

// if we use "start()" the timer starts immediately
// if we remove the call to start, the timer starts when it is subscribed to inside .takeUntil, 2500ms later
let finish = Observable.timer(3000).log("FINISH").start();

setTimeout(()=> 
  Observable.timer(0,500)
    .takeUntil(finish)
    .log("seq")
    .subscribe(), 
2500);