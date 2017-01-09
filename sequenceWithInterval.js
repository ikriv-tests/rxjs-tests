// One can emit  specified values over time by zipping Observable.of() with Observable.interval()
let {Observable} = require("rx")
require("./rxlog");

Observable.of("Foo", "Bar", "Baz")
		.zip(Observable.interval(500))
		.log("seq").
		subscribe();
