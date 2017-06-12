"use strict";

var numberInput = []

function gsuiOscilloscope(t) {
    this.canvas = t, this.ctx = t.getContext("2d"), this.maxValue = 0, this.setPinch(0), this.drawBegin(function (t, e, i, n) {
        t.fillRect(0, 0, i, n), t.lineWidth = 2, t.strokeStyle = "rgb(255,255,255)"
    }), this.drawEnd()
}

function saveSoundFileToDatabase(file) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload/customSound", true);
    var formData = new FormData();
    formData.append("file", file, file.name);
    xhr.send(formData);
}


function gsuiPopup(t) {
    this.elRoot = t, this.elWindow = t.querySelector(".gsuiPopup-window"), this.elHeader = t.querySelector(".gsuiPopup-window header"), this.elMsg = t.querySelector(".gsui-msg"), this.elText = t.querySelector(".gsui-text"), this.elCancel = t.querySelector(".gsui-cancel"), this.elOk = t.querySelector(".gsui-ok"), this.elForm = t.querySelector("form");
    var e = this;
    t.onclick = this.elCancel.onclick = function () {
        e.resolve("confirm" !== e.type && ("prompt" === e.type ? null : void 0))
    }, this.elWindow.onclick = function (t) {
        t.stopPropagation()
    }, this.elForm.onsubmit = function () {
        return e.resolve("confirm" === e.type || ("prompt" === e.type ? e.elText.value : void 0)), !1
    }, this.elText.onkeypress = this.elText.onkeydown = this.elText.onkeyup = function (t) {
        t.stopPropagation()
    }
}

function gsuiSpanEditable(t, e) {
    this.element = t, this.data = e, this.placeholder = "", this.span = t.querySelector("span"), this.input = t.querySelector("input"), t.ondblclick = this.__elementDblclick.bind(this), this.input.onblur = this.__inputBlur.bind(this), this.input.onkeydown = this.__inputKeydown.bind(this)
}

function gsuiToggle(t, e) {
    this.element = t, this.data = e, this.isOn = !1, this._circleClass = t.querySelector(".gsui-circle").classList, t.oncontextmenu = function () {
        return !1
    }, t.onmousedown = this.__elementMousedown.bind(this)
}

function gsuiWaveform(t) {
    this.svg = t, this.polygon = t.querySelector("polygon")
}

function gswaSampleGroup() {
    this.samples = [], this.samplesRev = [], this.updateDuration()
}

function gswaContext() {
    this.ctx = new window.AudioContext, this.destination = this.ctx.destination, this.filters = this.createFilters(), this.nbPlaying = 0, this.filters.connect(this.destination), this.nodeIn = this.filters.nodeIn, delete this.filters.connect
}

function gswaSample(t, e) {
    this.wCtx = t, this.wBuffer = e, this.connectedTo = t.nodeIn, this.started = 0, this.bufferSources = [], this.onended(function () {}), this.edit(0, 0, e.duration), this.bufferDuration = e.duration
}

function gswaBuffer(t) {
    this.wCtx = t, this.samples = [], this.sample = new gswaSample(t, this)
}

function gswaFilters(t) {
    this.wCtx = t, this.nodes = [], this.nodeIn = t.ctx.createGain(), this.nodeOut = t.ctx.createGain(), this.nodeIn.connect(this.nodeOut), this.connect(t)
}

function gswaComposition(t) {
    this.wCtx = t, this.samples = [], this.newSamples = [], this.isPlaying = this.isPaused = !1, this.oldDuration = this.duration = this._startedTime = this._currentTime = 0, this._bpm = 60, this.fnOnended = this.fnOnpaused = function () {}, this.onended = this.onended.bind(this), this._add = this._add.bind(this), this._addNew = this._addNew.bind(this), this._remove = this._remove.bind(this);
    var audioArray = [];
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var resp = JSON.parse(xhr.response);
            var promises = [];
            for (var fileIndex in resp) {
                promises.push(getBlob(resp[fileIndex]));
            }
            Promise.all(promises).then(function () {
                loadBlocks();
            });
        }
    }
    xhr.open("GET", "/api/customSounds", true);
    xhr.send(null)
    
}

function getBlob(fileName) {
    return new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", '/sound/' + fileName, true);
        oReq.responseType = "blob";

        oReq.onload = function (oEvent) {
            var blob = oReq.response;
            if (blob) {
                var file = blobToFile(blob, fileName);
                gs.file.create(file);
            }
            resolve(true)
        };

        oReq.send();
    });
}

function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

function loadBlocks() {
    console.log('Loading Blocks');
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            response.forEach(function (t) {
                var e = gs.sample.create(gs.files[t.file]);
                e.data.gsfile.samplesToSet.push(e), gs.sample.inTrack(e, t.track), gs.sample.when(e, t.when / ui.BPMem), gs.sample.slip(e, t.slip / ui.BPMem), gs.sample.duration(e, t.duration / ui.BPMem), gs.composition.add(e)
                console.log(e);
            });
        }
    };
    xmlhttp.open("GET", '/api/blocks', true);
    xmlhttp.send();
}


function gswaFramework() {
    this.audioContext = new AudioContext, this.sampleGroup = new gswaSampleGroup, this.compositions = [], this.sources = [], this.tracks = [], this.on = {}, this.do = {}, this.currentComposition = null, this.bpm = 60;
    for (var t in gswaFramework.do) this.do[t] = gswaFramework.do[t].bind(this), this.on[t] = function () {};
    this.on.setBPMthen = function () {}
}
window.AudioContext || (document.body.innerHTML = "<div id='nowebaudio'>Sorry, <i><b>GridSound</b></i> is not compatible with this browser Â¯\\_(ãƒ„)_/Â¯<br/>Maybe you should use&nbsp;: <i class='icon chrome'></i> <i>Chrome</i> or <i class='icon firefox'></i> <i>Firefox</i> or <i class='icon safari'></i> <i>Safari</i>.</div>"), ! function () {
        function t(t) {
            var e = keyboardRouter.defaultOptions,
                i = t.fn || e.fn,
                n = {
                    name: t.name,
                    when: (t.when || e.when).toUpperCase(),
                    preventDefault: void 0 !== t.preventDefault ? t.preventDefault : e.preventDefault,
                    alt: !1,
                    ctrl: !1,
                    shift: !1,
                    keys: []
                };
            return n.fn = i.bind(t.thisArg || e.thisArg, t), t.keys.forEach(function (t) {
                t = t.toUpperCase(), "ALT" === t ? n.alt = !0 : "CTRL" === t ? n.ctrl = !0 : "SHIFT" === t ? n.shift = !0 : n.keys.push(1 === t.length ? t.charCodeAt(0) : keyboardRouter.keys[t])
            }), n
        }

        function e() {
            for (; a.length;) {
                var t = a.pop();
                t.active && (delete t.active, t.fn({
                    type: "keyup"
                }))
            }
        }

        function i(t) {
            var e = t.keyCode;
            s[e] || (s[e] = !0, o.some(function (i) {
                if (!(i.active || t.altKey !== i.alt || t.ctrlKey !== i.ctrl || t.shiftKey !== i.shift || i.keys.length && e !== i.keys[0]) && (i.fn(t), i.when.indexOf("UP") > -1 && (i.active = !0, a.push(i)), i.preventDefault !== !1)) return t.preventDefault(), !0
            }))
        }

        function n(t) {
            var e, i, n, o = t.keyCode,
                r = a.length;
            if (s[o] = !1, r) {
                for (n = [], e = r - 1; e >= 0; --e) i = a[e], i.active && (i.alt && !t.altKey || i.ctrl && !t.ctrlKey || i.shift && !t.shiftKey || i.keys.length || o === i.keys[0]) && n.push(e);
                n.forEach(function (e) {
                    i = a[e], delete i.active, i.fn(t), a.splice(e, 1)
                })
            }
        }
        var s = [],
            o = [],
            a = [];
        window.keyboardRouter = function () {
            for (var s = 0, a = arguments.length; s < a;) o.push(t(arguments[s++]));
            document.body.addEventListener("keydown", i), document.body.addEventListener("keyup", n), window.addEventListener("blur", e)
        }, keyboardRouter.defaultOptions = {
            when: "down",
            fn: function () {},
            preventDefault: !0
        }, keyboardRouter.keys = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PAUSE: 19,
            CAPSLOCK: 20,
            ESCAPE: 27,
            PAGEUP: 33,
            PAGEDOWN: 34,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            INSERT: 45,
            DELETE: 46,
            OS: 91,
            CONTEXTMENU: 93,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            NUMLOCK: 144,
            SCROLLLOCK: 145
        }
    }(), ! function (t, e) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Handlebars = e() : t.Handlebars = e()
    }(this, function () {
        return function (t) {
            function e(n) {
                if (i[n]) return i[n].exports;
                var s = i[n] = {
                    exports: {},
                    id: n,
                    loaded: !1
                };
                return t[n].call(s.exports, s, s.exports, e), s.loaded = !0, s.exports
            }
            var i = {};
            return e.m = t, e.c = i, e.p = "", e(0)
        }([function (t, e, i) {
            function n() {
                var t = new r.HandlebarsEnvironment;
                return f.extend(t, r), t.SafeString = u.default, t.Exception = d.default, t.Utils = f, t.escapeExpression = f.escapeExpression, t.VM = h, t.template = function (e) {
                    return h.template(e, t)
                }, t
            }
            var s = i(1).default,
                o = i(2).default;
            e.__esModule = !0;
            var a = i(3),
                r = s(a),
                l = i(17),
                u = o(l),
                c = i(5),
                d = o(c),
                p = i(4),
                f = s(p),
                m = i(18),
                h = s(m),
                g = i(19),
                v = o(g),
                w = n();
            w.create = n, v.default(w), w.default = w, e.default = w, t.exports = e.default
        }, function (t, e) {
            e.default = function (t) {
                if (t && t.__esModule) return t;
                var e = {};
                if (null != t)
                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e.default = t, e
            }, e.__esModule = !0
        }, function (t, e) {
            e.default = function (t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }, e.__esModule = !0
        }, function (t, e, i) {
            function n(t, e, i) {
                this.helpers = t || {}, this.partials = e || {}, this.decorators = i || {}, l.registerDefaultHelpers(this), u.registerDefaultDecorators(this)
            }
            var s = i(2).default;
            e.__esModule = !0, e.HandlebarsEnvironment = n;
            var o = i(4),
                a = i(5),
                r = s(a),
                l = i(6),
                u = i(14),
                c = i(16),
                d = s(c),
                p = "4.0.5";
            e.VERSION = p;
            var f = 7;
            e.COMPILER_REVISION = f;
            var m = {
                1: "<= 1.0.rc.2",
                2: "== 1.0.0-rc.3",
                3: "== 1.0.0-rc.4",
                4: "== 1.x.x",
                5: "== 2.0.0-alpha.x",
                6: ">= 2.0.0-beta.1",
                7: ">= 4.0.0"
            };
            e.REVISION_CHANGES = m;
            var h = "[object Object]";
            n.prototype = {
                constructor: n,
                logger: d.default,
                log: d.default.log,
                registerHelper: function (t, e) {
                    if (o.toString.call(t) === h) {
                        if (e) throw new r.default("Arg not supported with multiple helpers");
                        o.extend(this.helpers, t)
                    } else this.helpers[t] = e
                },
                unregisterHelper: function (t) {
                    delete this.helpers[t]
                },
                registerPartial: function (t, e) {
                    if (o.toString.call(t) === h) o.extend(this.partials, t);
                    else {
                        if ("undefined" == typeof e) throw new r.default('Attempting to register a partial called "' + t + '" as undefined');
                        this.partials[t] = e
                    }
                },
                unregisterPartial: function (t) {
                    delete this.partials[t]
                },
                registerDecorator: function (t, e) {
                    if (o.toString.call(t) === h) {
                        if (e) throw new r.default("Arg not supported with multiple decorators");
                        o.extend(this.decorators, t)
                    } else this.decorators[t] = e
                },
                unregisterDecorator: function (t) {
                    delete this.decorators[t]
                }
            };
            var g = d.default.log;
            e.log = g, e.createFrame = o.createFrame, e.logger = d.default
        }, function (t, e) {
            function i(t) {
                return c[t]
            }

            function n(t) {
                for (var e = 1; e < arguments.length; e++)
                    for (var i in arguments[e]) Object.prototype.hasOwnProperty.call(arguments[e], i) && (t[i] = arguments[e][i]);
                return t
            }

            function s(t, e) {
                for (var i = 0, n = t.length; n > i; i++)
                    if (t[i] === e) return i;
                return -1
            }

            function o(t) {
                if ("string" != typeof t) {
                    if (t && t.toHTML) return t.toHTML();
                    if (null == t) return "";
                    if (!t) return t + "";
                    t = "" + t
                }
                return p.test(t) ? t.replace(d, i) : t
            }

            function a(t) {
                return !t && 0 !== t || !(!h(t) || 0 !== t.length)
            }

            function r(t) {
                var e = n({}, t);
                return e._parent = t, e
            }

            function l(t, e) {
                return t.path = e, t
            }

            function u(t, e) {
                return (t ? t + "." : "") + e
            }
            e.__esModule = !0, e.extend = n, e.indexOf = s, e.escapeExpression = o, e.isEmpty = a, e.createFrame = r, e.blockParams = l, e.appendContextPath = u;
            var c = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;",
                    "=": "&#x3D;"
                },
                d = /[&<>"'`=]/g,
                p = /[&<>"'`=]/,
                f = Object.prototype.toString;
            e.toString = f;
            var m = function (t) {
                return "function" == typeof t
            };
            m(/x/) && (e.isFunction = m = function (t) {
                return "function" == typeof t && "[object Function]" === f.call(t)
            }), e.isFunction = m;
            var h = Array.isArray || function (t) {
                return !(!t || "object" != typeof t) && "[object Array]" === f.call(t)
            };
            e.isArray = h
        }, function (t, e) {
            function i(t, e) {
                var s = e && e.loc,
                    o = void 0,
                    a = void 0;
                s && (o = s.start.line, a = s.start.column, t += " - " + o + ":" + a);
                for (var r = Error.prototype.constructor.call(this, t), l = 0; l < n.length; l++) this[n[l]] = r[n[l]];
                Error.captureStackTrace && Error.captureStackTrace(this, i), s && (this.lineNumber = o, this.column = a)
            }
            e.__esModule = !0;
            var n = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
            i.prototype = new Error, e.default = i, t.exports = e.default
        }, function (t, e, i) {
            function n(t) {
                a.default(t), l.default(t), c.default(t), p.default(t), m.default(t), g.default(t), w.default(t)
            }
            var s = i(2).default;
            e.__esModule = !0, e.registerDefaultHelpers = n;
            var o = i(7),
                a = s(o),
                r = i(8),
                l = s(r),
                u = i(9),
                c = s(u),
                d = i(10),
                p = s(d),
                f = i(11),
                m = s(f),
                h = i(12),
                g = s(h),
                v = i(13),
                w = s(v)
        }, function (t, e, i) {
            e.__esModule = !0;
            var n = i(4);
            e.default = function (t) {
                t.registerHelper("blockHelperMissing", function (e, i) {
                    var s = i.inverse,
                        o = i.fn;
                    if (e === !0) return o(this);
                    if (e === !1 || null == e) return s(this);
                    if (n.isArray(e)) return e.length > 0 ? (i.ids && (i.ids = [i.name]), t.helpers.each(e, i)) : s(this);
                    if (i.data && i.ids) {
                        var a = n.createFrame(i.data);
                        a.contextPath = n.appendContextPath(i.data.contextPath, i.name), i = {
                            data: a
                        }
                    }
                    return o(e, i)
                })
            }, t.exports = e.default
        }, function (t, e, i) {
            var n = i(2).default;
            e.__esModule = !0;
            var s = i(4),
                o = i(5),
                a = n(o);
            e.default = function (t) {
                t.registerHelper("each", function (t, e) {
                    function i(e, i, o) {
                        u && (u.key = e, u.index = i, u.first = 0 === i, u.last = !!o, c && (u.contextPath = c + e)), l += n(t[e], {
                            data: u,
                            blockParams: s.blockParams([t[e], e], [c + e, null])
                        })
                    }
                    if (!e) throw new a.default("Must pass iterator to #each");
                    var n = e.fn,
                        o = e.inverse,
                        r = 0,
                        l = "",
                        u = void 0,
                        c = void 0;
                    if (e.data && e.ids && (c = s.appendContextPath(e.data.contextPath, e.ids[0]) + "."), s.isFunction(t) && (t = t.call(this)), e.data && (u = s.createFrame(e.data)), t && "object" == typeof t)
                        if (s.isArray(t))
                            for (var d = t.length; d > r; r++) r in t && i(r, r, r === t.length - 1);
                        else {
                            var p = void 0;
                            for (var f in t) t.hasOwnProperty(f) && (void 0 !== p && i(p, r - 1), p = f, r++);
                            void 0 !== p && i(p, r - 1, !0)
                        }
                    return 0 === r && (l = o(this)), l
                })
            }, t.exports = e.default
        }, function (t, e, i) {
            var n = i(2).default;
            e.__esModule = !0;
            var s = i(5),
                o = n(s);
            e.default = function (t) {
                t.registerHelper("helperMissing", function () {
                    if (1 !== arguments.length) throw new o.default('Missing helper: "' + arguments[arguments.length - 1].name + '"')
                })
            }, t.exports = e.default
        }, function (t, e, i) {
            e.__esModule = !0;
            var n = i(4);
            e.default = function (t) {
                t.registerHelper("if", function (t, e) {
                    return n.isFunction(t) && (t = t.call(this)), !e.hash.includeZero && !t || n.isEmpty(t) ? e.inverse(this) : e.fn(this)
                }), t.registerHelper("unless", function (e, i) {
                    return t.helpers.if.call(this, e, {
                        fn: i.inverse,
                        inverse: i.fn,
                        hash: i.hash
                    })
                })
            }, t.exports = e.default
        }, function (t, e) {
            e.__esModule = !0, e.default = function (t) {
                t.registerHelper("log", function () {
                    for (var e = [void 0], i = arguments[arguments.length - 1], n = 0; n < arguments.length - 1; n++) e.push(arguments[n]);
                    var s = 1;
                    null != i.hash.level ? s = i.hash.level : i.data && null != i.data.level && (s = i.data.level), e[0] = s, t.log.apply(t, e)
                })
            }, t.exports = e.default
        }, function (t, e) {
            e.__esModule = !0, e.default = function (t) {
                t.registerHelper("lookup", function (t, e) {
                    return t && t[e]
                })
            }, t.exports = e.default
        }, function (t, e, i) {
            e.__esModule = !0;
            var n = i(4);
            e.default = function (t) {
                t.registerHelper("with", function (t, e) {
                    n.isFunction(t) && (t = t.call(this));
                    var i = e.fn;
                    if (n.isEmpty(t)) return e.inverse(this);
                    var s = e.data;
                    return e.data && e.ids && (s = n.createFrame(e.data), s.contextPath = n.appendContextPath(e.data.contextPath, e.ids[0])), i(t, {
                        data: s,
                        blockParams: n.blockParams([t], [s && s.contextPath])
                    })
                })
            }, t.exports = e.default
        }, function (t, e, i) {
            function n(t) {
                a.default(t)
            }
            var s = i(2).default;
            e.__esModule = !0, e.registerDefaultDecorators = n;
            var o = i(15),
                a = s(o)
        }, function (t, e, i) {
            e.__esModule = !0;
            var n = i(4);
            e.default = function (t) {
                t.registerDecorator("inline", function (t, e, i, s) {
                    var o = t;
                    return e.partials || (e.partials = {}, o = function (s, o) {
                        var a = i.partials;
                        i.partials = n.extend({}, a, e.partials);
                        var r = t(s, o);
                        return i.partials = a, r
                    }), e.partials[s.args[0]] = s.fn, o
                })
            }, t.exports = e.default
        }, function (t, e, i) {
            e.__esModule = !0;
            var n = i(4),
                s = {
                    methodMap: ["debug", "info", "warn", "error"],
                    level: "info",
                    lookupLevel: function (t) {
                        if ("string" == typeof t) {
                            var e = n.indexOf(s.methodMap, t.toLowerCase());
                            t = e >= 0 ? e : parseInt(t, 10)
                        }
                        return t
                    },
                    log: function (t) {
                        if (t = s.lookupLevel(t), "undefined" != typeof console && s.lookupLevel(s.level) <= t) {
                            var e = s.methodMap[t];
                            console[e] || (e = "log");
                            for (var i = arguments.length, n = Array(i > 1 ? i - 1 : 0), o = 1; i > o; o++) n[o - 1] = arguments[o];
                            console[e].apply(console, n)
                        }
                    }
                };
            e.default = s, t.exports = e.default
        }, function (t, e) {
            function i(t) {
                this.string = t
            }
            e.__esModule = !0, i.prototype.toString = i.prototype.toHTML = function () {
                return "" + this.string
            }, e.default = i, t.exports = e.default
        }, function (t, e, i) {
            function n(t) {
                var e = t && t[0] || 1,
                    i = v.COMPILER_REVISION;
                if (e !== i) {
                    if (i > e) {
                        var n = v.REVISION_CHANGES[i],
                            s = v.REVISION_CHANGES[e];
                        throw new g.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + n + ") or downgrade your runtime to an older version (" + s + ").")
                    }
                    throw new g.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + t[1] + ").")
                }
            }

            function s(t, e) {
                function i(i, n, s) {
                    s.hash && (n = m.extend({}, n, s.hash), s.ids && (s.ids[0] = !0)), i = e.VM.resolvePartial.call(this, i, n, s);
                    var o = e.VM.invokePartial.call(this, i, n, s);
                    if (null == o && e.compile && (s.partials[s.name] = e.compile(i, t.compilerOptions, e), o = s.partials[s.name](n, s)), null != o) {
                        if (s.indent) {
                            for (var a = o.split("\n"), r = 0, l = a.length; l > r && (a[r] || r + 1 !== l); r++) a[r] = s.indent + a[r];
                            o = a.join("\n")
                        }
                        return o
                    }
                    throw new g.default("The partial " + s.name + " could not be compiled when running in runtime-only mode")
                }

                function n(e) {
                    function i(e) {
                        return "" + t.main(s, e, s.helpers, s.partials, a, l, r)
                    }
                    var o = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        a = o.data;
                    n._setup(o), !o.partial && t.useData && (a = u(e, a));
                    var r = void 0,
                        l = t.useBlockParams ? [] : void 0;
                    return t.useDepths && (r = o.depths ? e !== o.depths[0] ? [e].concat(o.depths) : o.depths : [e]), (i = c(t.main, i, s, o.depths || [], a, l))(e, o)
                }
                if (!e) throw new g.default("No environment passed to template");
                if (!t || !t.main) throw new g.default("Unknown template object: " + typeof t);
                t.main.decorator = t.main_d, e.VM.checkRevision(t.compiler);
                var s = {
                    strict: function (t, e) {
                        if (!(e in t)) throw new g.default('"' + e + '" not defined in ' + t);
                        return t[e]
                    },
                    lookup: function (t, e) {
                        for (var i = t.length, n = 0; i > n; n++)
                            if (t[n] && null != t[n][e]) return t[n][e]
                    },
                    lambda: function (t, e) {
                        return "function" == typeof t ? t.call(e) : t
                    },
                    escapeExpression: m.escapeExpression,
                    invokePartial: i,
                    fn: function (e) {
                        var i = t[e];
                        return i.decorator = t[e + "_d"], i
                    },
                    programs: [],
                    program: function (t, e, i, n, s) {
                        var a = this.programs[t],
                            r = this.fn(t);
                        return e || s || n || i ? a = o(this, t, r, e, i, n, s) : a || (a = this.programs[t] = o(this, t, r)), a
                    },
                    data: function (t, e) {
                        for (; t && e--;) t = t._parent;
                        return t
                    },
                    merge: function (t, e) {
                        var i = t || e;
                        return t && e && t !== e && (i = m.extend({}, e, t)), i
                    },
                    noop: e.VM.noop,
                    compilerInfo: t.compiler
                };
                return n.isTop = !0, n._setup = function (i) {
                    i.partial ? (s.helpers = i.helpers, s.partials = i.partials, s.decorators = i.decorators) : (s.helpers = s.merge(i.helpers, e.helpers), t.usePartial && (s.partials = s.merge(i.partials, e.partials)), (t.usePartial || t.useDecorators) && (s.decorators = s.merge(i.decorators, e.decorators)))
                }, n._child = function (e, i, n, a) {
                    if (t.useBlockParams && !n) throw new g.default("must pass block params");
                    if (t.useDepths && !a) throw new g.default("must pass parent depths");
                    return o(s, e, t[e], i, 0, n, a)
                }, n
            }

            function o(t, e, i, n, s, o, a) {
                function r(e) {
                    var s = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        r = a;
                    return a && e !== a[0] && (r = [e].concat(a)), i(t, e, t.helpers, t.partials, s.data || n, o && [s.blockParams].concat(o), r)
                }
                return r = c(i, r, t, a, n, o), r.program = e, r.depth = a ? a.length : 0, r.blockParams = s || 0, r
            }

            function a(t, e, i) {
                return t ? t.call || i.name || (i.name = t, t = i.partials[t]) : t = "@partial-block" === i.name ? i.data["partial-block"] : i.partials[i.name], t
            }

            function r(t, e, i) {
                i.partial = !0, i.ids && (i.data.contextPath = i.ids[0] || i.data.contextPath);
                var n = void 0;
                if (i.fn && i.fn !== l && (i.data = v.createFrame(i.data), n = i.data["partial-block"] = i.fn, n.partials && (i.partials = m.extend({}, i.partials, n.partials))), void 0 === t && n && (t = n), void 0 === t) throw new g.default("The partial " + i.name + " could not be found");
                return t instanceof Function ? t(e, i) : void 0
            }

            function l() {
                return ""
            }

            function u(t, e) {
                return e && "root" in e || (e = e ? v.createFrame(e) : {}, e.root = t), e
            }

            function c(t, e, i, n, s, o) {
                if (t.decorator) {
                    var a = {};
                    e = t.decorator(e, a, i, n && n[0], s, o, n), m.extend(e, a)
                }
                return e
            }
            var d = i(1).default,
                p = i(2).default;
            e.__esModule = !0, e.checkRevision = n, e.template = s, e.wrapProgram = o, e.resolvePartial = a, e.invokePartial = r, e.noop = l;
            var f = i(4),
                m = d(f),
                h = i(5),
                g = p(h),
                v = i(3)
        }, function (t, e) {
            (function (i) {
                e.__esModule = !0, e.default = function (t) {
                    var e = "undefined" != typeof i ? i : window,
                        n = e.Handlebars;
                    t.noConflict = function () {
                        return e.Handlebars === t && (e.Handlebars = n), t
                    }
                }, t.exports = e.default
            }).call(e, function () {
                return this
            }())
        }])
    }), ! function () {
        var t = Handlebars.template,
            e = Handlebars.templates = Handlebars.templates || {};
        e.gsuiOscilloscope = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                return '<canvas class="gsuiOscilloscope"></canvas>\r\n'
            },
            useData: !0
        }), e.gsuiPopup = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                return '<div class="gsuiPopup">\r\n\t<div class="gsuiPopup-window">\r\n\t\t<header></header>\r\n\t\t<div class="gsui-msg"></div>\r\n\t\t<form>\r\n\t\t\t<input type="text" class="gsui-text"\r\n\t\t\t/><input type="button" class="gsui-btn gsui-cancel" value="Cancel"\r\n\t\t\t/><input type="submit" class="gsui-btn gsui-ok" value="Ok"/>\r\n\t\t</form>\r\n\t</div>\r\n</div>\r\n'
            },
            useData: !0
        }), e.gsuiSpanEditable = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                return '<div class="gsuiSpanEditable">\r\n\t<span class="gsui-textOverflow"></span>\r\n\t<input type="text"/>\r\n</div>\r\n'
            },
            useData: !0
        }), e.gsuiToggle = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                return '<div class="gsuiToggle">\r\n\t<div class="gsui-circle"></div>\r\n</div>'
            },
            useData: !0
        }), e.gsuiWaveform = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                return '<svg class="gsuiWaveform" preserveAspectRatio="none">\r\n\t<polygon/>\r\n</svg>\r\n'
            },
            useData: !0
        })
    }(), gsuiOscilloscope.prototype = {
        setResolution: function (t, e) {
            this.canvas.width = t, this.canvas.height = e
        },
        setPinch: function (t) {
            this.pinch = Math.max(0, Math.min(t, 1))
        },
        clear: function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        },
        startAnimation: function () {
            if (!this.frameId) {
                var t = this;
                this.frameId = requestAnimationFrame(function e() {
                    t.draw(t.fnData()), t.frameId = requestAnimationFrame(e)
                })
            }
        },
        stopAnimation: function () {
            cancelAnimationFrame(this.frameId), this.frameId = null
        },
        dataFunction: function (t) {
            this.fnData = t
        },
        drawBegin: function (t) {
            this.fnBegin = t || function () {}
        },
        drawEnd: function (t) {
            this.fnEnd = t || function () {}
        },
        draw: function (t) {
            var e, i, n = this.maxValue,
                s = this.canvas,
                o = this.ctx,
                a = s.width,
                r = s.height,
                l = r / 2,
                u = t.length,
                c = Math.ceil(this.pinch / 2 * u),
                d = a / (u - 1);
            if (this.fnBegin(o, n, a, r) !== !1) {
                for (o.beginPath(), n = 0, e = 0; e < u; ++e) i = t[e] / 128 - 1, n = Math.max(n, Math.abs(i)), (e < c || u - c <= e) && (i *= .5 - Math.cos(Math.PI * (e < c ? e : u - 1 - e) / c) / 2), 0 === e ? o.moveTo(0, l + i * l) : o.lineTo(e * d, l + i * l);
                this.fnEnd(o, n, a, r), o.stroke(), this.maxValue = n
            }
        }
    }, gsuiPopup.prototype = {
        close: function () {
            this.isOpen && this.elCancel.click()
        },
        open: function (t, e, i, n) {
            this.isOpen = !0, this.elHeader.textContent = e, this.elMsg.innerHTML = i, this.elText.value = arguments.length > 3 ? n : "", this.elWindow.dataset.gsuiType = this.type = t, this.elWindow.classList.toggle("gsui-nocancel", "prompt" !== t && "confirm" !== t), this.elWindow.classList.toggle("gsui-notext", "prompt" !== t), this.elRoot.classList.add("gsui-show");
            var s = this;
            return setTimeout(function () {
                "prompt" === t ? s.elText.select() : s.elOk.focus()
            }, 250), new Promise(function (t) {
                s.resolve = t
            }).then(function (t) {
                return s.isOpen = !1, s.elRoot.classList.remove("gsui-show"), t
            })
        }
    }, gsuiSpanEditable.prototype = {
        getValue: function () {
            return this.value
        },
        setValue: function (t) {
            t = t.trim(), t === this.placeholder && (t = ""), this.element.classList.toggle("gsui-empty", !t), this.span.textContent = t || this.placeholder, t !== this.value && (this.value = t, this.data.onchange && this.data.onchange(this.value))
        },
        setPlaceholder: function (t) {
            this.placeholder = t.trim(), this.value || this.setValue(t)
        },
        __elementDblclick: function (t) {
            this.input.value = this.value, this.element.classList.add("gsui-editing"), this.input.focus(), this.input.select()
        },
        __inputBlur: function (t) {
            this.__esc || (this.setValue(t.target.value), this.element.classList.remove("gsui-editing")), this.__esc = !1
        },
        __inputKeydown: function (t) {
            t.stopPropagation(), 13 !== t.keyCode && 27 !== t.keyCode || (this.__esc = 27 === t.keyCode, this.__esc || this.setValue(t.target.value), this.element.classList.remove("gsui-editing"))
        }
    }, gsuiToggle.prototype = {
        toggle: function (t) {
            t !== this.isOn && (this.isOn = t, this._circleClass.toggle("gsui-on", t), this.data.onchange && this.data.onchange(t))
        },
        groupWith: function (t) {
            var e = this.group;
            t.group = t.group || [t], t !== this && e !== t.group && (e && e.splice(e.indexOf(this), 1), this.group = t.group, t.group.push(this))
        },
        __elementMousedown: function (t) {
            if (0 === t.button) this.toggle(!this.isOn);
            else if (2 === t.button) {
                if (this.group) {
                    var e = this.group.every(function (t) {
                        return t === this || !t.isOn
                    }, this);
                    this.group.forEach(function (t) {
                        t !== this && t.toggle(e)
                    }, this)
                }
                this.toggle(!0)
            }
        }
    }, gsuiWaveform.prototype = {
        setResolution: function (t, e) {
            this.width = t, this.height = e, this.svg.setAttribute("viewBox", "0 0 " + t + " " + e)
        },
        draw: function (t, e, i, n, s) {
            var o, a = this.width,
                r = this.height,
                l = r / 2,
                u = t.length,
                c = ~~(n / i * u),
                d = s / i * u / a,
                p = "0," + (l + t[c] * l),
                f = "0," + (l + e[c] * l),
                m = ~~Math.max(1, d / 100);
            for (o = 1; o < a; ++o) {
                for (var h = 1 / 0, g = -(1 / 0), v = ~~(c + (o - 1) * d), w = v + d; v < w; v += m) h = Math.min(h, t[v], e[v]), g = Math.max(g, e[v], t[v]);
                Math.abs(g - h) * l < 1 && (g += 1 / r, h -= 1 / r), p += " " + o + "," + (l + h * l), f = o + "," + (l + g * l) + " " + f
            }
            this.polygon.setAttribute("points", p + " " + f)
        }
    }, ! function () {
        function t(t) {
            this.bufferSources.splice(this.bufferSources.findIndex(function (e) {
                return t === e
            }), 1)
        }
        window.gswaBufferSample = function () {
            this.bufferSources = []
        }, gswaBufferSample.prototype = {
            setContext: function (t) {
                this.ctx = t
            },
            setMetadata: function (t) {
                t && (this.duration = this.duration || t.duration)
            },
            setDataFromAudioBuffer: function (t) {
                return this.buffer = t, this.setMetadata(t), t
            },
            setDataFromArrayBuffer: function (t) {
                return this.ctx.decodeAudioData(t).then(this.setDataFromAudioBuffer.bind(this))
            },
            setDataFromBlob: function (t) {
                var e = this,
                    i = new FileReader;
                return new Promise(function (n, s) {
                    i.onloadend = function () {
                        n(e.setDataFromArrayBuffer(i.result))
                    }, i.readAsArrayBuffer(t)
                })
            },
            setDataFromURL: function (t) {
                return fetch(t).then(function (t) {
                    return t.arrayBuffer()
                }).then(this.setDataFromArrayBuffer.bind(this))
            },
            connect: function (t) {
                this.connectedTo = t, this.bufferSources.forEach(function (e) {
                    e.connect(t)
                })
            },
            disconnect: function () {
                this.connectedTo = null, this.bufferSources.forEach(function (t) {
                    t.disconnect()
                })
            },
            start: function (e, i, n) {
                var s, o = this.ctx,
                    a = this.buffer;
                if (o && a) return s = o.createBufferSource(), s.buffer = a, s.onended = t.bind(this, s), s.connect(this.connectedTo), this.bufferSources.push(s), s.start(e || 0, i || 0, arguments.length > 2 ? n : this.duration), s
            },
            stop: function () {
                this.bufferSources.forEach(function (t) {
                    t.onended = null, t.stop()
                }), this.bufferSources.length = 0
            }
        }
    }(), gswaSampleGroup.prototype = {
        stretch: function (t) {
            this.samples.forEach(function (e) {
                e.whenRel *= t
            }), this.updateDuration()
        },
        start: function (t, e, i) {
            var n = this.samples[0];
            n && (e = e || 0, i = arguments.length > 2 ? i : this.duration, t || (t = n.sample.ctx.currentTime), this.samples.forEach(function (n) {
                var s = n.whenRel - e,
                    o = n.duration,
                    a = n.offset;
                s < 0 && (a -= s, o += s), o > 0 && (o += Math.min(i - s - o, 0), o > 0 && n.sample.start(t + s, a, o))
            }))
        },
        stop: function () {
            this.samples.forEach(function (t) {
                t.sample.stop()
            })
        },
        addSample: function (t) {
            t.offset = t.offset || 0, t.duration = t.duration || t.sample.duration, this.samples.push(t), this.samplesRev.push(t)
        },
        addSamples: function (t) {
            t.forEach(this.addSample.bind(this))
        },
        removeSample: function (t) {
            function e(e) {
                e.splice(e.findIndex(function (e) {
                    return e === t
                }), 1)
            }
            e(this.samples), e(this.samplesRev)
        },
        removeSamples: function (t) {
            t.forEach(this.removeSample.bind(this))
        },
        updateDuration: function () {
            var t = this.samplesRev[0];
            this.duration = t ? t.whenRel + t.duration : 0
        },
        sortSamples: function () {
            function t(t, e) {
                return t < e ? -1 : t > e ? 1 : 0
            }
            this.samples.sort(function (e, i) {
                return t(e.whenRel, i.whenRel)
            }), this.samplesRev.sort(function (e, i) {
                return t(i.whenRel + i.duration, e.whenRel + e.duration)
            })
        }
    }, gswaContext.prototype = {
        gain: function (t) {
            return arguments.length ? (this.filter.gain(t), this) : this.filter.gain()
        },
        createSample: function (t) {
            var e = new gswaSample(this, t);
            return t.samples.push(e), e
        },
        createBuffer: function () {
            return new gswaBuffer(this)
        },
        createFilters: function () {
            return new gswaFilters(this)
        },
        createComposition: function () {
            return new gswaComposition(this)
        }
    },
    function () {
        function t(t, e) {
            for (var i = 0, n = 0, s = t.length + e.length, o = new Float32Array(s); i < s;) o[i++] = t[n], o[i++] = e[n++];
            return o
        }

        function e(t, e, i) {
            for (var n = 0; n < i.length; ++n) t.setUint8(e + n, i.charCodeAt(n))
        }

        function i(t, e, i) {
            for (var n, s = 0; s < i.length; ++s, e += 2) n = Math.max(-1, Math.min(i[s], 1)), t.setInt16(e, n < 0 ? 32768 * n : 32767 * n, !0)
        }

        function n(t, e, i) {
            for (var n = 0; n < i.length; ++n, e += 4) t.setFloat32(e, i[n], !0)
        }
        window.gswaEncodeWAV = function (s, o) {
            var a = s.numberOfChannels,
                r = s.sampleRate,
                l = o && o.float32 ? 3 : 1,
                u = 3 === l ? 32 : 16,
                c = u / 8,
                d = a * c,
                p = 2 === a ? t(s.getChannelData(0), s.getChannelData(1)) : s.getChannelData(0),
                f = new ArrayBuffer(44 + p.length * c),
                m = new DataView(f);
            return e(m, 0, "RIFF"), m.setUint32(4, 36 + p.length * c, !0), e(m, 8, "WAVE"), e(m, 12, "fmt "), m.setUint32(16, 16, !0), m.setUint16(20, l, !0), m.setUint16(22, a, !0), m.setUint32(24, r, !0), m.setUint32(28, r * d, !0), m.setUint16(32, d, !0), m.setUint16(34, u, !0), e(m, 36, "data"), m.setUint32(40, p.length * c, !0), (1 === l ? i : n)(m, 44, p), f
        }
    }(), gswaSample.prototype = {
        edit: function (t, e, i) {
            return null != t && (this.when = t), null != e && (this.offset = e), null != i && (this.duration = i), this
        },
        connect: function (t) {
            return t = t.nodeIn || t, t instanceof AudioNode && (this.connectedTo = t, this.bufferSources.forEach(function (e) {
                e.connect(t)
            })), this
        },
        disconnect: function () {
            return this.connectedTo = null, this.bufferSources.forEach(function (t) {
                t.disconnect()
            }), this
        },
        start: function (t, e, i) {
            if (this.wBuffer.buffer) {
                var n = this.wCtx.ctx.createBufferSource();
                t = null != t ? t : this.when, e = null != e ? e : this.offset, i = null != i ? i : this.duration, n.buffer = this.wBuffer.buffer, n.onended = this._bsrcOnended.bind(this, n, !0), n.connect(this.connectedTo), this.bufferSources.push(n), n.start(this.wCtx.ctx.currentTime + t, e, i), ++this.started, t > 0 ? n.gs__onplayTimeoutId = setTimeout(this._bsrcOnplay.bind(this, n), 1e3 * t) : this._bsrcOnplay(n)
            }
            return this
        },
        stop: function () {
            return this.started && (this.bufferSources.forEach(function (t) {
                t.onended = null, t.stop(0), this._bsrcOnended(t, !1)
            }, this), this.bufferSources.length = 0), this
        },
        onended: function (t) {
            return this._userOnended = t, this
        },
        _bsrcOnplay: function (t) {
            t.gs__isPlaying = !0, ++this.wCtx.nbPlaying
        },
        _bsrcOnended: function (t, e) {
            clearTimeout(t.gs__onplayTimeoutId), t.gs__isPlaying && (t.gs__isPlaying = !1, --this.wCtx.nbPlaying), e && this.bufferSources.splice(this.bufferSources.indexOf(t), 1), --this.started, this._userOnended()
        }
    }, gswaBuffer.prototype = {
        setFile: function (t) {
            var e = this;
            return new Promise(function (i, n) {
                function s(t) {
                    e.wCtx.ctx.decodeAudioData(t, function (t) {
                        e._setData(t), i(e)
                    }, n)
                }
                if (t.name) {
                    var o = new FileReader;
                    o.addEventListener("loadend", function () {
                        s(o.result)
                    }), o.readAsArrayBuffer(t)
                } else s(t)
            })
        },
        _setData: function (t) {
            this.buffer = t, this._setDuration(t.duration)
        },
        _setDuration: function (t) {
            function e(e) {
                e.bufferDuration = t, (null == e.duration || e.duration > t) && (e.duration = t)
            }
            this.duration = t, this.samples.forEach(e), e(this.sample)
        },
        getPeaks: function (t, e, i, n) {
            i = i || 0, n = void 0 === n ? this.buffer.duration - i : Math.min(n, this.buffer.duration - i);
            for (var s, o, a, r = 0, l = new Array(e), u = this.buffer.getChannelData(t), c = n * this.buffer.sampleRate, d = i * this.buffer.sampleRate, p = c / e, f = ~~Math.max(1, p / 10); r < e; ++r) {
                for (s = d + r * p, o = s + p, a = 0; s < o; s += f) a = Math.max(a, Math.abs(u[~~s]));
                l[r] = a
            }
            return l
        }
    }, gswaFilters.prototype = {
        connect: function (t) {
            t = t.nodeIn || t, t instanceof AudioNode && (this.connectedTo = t, this.nodeOut.connect(t))
        },
        disconnect: function () {
            this.nodeOut.disconnect(), this.connectedTo = null
        },
        empty: function () {
            this.nodes.length && (this.nodes[this.nodes.length - 1].disconnect(), this.nodeIn.disconnect(), this.nodeIn.connect(this.nodeOut), this.nodes = [])
        },
        gain: function (t) {
            return arguments.length ? void(this.nodeOut.gain.value = t) : this.nodeOut.gain.value
        },
        pushBack: function (t) {
            if (this.nodes.length) {
                var e = this.nodes[this.nodes.length - 1];
                e.disconnect(), e.connect(t)
            } else this.nodeIn.disconnect(), this.nodeIn.connect(t);
            t.connect(this.nodeOut), this.nodes.push(t)
        },
        pushFront: function (t) {
            this.nodes.length ? (this.nodeIn.disconnect(), this.nodeIn.connect(t), t.connect(this.nodes[0]), this.nodes.unshift(t)) : this.pushBack(t)
        },
        popBack: function () {
            var t = this.nodes.pop();
            if (t)
                if (t.disconnect(), this.nodes.length) {
                    var e = this.nodes[this.nodes.length - 1];
                    e.disconnect(), e.connect(this.nodeOut)
                } else this.nodeIn.disconnect(), this.nodeIn.connect(this.nodeOut);
            return t
        },
        popFront: function () {
            var t = this.nodes.shift();
            return t && (t.disconnect(), this.nodeIn.disconnect(), this.nodeIn.connect(this.nodes[0] || this.nodeOut)), t
        }
    }, gswaComposition.prototype = {
        bpm: function (t) {
            if (!arguments.length) return this._bpm;
            if (t = Math.max(1, t), t !== this._bpm) {
                var e = this._bpm / 60,
                    i = e / (t / 60),
                    n = this.currentTime();
                this.samples.forEach(function (t) {
                    t.when *= i
                }), this.isLooping && this.loop(this.loopWhen * i, this.loopDuration * i), this._bpm = t, this._updateDuration(), this.currentTime(n * i)
            }
            return this
        },
        add: function (t) {
            return t.forEach ? t.forEach(this._add) : this._add(t), this
        },
        addNew: function (t) {
            return t.forEach ? t.forEach(this._addNew) : this._addNew(t), this
        },
        remove: function (t) {
            return t.forEach ? t.forEach(this._remove) : this._remove(t), this
        },
        getSampleAt: function (t) {
            return this.samples.findIndex(function (e) {
                return e.when + e.duration > t
            })
        },
        update: function (t, e) {
            return "rm" !== e && this.samples.sort(function (t, e) {
                return t.when < e.when ? -1 : t.when > e.when ? 1 : 0
            }), this._updateDuration(), this.oldDuration !== this.duration && this._updateEndTimeout(), this.isPlaying && (t.stop(), "rm" !== e && (this.isLooping ? this._loopUpdate(t) : this._sampleStart(t, 0, this.currentTime(), 1 / 0))), this
        },
        currentTime: function (t) {
            function e(t) {
                return !i.isLooping || t < i.loopEnd ? t : i.loopWhen + (t - i.loopWhen) % i.loopDuration
            }
            var i = this;
            return arguments.length ? (this.isPlaying && this._stop(), this._currentTime = e(Math.max(0, Math.min(t, this.duration))), this.isPlaying && this._play(), this) : this.isPlaying ? e(this._currentTime + this.wCtx.ctx.currentTime - this._startedTime) : this._currentTime
        },
        play: function () {
            return this.isPlaying || (this.isPlaying = !0, this.isPaused = !1, this._play()), this
        },
        stop: function () {
            return (this.isPlaying || this.isPaused) && (this._stop(), this.onended()), this
        },
        pause: function () {
            return this.isPlaying && (this.isPlaying = !1, this.isPaused = !0, this._currentTime += this.wCtx.ctx.currentTime - this._startedTime, this._startedTime = 0, this._stop(), this.fnOnpaused()), this
        },
        onended: function (t) {
            return "function" == typeof t ? this.fnOnended = t : (this.isPlaying = this.isPaused = !1, this._startedTime = this._currentTime = 0, this.fnOnended()), this
        },
        _add: function (t) {
            this.samples.indexOf(t) < 0 && (this.samples.push(t), t.composition = this, this.update(t, "ad"))
        },
        _addNew: function (t) {
            this.newSamples.indexOf(t) < 0 && this.newSamples.push(t)
        },
        _remove: function (t) {
            var e = this.samples.indexOf(t);
            e > -1 && (t.composition = null, this.samples.splice(e, 1), this.update(t, "rm"))
        },
        _stop: function () {
            clearTimeout(this._endTimeout), clearTimeout(this._loopTimeout), this.samples.forEach(function (t) {
                t.stop()
            })
        },
        _play: function () {
            this._startedTime = this.wCtx.ctx.currentTime, this.isLooping ? this._loopPlay() : this.samples.forEach(function (t) {
                this._sampleStart(t, 0, this.currentTime(), 1 / 0)
            }, this), this._updateEndTimeout()
        },
        _updateDuration: function () {
            var t = this.samples[this.samples.length - 1];
            this.duration = t ? t.when + t.duration : 0
        },
        _updateEndTimeout: function () {
            if (clearTimeout(this._endTimeout), this.isPlaying && !this.isLooping) {
                var t = this.duration - this.currentTime();
                this.oldDuration = this.duration, t <= 0 ? this.onended() : this._endTimeout = setTimeout(this.onended, 1e3 * t)
            }
        },
        _sampleStart: function (t, e, i, n) {
            var s = t.when,
                o = t.offset,
                a = t.duration,
                r = s - i;
            r > -a && s < n && (s + a > n && (a -= s + a - n), r < 0 && (o -= r, a += r, r = 0), t.start(r + e, o, a))
        }
    }, Object.assign(gswaComposition.prototype, {
        loop: function (t, e) {
            return this.isLooping = t !== !1, this.isLooping ? (this.loopWhen = t, this.loopDuration = e, this.loopEnd = t + e) : clearTimeout(this._loopTimeout), this.isPlaying && this.currentTime(this.currentTime()), this
        },
        _loopPlay: function () {
            clearTimeout(this._loopTimeout), this.samples.some(function (t) {
                return !(t.when < this.loopEnd) || void this._sampleStart(t, 0, this.currentTime(), this.loopEnd)
            }, this), this.currentTime() >= this.loopWhen ? this._loopStart() : this._loopTimeout = setTimeout(this._loopStart.bind(this), 1e3 * (this.loopWhen - this.currentTime()))
        },
        _loopStart: function () {
            this._loopN = Math.ceil(2 / this.loopDuration), this._loopNbStarted = 1, this._loopTimeout = setInterval(this._loopTimer.bind(this), 1e3), this._loopTimer()
        },
        _loopRemain: function () {
            return this._loopNbStarted - (this.wCtx.ctx.currentTime - this._startedTime + this._currentTime - this.loopWhen) / this.loopDuration
        },
        _loopTimer: function () {
            if (this._loopRemain() < this._loopN) {
                var t, e, i = 0,
                    n = this.getSampleAt(this.loopWhen);
                if (n > -1)
                    for (; i++ < this._loopN;) {
                        for (e = n;
                            (t = this.samples[e]) && t.when < this.loopEnd; ++e) this._sampleStart(t, this._loopRemain() * this.loopDuration, this.loopWhen, this.loopEnd);
                        ++this._loopNbStarted
                    }
            }
        },
        _loopUpdate: function (t) {
            if (this._sampleStart(t, 0, this.currentTime(), this.loopEnd), t.when + t.duration > this.loopWhen && t.when < this.loopEnd)
                for (var e = 1; e < this._loopRemain(); ++e) this._sampleStart(t, e * this.loopDuration - (this.currentTime() - this.loopWhen), this.loopWhen, this.loopEnd)
        }
    }), gswaComposition.prototype.render = function () {
        var t, e, i, n, s = this,
            o = this.duration;
        if (o) return this.stop(), this.isLooping && (i = this.loopWhen, n = this.loopDuration), t = this.wCtx.ctx, e = this.wCtx.ctx = new OfflineAudioContext(2, 44100 * o, 44100), this.samples.forEach(function (t) {
            t.stop(), t.connect(e.destination)
        }), this.currentTime(0), n && this.loop(!1), this.play(), e.startRendering().then(function (e) {
            var o = new DataView(gswaEncodeWAV(e)),
                a = new Blob([o], {
                    type: "audio/wav"
                });
            return s.wCtx.ctx = t, s.samples.forEach(function (e) {
                e.stop(), e.connect(t.destination)
            }), n && s.loop(i, n), a
        }).catch(function (t) {
            console.error("gs-webaudio-library: composition.render() just failed: " + t)
        })
    }, gswaFramework.do = {}, gswaFramework.do.addSource = function (t) {
        var e = new gswaBufferSample;
        t.bufferSample = e, e.setContext(this.audiocontext), e.setMetadata(t.metadata), this.sources.push(t), t.userData = this.on.addSource(t);
    }, gswaFramework.do.addSources = function (t) {
        t.forEach(this.do.addSource), this.on.addSources(t)
    }, gswaFramework.do.loadSource = function (t) {
        var e = this,
            i = t.bufferSample,
            n = t.data;
        if (n) return ("string" == typeof n ? i.setDataFromURL(n) : i.setDataFromBlob(n)).then(function () {
            return e.on.loadSource(t), t
        })
    }, gswaFramework.do.loadSources = function (t) {
        Promise.all(t.map(this.do.loadSource)).then(this.on.loadSources)
    }, gswaFramework.do.addTrack = function (t) {
        this.tracks.push(t), t.userData = this.on.addTrack(t)
    }, gswaFramework.do.removeTrack = function (t) {
        var e = this.tracks.findIndex(function (e) {
            return e === t
        });
        e > -1 && (this.tracks.splice(e, 1), this.on.removeTrack(t))
    }, gswaFramework.do.addComposition = function (t) {
        this.compositions.push(t), t.userData = this.on.addComposition(t)
    }, gswaFramework.do.removeComposition = function (t) {
        var e = this.compositions.findIndex(function (e) {
            return e === t
        });
        e > -1 && (this.compositions.splice(e, 1), this.on.removeComposition(t))
    }, gswaFramework.do.loadComposition = function (t) {
        this.currentComposition !== t && (this.currentComposition = t, this.on.loadComposition(t))
    }, gswaFramework.do.setBPM = function (t, e) {
        function i(t, e) {
            this.sampleGroup.stretch(e / t), this.on.setBPMthen(t)
        }
        clearTimeout(this._bpmTimeoutId), t = Math.max(1, Math.min(t, 999.999));
        var n = this.bpm,
            s = i.bind(this, t, n);
        this.bpm = t, this.on.setBPM(t), e ? this._bpmTimeoutId = setTimeout(s, e) : s()
    }, gswaFramework.do.unload = function () {
        var t = this.currentComposition;
        t && (this.currentComposition = null, this.on.unload(t))
    }, gswaFramework.do.play = function () {
        this.on.play()
    }, gswaFramework.do.pause = function () {
        this.on.pause()
    }, gswaFramework.do.stop = function () {
        this.on.stop()
    },
    function () {
        var t = Handlebars.template,
            e = Handlebars.templates = Handlebars.templates || {};
        e.bpm = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                return '<div id="bpm" class="border inshadow" title="Beats per minute (Scroll to change)">\r\n\t<span class="text">\r\n\t\t<a class="bpmLink">\r\n\t\t\t<span id="bpmInt"></span>\r\n\t\t\t<span id="bpmDec"></span>\r\n\t\t</a>\r\n\t\t<span class="unit">bpm</span>\r\n\t</span>\r\n</div>\r\n'
            },
            useData: !0
        }), e.clock = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                return '<div id="clock">\r\n\t<span id="clockMin"></span>\r\n\t<span id="clockSec"></span>\r\n\t<span id="clockMs"></span>\r\n\t<a id="clockUnits" href="#">\r\n\t\t<span class="s">sec</span>\r\n\t\t<span class="b">beat</span>\r\n\t</a>\r\n</div>\r\n'
            },
            useData: !0
        }), e.grid = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                var o;
                return '<div id="grid">\r\n\t<div id="gridEm">\r\n\t\t<div id="gridHeader">\r\n' + (null != (o = t.invokePartial(n.timeline, e, {
                    name: "timeline",
                    data: s,
                    indent: "\t\t\t",
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + '\t\t</div>\r\n\t\t<div id="tracks">\r\n\t\t\t<div id="gridCols">\r\n\t\t\t\t<div id="tracksNames" class="colA">\r\n\t\t\t\t\t<div class="extend" data-mousemove-fn="trackNames"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div id="gridColB">\r\n\t\t\t\t\t<div id="tracksBg"></div>\r\n\t\t\t\t\t<div id="tracksLines">\r\n\t\t\t\t\t\t<div id="currentTimeCursor"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n'
            },
            usePartial: !0,
            useData: !0
        }), e.gridBlockSample = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                var o, a;
                return '<div class="gridBlock sample">\r\n\t<div class="content">\r\n' + (null != (o = t.invokePartial(n.gsuiWaveform, e, {
                    name: "gsuiWaveform",
                    data: s,
                    indent: "\t\t",
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + '\t</div>\r\n\t<div class="header">\r\n\t\t<i class="icon music"></i>\r\n\t\t<b class="name gsui-textOverflow">' + t.escapeExpression((a = null != (a = i.name || (null != e ? e.name : e)) ? a : i.helperMissing, "function" == typeof a ? a.call(null != e ? e : {}, {
                    name: "name",
                    hash: {},
                    data: s
                }) : a)) + '</b>\r\n\t</div>\r\n\t<div class="crop start"></div>\r\n\t<div class="crop end"></div>\r\n</div>\r\n'
            },
            usePartial: !0,
            useData: !0
        }), e.historyAction = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                var o, a, r = null != e ? e : {},
                    l = i.helperMissing,
                    u = "function",
                    c = t.escapeExpression;
                return '<a class="task">\r\n\t<i class="icon fw circle"></i\r\n\t><i class="icon fw tool tool-' + c((a = null != (a = i.name || (null != e ? e.name : e)) ? a : l, typeof a === u ? a.call(r, {
                    name: "name",
                    hash: {},
                    data: s
                }) : a)) + '"></i\r\n\t><b class="title">' + c((a = null != (a = i.name || (null != e ? e.name : e)) ? a : l, typeof a === u ? a.call(r, {
                    name: "name",
                    hash: {},
                    data: s
                }) : a)) + '</b\r\n\t><span class="text">' + (null != (a = null != (a = i.desc || (null != e ? e.desc : e)) ? a : l, o = typeof a === u ? a.call(r, {
                    name: "desc",
                    hash: {},
                    data: s
                }) : a) ? o : "") + "</span>\r\n</a>\r\n"
            },
            useData: !0
        }), e.itemBuffer = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                var o, a;
                return '<a class="item buffer" draggable="true">\r\n' + (null != (o = t.invokePartial(n.gsuiWaveform, e, {
                    name: "gsuiWaveform",
                    data: s,
                    indent: "\t",
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + '\t<div class="info text-overflow">\r\n\t\t<i class="icon fw"></i>\r\n\t\t<span class="name">' + t.escapeExpression((a = null != (a = i.name || (null != e ? e.name : e)) ? a : i.helperMissing, "function" == typeof a ? a.call(null != e ? e : {}, {
                    name: "name",
                    hash: {},
                    data: s
                }) : a)) + '</span><button id="btnAssignKey">key</button><button id="btnAssignTrack">track</button>\r\n\t</div>\r\n</a>\r\n'
            },
            usePartial: !0,
            useData: !0
        }), e.menu = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                var o;
                return '<div id="menu">\r\n\t<a id="btnPlay" class="btn border inshadow icon play" title="Play/pause (press Space, hold Ctrl for pause)"></a>\r\n\t<a id="btnStop" class="btn border inshadow icon stop" title="Stop (press Space)"></a>\r\n' + (null != (o = t.invokePartial(n.bpm, e, {
                    name: "bpm",
                    data: s,
                    indent: "\t",
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + (null != (o = t.invokePartial(n.save, e, {
                    name: "save",
                    data: s,
                    indent: "\t",
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + '\t<a data-option="magnet" id="btnMagnet" class="btn small icon fw magnet" title="Toggle magnetism (press G)"></a>\r\n\t<div class="sep"></div>\r\n\t<a data-tool="select" class="btn small icon fw tool-select" title="Select (hold Shift or press V)"></a>\r\n\t<a data-tool="paint"  class="btn small icon fw tool-paint" title="Paint (press B)"></a>\r\n\t<a data-tool="delete" class="btn small icon fw tool-delete" title="Delete (press D)"></a>\r\n\t<a data-tool="mute"   class="btn small icon fw tool-mute" title="Mute (press M)" style="display: none;"></a>\r\n\t<a data-tool="slip"   class="btn small icon fw tool-slip" title="Slip (press S)"></a>\r\n\t<a data-tool="cut"    class="btn small icon fw tool-cut" title="Cut (press C)"></a>\r\n\t<a data-tool="hand"   class="btn small icon fw tool-hand" title="Hand (hold Alt or press H)"></a>\r\n\t<a data-tool="zoom"   class="btn small icon fw tool-zoom" title="Zoom (hold Ctrl or press Z)"></a>\r\n\t<div class="flex1"></div>\r\n\t<a style="margin-right: 10px; color: white" href=".." target="_blank" class="btn small icon fw" title="Save Changes (press ctrl S)">Save</a>\r\n</div>\r\n'
            },
            usePartial: !0,
            useData: !0
        }), e["panel-files"] = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                return '<section id="files">\r\n\t<input id="filesInput" type="file"/>\r\n\t<div id="filesCursor" class="cursor"></div>\r\n\t<nav id="filesFilters">\r\n\t\t<a href="#" class="used">Used</a>\r\n\t\t<a href="#" class="loaded">Loaded</a>\r\n\t\t<a href="#" class="unloaded">Unloaded</a>\r\n\t</nav>\r\n\t<div id="filesList" class="list"></div>\r\n\t<div class="placeholder">\r\n\t\t<i class="icon file-audio"></i><br/>\r\n\t\t<b>Drop audio files here</b>\r\n\t</div>\r\n</section>\r\n'
            },
            useData: !0
        }), e["panel-history"] = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                return '<section id="history">\r\n\t<nav>\r\n\t\t<span class="title">History</span>\r\n\t\t<a id="btnUndo" class="btn icon fw undo" title="Undo (Ctrl + Z)"></a>\r\n\t\t<a id="btnRedo" class="btn icon fw redo" title="Redo (Ctrl + Shift + Z)"></a>\r\n\t</nav>\r\n\t<div id="historyList" class="list"></div>\r\n</section>\r\n'
            },
            useData: !0
        }), e.panel = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                var o;
                return '<div id="panel">\r\n\t<div class="extend" data-mousemove-fn="panel"></div>\r\n' + (null != (o = t.invokePartial(n["panel-history"], e, {
                    name: "panel-history",
                    data: s,
                    indent: "\t",
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + (null != (o = t.invokePartial(n["panel-files"], e, {
                    name: "panel-files",
                    data: s,
                    indent: "\t",
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + "</div>\r\n"
            },
            usePartial: !0,
            useData: !0
        }), e.save = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                return '<div id="save" class="border">\r\n\t<a data-edit="save" class="btn inshadow icon fw save" title="Save (Ctrl + S)"></a>\r\n\t<input id="saveCheckbox" type="checkbox"/>\r\n\t<label for="saveCheckbox" class="btn inshadow caret icon fw" title="Compositions list"></label>\r\n\t<div class="dropdown">\r\n\t\t<div class="title">Current composition :</div>\r\n\t\t<a href="#" id="exportToWaveFile">Export to Wave file</a>\r\n\t\t<div class="title">All compositions :</div>\r\n\t\t<div class="list"></div>\r\n\t</div>\r\n</div>\r\n'
            },
            useData: !0
        }), e.saveComposition = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                return '<a href="#" class="saveComposition">\r\n\t<div class="name"></div>\r\n\t<span class="bpm"></span>\r\n\t<span class="duration"></span>\r\n</a>\r\n'
            },
            useData: !0
        }), e.timeline = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                var o;
                return '<div id="timeline">\r\n\t<span id="currentTimeArrow" class="icon caret-down"></span>\r\n' + (null != (o = t.invokePartial(n.timelineLoop, e, {
                    name: "timelineLoop",
                    data: s,
                    indent: "\t",
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + '\t<div id="timelineBeats"></div>\r\n</div>\r\n'
            },
            usePartial: !0,
            useData: !0
        }), e.timelineBeat = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                return '<span class="timelineBeat">\r\n\t<span></span>\r\n</span>\r\n'
            },
            useData: !0
        }), e.timelineLoop = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                return '<div id="timelineLoop">\r\n\t<div class="time a"></div>\r\n\t<div class="time b"></div>\r\n</div>\r\n'
            },
            useData: !0
        }), e.track = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                var o;
                return '<div class="track">\r\n' + (null != (o = t.invokePartial(n.gsuiToggle, e, {
                    name: "gsuiToggle",
                    data: s,
                    indent: "\t",
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + (null != (o = t.invokePartial(n.gsuiSpanEditable, e, {
                    name: "gsuiSpanEditable",
                    data: s,
                    indent: "\t",
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + "</div>\r\n"
            },
            usePartial: !0,
            useData: !0
        }), e.visual = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                var o;
                return '<div id="visual">\r\n' + (null != (o = t.invokePartial(n.gsuiOscilloscope, e, {
                    name: "gsuiOscilloscope",
                    data: s,
                    indent: "\t",
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + '\t<div class="columns">\r\n\t\t<div class="cell-btn"><a id="btnHistory" class="btn icon fw history" title="History (undo/redo)"></a></div>\r\n\t\t<div class="cell-btn"><a id="btnFiles" class="btn icon fw files" title="Audio files"></a></div>\r\n\t\t<div class="cell-clock">\r\n' + (null != (o = t.invokePartial(n.clock, e, {
                    name: "clock",
                    data: s,
                    indent: "\t\t\t",
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + "\t\t</div>\r\n\t</div>\r\n</div>\r\n"
            },
            usePartial: !0,
            useData: !0
        }), e._app = t({
            compiler: [7, ">= 4.0.0"],
            main: function (t, e, i, n, s) {
                var o;
                return (null != (o = t.invokePartial(n.visual, e, {
                    name: "visual",
                    data: s,
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + (null != (o = t.invokePartial(n.menu, e, {
                    name: "menu",
                    data: s,
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + (null != (o = t.invokePartial(n.panel, e, {
                    name: "panel",
                    data: s,
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + (null != (o = t.invokePartial(n.grid, e, {
                    name: "grid",
                    data: s,
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "") + (null != (o = t.invokePartial(n.gsuiPopup, e, {
                    name: "gsuiPopup",
                    data: s,
                    helpers: i,
                    partials: n,
                    decorators: t.decorators
                })) ? o : "")
            },
            usePartial: !0,
            useData: !0
        })
    }(), window.common = {}, common.timestampText = function (t, e) {
        var i, n, s;
        return e ? (t *= e / 60, i = 1 + ~~t, t *= 4, n = 1 + ~~t % 4) : (i = ~~(t / 60), n = ~~(t % 60)), n = n < 10 ? "0" + n : n, s = Math.floor(1e3 * (t - ~~t)), s < 10 ? s = "00" + s : s < 100 && (s = "0" + s), {
            a: i,
            b: n,
            c: s
        }
    }, common.uuid = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
            var e = 16 * Math.random() | 0,
                i = "x" === t ? e : 3 & e | 8;
            return i.toString(16)
        })
    }, window.gs = {
        compositions: {},
        file: {},
        files: [],
        sample: {},
        samples: {
            selected: {}
        },
        selectedSamples: []
    },
    function () {
        var t, e, i, n = -1,
            s = -1;
        gs.loop = t = {
            reorderTimeAB: function () {
                n >= 0 && s >= 0 && (n = gs.composition.loopWhen, s = n + gs.composition.loopDuration)
            },
            timeA: function (e) {
                lg("timea"), n = e, t.update()
            },
            timeB: function (e) {
                lg("timeb"), s = e, t.update()
            },
            stop: function () {
                n = s = -1, gs.composition.loop(!1), ui.timelineLoop.toggle(!1)
            },
            update: function () {
                if (n >= 0 && s >= 0) {
                    var t, o = Math.min(n, s),
                        a = Math.abs(s - n);
                    o === e && a === i || (e = o, i = a, t = a > .01, t && (gs.composition.loop(o, a), ui.timelineLoop.when(o), ui.timelineLoop.duration(a)), ui.timelineLoop.toggle(t))
                }
            }
        }
    }(), gs.playStop = function () {
        (gs.isPlaying ? gs.stop : gs.play)()
    }, gs.playPause = function () {
        (gs.composition.isPlaying ? gs.pause : gs.play)()
    }, gs.play = function () {
        gs.file.stop(), !gs.composition.isPlaying && gs.composition.samples.length && (gs.composition.play(), waFwk.do.play(), gs.composition.isPlaying && (gs.isPlaying = !0, gs.isPaused = !1))
    }, gs.pause = function () {
        gs.file.stop(), gs.composition.isPlaying && (gs.composition.pause(), waFwk.do.pause(), gs.isPlaying = !1, gs.isPaused = !0)
    }, gs.stop = function () {
        gs.file.stop(), gs.compositionStop()
    }, gs.compositionStop = function () {
        gs.composition.stop(), waFwk.do.stop(), gs.currentTime(0), gs.isPaused = gs.isPlaying = !1
    }, gs.file.create = function (t) {
        waFwk.do.addSource({
            data: t.length ? null : t,
            metadata: {
                _file: t,
                duration: t.length ? t[3] : void 0
            }
        })
        document.getElementById('btnAssignKey').id = 'btn' +  t.name + 'Key'
        document.getElementById("btn" + t.name + 'Key').onclick = function() {
            ui.gsuiPopup.open("prompt", t.name, "Enter a number key (0-9) to be used for " + t.name).then(function (i) {
                if (i.length == 1 && /^\d+$/.test(i)) {
                    document.getElementById("btn" + t.name + "Key").innerHTML = i
                    for (var j = 0; j < gs.files.length; j++) {
                        if (t.name == gs.files[j].fullname) {
                            numberInput[i].file = j
                            return
                        }
                    }
                }
            })
        }
        document.getElementById('btnAssignTrack').id = 'btn' +  t.name + 'Track'
        document.getElementById("btn" + t.name + 'Track').onclick = function() {
            ui.gsuiPopup.open("prompt", t.name, "Select a track number (1-42) to be used for " + t.name).then(function (i) {
                if (i.length < 3 && /^\d+$/.test(i) && parseInt(i) < 43 && parseInt(i) > 0 && document.getElementById("btn" + t.name + 'Key').innerHTML != "key") {
                    document.getElementById("btn" + t.name + 'Track').innerHTML = i
                    var key = document.getElementById("btn" + t.name + 'Key').innerHTML
                    numberInput[key].track = parseInt(i)-1
                }
            })
        }
    }, gs.file.delete = function (t) {
        gs.composition.samples.filter(function (e) {
            return e.data.gsfile === t
        }).forEach(function (t) {
            gs.sample.delete(t)
        }), gs.files.splice(gs.files.indexOf(t), 1), t.elFile.remove()
    }, gs.file.joinFile = function (t, e) {
        var i = t.wbuff;
        t.source.unloaded(), t.fullname !== e.name && (t.fullname = e.name, t.name = t.fullname.replace(/\.[^.]+$/, ""), t.elName.textContent = t.name), t.file = e, gs.file.load(t, function (t) {
            i.samples.forEach(function (e) {
                e.data.elName.textContent = t.name, ui.sample.duration(e)
            })
        })
    }, gs.file.load = function (t, e) {
        var i = t.source;
        t.isLoading = !0, i.loading(), t.wbuff.setFile(t.file).then(function (n) {
            t.isLoaded = !0, t.isLoading = !1, i.loaded(), e(t)
        })
    }, gs.file.play = function (t) {
        var e = gs.file.playingSmp;
        e && e.stop(), t.isLoaded && (ui.filesCursor.insertInto(t.source), gs.file.playingSmp = t.wbuff.sample.start(), setTimeout(ui.filesCursor.startMoving.bind(null, t.wbuff.buffer.duration), 20))
    }, gs.file.stop = function () {
        var t = gs.file.playingSmp;
        t && (t.stop(), ui.filesCursor.remove())
    }, gs.numKey = function (i) {
        if (numberInput[i.keys[0]].file != null && numberInput[i.keys[0]].track != null) {
            var e = gs.sample.create(gs.files[numberInput[i.keys[0]].file])
            e.data.gsfile.samplesToSet.push(e), gs.sample.inTrack(e, numberInput[i.keys[0]].track), gs.sample.when(e, gs.composition.currentTime()), gs.composition.add(e)
        }
    },
    function () {
        gs.history = {
            reset: function () {
                e.length = 0, t = -1, ui.historyList.reset()
            },
            goToAction: function (e) {
                var i = e.id - t + 1;
                if (i < 0)
                    for (; i++;) gs.history.undo();
                else if (i > 0)
                    for (; i--;) gs.history.redo()
            },
            push: function (i, n) {
                var s = {
                    id: t,
                    name: i,
                    fn: gs.history[i],
                    data: n
                };
                t < e.length - 1 && e.splice(t + 1), e.push(s), ui.historyList.push(s), ++t
            },
            pushExec: function (t, e) {
                gs.history.push(t, e), gs.history[t](e, 1)
            },
            undo: function () {
                if (t > -1) {
                    var i = e[t--];
                    i.fn && i.fn(i.data, -1), ui.historyList.undo()
                }
            },
            redo: function () {
                if (t < e.length - 1) {
                    var i = e[++t];
                    i.fn && i.fn(i.data, 1), ui.historyList.redo()
                }
            }
        };
        var t, e = []
    }(),
    function () {
        function t(t, e) {
            e > 0 ? (t.selected.forEach(function (t) {
                gs.sample.select(t, !1)
            }), t.pasted.forEach(function (e, i) {
                var n = t.copied[i];
                gs.sample.inTrack(e, n.data.track.id), gs.sample.when(e, n.when + t.allDuration), gs.sample.slip(e, n.offset), gs.sample.duration(e, n.duration), gs.sample.select(e, !0)
            }), gs.composition.add(t.pasted)) : (t.pasted.forEach(gs.sample.delete), t.selected.forEach(function (t) {
                gs.sample.select(t, !0)
            }))
        }

        function e(t, e) {
            var i, n = t.duration;
            t.samples.forEach(function (s, o) {
                i = t.newSamples[o], e > 0 ? (gs.sample.inTrack(i, s.data.track.id), gs.sample.when(i, s.when + n), gs.sample.slip(i, s.offset + n), gs.sample.duration(i, s.duration - n), gs.sample.duration(s, n), gs.composition.add(i)) : (gs.sample.duration(s, n + i.duration), gs.sample.delete(i)), gs.composition.update(s)
            })
        }

        function i(t) {
            t.samples.forEach(function (t) {
                gs.sample.select(t)
            })
        }

        function n(t, e) {
            var i = t.sample;
            e > 0 ? (gs.sample.inTrack(i, t.track.id), gs.sample.when(i, t.when), gs.composition.add(i), gs.composition.addNew(i)) : gs.sample.delete(i)
        }

        function s(t, e) {
            e > 0 ? t.samples.forEach(gs.sample.delete) : t.samples.forEach(function (t) {
                gs.sample.inTrack(t, t.data.track.id), gs.sample.when(t, t.when), gs.sample.slip(t, t.offset), gs.sample.duration(t, t.duration), gs.sample.select(t, t.data.oldSelected), gs.composition.add(t), t.data.gsfile.nbSamples++ || t.data.gsfile.source.used()
            })
        }

        function o(t, e) {
            var i = t.sample,
                n = t.track * e;
            gs.samples.selected.when(i, t.when * e), n && (i.data.selected ? gs.selectedSamples.forEach(function (t) {
                gs.sample.inTrack(t, t.data.track.id + n)
            }) : gs.sample.inTrack(i, i.data.track.id + n)), gs.samples.selected.do(i, function (t) {
                gs.composition.update(t, "mv")
            })
        }

        function a(t, e) {
            var i = t.sample;
            gs.samples.selected.duration(i, t.duration * e), gs.samples.selected.when(i, t.when * e), gs.samples.selected.slip(i, -t.offset * e), gs.samples.selected.do(i, function (t) {
                gs.composition.update(t, "mv")
            })
        }

        function r(t, e) {
            gs.samples.selected.duration(t.sample, t.duration * e), gs.samples.selected.do(t.sample, function (t) {
                gs.composition.update(t, "mv")
            })
        }

        function l(t, e) {
            gs.samples.selected.slip(t.sample, t.offset * e), gs.samples.selected.do(t.sample, function (t) {
                gs.composition.update(t, "mv")
            })
        }
        Object.assign(gs.history, {
            select: i,
            create: n,
            delete: s,
            move: o,
            crop: a,
            cropEnd: r,
            slip: l,
            paste: t,
            cut: e
        })
    }(),
    function () {
        var t = [],
            e = "click mousedown mouseup mousemove change".split(" ");
        window.ui = {
            dom: {},
            initElement: function (e, i) {
                return t.push({
                    name: e,
                    fn: i
                }), ui
            },
            createHTML: function (t) {
                var e = document.createElement("div");
                return e.innerHTML = t, Array.from(e.children)
            },
            init: function (i, n, s) {
                function o(t) {
                    t.id && (ui.dom[t.id] = t)
                }
                var a, r = Handlebars.templates;
                for (a in r) a !== n && Handlebars.registerPartial(a, r[a]);
                i.innerHTML = r[n](s),
                    function t(e) {
                        for (var i, n = e.firstChild; null !== n;) t(i = n), n = n.nextSibling, 1 !== i.nodeType && /^\s*$/.test(i.textContent) && e.removeChild(i)
                    }(i), o(i), Array.from(i.querySelectorAll("[id]")).forEach(o), t.forEach(function (t) {
                        var i, n = ui.dom[t.name],
                            s = t.fn(n);
                        ui[t.name] = s;
                        for (i in s) e.indexOf(i) > -1 && n.addEventListener(i, s[i])
                    })
            }
        }
    }(), ui.isMagnetized = !1, ui.initElement("btnMagnet", function (t) {
        function e(e) {
            "boolean" != typeof e && (e = !ui.isMagnetized), ui.isMagnetized = e, t.classList.toggle("active", e)
        }
        return {
            click: e,
            toggle: e
        }
    }), ui.initElement("btnUndo", function () {
        return {
            click: gs.history.undo
        }
    }), ui.initElement("btnRedo", function () {
        return {
            click: gs.history.redo
        }
    }), ui.initElement("clock", function (t) {
        return {
            setUnit: function (t) {
                ui.dom.clockUnits.dataset.unit = t, ui.clock.setTime(gs.currentTime())
            },
            setTime: function (t) {
                var e = common.timestampText(t, "s" !== gs.clockUnit && waFwk.bpm);
                ui.dom.clockMin.textContent = e.a, ui.dom.clockSec.textContent = e.b, ui.dom.clockMs.textContent = e.c
            }
        }
    }), ui.initElement("currentTimeCursor", function (t) {
        var e = ui.dom.currentTimeArrow;
        return {
            at: function (i) {
                i > 0 && (t.style.left = e.style.left = i * ui.BPMem + "em"), t.classList.toggle("visible", i > 0), e.classList.toggle("visible", i > 0)
            }
        }
    }), ui.initElement("exportToWaveFile", function (t) {
        return {
            click: function (t) {
                var e = gs.composition.render();
                t.preventDefault(), e && e.then(function (t) {
                    var e = gs.compositions.current;
                    ui.exportToWaveFile.downloadFile((e ? e.name : "untitled") + ".wav", t)
                })
            },
            downloadFile: function (t, e) {
                var i = document.createElement("a"),
                    n = URL.createObjectURL(e);
                i.download = t, i.href = n, i.click(), URL.revokeObjectURL(n)
            }
        }
    }), ui.initElement("filesCursor", function (t) {
        return {
            remove: function () {
                t.remove()
            },
            insertInto: function (e) {
                t.style.transitionDuration = t.style.left = 0, e.elRoot.appendChild(t)
            },
            startMoving: function (e) {
                t.style.transitionDuration = e + "s", t.style.left = "100%"
            }
        }
    }), ui.initElement("filesInput", function (t) {
        var e;
        return {
            change: function () {
                e(t.files[0])
            },
            getFile: function (i) {
                e = i, t.click()
            }
        }
    }), ui.initElement("historyList", function (t) {
        var e, i = [];
        return {
            click: function (t) {
                (t = t.target.historyAction) && gs.history.goToAction(t)
            },
            reset: function () {
                for (e = 0, i.length = 0; t.hasChildNodes();) t.lastChild.remove()
            },
            undo: function () {
                i[--e].classList.add("undone")
            },
            redo: function () {
                i[e++].classList.remove("undone")
            },
            push: function (n) {
                for (var s = i.length - e, o = ui.createHTML(Handlebars.templates.historyAction(n))[0]; s-- > 0;) i.pop().remove();
                e++, o.historyAction = n, i.push(o), t.appendChild(o), t.scrollTop = 1e9
            }
        }
    }), ui.initElement("save", function (t) {
        var e = {},
            i = t.querySelector(".list");
        return {
            click: function (t) {
                var e = t.target;
                t.stopPropagation(), e.classList.contains("save") && gs.compositions.saveCurrent()
            },
            hideList: function () {
                ui.dom.saveCheckbox.checked = !1
            },
            unselectComposition: function () {
                var t = i.firstChild;
                t && t.classList.remove("selected")
            },
            selectComposition: function (t) {
                var n = e[t.id].root;
                ui.save.unselectComposition(), n.classList.add("selected"), i.insertBefore(n, i.firstChild)
            },
            addComposition: function (t) {
                var n = ui.createHTML(Handlebars.templates.saveComposition())[0];
                n.onclick = function () {
                    return gs.reset(), gs.compositions.load(t), window.setTimeout(ui.save.hideList, 200), !1
                }, e[t.id] = {
                    root: n,
                    name: n.querySelector(".name"),
                    bpm: n.querySelector(".bpm"),
                    duration: n.querySelector(".duration")
                }, ui.save.updateComposition(t), i.appendChild(n)
            },
            updateComposition: function (t) {
                var i = e[t.id],
                    n = common.timestampText(t.duration);
                i.name.textContent = t.name, i.bpm.textContent = t.bpm, i.duration.textContent = n.a + ":" + n.b + "." + n.c
            }
        }
    }), ui.initElement("timeline", function () {
        var t;
        return {
            mousedown: function (e) {
                var i = Date.now();
                i - t < 250 && (gs.loop.stop(), gs.loop.timeA(ui.getGridSec(e.pageX)), ui.timelineLoop.clickTime("b")), t = i
            },
            mouseup: function (t) {
                ui.timelineLoop.dragging || gs.currentTime(ui.getGridSec(t.pageX))
            },
            update: function () {
                var t = ui.trackLinesLeft / ui.gridEm,
                    e = ui.trackLinesWidth / ui.gridEm;
                ui.timelineBeats.fill(Math.ceil(-t + e)), ui.dom.timelineBeats.style.marginLeft = t += "em", ui.dom.currentTimeArrow.style.marginLeft = t, ui.dom.timelineLoop.style.marginLeft = t
            }
        }
    }), ui.initElement("timelineBeats", function (t) {
        var e = 0;
        return {
            fill: function (i) {
                if (i > e) {
                    var n = e;
                    for (e = i; n++ < i;) t.appendChild(ui.createHTML(Handlebars.templates.timelineBeat())[0])
                }
            }
        }
    }), ui.initElement("timelineLoop", function (t) {
        var e, i;
        return document.body.addEventListener("mousemove", function (t) {
            i && i(ui.getGridSec(t.pageX))
        }), document.body.addEventListener("mouseup", function () {
            i && (i = null, e.dragging = !1, ui.cursor("app", null))
        }), e = {
            mousedown: function (t) {
                var i = t.target;
                i.classList.contains("time") && (e.clickTime(i.classList.contains("a") ? "a" : "b"), t.stopPropagation())
            },
            clickTime: function (t) {
                i = "a" === t ? gs.loop.timeA : gs.loop.timeB, gs.loop.reorderTimeAB(), e.dragging = !0, ui.cursor("app", "w-resize")
            },
            toggle: function (e) {
                t.classList.toggle("hidden", !e)
            },
            when: function (e) {
                t.style.left = e * ui.BPMem + "em"
            },
            duration: function (e) {
                t.style.width = e * ui.BPMem + "em"
            }
        }
    }), ui.initElement("tracksBg", function (t) {
        function e(e) {
            var s, o, a, r, l, u = e - n;
            for (n = Math.max(e, n), s = 0; s < u; ++s) {
                for (r = document.createElement("div"), o = 0; o < 4; ++o) {
                    for (l = document.createElement("div"), a = 0; a < 4; ++a) l.appendChild(document.createElement("div"));
                    r.appendChild(l)
                }
                t.appendChild(r)
            }
            i = i || t.firstChild
        }
        var i, n = 0;
        return {
            update: function () {
                e(Math.ceil(ui.trackLinesWidth / ui.gridEm / 4) + 2), i.style.marginLeft = ui.trackLinesLeft / ui.gridEm % 8 + "em"
            }
        }
    }), ui.initElement("visual", function (t) {
        var e = new gsuiOscilloscope(t.querySelector(".gsuiOscilloscope"));
        return e.setResolution(256, t.clientHeight), e.setPinch(1), e.dataFunction(function () {
            return gs.analyserNode.getByteTimeDomainData(gs.analyserData), gs.analyserData
        }), e.drawBegin(function (t, e, i, n) {
            t.globalCompositeOperation = "source-in", t.fillStyle = "rgba(0,0,0,.8)", t.fillRect(0, 0, i, n), t.globalCompositeOperation = "source-over"
        }), e.drawEnd(function (t, e) {
            e < .01 ? t.strokeStyle = "rgba(0,0,0,0)" : (t.strokeStyle = "#52666e", t.lineJoin = "round", t.lineWidth = 2)
        }), {
            on: e.startAnimation.bind(e),
            off: e.stopAnimation.bind(e)
        }
    }), ui.init(document.querySelector("#app"), "_app", {}), ui.BPMem = 1, ui.dom.toolBtns = Array.from(ui.dom.menu.querySelectorAll(".btn[data-tool]")), ui.tool = {}, ui.gridEm = parseFloat(getComputedStyle(ui.dom.grid).fontSize), ui.gridColsY = ui.dom.gridCols.getBoundingClientRect().top, ui.gsuiPopup = new gsuiPopup(document.querySelector(".gsuiPopup")), window.waFwk = new gswaFramework, waFwk.on.removeTrack = function (t) {
        lg("removeTrack", t)
    }, waFwk.on.addSource = function (t) {
        lg("addSource", t)
    }, waFwk.on.addSources = function (t) {
        lg("addSources", t)
    }, waFwk.on.loadSource = function (t) {
        lg("loadSource", t)
    }, waFwk.on.loadSources = function (t) {
        lg("loadSources", t)
    }, waFwk.on.addComposition = function (t) {
        lg("addComposition", t)
    }, waFwk.on.removeComposition = function (t) {
        lg("removeComposition", t)
    }, waFwk.on.loadComposition = function (t) {
        lg("loadComposition", t)
    }, waFwk.on.unload = function (t) {
        lg("unload", t)
    }, waFwk.on.save = function (t) {
        lg("save", t)
    }, waFwk.on.render = function (t) {
        lg("render", t)
    }, waFwk.on.pause = function (t) {
        lg("pause", t)
    },
    function () {
        function t() {
            this.elRoot = ui.createHTML(Handlebars.templates.itemBuffer())[0], this.elName = this.elRoot.querySelector(".name"), this.elIcon = this.elRoot.querySelector(".icon"), this.elWave = this.elRoot.querySelector(".gsuiWaveform"), this.elRoot.onmousedown = this.mousedown.bind(this), this.elRoot.onclick = this.click.bind(this), this.elRoot.ondragstart = this.dragstart.bind(this), this.elRoot.oncontextmenu = function () {
                return !1
            }
        }
        waFwk.on.addSource = function (e) {
            var i = new t,
                n = e.metadata._file,
                s = {
                    source: i,
                    id: gs.files.length,
                    wbuff: gs.wctx.createBuffer(),
                    isLoaded: !1,
                    isLoading: !1,
                    nbSamples: 0,
                    samplesToSet: [],
                    file: e.data,
                    bufferDuration: e.data ? null : n[3],
                    fullname: n.name || n[1]
                };
            saveSoundFileToDatabase(s.file);
            return i.that = s, i.setName(s.fullname.replace(/\.[^.]+$/, "")), ui.dom.filesList.appendChild(i.elRoot), s.wbuff.sample.onended(gs.file.stop), gs.files.push(s), e.data ? i.unloaded() : (s.size = n[2], i.withoutData()), i
        };
        var e, i;
        t.prototype = {
            setName: function (t) {
                this.elName.textContent = this.name = t, this.that.name = t, gs.file.load(this.that, function(z){});
            },
            unloaded: function () {
                this.elIcon.classList.add("ramload"), this.elIcon.classList.remove("question"), this.elRoot.classList.add("unloaded")
            },
            loading: function () {
                this.elIcon.classList.add("loading"), this.elIcon.classList.remove("ramload")
            },
            loaded: function () {
                var t = this.that.wbuff.buffer,
                    e = t.duration,
                    i = t.getChannelData(0),
                    n = t.numberOfChannels < 2 ? i : t.getChannelData(1);
                this.uiWaveform = new gsuiWaveform(this.elWave), this.uiWaveform.setResolution(250, 40), this.uiWaveform.draw(i, n, e, 0, e), this.elRoot.classList.add("loaded"), this.elRoot.classList.remove("unloaded"), this.elIcon.remove()
            },
            withoutData: function () {
                this.elIcon.classList.add("question"), this.elIcon.classList.remove("ramload"), this.elRoot.classList.add("unloaded")
            },
            error: function () {
                this.elIcon.classList.add("cross"), this.elIcon.classList.remove("loading")
            },
            used: function () {
                this.elRoot.classList.add("used")
            },
            unused: function () {
                this.elRoot.classList.remove("used")
            },
            mousedown: function (t) {
                0 !== t.button && gs.file.stop(), t.ctrlKey && gs.file.delete(this)
            },
            click: function (t) {
                var e = this.that;
                e.isLoaded ? gs.file.play(e) : e.file ? e.isLoading || gs.file.load(e, gs.file.play) : ui.gsuiPopup.open("confirm", "Sample's data missing", "<code>" + this.name + "</code> is missing...<br/>Do you want to browse your files to find it ?").then(function (t) {
                    t && ui.filesInput.getFile(function (t) {
                        gs.file.joinFile(e, t)
                    })
                })
            },
            dragstart: function (t) {
                var n = this.that;
                return n.isLoaded && !e && (e = n, i = this.elRoot.cloneNode(!0), i.style.left = t.pageX + "px", i.style.top = t.pageY + "px", i.classList.add("dragging"), ui.dom.app.appendChild(i), ui.cursor("app", "grabbing")), !1
            }
        }, document.body.addEventListener("mousemove", function (t) {
            e && (i.style.left = t.pageX + "px", i.style.top = t.pageY + "px")
        }), document.body.addEventListener("mouseup", function (t) {
            e && (i.remove(), e = null, ui.cursor("app", null))
        }), ui.dom.gridColB.addEventListener("mouseup", function (t) {
            e && gs.history.pushExec("create", {
                sample: gs.sample.create(e),
                track: ui.getTrackFromPageY(t.pageY),
                when: ui.getGridSec(t.pageX)
            })
        })
    }(),
    function () {
        function t() {
            var t = this;
            this.id = waFwk.tracks.length - 1, this.name = "", this.samples = [], this.elColNamesTrack = ui.createHTML(Handlebars.templates.track())[0], this.elColLinesTrack = ui.createHTML("<div class='track'>")[0], this.elColNamesTrack.uitrack, this.elColLinesTrack.uitrack = this, this.wfilters = gs.wctx.createFilters(), ui.dom.tracksNames.appendChild(this.elColNamesTrack), ui.dom.tracksLines.appendChild(this.elColLinesTrack), this.gsuiToggle = new gsuiToggle(this.elColNamesTrack.querySelector(".gsuiToggle"), {
                onchange: function (e) {
                    t.isOn = e, t.wfilters.gain(+e), t.elColNamesTrack.classList.toggle("off", !e), t.elColLinesTrack.classList.toggle("off", !e)
                }
            }), this.gsuiSpanEditable = new gsuiSpanEditable(this.elColNamesTrack.querySelector(".gsuiSpanEditable"), {
                onchange: function (e) {
                    t.name = e
                }
            }), waFwk.tracks.length > 1 && this.gsuiToggle.groupWith(waFwk.tracks[0].userData.gsuiToggle), this.gsuiSpanEditable.setPlaceholder("Track " + (this.id + 1)), this.toggle(!0), this.editName("")
        }
        waFwk.on.addTrack = function (e) {
            return new t
        }, t.prototype = {
            toggle: function (t) {
                this.gsuiToggle.toggle(t)
            },
            editName: function (t) {
                this.gsuiSpanEditable.setValue(t)
            },
            removeSample: function (t) {
                var e = this.samples.indexOf(t);
                e > -1 && this.samples.splice(e, 1)
            }
        }
    }(),
    function () {
        function t() {
            var i = gs.composition.currentTime();
            ui.currentTimeCursor.at(i), ui.clock.setTime(i), e = requestAnimationFrame(t)
        }
        var e, i = ui.dom.btnPlay,
            n = ui.dom.btnStop;
        i.onclick = gs.playPause, n.onclick = gs.stop, waFwk.on.play = function () {
            i.classList.remove("play"), i.classList.add("pause"), t()
        }, waFwk.on.pause = function () {
            cancelAnimationFrame(e), i.classList.remove("pause"), i.classList.add("play")
        }, waFwk.on.stop = function () {
            waFwk.on.pause(), ui.currentTimeCursor.at(0), ui.clock.setTime(0)
        }
    }(),
    function () {
        function t(t, e) {
            var i = e.deltaY;
            e.preventDefault(), waFwk.do.setBPM(waFwk.bpm + (i > 0 ? -t : i ? t : 0), 400)
        }
        waFwk.on.setBPM = function (t) {
            var e = ~~t,
                i = Math.min(Math.round(100 * (t - e)), 99);
            ui.dom.bpmInt.textContent = e < 100 ? "0" + e : e, ui.dom.bpmDec.textContent = i < 10 ? "0" + i : i
        }, waFwk.on.setBPMthen = function (t) {
            ui.BPMem = t / 60, gs.composition.bpm(t), gs.composition.samples.forEach(ui.sample.duration),
                ui.clock.setTime(gs.currentTime())
        }, ui.dom.bpmInt.onwheel = t.bind(null, 1), ui.dom.bpmDec.onwheel = t.bind(null, .01), ui.dom.bpm.ondblclick = function () {
            ui.gsuiPopup.open("prompt", "BPM", "Choose your BPM (20-999) :", waFwk.bpm).then(function (t) {
                +t && waFwk.do.setBPM(+t)
            })
        }
    }(),
    function () {
        function t(t, e) {
            e ? t.dataset.cursor = e : t.removeAttribute("data-cursor")
        }
        var e = null;
        ui.cursor = function (i, n) {
            "app" === i ? (t(ui.dom.app, n), t(ui.dom.tracksLines, n ? null : e)) : t(ui.dom.tracksLines, e = n)
        }
    }(),
    function () {
        function t(t, e) {
            return Math.abs(t - e) < 1e-4
        }

        function e(t) {
            var e = t % i;
            return t -= e, e > n && (t += i), t
        }
        ui.getGridSec = function (t) {
            var i = (t - ui.filesWidth - ui.trackNamesWidth - ui.trackLinesLeft) / ui.gridEm;
            return (ui.isMagnetized ? e(i) : i) / ui.BPMem
        }, ui.secFloor = function (n) {
            var s = n * ui.BPMem,
                o = e(s);
            return (o < s || t(o, s) ? o : o - i) / ui.BPMem
        }, ui.secCeil = function (n) {
            var s = n * ui.BPMem,
                o = e(s);
            return (o > s || t(o, s) ? o : o + i) / ui.BPMem
        };
        var i = .25,
            n = i / 2
    }(), ui.getTrackFromPageY = function (t) {
        return waFwk.tracks[Math.floor((t - ui.gridColsY + ui.gridScrollTop) / ui.trackHeight)].userData
    }, ui.panelSection = function (t) {
        ui.dom.app.dataset.panel = t
    }, ui.resize = function () {
        ui.screenWidth = document.body.clientWidth, ui.screenHeight = document.body.clientHeight, ui.gridColsWidth = ui.dom.gridCols.getBoundingClientRect().width, ui.gridColsHeight = ui.dom.tracks.clientHeight, ui.trackLinesWidth = ui.gridColsWidth - ui.trackNamesWidth, ui.timeline.update(), ui.tracksBg.update()
    }, ui.sample = {
        create: function (t) {
            var e = ui.createHTML(Handlebars.templates.gridBlockSample(t.data.gsfile))[0];
            t.data.elSmp = e, t.data.elWave = e.querySelector(".gsuiWaveform"), t.data.elName = e.querySelector(".name"), t.data.elCropStart = e.querySelector(".crop.start"), t.data.elCropEnd = e.querySelector(".crop.end"), t.data.gsuiWaveform = new gsuiWaveform(t.data.elWave), Array.from(e.querySelectorAll("*")).forEach(function (e) {
                e.gsSample = t
            })
        },
        delete: function (t) {
            t.data.elSmp.remove()
        },
        select: function (t) {
            t.data.elSmp.classList.toggle("selected", t.data.selected)
        },
        inTrack: function (t) {
            t.data.track.elColLinesTrack.appendChild(t.data.elSmp)
        },
        when: function (t) {
            t.data.elSmp.style.left = t.when * ui.BPMem + "em"
        },
        duration: function (t) {
            t.data.elSmp.style.width = t.duration * ui.BPMem + "em", ui.sample.waveform(t)
        },
        waveform: function (t) {
            var e = t.wBuffer.buffer;
            if (e) {
                var i = t.offset,
                    n = Math.min(t.duration, e.duration - i),
                    s = n * ui.BPMem,
                    o = t.data.gsuiWaveform,
                    a = e.getChannelData(0),
                    r = e.numberOfChannels < 2 ? a : e.getChannelData(1);
                t.data.elWave.style.width = s + "em", o.setResolution(~~(1024 * n), 128), o.draw(a, r, e.duration, i, n)
            }
        }
    }, ui.selectTool = function () {
        var t;
        return function (e) {
            var i, n = ui.dom.toolBtns.tool[e];
            n !== t && (t && (t.classList.remove("active"), i = ui.tool[ui.currentTool], i.mouseup && i.mouseup({}), i.end && i.end()), t = n, n.classList.add("active"), ui.dom.grid.dataset.tool = ui.currentTool = e, i = ui.tool[e], i.start && i.start())
        }
    }(), ui.setFilesWidth = function (t) {
        ui.dom.panel.style.width = t + "px", ui.filesWidth = t = ui.dom.panel.clientWidth, ui.gridColsWidth = ui.screenWidth - t, ui.trackLinesWidth = ui.gridColsWidth - ui.trackNamesWidth, ui.dom.grid.style.left = t + "px", ui.dom.visual.style.width = ui.dom.menu.style.left = t + ui.trackNamesWidth + "px", ui.timeline.update(), ui.tracksBg.update()
    }, ui.gridScrollTop = 0, ui.setGridScrollTop = function (t) {
        ui.dom.gridCols.scrollTop = ui.gridScrollTop = t <= 0 ? 0 : Math.min(t, waFwk.tracks.length * ui.gridEm - ui.gridColsHeight), ui.updateGridTopShadow()
    }, ui.gridZoom = 1, ui.setGridZoom = function (t, e) {
        t = Math.min(Math.max(1, t), 8);
        var i = t / ui.gridZoom;
        ui.gridZoom = t, ui.gridEm *= i, ui.dom.gridEm.style.fontSize = t + "em", ui.dom.grid.dataset.sampleSize = ui.gridEm < 40 ? "small" : ui.gridEm < 80 ? "medium" : "big", ui.setTrackLinesLeft(e - (-ui.trackLinesLeft + e) * i), ui.timeline.update(), ui.tracksBg.update()
    }, ui.setTrackLinesLeft = function (t) {
        ui.trackLinesLeft = t = Math.min(~~t, 0), ui.dom.tracksLines.style.marginLeft = t / ui.gridEm + "em", ui.updateGridLeftShadow()
    }, ui.trackNamesWidth = 0, ui.setTrackNamesWidth = function (t) {
        var e, i = ui.trackNamesWidth;
        ui.dom.tracksNames.style.width = t + "px", ui.trackNamesWidth = t = ui.dom.tracksNames.getBoundingClientRect().width, ui.trackLinesWidth = ui.gridColsWidth - t, e = ui.filesWidth + t, ui.dom.gridColB.style.left = ui.dom.timeline.style.left = t + "px", ui.dom.visual.style.width = ui.dom.menu.style.left = e + "px", ui.trackLinesLeft < 0 && ui.setTrackLinesLeft(ui.trackLinesLeft - (t - i)), ui.timeline.update(), ui.tracksBg.update()
    },
    function () {
        var t = 2,
            e = "rgba(0,0,0,.3)",
            i = "px " + t + "px " + e;
        ui.updateGridLeftShadow = function () {
            ui.dom.tracksNames.style.boxShadow = ui.trackLinesLeft ? Math.min(2 - ui.trackLinesLeft / 8, 5) + "px 0" + i : "none"
        }, ui.updateGridTopShadow = function () {
            ui.dom.gridHeader.style.boxShadow = ui.gridScrollTop ? "0px " + Math.min(2 + ui.gridScrollTop / 8, 5) + i : "none"
        }
    }(), gs.currentTime = function (t) {
        return arguments.length ? (gs.composition.currentTime(t), t = gs.composition.currentTime(), ui.currentTimeCursor.at(t), void ui.clock.setTime(t)) : gs.composition.currentTime()
    }, gs.reset = function () {
        return delete gs.compositions.current, waFwk.tracks.forEach(function (t) {
            t.userData.editName(""), t.userData.toggle(!0)
        }), gs.composition.samples.forEach(function (t) {
            gs.sample.select(t, !0)
        }), gs.samples.selected.delete(), gs.files.forEach(function (t) {
            t.source.elRoot.remove()
        }), gs.files = [], gs.history.reset(), ui.save.unselectComposition(), this
    }, gs.compositions.init = function () {
        var t = localStorage.compositions;
        (gs.compositions.list = t ? JSON.parse(t) : []).forEach(function (t) {
            ui.save.addComposition(t)
        })
    }, gs.compositions.load = function (t) {
        gs.compositions.current = t, waFwk.do.setBPM(t.bpm), t.files.forEach(gs.file.create), t.tracks.forEach(function (t) {
            for (var e, i = t[0]; i >= waFwk.tracks.length;) waFwk.do.addTrack({});
            e = waFwk.tracks[i].userData, e.toggle(t[1]), e.editName(t[2])
        }), t.samples.forEach(function (t) {
            var e = gs.sample.create(gs.files[t[1]]);
            e.data.gsfile.samplesToSet.push(e), gs.sample.inTrack(e, t[0]), gs.sample.when(e, t[2] / ui.BPMem), gs.sample.slip(e, t[3] / ui.BPMem), gs.sample.duration(e, t[4] / ui.BPMem), gs.composition.add(e)
        }), ui.save.selectComposition(t)
    }, gs.compositions.readFile = function (t) {
        return new Promise(function (e, i) {
            if (t) {
                var n = new FileReader;
                n.onload = function (t) {
                    var i = JSON.parse(t.target.result);
                    gs.compositions.store(i), gs.compositions.load(i), e()
                }, n.readAsText(t)
            } else e()
        })
    }, gs.compositions.saveNewBlocks = function () {
        var reqParam = gs.composition.newSamples.map(function (t) {
            return {
                track: t.data.track.id,
                file: t.data.gsfile.id,
                when: ui.BPMem * t.when,
                slip: ui.BPMem * t.offset,
                duration: ui.BPMem * t.duration
            }
        });

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var response = xmlHttp.responseText;
            }
        }

        xmlHttp.open("POST", '/api/upload/layer', true); // true for asynchronous 

        xmlHttp.setRequestHeader("Content-type", "application/json");

        xmlHttp.send(JSON.stringify(reqParam));

        console.log(JSON.stringify(reqParam));
    },
    gs.compositions.saveCurrent = function () {
        gs.compositions.save(gs.compositions.current)
    },
    gs.compositions.save = function (t) {
        function e(t) {
            gs.compositions.current = t, gs.compositions.serialize(t), gs.compositions.store(t), ui.save.selectComposition(t)
        }
        t ? e(t) : ui.gsuiPopup.open("prompt", "Composition's name", "Please enter a name for your new composition :").then(function (t) {
            t && e({
                name: t.trim()
            })
        })
    },
    gs.compositions.serialize = function (t) {
        t.bpm = waFwk.bpm, t.duration = gs.composition.duration, t.files = gs.files.map(function (t) {
            return [t.id, t.fullname, t.file ? t.file.size : t.size, t.wbuff.buffer ? t.wbuff.buffer.duration : t.bufferDuration]
        }), t.samples = gs.composition.samples.map(function (t) {
            return [t.data.track.id, t.data.gsfile.id, ui.BPMem * t.when, ui.BPMem * t.offset, ui.BPMem * t.duration]
        }), t.tracks = waFwk.tracks.reduce(function (t, e) {
            var i = e.userData;
            return (!i.isOn || i.samples.length || i.name || i.wfilters && i.wfilters.length) && t.push([i.id, i.isOn, i.name]), t
        }, [])
    },
    gs.compositions.store = function (t) {
        var e = gs.compositions.list,
            i = e.findIndex(function (e) {
                return t.id === e.id
            });

        t.id = t.id || common.uuid(), t.name = t.name || "Untitled", i > -1 ? (e[i] = t, ui.save.updateComposition(t)) : (e.push(t), ui.save.addComposition(t)), localStorage.compositions = JSON.stringify(e)
    },
    gs.sample.create = function (t) {
        var e = gs.wctx.createSample(t.wbuff);
        return t.wbuff.buffer || t.wbuff._setDuration(t.bufferDuration), e.data = {
            selected: !1,
            gsfile: t
        }, ++t.nbSamples, t.source.used(), ui.sample.create(e), ui.sample.duration(e), e
    },
    gs.sample.delete = function (t) {
        if (t) {
            var e = t.data;
            e.oldSelected = !!e.selected, gs.sample.select(t, !1), --e.gsfile.nbSamples || e.gsfile.source.unused(), t.stop(), e.track.removeSample(t), gs.composition.remove(t), ui.sample.delete(t)
        }
    },
    gs.sample.duration = function (t, e) {
        t.duration = Math.max(0, Math.min(e, t.bufferDuration)), ui.sample.duration(t)
    },
    gs.sample.inTrack = function (t, e) {
        var i = t.data,
            n = waFwk.tracks[e].userData;
        t.disconnect(), t.connect(n.wfilters), i.track && i.track.removeSample(t), i.track = n, n.samples.push(t), ui.sample.inTrack(t)
    },
    gs.sample.mute = function (t) {
        lg("sample muted (in development)")
    },
    gs.sample.select = function (t, e) {
        t && t.data.selected !== e && ("boolean" != typeof e && (e = !t.data.selected), e ? gs.selectedSamples.push(t) : gs.selectedSamples.splice(gs.selectedSamples.indexOf(t), 1), t.data.selected = e, ui.sample.select(t))
    },
    gs.sample.slip = function (t, e) {
        t.offset = Math.min(t.bufferDuration, Math.max(e, 0)), ui.sample.waveform(t)
    },
    gs.sample.when = function (t, e) {
        t.when = e, ui.sample.when(t)
    },
    gs.samples.selected.do = function (t, e) {
        t && (t.data.selected ? gs.selectedSamples.forEach(e) : e(t))
    },
    gs.samples.selected.min = function (t, e) {
        return t.data.selected ? gs.selectedSamples.reduce(function (t, i) {
            return Math.min(t, e(i))
        }, 1 / 0) : e(t)
    },
    gs.samples.selected.max = function (t, e) {
        return t.data.selected ? gs.selectedSamples.reduce(function (t, i) {
            return Math.max(t, e(i))
        }, -(1 / 0)) : e(t)
    },
    function () {
        gs.samples.selected.copy = function () {
            var i = 1 / 0,
                n = -(1 / 0);
            e = gs.selectedSamples.map(function (t) {
                return i = Math.min(i, t.when), n = Math.max(n, t.when + t.duration), t
            }), ui.isMagnetized && (i = ui.secFloor(i), n = ui.secCeil(n)), t = n - i
        }, gs.samples.selected.paste = function () {
            e.length && (gs.history.pushExec("paste", {
                selected: gs.selectedSamples.slice(),
                allDuration: t,
                copied: e,
                pasted: e.map(function (t) {
                    return gs.sample.create(t.data.gsfile)
                })
            }), gs.samples.selected.copy())
        };
        var t, e = []
    }(), gs.samples.selected.cut = function (t, e) {
        var i = t.data.selected ? gs.selectedSamples.slice() : [t];
        gs.history.pushExec("cut", {
            duration: e - t.when,
            samples: i,
            newSamples: i.map(function (t) {
                return gs.sample.create(t.data.gsfile)
            })
        })
    },
    gs.samples.selected.delete = function () {
        gs.selectedSamples.length && (gs.history.pushExec("delete", {
            samples: gs.selectedSamples.slice()
        }), gs.selectedSamples.length = 0)
    },
    gs.samples.selected.duration = function (t, e) {
        return e = e < 0 ? -Math.min(-e, gs.samples.selected.min(t, function (t) {
            return t.duration
        })) : Math.min(e, gs.samples.selected.min(t, function (t) {
            return t.bufferDuration - t.duration
        })), gs.samples.selected.do(t, function (t) {
            gs.sample.duration(t, t.duration + e)
        }), e
    },
    gs.samples.selected.when = function (t, e) {
        return e < 0 && (e = -Math.min(-e, gs.samples.selected.min(t, function (t) {
            return t.when
        }))), gs.samples.selected.do(t, function (t) {
            gs.sample.when(t, Math.max(0, t.when + e))
        }), e
    },
    gs.samples.selected.slip = function (t, e) {
        return e = e < 0 ? -Math.min(-e, gs.samples.selected.min(t, function (t) {
            return t.bufferDuration - t.offset
        })) : Math.min(e, gs.samples.selected.min(t, function (t) {
            return t.offset
        })), gs.samples.selected.do(t, function (t) {
            gs.sample.slip(t, t.offset - e)
        }), e
    },
    gs.samples.selected.cropEnd = gs.samples.selected.duration,
    gs.samples.selected.cropStart = function (t, e) {
        return e = -gs.samples.selected.duration(t, -e), e && (gs.samples.selected.when(t, e), gs.samples.selected.slip(t, -e)), e
    },
    gs.samples.selected.unselect = function () {
        gs.selectedSamples.forEach(function (t) {
            t.data.selected = !1, ui.sample.select(t)
        }), gs.selectedSamples.length = 0
    },
    document.body.addEventListener("click", function () {
        ui.save.hideList()
    }), ui.dom.clockUnits.onclick = function (t) {
        var e = t.target.className;
        return "s" !== e && "b" !== e || ui.clock.setUnit(gs.clockUnit = e), !1
    },
    function () {
        var t, e = !1,
            i = {
                panel: function (t) {
                    var e = t.pageX;
                    ui.setFilesWidth(e < 35 ? 0 : e)
                },
                trackNames: function (t) {
                    var e = t.pageX - ui.dom.grid.getBoundingClientRect().left;
                    ui.setTrackNamesWidth(e < 35 ? 0 : e)
                }
            };
        Array.from(document.querySelectorAll(".extend")).forEach(function (n) {
            n.onmousedown = function (n) {
                0 === n.button && (e = !0, ui.cursor("app", "col-resize"), t = i[this.dataset.mousemoveFn])
            }
        }), document.body.addEventListener("mouseup", function (t) {
            0 === t.button && e && (e = !1, ui.cursor("app", null))
        }), document.body.addEventListener("mousemove", function (i) {
            e && t(i)
        })
    }(),
    function () {
        function t() {
            o.forEach(function (t) {
                gs.files.some(function (e) {
                    var i = e.file ? e.file.size : e.size;
                    if (e.fullname === t.name && i === t.size) return e.file || gs.file.joinFile(e, t), !0
                }) || gs.file.create(t)
            })
        }

        function e(e) {
            for (var o, a = 0, r = []; o = e[a++];) o.webkitGetAsEntry && (o = o.webkitGetAsEntry()) ? r.push(i(o)) : (o = o.getAsFile()) && (lg("item.getAsFile()", o), n(o));

            Promise.all(r).then(function () {
                gs.compositions.readFile(s).then(function () {
                    t()
                })
            })
        }

        function i(t) {
            return new Promise(function (e) {
                if (t.isFile) t.file(function (t) {
                    n(t), e()
                });
                else if (t.isDirectory) {
                    var s = t.createReader();
                    s.readEntries(function (t) {
                        var n = [];
                        t.forEach(function (t) {
                            n.push(i(t))
                        }), Promise.all(n).then(e)
                    })
                } else e()
            })
        }

        function n(t) {
            switch (/[^.]*.?([^.]*)$/.exec(t.name)[1].toLowerCase()) {
            case "gs":
            case "txt":
            case "json":
                s = t, gs.reset();
                break;
            case "mp3":
            case "mpg":
            case "mpeg":
            case "wav":
            case "wave":
            case "ogg":
                o.push(t)
            }
        }
        var s, o;
        document.body.ondragover = function () {
            return !1
        }, document.body.ondrop = function (i) {
            var a, r = 0,
                l = i && i.dataTransfer;

            if (o = [], s = !1, l.items && l.items.length) e(l.items);
            else {
                for (; a = l.files[r++];) n(a);
                gs.compositions.readFile(s).then(function () {
                    t()
                })
            }
            return !1
        }
    }(),
    function () {
        function t(t) {
            return n.every(function (e) {
                return e === t || !i.contains(e)
            })
        }

        function e(t) {
            i.toggle("used", t), i.toggle("loaded", t), i.toggle("unloaded", t)
        }
        ui.dom.filesFilters.onclick = ui.dom.filesFilters.oncontextmenu = function () {
            return !1
        }, ui.dom.filesFilters.onmouseup = function (n) {
            var s, o = n.target;
            "A" === o.nodeName && (0 === n.button ? i.toggle(o.className) : 2 === n.button && (s = i.contains(o.className) && t(o.className), e(s), s || i.add(o.className)))
        };
        var i = ui.dom.filesFilters.classList,
            n = ["used", "loaded", "unloaded"];
        e(!0)
    }(),
    function () {
        function t() {
            n && (ui.selectTool(n), n = null), e = !1
        }
        ui.px_x = ui.px_y = ui.px_xRel = ui.px_yRel = 0, window.addEventListener("blur", t), ui.dom.gridCols.onwheel = function (t) {
            if ("zoom" === ui.currentTool) return ui.tool.zoom.wheel(t), !1
        }, ui.dom.gridCols.onscroll = function () {
            ui.gridScrollTop = ui.dom.gridCols.scrollTop, ui.updateGridTopShadow()
        }, ui.dom.tracksLines.oncontextmenu = function () {
            return !1
        }, ui.dom.tracksLines.onmousedown = function (t) {
            if (!e) {
                e = !0, i = ui.getGridSec(t.pageX), ui.px_x = t.pageX, ui.px_y = t.pageY, 2 === t.button && (n = ui.currentTool, ui.selectTool("delete"));
                var s = ui.tool[ui.currentTool].mousedown;
                s && s(t)
            }
        }, document.body.onwheel = function (t) {
            if (t.ctrlKey) return !1
        }, document.body.addEventListener("mousemove", function (t) {
            if (e) {
                var n = ui.tool[ui.currentTool].mousemove,
                    s = ui.getGridSec(t.pageX);
                ui.px_xRel = t.pageX - ui.px_x, ui.px_yRel = t.pageY - ui.px_y, ui.px_x = t.pageX, ui.px_y = t.pageY, n && (i += n(t, s - i))
            }
        }), document.body.addEventListener("mouseup", function (i) {
            if (e) {
                var n = ui.tool[ui.currentTool].mouseup;
                n && n(i), t()
            }
        });
        var e, i, n
    }(),
    function () {
        function t(t) {
            i = ui.currentTool, ui.selectTool(t.name)
        }
        function e(e, n) {
            "keydown" === n.type ? t(e) : i && (ui.selectTool(i), i = null)
        }
        keyboardRouter({
            fn: e,
            when: "down,up",
            keys: ["alt"],
            name: "hand"
        }, {
            fn: e,
            when: "down,up",
            keys: ["ctrl"],
            name: "zoom"
        }, {
            fn: e,
            when: "down,up",
            keys: ["shift"],
            name: "select"
        }, {
            fn: t,
            keys: ["z"],
            name: "zoom"
        }, {
            fn: t,
            keys: ["s"],
            name: "slip"
        }, {
            fn: t,
            keys: ["d"],
            name: "delete"
        }, {
            fn: t,
            keys: ["c"],
            name: "cut"
        }, {
            fn: t,
            keys: ["v"],
            name: "select"
        }, {
            fn: t,
            keys: ["b"],
            name: "paint"
        }, {
            fn: t,
            keys: ["h"],
            name: "hand"
        }, {
            fn: gs.playStop,
            keys: [" "]
        }, {
            fn: gs.playPause,
            keys: ["ctrl", " "]
        }, {
            fn: gs.samples.selected.delete,
            keys: ["delete"]
        }, {
            fn: ui.btnMagnet.toggle,
            keys: ["g"]
        }, {
            fn: gs.samples.selected.copy,
            keys: ["ctrl", "c"]
        }, {
            fn: gs.samples.selected.paste,
            keys: ["ctrl", "v"]
        }, {
            fn: gs.history.undo,
            keys: ["ctrl", "z"]
        }, {
            fn: gs.history.redo,
            keys: ["ctrl", "shift", "z"]
        }, {
            fn: gs.compositions.saveNewBlocks,
            keys: ["ctrl", "s"]
        }, {
            fn: gs.numKey,
            keys: ["0"]
        }, {
            fn: gs.numKey,
            keys: ["1"]
        }, {
            fn: gs.numKey,
            keys: ["2"]
        }, {
            fn: gs.numKey,
            keys: ["3"]
        }, {
            fn: gs.numKey,
            keys: ["4"]
        }, {
            fn: gs.numKey,
            keys: ["5"]
        }, {
            fn: gs.numKey,
            keys: ["6"]
        }, {
            fn: gs.numKey,
            keys: ["7"]
        }, {
            fn: gs.numKey,
            keys: ["8"]
        }, {
            fn: gs.numKey,
            keys: ["9"]
        });
        var i
    }(), ui.dom.btnFiles.onclick = ui.panelSection.bind(null, "files"),
    ui.dom.btnHistory.onclick = ui.panelSection.bind(null, "history"),
    window.onresize = ui.resize(),
    ui.dom.toolBtns.tool = {},
    ui.dom.toolBtns.forEach(function (t) {
        ui.dom.toolBtns.tool[t.dataset.tool] = t, t.onclick = ui.selectTool.bind(null, t.dataset.tool)
    }),
    function () {
        ui.tool.cut = {
            mousedown: function (e) {
                t = e.target.gsSample
            },
            mouseup: function (e) {
                t && gs.samples.selected.cut(t, ui.getGridSec(e.pageX)), t = null
            }
        };
        var t
    }(),
    function () {
        function t(t) {
            var i = t.target.gsSample;
            i && (gs.sample.delete(i), e.push(i))
        }
        ui.tool.delete = {
            mousedown: t,
            mousemove: t,
            mouseup: function () {
                e.length && (gs.history.push("delete", {
                    samples: e.slice()
                }), e.length = 0)
            }
        };
        var e = []
    }(), ui.tool.hand = {
        start: function () {
            ui.cursor("grid", "grab")
        },
        end: function () {
            ui.cursor("grid", null)
        },
        mousedown: function () {
            ui.cursor("app", "grabbing")
        },
        mouseup: function () {
            ui.cursor("app", null)
        },
        mousemove: function (t) {
            ui.setTrackLinesLeft(ui.trackLinesLeft + ui.px_xRel), ui.setGridScrollTop(ui.gridScrollTop - ui.px_yRel), ui.timeline.update(), ui.tracksBg.update()
        }
    },
    ui.tool.mute = {},
    function () {
        ui.tool.paint = {
            mousedown: function (l) {
                var u = l.target.gsSample;
                !u && gs.selectedSamples.length ? (gs.history.push("select", {
                    samples: gs.selectedSamples.slice()
                }), gs.samples.selected.unselect()) : u && (e = u.data.track.id, i = u.when, n = u.offset, s = u.duration, a = l.target.classList.contains("start"), o = a || l.target.classList.contains("end"), o ? (r = a ? "crop" : "cropEnd", u.data[a ? "elCropStart" : "elCropEnd"].classList.add("hover")) : r = "move", t = u, ui.cursor("app", o ? a ? "w-resize" : "e-resize" : "grabbing"))
            },
            mouseup: function () {
                t && (gs.samples.selected.do(t, function (t) {
                    gs.composition.update(t, "mv")
                }), o && (t.data[a ? "elCropStart" : "elCropEnd"].classList.remove("hover"), o = a = !1), t.data.track.id === e && t.when === i && t.offset === n && t.duration === s || gs.history.push(r, {
                    sample: t,
                    track: t.data.track.id - e,
                    when: t.when - i,
                    offset: t.offset - n,
                    duration: t.duration - s
                }), t = e = i = n = s = null, ui.cursor("app", null))
            },
            mousemove: function (e, i) {
                if (t) {
                    if (!o) {
                        e = e.target;
                        var n = e.uitrack || e.gsSample && e.gsSample.data.track,
                            s = n && n.id - t.data.track.id;
                        s && (t.data.selected ? (s < 0 && (s = -Math.min(-s, gs.selectedSamples.reduce(function (t, e) {
                            return Math.min(t, e.data.track.id)
                        }, 1 / 0))), gs.selectedSamples.forEach(function (t) {
                            gs.sample.inTrack(t, t.data.track.id + s)
                        })) : gs.sample.inTrack(t, n.id))
                    }
                    return o ? a ? gs.samples.selected.cropStart(t, i) : gs.samples.selected.cropEnd(t, i) : gs.samples.selected.when(t, i)
                }
            }
        };
        var t, e, i, n, s, o, a, r
    }(),
    function () {
        ui.tool.select = {
            mousedown: function (i) {
                var n = i.target.gsSample;
                a = [], i.shiftKey ? n && (a.push(n), gs.sample.select(n)) : (gs.selectedSamples.forEach(function (t) {
                    t !== n && a.push(t)
                }), gs.samples.selected.unselect(), gs.sample.select(n, !0)), t = i.pageX, e = i.pageY, s = !0
                if (n != null) {
                    ui.gsuiPopup.open("info", "Composition's name", '<div style="text-align: center">Number of Votes: 0</br>Sample Author</div><div style="text-align: center"><button type="button" onclick="")">Downvote</button><button type="button" onclick="")">Upvote</button></div>')
                } 
            },
            mouseup: function (t) {
                a && a.length && (gs.history.push("select", {
                    samples: a
                }), a = null), s = o = !1, l.style.width = l.style.height = "0px", l.remove()
            },
            mousemove: function (u) {
                if (s) {
                    var c = u.pageX,
                        d = u.pageY;
                    if (!o && Math.max(Math.abs(c - t), Math.abs(d - e)) > 5 && (++r, o = !0, i = ui.getTrackFromPageY(e).id, n = ui.getGridSec(t), ui.dom.tracksLines.appendChild(l)), o) {
                        var p = ui.getTrackFromPageY(d),
                            f = p ? p.id : 0,
                            m = Math.min(i, f),
                            h = Math.max(i, f),
                            g = Math.max(0, ui.getGridSec(c)),
                            v = Math.min(n, g),
                            w = Math.max(n, g);
                        gs.composition.samples.forEach(function (t) {
                            if (m <= t.data.track.id && t.data.track.id <= h) {
                                var e = t.when,
                                    i = t.duration + e;
                                if (v <= e && e < w || v < i && i <= w || e <= v && w <= i) return void(t.data.selected || (t.data.squareSelected = r, gs.sample.select(t, !0), a.push(t)))
                            }
                            t.data.squareSelected === r && (delete t.data.squareSelected, gs.sample.select(t, !1), a.splice(a.indexOf(t), 1))
                        }), l.style.left = v * ui.BPMem + "em", l.style.width = (w - v) * ui.BPMem + "em", l.style.top = m * ui.trackHeight + "px", l.style.height = (h - m + 1) * ui.trackHeight + "px"
                    }
                }
            }
        };
        var t, e, i, n, s, o, a, r = 0,
            l = ui.createHTML("<div id='squareSelection'>")[0]
    }(),
    function () {
        ui.tool.slip = {
            mousedown: function (i) {
                t = i.target.gsSample, t && (e = t.offset)
            },
            mouseup: function () {
                t && (gs.history.push("slip", {
                    sample: t,
                    offset: e - t.offset
                }), gs.samples.selected.do(t, function (t) {
                    gs.composition.update(t, "mv")
                })), t = null
            },
            mousemove: function (e, i) {
                if (t) return gs.samples.selected.slip(t, i)
            }
        };
        var t, e
    }(),
    function () {
        function t(t, e) {
            ui.setGridZoom(ui.gridZoom * e, t.pageX - ui.filesWidth - ui.trackNamesWidth)
        }
        ui.tool.zoom = {
            start: function () {
                ui.cursor("grid", "zoom-in")
            },
            end: function () {
                ui.cursor("grid", null)
            },
            keydown: function (t) {
                18 === t.keyCode && ui.cursor("grid", "zoom-out")
            },
            keyup: function (t) {
                18 === t.keyCode && ui.cursor("grid", "zoom-in")
            },
            wheel: function (e) {
                t(e, e.deltaY < 0 ? 1.1 : .9)
            },
            mousedown: function (e) {
                0 === e.button && t(e, e.altKey ? .7 : 1.3)
            }
        }
    }(),
    function() {
        for (var i = 0; i < 10; i++) {
            numberInput[i] = {file: null, track: null}
        }
    }(),
    function () {
        gs.wctx = new gswaContext, gs.ctx = gs.wctx.ctx, gs.analyserNode = gs.wctx.ctx.createAnalyser(), gs.analyserNode.fftSize = 256, gs.analyserData = new Uint8Array(gs.analyserNode.frequencyBinCount), gs.composition = gs.wctx.createComposition(), gs.wctx.filters.pushBack(gs.analyserNode), ui.resize(), ui.setFilesWidth(200), ui.setTrackLinesLeft(0), ui.setTrackNamesWidth(125), ui.setGridZoom(1.5, 0), ui.visual.on(), ui.btnMagnet.toggle(!0), ui.tracksBg.update(), ui.timelineLoop.toggle(!1), gs.history.reset(), gs.currentTime(0), gs.compositions.init(), gs.composition.onended(gs.compositionStop), ui.dom.btnFiles.click(), ui.dom.clockUnits.querySelector(".s").click(), ui.dom.menu.querySelector("[data-tool='paint']").click()
    }(),
    function () {
        waFwk.do.setBPM(120);
        for (var t = 0; t < 42; ++t) waFwk.do.addTrack({});
        ui.trackHeight = waFwk.tracks[0].userData.elColNamesTrack.offsetHeight
    }(), "gridsound.github.io" === location.host && (! function (t, e, i, n, s, o, a) {
        t.GoogleAnalyticsObject = s, t[s] = t[s] || function () {
            (t[s].q = t[s].q || []).push(arguments)
        }, t[s].l = 1 * new Date, o = e.createElement(i), a = e.getElementsByTagName(i)[0], o.async = 1, o.src = n, a.parentNode.insertBefore(o, a)
    }(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-418864-6", "auto"), ga("send", "pageview"));