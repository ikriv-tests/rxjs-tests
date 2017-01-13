let {Observable} = require("rxjs/Rx")

Observable.prototype.relativeTimeStamp = function() {
	let start = Date.now();
	return this.map( v => ({ value: v, timeStamp: Date.now()-start }) );
}

function burst(n) {
	let items = ['a','b','c','d','e','f','g','h'];
	return Observable.from(items.map(x=>(n+1)+":"+x));
}

function printValue({timeStamp,value}) {
	console.log(timeStamp, value);
}

function noOp() {}

let periodicBurst = Observable.timer(0,500).switchMap(burst).take(20); // 3 bursts, last incomplete

console.log("ORIGINAL SEQUENCE");
periodicBurst.relativeTimeStamp().subscribe(printValue, noOp, ()=> {
	console.log("DEBOUNCE");
	periodicBurst.relativeTimeStamp().debounceTime(750).subscribe(printValue, noOp, ()=> {
		console.log("SAMPLE");
		periodicBurst.relativeTimeStamp().sampleTime(750).subscribe(printValue, noOp, ()=> {
			console.log("THROTTLE");
			periodicBurst.relativeTimeStamp().throttleTime(750).subscribe(printValue)})})});
			