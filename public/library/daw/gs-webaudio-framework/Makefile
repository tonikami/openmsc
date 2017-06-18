all:
	@echo "~~~~~~ gs-webaudio-framework ~~~~~~~~"
	@echo -n "* JS ... "
	@uglifyjs $(SRC) -o bin/gs-webaudio-framework.min.js --compress --mangle
	@echo gs-webaudio-framework.min.js
	@echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"

.PHONY: all

SRC = \
	src/_constructor.js       \
	src/addSource.js          \
	src/addSources.js         \
	src/loadSource.js         \
	src/loadSources.js        \
	src/addTrack.js           \
	src/removeTrack.js        \
	src/addComposition.js     \
	src/removeComposition.js  \
	src/loadComposition.js    \
	src/setBPM.js             \
	src/unload.js
