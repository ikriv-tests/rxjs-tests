// Error in the source sequences causes error in mapped sequence
// Unobserved error causes an exception to be thrown; to demonstrate, replace the last line with subscribe()
let {Observable} = require("rx")
require("./rxlog");

function brokenMapper(v) {
  if (v == 2) {
    throw Error("oops")
  } else {
    return v
  }
}

let sequence = Observable.of(1,2,3)
	.map(brokenMapper)
	.log("seq")
	.subscribe(v=>{}, err=>{});

