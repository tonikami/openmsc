#gridstack-angular

gridstack-angular is an Angular.js directive for the widget layout plugin gridstack.js. It offers basic functionality, feel free to extend it with your pull requests.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Installation](#installation)
- [Demo](#demo)
- [Requirements](#requirements)
- [Changes](#changes)
    - [v0.5.0 (2016-08-17)](#v050-2016-08-17)
    - [v0.4.0 (2016-04-08)](#v040-2016-04-08)
    - [v0.3.0 (2016-02-17)](#v030-2016-02-17)
    - [v.0.2.0 (2015-10-27)](#v020-2015-10-27)
    - [v.0.1.0 (2015-10-27)](#v010-2015-10-27)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

##Installation

gridstack-angular is available on bower. This makes it super easy to install:

```
bower install --save gridstack-angular
```

##Demo

Demo is available [here](http://kdietrich.github.io/gridstack-angular/demo/).

##Requirements

- Angular.js (>=1.3)
- gridstack.js (~0.2.6)

##Changes

####v0.5.0 (2016-08-17)
- `gridstack-handler` attribute (thanks to @huytd)
- `data-gs-id` attribute (thanks to @jvelezc)
- misc fixes (thanks to @epelc)
- gridstack.js 0.2.6 support

####v0.4.0 (2016-04-08)
- Fixed timing of events
- gridstack.js 0.2.5 support

####v0.3.0 (2016-02-17)
- Breaking Changes: `data-gs-xyz` attributes changed to `gs-item-xyz`. See demo.
- Two way data binding
- `onItemRemoved` event
- gridstack.js 0.2.4 support

####v.0.2.0 (2015-10-27)
- Bugfix: Events
- `onItemAdded` event

####v.0.1.0 (2015-10-27)
- First version.

##License

The MIT License (MIT)

Copyright (c) 2015 Kevin Dietrich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.