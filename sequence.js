// Observable.of immediately emits all specified values
let {Observable} = require("rx")
require("./rxlog");

Observable.of(1,2,3).log("seq").subscribe();
