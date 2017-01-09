// merged sequence of two intervals emits when any of the intervals emits
let {Observable} = require("rx")
let rxLog = require("./rxlog");

let sequence = 
	Observable.merge(
		Observable.interval(500).map(x=>"a"+x),
		Observable.interval(300).map(x=>"b"+x))
       .take(10)
	   .log("seq")
	   .subscribe();
