// SwitchMapWithErrors demonstrates that switchMap() fails if the latest emitted observable throws an error,
// but continues if an older observable throws an error, creating a sort of race condition
let {Observable} = require("rxjs/Rx")
require("./rxlog");

// Cause an error when emitting value errorValue
Observable.prototype.errorOn = function(errorValue) {
	return this.map( function(v) {
		if (v===errorValue) throw Error("Breaking on " + errorValue);
		return v;
	});
}

function sValue(nChild, nItem) { return "s" + nChild + "-" + nItem; }

// Creates child observable by number
// First child emits 3 items and breaks
// Second child emits 2 items
// Third child emits  1 items
// Fourth child breaks imediately
function createChildObservable(nChild) {
    let delta = 500+nChild*133; // time between two successive emits of this child observable
	let name = "s"+nChild;
	console.log("CREATED " + name);

    return Observable.timer(0,delta)
              .map(nItem=>sValue(nChild,nItem))
			  .errorOn(sValue(nChild, 3-nChild))
              .takeUntil(finish)
			  .log(name);
}

let finish = Observable.timer(3000).log("FINISH").start();

Observable.timer(0,800)
	.switchMap(createChildObservable)
	.takeUntil(finish)
	.log("Main")
	.subscribe(()=>{}, err=>{});
