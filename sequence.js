// Observable.of immediately emits all specified values
let {Observable} = require("rxjs/Rx")
require("./rxlog");

Observable.of(1,2,3).log("seq").subscribe();
