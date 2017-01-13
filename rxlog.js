let {Observable} = require("rxjs/Rx")

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
	return {
      next(v) { log(name,v); }, 
      error(err) { log(name, "ERROR "+err.message); },
      completed() { log(name, "DONE"); }
	};
}

Observable.prototype.log = function(name) { return this.do(logObserver(name)); }
Observable.prototype.start = function() { var hot = this.publish(); hot.connect(); return hot; }
