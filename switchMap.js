// switchMap() takes input observable (request stream), maps each request to a response stream and keeps track of the last repsonse stream
// In this example we create a new interval observable every 800ms, with increasing intervals
let {Observable} = require("rxjs/Rx")
require("./rxlog");

function createChildObservable(nChild) {
    let delta = 500+nChild*133; // time between two successive emits of this child observable
	let name = "s"+nChild;

    return Observable.timer(0,delta)
              .map(nItem=>name+"-"+nItem)
              .takeUntil(finish)
			  .log(name);
}

// start timer immediately; if we don't each child observable will start its own timer
let finish = Observable.timer(4000).log("FINISH").start(); 


Observable.timer(0,800)
	.switchMap(createChildObservable)
	.takeUntil(finish)
	.log("Main")
	.subscribe();

