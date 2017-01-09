// zipping two intervals shows that the zip emits when the slower observable emits
let {Observable} = require("rx")
require("./rxlog");

Observable.zip(
	Observable.interval(100).log("s1"),
	Observable.interval(1000).log("s2"))
   .take(10)
   .log("Main")
   .subscribe();
