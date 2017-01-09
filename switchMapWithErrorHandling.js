// SwitchMapWithErrors demonstrates that switchMap() fails if the latest emitted observable throws an error,
// but continues if an older observable throws an error, creating a sort of race condition
let {Observable} = require("rx")
require("./rxlog");

// Cause an error when emitting value errorValue
Observable.prototype.errorOn = function(errorValue) {
	return this.map( function(v) {
		if (v===errorValue) throw Error("Breaking on " + errorValue);
		return v;
	});
}

function sValue(nChild, nItem) { return "s" + nChild + "-" + nItem; }

// Creates child observable by number; thje observable emits one item then fails
function createChildObservable(nChild) {
    let delta = 500+nChild*133; // time between two successive emits of this child observable
	let name = "s"+nChild;
	console.log("CREATED " + name);

    return Observable.timer(0,delta)
			  .errorOn(1)
              .map(nItem=>({value:sValue(nChild,nItem)}))
              .takeUntil(finish)
			  .log(name)
			  .catch(err=>Observable.of({error: name + " " + err}));
}

let finish = Observable.timer(3000).log("FINISH").start();

Observable.timer(0,800)
	.switchMap(createChildObservable)
	.takeUntil(finish)
	.log("Main")
	.subscribe(()=>{}, err=>{});
