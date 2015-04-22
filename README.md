meteor-famous-demos
===================

## Caveat:

This is the code for some of the Meteor-Famous stuff I demoed in a recent 
devshop talk with Dave Fetterman. It's now way way out of date and I'm just 
leaving it online for historical purposes. A more upto date version of the
leaderboard demo can be found [here](https://github.com/zol/meteor-famous-leaderboard) 

### Demos

The subdirectories (except for meteor-famous) are all Meteor apps (run them with `meteor`)

### ./basics-step1-6
These are the demos I walked through on stage. *Note* that the obfuscated famo.us library that I'm using has an issue in step6 that wasn't present in the version I was using to demo. Namely, it appears that Meteor's event handlers 
aren't always getting hooked up. Hit refresh on the page several times to work
around this.

### ./todos
The todos app hooked up to a Famous surface driven by physics. Again, there is an issue here with the obfuscated library behaving differently to the one I used in the demos.

### ./meteor-famous
A simple and rough Meteor package that loads in the obfuscated famous library.

## License 

MIT. (c) Percolate Studio, maintained by Zoltan Olah (@zol).
