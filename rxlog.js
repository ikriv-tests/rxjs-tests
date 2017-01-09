let {Observable, Observer} = require("rx")

function StopWatch() {
    function currentTime() { return (new Date()).getTime(); }
    let start = currentTime();
    this.ms = function() { return currentTime() - start; }
}

var stopWatch = new StopWatch();

function log(name, value) { 
	console.log(stopWatch.ms(), name, value);
}

var logObserver =  function(name) {
	return Observer.create( 
      v=>log(name,v), 
      err=>log(name, "ERROR "+err.message), 
      ()=>log(name, "DONE"));
}

Observable.prototype.log = function(name) { return this.do(logObserver(name)); }
Observable.prototype.start = function() { var hot = this.publish(); hot.connect(); return hot; }
