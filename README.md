# rxjs-tests
Assorted RxJS experiments

This repository contains a collection of small RxJS experiments and resulting outputs in the "output" folder.

rxlog.js is a module with some helper functions

Main takeaways so far:
- "cold" observables, including timers, start emitting events when they are subscribed to
- therefore, subscribing to an observable may change its behavior
- therefore, to log an observable one must use ".do()" instead of ".subscribe()"

Also, "cold" timers will be relative: they start "ticking" when they are subscribed to, and each new subscription gets its own timer. 
To create a timer that immediately starts ticking, one must make it "hot" by calling publish() and then connect().
These two operations are encapsulated in the helper function start() defined in rxlog.js
