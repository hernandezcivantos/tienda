var Buffer;
!function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).buffer = t()
    }
}(function () {
    return function () {
        return function t(r, e, n) {
            function i(f, u) {
                if (!e[f]) {
                    if (!r[f]) {
                        var s = "function" == typeof require && require;
                        if (!u && s) return s(f, !0);
                        if (o) return o(f, !0);
                        var h = new Error("Cannot find module '" + f + "'");
                        throw h.code = "MODULE_NOT_FOUND", h
                    }
                    var a = e[f] = {exports: {}};
                    r[f][0].call(a.exports, function (t) {
                        return i(r[f][1][t] || t)
                    }, a, a.exports, t, r, e, n)
                }
                return e[f].exports
            }

            for (var o = "function" == typeof require && require, f = 0; f < n.length; f++) i(n[f]);
            return i
        }
    }()({
        1: [function (t, r, e) {
            "use strict";
            e.byteLength = function (t) {
                var r = h(t), e = r[0], n = r[1];
                return 3 * (e + n) / 4 - n
            }, e.toByteArray = function (t) {
                var r, e, n = h(t), f = n[0], u = n[1], s = new o(function (t, r, e) {
                    return 3 * (r + e) / 4 - e
                }(0, f, u)), a = 0, c = u > 0 ? f - 4 : f;
                for (e = 0; e < c; e += 4) r = i[t.charCodeAt(e)] << 18 | i[t.charCodeAt(e + 1)] << 12 | i[t.charCodeAt(e + 2)] << 6 | i[t.charCodeAt(e + 3)], s[a++] = r >> 16 & 255, s[a++] = r >> 8 & 255, s[a++] = 255 & r;
                2 === u && (r = i[t.charCodeAt(e)] << 2 | i[t.charCodeAt(e + 1)] >> 4, s[a++] = 255 & r);
                1 === u && (r = i[t.charCodeAt(e)] << 10 | i[t.charCodeAt(e + 1)] << 4 | i[t.charCodeAt(e + 2)] >> 2, s[a++] = r >> 8 & 255, s[a++] = 255 & r);
                return s
            }, e.fromByteArray = function (t) {
                for (var r, e = t.length, i = e % 3, o = [], f = 0, u = e - i; f < u; f += 16383) o.push(a(t, f, f + 16383 > u ? u : f + 16383));
                1 === i ? (r = t[e - 1], o.push(n[r >> 2] + n[r << 4 & 63] + "==")) : 2 === i && (r = (t[e - 2] << 8) + t[e - 1], o.push(n[r >> 10] + n[r >> 4 & 63] + n[r << 2 & 63] + "="));
                return o.join("")
            };
            for (var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = 0, s = f.length; u < s; ++u) n[u] = f[u], i[f.charCodeAt(u)] = u;

            function h(t) {
                var r = t.length;
                if (r % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var e = t.indexOf("=");
                return -1 === e && (e = r), [e, e === r ? 0 : 4 - e % 4]
            }

            function a(t, r, e) {
                for (var i, o, f = [], u = r; u < e; u += 3) i = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2]), f.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
                return f.join("")
            }

            i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63
        }, {}], 2: [function (t, r, e) {
            (function (r) {
                "use strict";
                var n = t("base64-js"), i = t("ieee754");
                Buffer = e.Buffer = r, e.SlowBuffer = function (t) {
                    +t != t && (t = 0);
                    return r.alloc(+t)
                }, e.INSPECT_MAX_BYTES = 50;
                var o = 2147483647;

                function f(t) {
                    if (t > o) throw new RangeError('The value "' + t + '" is invalid for option "size"');
                    var e = new Uint8Array(t);
                    return e.__proto__ = r.prototype, e
                }

                function r(t, r, e) {
                    if ("number" == typeof t) {
                        if ("string" == typeof r) throw new TypeError('The "string" argument must be of type string. Received type number');
                        return h(t)
                    }
                    return u(t, r, e)
                }

                function u(t, e, n) {
                    if ("string" == typeof t) return function (t, e) {
                        "string" == typeof e && "" !== e || (e = "utf8");
                        if (!r.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
                        var n = 0 | p(t, e), i = f(n), o = i.write(t, e);
                        o !== n && (i = i.slice(0, o));
                        return i
                    }(t, e);
                    if (ArrayBuffer.isView(t)) return a(t);
                    if (null == t) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
                    if (j(t, ArrayBuffer) || t && j(t.buffer, ArrayBuffer)) return function (t, e, n) {
                        if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
                        if (t.byteLength < e + (n || 0)) throw new RangeError('"length" is outside of buffer bounds');
                        var i;
                        i = void 0 === e && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, e) : new Uint8Array(t, e, n);
                        return i.__proto__ = r.prototype, i
                    }(t, e, n);
                    if ("number" == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
                    var i = t.valueOf && t.valueOf();
                    if (null != i && i !== t) return r.from(i, e, n);
                    var o = function (t) {
                        if (r.isBuffer(t)) {
                            var e = 0 | c(t.length), n = f(e);
                            return 0 === n.length ? n : (t.copy(n, 0, 0, e), n)
                        }
                        if (void 0 !== t.length) return "number" != typeof t.length || F(t.length) ? f(0) : a(t);
                        if ("Buffer" === t.type && Array.isArray(t.data)) return a(t.data)
                    }(t);
                    if (o) return o;
                    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return r.from(t[Symbol.toPrimitive]("string"), e, n);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
                }

                function s(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be of type number');
                    if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"')
                }

                function h(t) {
                    return s(t), f(t < 0 ? 0 : 0 | c(t))
                }

                function a(t) {
                    for (var r = t.length < 0 ? 0 : 0 | c(t.length), e = f(r), n = 0; n < r; n += 1) e[n] = 255 & t[n];
                    return e
                }

                function c(t) {
                    if (t >= o) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o.toString(16) + " bytes");
                    return 0 | t
                }

                function p(t, e) {
                    if (r.isBuffer(t)) return t.length;
                    if (ArrayBuffer.isView(t) || j(t, ArrayBuffer)) return t.byteLength;
                    if ("string" != typeof t) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
                    var n = t.length, i = arguments.length > 2 && !0 === arguments[2];
                    if (!i && 0 === n) return 0;
                    for (var o = !1; ;) switch (e) {
                        case"ascii":
                        case"latin1":
                        case"binary":
                            return n;
                        case"utf8":
                        case"utf-8":
                            return P(t).length;
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return 2 * n;
                        case"hex":
                            return n >>> 1;
                        case"base64":
                            return k(t).length;
                        default:
                            if (o) return i ? -1 : P(t).length;
                            e = ("" + e).toLowerCase(), o = !0
                    }
                }

                function l(t, r, e) {
                    var n = t[r];
                    t[r] = t[e], t[e] = n
                }

                function y(t, e, n, i, o) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof n ? (i = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), F(n = +n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                        if (o) return -1;
                        n = t.length - 1
                    } else if (n < 0) {
                        if (!o) return -1;
                        n = 0
                    }
                    if ("string" == typeof e && (e = r.from(e, i)), r.isBuffer(e)) return 0 === e.length ? -1 : g(t, e, n, i, o);
                    if ("number" == typeof e) return e &= 255, "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : g(t, [e], n, i, o);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function g(t, r, e, n, i) {
                    var o, f = 1, u = t.length, s = r.length;
                    if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                        if (t.length < 2 || r.length < 2) return -1;
                        f = 2, u /= 2, s /= 2, e /= 2
                    }

                    function h(t, r) {
                        return 1 === f ? t[r] : t.readUInt16BE(r * f)
                    }

                    if (i) {
                        var a = -1;
                        for (o = e; o < u; o++) if (h(t, o) === h(r, -1 === a ? 0 : o - a)) {
                            if (-1 === a && (a = o), o - a + 1 === s) return a * f
                        } else -1 !== a && (o -= o - a), a = -1
                    } else for (e + s > u && (e = u - s), o = e; o >= 0; o--) {
                        for (var c = !0, p = 0; p < s; p++) if (h(t, o + p) !== h(r, p)) {
                            c = !1;
                            break
                        }
                        if (c) return o
                    }
                    return -1
                }

                function w(t, r, e, n) {
                    e = Number(e) || 0;
                    var i = t.length - e;
                    n ? (n = Number(n)) > i && (n = i) : n = i;
                    var o = r.length;
                    n > o / 2 && (n = o / 2);
                    for (var f = 0; f < n; ++f) {
                        var u = parseInt(r.substr(2 * f, 2), 16);
                        if (F(u)) return f;
                        t[e + f] = u
                    }
                    return f
                }

                function d(t, r, e, n) {
                    return $(P(r, t.length - e), t, e, n)
                }

                function b(t, r, e, n) {
                    return $(function (t) {
                        for (var r = [], e = 0; e < t.length; ++e) r.push(255 & t.charCodeAt(e));
                        return r
                    }(r), t, e, n)
                }

                function m(t, r, e, n) {
                    return b(t, r, e, n)
                }

                function E(t, r, e, n) {
                    return $(k(r), t, e, n)
                }

                function v(t, r, e, n) {
                    return $(function (t, r) {
                        for (var e, n, i, o = [], f = 0; f < t.length && !((r -= 2) < 0); ++f) e = t.charCodeAt(f), n = e >> 8, i = e % 256, o.push(i), o.push(n);
                        return o
                    }(r, t.length - e), t, e, n)
                }

                function B(t, r, e) {
                    return 0 === r && e === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(r, e))
                }

                function A(t, r, e) {
                    e = Math.min(t.length, e);
                    for (var n = [], i = r; i < e;) {
                        var o, f, u, s, h = t[i], a = null, c = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
                        if (i + c <= e) switch (c) {
                            case 1:
                                h < 128 && (a = h);
                                break;
                            case 2:
                                128 == (192 & (o = t[i + 1])) && (s = (31 & h) << 6 | 63 & o) > 127 && (a = s);
                                break;
                            case 3:
                                o = t[i + 1], f = t[i + 2], 128 == (192 & o) && 128 == (192 & f) && (s = (15 & h) << 12 | (63 & o) << 6 | 63 & f) > 2047 && (s < 55296 || s > 57343) && (a = s);
                                break;
                            case 4:
                                o = t[i + 1], f = t[i + 2], u = t[i + 3], 128 == (192 & o) && 128 == (192 & f) && 128 == (192 & u) && (s = (15 & h) << 18 | (63 & o) << 12 | (63 & f) << 6 | 63 & u) > 65535 && s < 1114112 && (a = s)
                        }
                        null === a ? (a = 65533, c = 1) : a > 65535 && (a -= 65536, n.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), n.push(a), i += c
                    }
                    return function (t) {
                        var r = t.length;
                        if (r <= I) return String.fromCharCode.apply(String, t);
                        var e = "", n = 0;
                        for (; n < r;) e += String.fromCharCode.apply(String, t.slice(n, n += I));
                        return e
                    }(n)
                }

                e.kMaxLength = o, r.TYPED_ARRAY_SUPPORT = function () {
                    try {
                        var t = new Uint8Array(1);
                        return t.__proto__ = {
                            __proto__: Uint8Array.prototype, foo: function () {
                                return 42
                            }
                        }, 42 === t.foo()
                    } catch (t) {
                        return !1
                    }
                }(), r.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(r.prototype, "parent", {
                    enumerable: !0,
                    get: function () {
                        if (r.isBuffer(this)) return this.buffer
                    }
                }), Object.defineProperty(r.prototype, "offset", {
                    enumerable: !0, get: function () {
                        if (r.isBuffer(this)) return this.byteOffset
                    }
                }), "undefined" != typeof Symbol && null != Symbol.species && r[Symbol.species] === r && Object.defineProperty(r, Symbol.species, {
                    value: null,
                    configurable: !0,
                    enumerable: !1,
                    writable: !1
                }), r.poolSize = 8192, r.from = function (t, r, e) {
                    return u(t, r, e)
                }, r.prototype.__proto__ = Uint8Array.prototype, r.__proto__ = Uint8Array, r.alloc = function (t, r, e) {
                    return function (t, r, e) {
                        return s(t), t <= 0 ? f(t) : void 0 !== r ? "string" == typeof e ? f(t).fill(r, e) : f(t).fill(r) : f(t)
                    }(t, r, e)
                }, r.allocUnsafe = function (t) {
                    return h(t)
                }, r.allocUnsafeSlow = function (t) {
                    return h(t)
                }, r.isBuffer = function (t) {
                    return null != t && !0 === t._isBuffer && t !== r.prototype
                }, r.compare = function (t, e) {
                    if (j(t, Uint8Array) && (t = r.from(t, t.offset, t.byteLength)), j(e, Uint8Array) && (e = r.from(e, e.offset, e.byteLength)), !r.isBuffer(t) || !r.isBuffer(e)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (t === e) return 0;
                    for (var n = t.length, i = e.length, o = 0, f = Math.min(n, i); o < f; ++o) if (t[o] !== e[o]) {
                        n = t[o], i = e[o];
                        break
                    }
                    return n < i ? -1 : i < n ? 1 : 0
                }, r.isEncoding = function (t) {
                    switch (String(t).toLowerCase()) {
                        case"hex":
                        case"utf8":
                        case"utf-8":
                        case"ascii":
                        case"latin1":
                        case"binary":
                        case"base64":
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, r.concat = function (t, e) {
                    if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return r.alloc(0);
                    var n;
                    if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
                    var i = r.allocUnsafe(e), o = 0;
                    for (n = 0; n < t.length; ++n) {
                        var f = t[n];
                        if (j(f, Uint8Array) && (f = r.from(f)), !r.isBuffer(f)) throw new TypeError('"list" argument must be an Array of Buffers');
                        f.copy(i, o), o += f.length
                    }
                    return i
                }, r.byteLength = p, r.prototype._isBuffer = !0, r.prototype.swap16 = function () {
                    var t = this.length;
                    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var r = 0; r < t; r += 2) l(this, r, r + 1);
                    return this
                }, r.prototype.swap32 = function () {
                    var t = this.length;
                    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var r = 0; r < t; r += 4) l(this, r, r + 3), l(this, r + 1, r + 2);
                    return this
                }, r.prototype.swap64 = function () {
                    var t = this.length;
                    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var r = 0; r < t; r += 8) l(this, r, r + 7), l(this, r + 1, r + 6), l(this, r + 2, r + 5), l(this, r + 3, r + 4);
                    return this
                }, r.prototype.toString = function () {
                    var t = this.length;
                    return 0 === t ? "" : 0 === arguments.length ? A(this, 0, t) : function (t, r, e) {
                        var n = !1;
                        if ((void 0 === r || r < 0) && (r = 0), r > this.length) return "";
                        if ((void 0 === e || e > this.length) && (e = this.length), e <= 0) return "";
                        if ((e >>>= 0) <= (r >>>= 0)) return "";
                        for (t || (t = "utf8"); ;) switch (t) {
                            case"hex":
                                return T(this, r, e);
                            case"utf8":
                            case"utf-8":
                                return A(this, r, e);
                            case"ascii":
                                return U(this, r, e);
                            case"latin1":
                            case"binary":
                                return R(this, r, e);
                            case"base64":
                                return B(this, r, e);
                            case"ucs2":
                            case"ucs-2":
                            case"utf16le":
                            case"utf-16le":
                                return _(this, r, e);
                            default:
                                if (n) throw new TypeError("Unknown encoding: " + t);
                                t = (t + "").toLowerCase(), n = !0
                        }
                    }.apply(this, arguments)
                }, r.prototype.toLocaleString = r.prototype.toString, r.prototype.equals = function (t) {
                    if (!r.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === r.compare(this, t)
                }, r.prototype.inspect = function () {
                    var t = "", r = e.INSPECT_MAX_BYTES;
                    return t = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (t += " ... "), "<Buffer " + t + ">"
                }, r.prototype.compare = function (t, e, n, i, o) {
                    if (j(t, Uint8Array) && (t = r.from(t, t.offset, t.byteLength)), !r.isBuffer(t)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
                    if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === i && (i = 0), void 0 === o && (o = this.length), e < 0 || n > t.length || i < 0 || o > this.length) throw new RangeError("out of range index");
                    if (i >= o && e >= n) return 0;
                    if (i >= o) return -1;
                    if (e >= n) return 1;
                    if (this === t) return 0;
                    for (var f = (o >>>= 0) - (i >>>= 0), u = (n >>>= 0) - (e >>>= 0), s = Math.min(f, u), h = this.slice(i, o), a = t.slice(e, n), c = 0; c < s; ++c) if (h[c] !== a[c]) {
                        f = h[c], u = a[c];
                        break
                    }
                    return f < u ? -1 : u < f ? 1 : 0
                }, r.prototype.includes = function (t, r, e) {
                    return -1 !== this.indexOf(t, r, e)
                }, r.prototype.indexOf = function (t, r, e) {
                    return y(this, t, r, e, !0)
                }, r.prototype.lastIndexOf = function (t, r, e) {
                    return y(this, t, r, e, !1)
                }, r.prototype.write = function (t, r, e, n) {
                    if (void 0 === r) n = "utf8", e = this.length, r = 0; else if (void 0 === e && "string" == typeof r) n = r, e = this.length, r = 0; else {
                        if (!isFinite(r)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        r >>>= 0, isFinite(e) ? (e >>>= 0, void 0 === n && (n = "utf8")) : (n = e, e = void 0)
                    }
                    var i = this.length - r;
                    if ((void 0 === e || e > i) && (e = i), t.length > 0 && (e < 0 || r < 0) || r > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    n || (n = "utf8");
                    for (var o = !1; ;) switch (n) {
                        case"hex":
                            return w(this, t, r, e);
                        case"utf8":
                        case"utf-8":
                            return d(this, t, r, e);
                        case"ascii":
                            return b(this, t, r, e);
                        case"latin1":
                        case"binary":
                            return m(this, t, r, e);
                        case"base64":
                            return E(this, t, r, e);
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return v(this, t, r, e);
                        default:
                            if (o) throw new TypeError("Unknown encoding: " + n);
                            n = ("" + n).toLowerCase(), o = !0
                    }
                }, r.prototype.toJSON = function () {
                    return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
                };
                var I = 4096;

                function U(t, r, e) {
                    var n = "";
                    e = Math.min(t.length, e);
                    for (var i = r; i < e; ++i) n += String.fromCharCode(127 & t[i]);
                    return n
                }

                function R(t, r, e) {
                    var n = "";
                    e = Math.min(t.length, e);
                    for (var i = r; i < e; ++i) n += String.fromCharCode(t[i]);
                    return n
                }

                function T(t, r, e) {
                    var n = t.length;
                    (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
                    for (var i = "", o = r; o < e; ++o) i += N(t[o]);
                    return i
                }

                function _(t, r, e) {
                    for (var n = t.slice(r, e), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                    return i
                }

                function L(t, r, e) {
                    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + r > e) throw new RangeError("Trying to access beyond buffer length")
                }

                function S(t, e, n, i, o, f) {
                    if (!r.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > o || e < f) throw new RangeError('"value" argument is out of bounds');
                    if (n + i > t.length) throw new RangeError("Index out of range")
                }

                function O(t, r, e, n, i, o) {
                    if (e + n > t.length) throw new RangeError("Index out of range");
                    if (e < 0) throw new RangeError("Index out of range")
                }

                function C(t, r, e, n, o) {
                    return r = +r, e >>>= 0, o || O(t, 0, e, 4), i.write(t, r, e, n, 23, 4), e + 4
                }

                function x(t, r, e, n, o) {
                    return r = +r, e >>>= 0, o || O(t, 0, e, 8), i.write(t, r, e, n, 52, 8), e + 8
                }

                r.prototype.slice = function (t, e) {
                    var n = this.length;
                    (t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t);
                    var i = this.subarray(t, e);
                    return i.__proto__ = r.prototype, i
                }, r.prototype.readUIntLE = function (t, r, e) {
                    t >>>= 0, r >>>= 0, e || L(t, r, this.length);
                    for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);) n += this[t + o] * i;
                    return n
                }, r.prototype.readUIntBE = function (t, r, e) {
                    t >>>= 0, r >>>= 0, e || L(t, r, this.length);
                    for (var n = this[t + --r], i = 1; r > 0 && (i *= 256);) n += this[t + --r] * i;
                    return n
                }, r.prototype.readUInt8 = function (t, r) {
                    return t >>>= 0, r || L(t, 1, this.length), this[t]
                }, r.prototype.readUInt16LE = function (t, r) {
                    return t >>>= 0, r || L(t, 2, this.length), this[t] | this[t + 1] << 8
                }, r.prototype.readUInt16BE = function (t, r) {
                    return t >>>= 0, r || L(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, r.prototype.readUInt32LE = function (t, r) {
                    return t >>>= 0, r || L(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }, r.prototype.readUInt32BE = function (t, r) {
                    return t >>>= 0, r || L(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, r.prototype.readIntLE = function (t, r, e) {
                    t >>>= 0, r >>>= 0, e || L(t, r, this.length);
                    for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);) n += this[t + o] * i;
                    return n >= (i *= 128) && (n -= Math.pow(2, 8 * r)), n
                }, r.prototype.readIntBE = function (t, r, e) {
                    t >>>= 0, r >>>= 0, e || L(t, r, this.length);
                    for (var n = r, i = 1, o = this[t + --n]; n > 0 && (i *= 256);) o += this[t + --n] * i;
                    return o >= (i *= 128) && (o -= Math.pow(2, 8 * r)), o
                }, r.prototype.readInt8 = function (t, r) {
                    return t >>>= 0, r || L(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                }, r.prototype.readInt16LE = function (t, r) {
                    t >>>= 0, r || L(t, 2, this.length);
                    var e = this[t] | this[t + 1] << 8;
                    return 32768 & e ? 4294901760 | e : e
                }, r.prototype.readInt16BE = function (t, r) {
                    t >>>= 0, r || L(t, 2, this.length);
                    var e = this[t + 1] | this[t] << 8;
                    return 32768 & e ? 4294901760 | e : e
                }, r.prototype.readInt32LE = function (t, r) {
                    return t >>>= 0, r || L(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, r.prototype.readInt32BE = function (t, r) {
                    return t >>>= 0, r || L(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, r.prototype.readFloatLE = function (t, r) {
                    return t >>>= 0, r || L(t, 4, this.length), i.read(this, t, !0, 23, 4)
                }, r.prototype.readFloatBE = function (t, r) {
                    return t >>>= 0, r || L(t, 4, this.length), i.read(this, t, !1, 23, 4)
                }, r.prototype.readDoubleLE = function (t, r) {
                    return t >>>= 0, r || L(t, 8, this.length), i.read(this, t, !0, 52, 8)
                }, r.prototype.readDoubleBE = function (t, r) {
                    return t >>>= 0, r || L(t, 8, this.length), i.read(this, t, !1, 52, 8)
                }, r.prototype.writeUIntLE = function (t, r, e, n) {
                    (t = +t, r >>>= 0, e >>>= 0, n) || S(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
                    var i = 1, o = 0;
                    for (this[r] = 255 & t; ++o < e && (i *= 256);) this[r + o] = t / i & 255;
                    return r + e
                }, r.prototype.writeUIntBE = function (t, r, e, n) {
                    (t = +t, r >>>= 0, e >>>= 0, n) || S(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
                    var i = e - 1, o = 1;
                    for (this[r + i] = 255 & t; --i >= 0 && (o *= 256);) this[r + i] = t / o & 255;
                    return r + e
                }, r.prototype.writeUInt8 = function (t, r, e) {
                    return t = +t, r >>>= 0, e || S(this, t, r, 1, 255, 0), this[r] = 255 & t, r + 1
                }, r.prototype.writeUInt16LE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || S(this, t, r, 2, 65535, 0), this[r] = 255 & t, this[r + 1] = t >>> 8, r + 2
                }, r.prototype.writeUInt16BE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || S(this, t, r, 2, 65535, 0), this[r] = t >>> 8, this[r + 1] = 255 & t, r + 2
                }, r.prototype.writeUInt32LE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || S(this, t, r, 4, 4294967295, 0), this[r + 3] = t >>> 24, this[r + 2] = t >>> 16, this[r + 1] = t >>> 8, this[r] = 255 & t, r + 4
                }, r.prototype.writeUInt32BE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || S(this, t, r, 4, 4294967295, 0), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t, r + 4
                }, r.prototype.writeIntLE = function (t, r, e, n) {
                    if (t = +t, r >>>= 0, !n) {
                        var i = Math.pow(2, 8 * e - 1);
                        S(this, t, r, e, i - 1, -i)
                    }
                    var o = 0, f = 1, u = 0;
                    for (this[r] = 255 & t; ++o < e && (f *= 256);) t < 0 && 0 === u && 0 !== this[r + o - 1] && (u = 1), this[r + o] = (t / f >> 0) - u & 255;
                    return r + e
                }, r.prototype.writeIntBE = function (t, r, e, n) {
                    if (t = +t, r >>>= 0, !n) {
                        var i = Math.pow(2, 8 * e - 1);
                        S(this, t, r, e, i - 1, -i)
                    }
                    var o = e - 1, f = 1, u = 0;
                    for (this[r + o] = 255 & t; --o >= 0 && (f *= 256);) t < 0 && 0 === u && 0 !== this[r + o + 1] && (u = 1), this[r + o] = (t / f >> 0) - u & 255;
                    return r + e
                }, r.prototype.writeInt8 = function (t, r, e) {
                    return t = +t, r >>>= 0, e || S(this, t, r, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[r] = 255 & t, r + 1
                }, r.prototype.writeInt16LE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || S(this, t, r, 2, 32767, -32768), this[r] = 255 & t, this[r + 1] = t >>> 8, r + 2
                }, r.prototype.writeInt16BE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || S(this, t, r, 2, 32767, -32768), this[r] = t >>> 8, this[r + 1] = 255 & t, r + 2
                }, r.prototype.writeInt32LE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || S(this, t, r, 4, 2147483647, -2147483648), this[r] = 255 & t, this[r + 1] = t >>> 8, this[r + 2] = t >>> 16, this[r + 3] = t >>> 24, r + 4
                }, r.prototype.writeInt32BE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || S(this, t, r, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t, r + 4
                }, r.prototype.writeFloatLE = function (t, r, e) {
                    return C(this, t, r, !0, e)
                }, r.prototype.writeFloatBE = function (t, r, e) {
                    return C(this, t, r, !1, e)
                }, r.prototype.writeDoubleLE = function (t, r, e) {
                    return x(this, t, r, !0, e)
                }, r.prototype.writeDoubleBE = function (t, r, e) {
                    return x(this, t, r, !1, e)
                }, r.prototype.copy = function (t, e, n, i) {
                    if (!r.isBuffer(t)) throw new TypeError("argument should be a Buffer");
                    if (n || (n = 0), i || 0 === i || (i = this.length), e >= t.length && (e = t.length), e || (e = 0), i > 0 && i < n && (i = n), i === n) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (e < 0) throw new RangeError("targetStart out of bounds");
                    if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
                    if (i < 0) throw new RangeError("sourceEnd out of bounds");
                    i > this.length && (i = this.length), t.length - e < i - n && (i = t.length - e + n);
                    var o = i - n;
                    if (this === t && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(e, n, i); else if (this === t && n < e && e < i) for (var f = o - 1; f >= 0; --f) t[f + e] = this[f + n]; else Uint8Array.prototype.set.call(t, this.subarray(n, i), e);
                    return o
                }, r.prototype.fill = function (t, e, n, i) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (i = e, e = 0, n = this.length) : "string" == typeof n && (i = n, n = this.length), void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
                        if ("string" == typeof i && !r.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
                        if (1 === t.length) {
                            var o = t.charCodeAt(0);
                            ("utf8" === i && o < 128 || "latin1" === i) && (t = o)
                        }
                    } else "number" == typeof t && (t &= 255);
                    if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                    if (n <= e) return this;
                    var f;
                    if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t) for (f = e; f < n; ++f) this[f] = t; else {
                        var u = r.isBuffer(t) ? t : r.from(t, i), s = u.length;
                        if (0 === s) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                        for (f = 0; f < n - e; ++f) this[f + e] = u[f % s]
                    }
                    return this
                };
                var M = /[^+\/0-9A-Za-z-_]/g;

                function N(t) {
                    return t < 16 ? "0" + t.toString(16) : t.toString(16)
                }

                function P(t, r) {
                    var e;
                    r = r || 1 / 0;
                    for (var n = t.length, i = null, o = [], f = 0; f < n; ++f) {
                        if ((e = t.charCodeAt(f)) > 55295 && e < 57344) {
                            if (!i) {
                                if (e > 56319) {
                                    (r -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                if (f + 1 === n) {
                                    (r -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                i = e;
                                continue
                            }
                            if (e < 56320) {
                                (r -= 3) > -1 && o.push(239, 191, 189), i = e;
                                continue
                            }
                            e = 65536 + (i - 55296 << 10 | e - 56320)
                        } else i && (r -= 3) > -1 && o.push(239, 191, 189);
                        if (i = null, e < 128) {
                            if ((r -= 1) < 0) break;
                            o.push(e)
                        } else if (e < 2048) {
                            if ((r -= 2) < 0) break;
                            o.push(e >> 6 | 192, 63 & e | 128)
                        } else if (e < 65536) {
                            if ((r -= 3) < 0) break;
                            o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128)
                        } else {
                            if (!(e < 1114112)) throw new Error("Invalid code point");
                            if ((r -= 4) < 0) break;
                            o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e | 128)
                        }
                    }
                    return o
                }

                function k(t) {
                    return n.toByteArray(function (t) {
                        if ((t = (t = t.split("=")[0]).trim().replace(M, "")).length < 2) return "";
                        for (; t.length % 4 != 0;) t += "=";
                        return t
                    }(t))
                }

                function $(t, r, e, n) {
                    for (var i = 0; i < n && !(i + e >= r.length || i >= t.length); ++i) r[i + e] = t[i];
                    return i
                }

                function j(t, r) {
                    return t instanceof r || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === r.name
                }

                function F(t) {
                    return t != t
                }
            }).call(this, t("buffer").Buffer)
        }, {"base64-js": 1, buffer: 2, ieee754: 3}], 3: [function (t, r, e) {
            e.read = function (t, r, e, n, i) {
                var o, f, u = 8 * i - n - 1, s = (1 << u) - 1, h = s >> 1, a = -7, c = e ? i - 1 : 0, p = e ? -1 : 1,
                    l = t[r + c];
                for (c += p, o = l & (1 << -a) - 1, l >>= -a, a += u; a > 0; o = 256 * o + t[r + c], c += p, a -= 8) ;
                for (f = o & (1 << -a) - 1, o >>= -a, a += n; a > 0; f = 256 * f + t[r + c], c += p, a -= 8) ;
                if (0 === o) o = 1 - h; else {
                    if (o === s) return f ? NaN : 1 / 0 * (l ? -1 : 1);
                    f += Math.pow(2, n), o -= h
                }
                return (l ? -1 : 1) * f * Math.pow(2, o - n)
            }, e.write = function (t, r, e, n, i, o) {
                var f, u, s, h = 8 * o - i - 1, a = (1 << h) - 1, c = a >> 1,
                    p = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = n ? 0 : o - 1, y = n ? 1 : -1,
                    g = r < 0 || 0 === r && 1 / r < 0 ? 1 : 0;
                for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (u = isNaN(r) ? 1 : 0, f = a) : (f = Math.floor(Math.log(r) / Math.LN2), r * (s = Math.pow(2, -f)) < 1 && (f--, s *= 2), (r += f + c >= 1 ? p / s : p * Math.pow(2, 1 - c)) * s >= 2 && (f++, s /= 2), f + c >= a ? (u = 0, f = a) : f + c >= 1 ? (u = (r * s - 1) * Math.pow(2, i), f += c) : (u = r * Math.pow(2, c - 1) * Math.pow(2, i), f = 0)); i >= 8; t[e + l] = 255 & u, l += y, u /= 256, i -= 8) ;
                for (f = f << i | u, h += i; h > 0; t[e + l] = 255 & f, l += y, f /= 256, h -= 8) ;
                t[e + l - y] |= 128 * g
            }
        }, {}], 4: [function (t, r, e) {
            (function (r) {
                "use strict";
                const n = t("base64-js"), i = t("ieee754"),
                    o = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
                e.Buffer = r, e.SlowBuffer = function (t) {
                    +t != t && (t = 0);
                    return r.alloc(+t)
                }, e.INSPECT_MAX_BYTES = 50;
                const f = 2147483647;

                function u(t) {
                    if (t > f) throw new RangeError('The value "' + t + '" is invalid for option "size"');
                    const e = new Uint8Array(t);
                    return Object.setPrototypeOf(e, r.prototype), e
                }

                function r(t, r, e) {
                    if ("number" == typeof t) {
                        if ("string" == typeof r) throw new TypeError('The "string" argument must be of type string. Received type number');
                        return a(t)
                    }
                    return s(t, r, e)
                }

                function s(t, e, n) {
                    if ("string" == typeof t) return function (t, e) {
                        "string" == typeof e && "" !== e || (e = "utf8");
                        if (!r.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
                        const n = 0 | y(t, e);
                        let i = u(n);
                        const o = i.write(t, e);
                        o !== n && (i = i.slice(0, o));
                        return i
                    }(t, e);
                    if (ArrayBuffer.isView(t)) return function (t) {
                        if (W(t, Uint8Array)) {
                            const r = new Uint8Array(t);
                            return p(r.buffer, r.byteOffset, r.byteLength)
                        }
                        return c(t)
                    }(t);
                    if (null == t) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
                    if (W(t, ArrayBuffer) || t && W(t.buffer, ArrayBuffer)) return p(t, e, n);
                    if ("undefined" != typeof SharedArrayBuffer && (W(t, SharedArrayBuffer) || t && W(t.buffer, SharedArrayBuffer))) return p(t, e, n);
                    if ("number" == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
                    const i = t.valueOf && t.valueOf();
                    if (null != i && i !== t) return r.from(i, e, n);
                    const o = function (t) {
                        if (r.isBuffer(t)) {
                            const r = 0 | l(t.length), e = u(r);
                            return 0 === e.length ? e : (t.copy(e, 0, 0, r), e)
                        }
                        if (void 0 !== t.length) return "number" != typeof t.length || X(t.length) ? u(0) : c(t);
                        if ("Buffer" === t.type && Array.isArray(t.data)) return c(t.data)
                    }(t);
                    if (o) return o;
                    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return r.from(t[Symbol.toPrimitive]("string"), e, n);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
                }

                function h(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be of type number');
                    if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"')
                }

                function a(t) {
                    return h(t), u(t < 0 ? 0 : 0 | l(t))
                }

                function c(t) {
                    const r = t.length < 0 ? 0 : 0 | l(t.length), e = u(r);
                    for (let n = 0; n < r; n += 1) e[n] = 255 & t[n];
                    return e
                }

                function p(t, e, n) {
                    if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
                    if (t.byteLength < e + (n || 0)) throw new RangeError('"length" is outside of buffer bounds');
                    let i;
                    return i = void 0 === e && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, e) : new Uint8Array(t, e, n), Object.setPrototypeOf(i, r.prototype), i
                }

                function l(t) {
                    if (t >= f) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + f.toString(16) + " bytes");
                    return 0 | t
                }

                function y(t, e) {
                    if (r.isBuffer(t)) return t.length;
                    if (ArrayBuffer.isView(t) || W(t, ArrayBuffer)) return t.byteLength;
                    if ("string" != typeof t) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
                    const n = t.length, i = arguments.length > 2 && !0 === arguments[2];
                    if (!i && 0 === n) return 0;
                    let o = !1;
                    for (; ;) switch (e) {
                        case"ascii":
                        case"latin1":
                        case"binary":
                            return n;
                        case"utf8":
                        case"utf-8":
                            return q(t).length;
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return 2 * n;
                        case"hex":
                            return n >>> 1;
                        case"base64":
                            return G(t).length;
                        default:
                            if (o) return i ? -1 : q(t).length;
                            e = ("" + e).toLowerCase(), o = !0
                    }
                }

                function g(t, r, e) {
                    const n = t[r];
                    t[r] = t[e], t[e] = n
                }

                function w(t, e, n, i, o) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof n ? (i = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), X(n = +n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                        if (o) return -1;
                        n = t.length - 1
                    } else if (n < 0) {
                        if (!o) return -1;
                        n = 0
                    }
                    if ("string" == typeof e && (e = r.from(e, i)), r.isBuffer(e)) return 0 === e.length ? -1 : d(t, e, n, i, o);
                    if ("number" == typeof e) return e &= 255, "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : d(t, [e], n, i, o);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function d(t, r, e, n, i) {
                    let o, f = 1, u = t.length, s = r.length;
                    if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                        if (t.length < 2 || r.length < 2) return -1;
                        f = 2, u /= 2, s /= 2, e /= 2
                    }

                    function h(t, r) {
                        return 1 === f ? t[r] : t.readUInt16BE(r * f)
                    }

                    if (i) {
                        let n = -1;
                        for (o = e; o < u; o++) if (h(t, o) === h(r, -1 === n ? 0 : o - n)) {
                            if (-1 === n && (n = o), o - n + 1 === s) return n * f
                        } else -1 !== n && (o -= o - n), n = -1
                    } else for (e + s > u && (e = u - s), o = e; o >= 0; o--) {
                        let e = !0;
                        for (let n = 0; n < s; n++) if (h(t, o + n) !== h(r, n)) {
                            e = !1;
                            break
                        }
                        if (e) return o
                    }
                    return -1
                }

                function b(t, r, e, n) {
                    e = Number(e) || 0;
                    const i = t.length - e;
                    n ? (n = Number(n)) > i && (n = i) : n = i;
                    const o = r.length;
                    let f;
                    for (n > o / 2 && (n = o / 2), f = 0; f < n; ++f) {
                        const n = parseInt(r.substr(2 * f, 2), 16);
                        if (X(n)) return f;
                        t[e + f] = n
                    }
                    return f
                }

                function m(t, r, e, n) {
                    return V(q(r, t.length - e), t, e, n)
                }

                function E(t, r, e, n) {
                    return V(function (t) {
                        const r = [];
                        for (let e = 0; e < t.length; ++e) r.push(255 & t.charCodeAt(e));
                        return r
                    }(r), t, e, n)
                }

                function v(t, r, e, n) {
                    return V(G(r), t, e, n)
                }

                function B(t, r, e, n) {
                    return V(function (t, r) {
                        let e, n, i;
                        const o = [];
                        for (let f = 0; f < t.length && !((r -= 2) < 0); ++f) e = t.charCodeAt(f), n = e >> 8, i = e % 256, o.push(i), o.push(n);
                        return o
                    }(r, t.length - e), t, e, n)
                }

                function A(t, r, e) {
                    return 0 === r && e === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(r, e))
                }

                function I(t, r, e) {
                    e = Math.min(t.length, e);
                    const n = [];
                    let i = r;
                    for (; i < e;) {
                        const r = t[i];
                        let o = null, f = r > 239 ? 4 : r > 223 ? 3 : r > 191 ? 2 : 1;
                        if (i + f <= e) {
                            let e, n, u, s;
                            switch (f) {
                                case 1:
                                    r < 128 && (o = r);
                                    break;
                                case 2:
                                    128 == (192 & (e = t[i + 1])) && (s = (31 & r) << 6 | 63 & e) > 127 && (o = s);
                                    break;
                                case 3:
                                    e = t[i + 1], n = t[i + 2], 128 == (192 & e) && 128 == (192 & n) && (s = (15 & r) << 12 | (63 & e) << 6 | 63 & n) > 2047 && (s < 55296 || s > 57343) && (o = s);
                                    break;
                                case 4:
                                    e = t[i + 1], n = t[i + 2], u = t[i + 3], 128 == (192 & e) && 128 == (192 & n) && 128 == (192 & u) && (s = (15 & r) << 18 | (63 & e) << 12 | (63 & n) << 6 | 63 & u) > 65535 && s < 1114112 && (o = s)
                            }
                        }
                        null === o ? (o = 65533, f = 1) : o > 65535 && (o -= 65536, n.push(o >>> 10 & 1023 | 55296), o = 56320 | 1023 & o), n.push(o), i += f
                    }
                    return function (t) {
                        const r = t.length;
                        if (r <= U) return String.fromCharCode.apply(String, t);
                        let e = "", n = 0;
                        for (; n < r;) e += String.fromCharCode.apply(String, t.slice(n, n += U));
                        return e
                    }(n)
                }

                e.kMaxLength = f, r.TYPED_ARRAY_SUPPORT = function () {
                    try {
                        const t = new Uint8Array(1), r = {
                            foo: function () {
                                return 42
                            }
                        };
                        return Object.setPrototypeOf(r, Uint8Array.prototype), Object.setPrototypeOf(t, r), 42 === t.foo()
                    } catch (t) {
                        return !1
                    }
                }(), r.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(r.prototype, "parent", {
                    enumerable: !0,
                    get: function () {
                        if (r.isBuffer(this)) return this.buffer
                    }
                }), Object.defineProperty(r.prototype, "offset", {
                    enumerable: !0, get: function () {
                        if (r.isBuffer(this)) return this.byteOffset
                    }
                }), r.poolSize = 8192, r.from = function (t, r, e) {
                    return s(t, r, e)
                }, Object.setPrototypeOf(r.prototype, Uint8Array.prototype), Object.setPrototypeOf(r, Uint8Array), r.alloc = function (t, r, e) {
                    return function (t, r, e) {
                        return h(t), t <= 0 ? u(t) : void 0 !== r ? "string" == typeof e ? u(t).fill(r, e) : u(t).fill(r) : u(t)
                    }(t, r, e)
                }, r.allocUnsafe = function (t) {
                    return a(t)
                }, r.allocUnsafeSlow = function (t) {
                    return a(t)
                }, r.isBuffer = function (t) {
                    return null != t && !0 === t._isBuffer && t !== r.prototype
                }, r.compare = function (t, e) {
                    if (W(t, Uint8Array) && (t = r.from(t, t.offset, t.byteLength)), W(e, Uint8Array) && (e = r.from(e, e.offset, e.byteLength)), !r.isBuffer(t) || !r.isBuffer(e)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (t === e) return 0;
                    let n = t.length, i = e.length;
                    for (let r = 0, o = Math.min(n, i); r < o; ++r) if (t[r] !== e[r]) {
                        n = t[r], i = e[r];
                        break
                    }
                    return n < i ? -1 : i < n ? 1 : 0
                }, r.isEncoding = function (t) {
                    switch (String(t).toLowerCase()) {
                        case"hex":
                        case"utf8":
                        case"utf-8":
                        case"ascii":
                        case"latin1":
                        case"binary":
                        case"base64":
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, r.concat = function (t, e) {
                    if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return r.alloc(0);
                    let n;
                    if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
                    const i = r.allocUnsafe(e);
                    let o = 0;
                    for (n = 0; n < t.length; ++n) {
                        let e = t[n];
                        if (W(e, Uint8Array)) o + e.length > i.length ? (r.isBuffer(e) || (e = r.from(e)), e.copy(i, o)) : Uint8Array.prototype.set.call(i, e, o); else {
                            if (!r.isBuffer(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                            e.copy(i, o)
                        }
                        o += e.length
                    }
                    return i
                }, r.byteLength = y, r.prototype._isBuffer = !0, r.prototype.swap16 = function () {
                    const t = this.length;
                    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (let r = 0; r < t; r += 2) g(this, r, r + 1);
                    return this
                }, r.prototype.swap32 = function () {
                    const t = this.length;
                    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (let r = 0; r < t; r += 4) g(this, r, r + 3), g(this, r + 1, r + 2);
                    return this
                }, r.prototype.swap64 = function () {
                    const t = this.length;
                    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (let r = 0; r < t; r += 8) g(this, r, r + 7), g(this, r + 1, r + 6), g(this, r + 2, r + 5), g(this, r + 3, r + 4);
                    return this
                }, r.prototype.toString = function () {
                    const t = this.length;
                    return 0 === t ? "" : 0 === arguments.length ? I(this, 0, t) : function (t, r, e) {
                        let n = !1;
                        if ((void 0 === r || r < 0) && (r = 0), r > this.length) return "";
                        if ((void 0 === e || e > this.length) && (e = this.length), e <= 0) return "";
                        if ((e >>>= 0) <= (r >>>= 0)) return "";
                        for (t || (t = "utf8"); ;) switch (t) {
                            case"hex":
                                return _(this, r, e);
                            case"utf8":
                            case"utf-8":
                                return I(this, r, e);
                            case"ascii":
                                return R(this, r, e);
                            case"latin1":
                            case"binary":
                                return T(this, r, e);
                            case"base64":
                                return A(this, r, e);
                            case"ucs2":
                            case"ucs-2":
                            case"utf16le":
                            case"utf-16le":
                                return L(this, r, e);
                            default:
                                if (n) throw new TypeError("Unknown encoding: " + t);
                                t = (t + "").toLowerCase(), n = !0
                        }
                    }.apply(this, arguments)
                }, r.prototype.toLocaleString = r.prototype.toString, r.prototype.equals = function (t) {
                    if (!r.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === r.compare(this, t)
                }, r.prototype.inspect = function () {
                    let t = "";
                    const r = e.INSPECT_MAX_BYTES;
                    return t = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (t += " ... "), "<Buffer " + t + ">"
                }, o && (r.prototype[o] = r.prototype.inspect), r.prototype.compare = function (t, e, n, i, o) {
                    if (W(t, Uint8Array) && (t = r.from(t, t.offset, t.byteLength)), !r.isBuffer(t)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
                    if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === i && (i = 0), void 0 === o && (o = this.length), e < 0 || n > t.length || i < 0 || o > this.length) throw new RangeError("out of range index");
                    if (i >= o && e >= n) return 0;
                    if (i >= o) return -1;
                    if (e >= n) return 1;
                    if (this === t) return 0;
                    let f = (o >>>= 0) - (i >>>= 0), u = (n >>>= 0) - (e >>>= 0);
                    const s = Math.min(f, u), h = this.slice(i, o), a = t.slice(e, n);
                    for (let t = 0; t < s; ++t) if (h[t] !== a[t]) {
                        f = h[t], u = a[t];
                        break
                    }
                    return f < u ? -1 : u < f ? 1 : 0
                }, r.prototype.includes = function (t, r, e) {
                    return -1 !== this.indexOf(t, r, e)
                }, r.prototype.indexOf = function (t, r, e) {
                    return w(this, t, r, e, !0)
                }, r.prototype.lastIndexOf = function (t, r, e) {
                    return w(this, t, r, e, !1)
                }, r.prototype.write = function (t, r, e, n) {
                    if (void 0 === r) n = "utf8", e = this.length, r = 0; else if (void 0 === e && "string" == typeof r) n = r, e = this.length, r = 0; else {
                        if (!isFinite(r)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        r >>>= 0, isFinite(e) ? (e >>>= 0, void 0 === n && (n = "utf8")) : (n = e, e = void 0)
                    }
                    const i = this.length - r;
                    if ((void 0 === e || e > i) && (e = i), t.length > 0 && (e < 0 || r < 0) || r > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    n || (n = "utf8");
                    let o = !1;
                    for (; ;) switch (n) {
                        case"hex":
                            return b(this, t, r, e);
                        case"utf8":
                        case"utf-8":
                            return m(this, t, r, e);
                        case"ascii":
                        case"latin1":
                        case"binary":
                            return E(this, t, r, e);
                        case"base64":
                            return v(this, t, r, e);
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return B(this, t, r, e);
                        default:
                            if (o) throw new TypeError("Unknown encoding: " + n);
                            n = ("" + n).toLowerCase(), o = !0
                    }
                }, r.prototype.toJSON = function () {
                    return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
                };
                const U = 4096;

                function R(t, r, e) {
                    let n = "";
                    e = Math.min(t.length, e);
                    for (let i = r; i < e; ++i) n += String.fromCharCode(127 & t[i]);
                    return n
                }

                function T(t, r, e) {
                    let n = "";
                    e = Math.min(t.length, e);
                    for (let i = r; i < e; ++i) n += String.fromCharCode(t[i]);
                    return n
                }

                function _(t, r, e) {
                    const n = t.length;
                    (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
                    let i = "";
                    for (let n = r; n < e; ++n) i += J[t[n]];
                    return i
                }

                function L(t, r, e) {
                    const n = t.slice(r, e);
                    let i = "";
                    for (let t = 0; t < n.length - 1; t += 2) i += String.fromCharCode(n[t] + 256 * n[t + 1]);
                    return i
                }

                function S(t, r, e) {
                    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + r > e) throw new RangeError("Trying to access beyond buffer length")
                }

                function O(t, e, n, i, o, f) {
                    if (!r.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > o || e < f) throw new RangeError('"value" argument is out of bounds');
                    if (n + i > t.length) throw new RangeError("Index out of range")
                }

                function C(t, r, e, n, i) {
                    F(r, n, i, t, e, 7);
                    let o = Number(r & BigInt(4294967295));
                    t[e++] = o, o >>= 8, t[e++] = o, o >>= 8, t[e++] = o, o >>= 8, t[e++] = o;
                    let f = Number(r >> BigInt(32) & BigInt(4294967295));
                    return t[e++] = f, f >>= 8, t[e++] = f, f >>= 8, t[e++] = f, f >>= 8, t[e++] = f, e
                }

                function x(t, r, e, n, i) {
                    F(r, n, i, t, e, 7);
                    let o = Number(r & BigInt(4294967295));
                    t[e + 7] = o, o >>= 8, t[e + 6] = o, o >>= 8, t[e + 5] = o, o >>= 8, t[e + 4] = o;
                    let f = Number(r >> BigInt(32) & BigInt(4294967295));
                    return t[e + 3] = f, f >>= 8, t[e + 2] = f, f >>= 8, t[e + 1] = f, f >>= 8, t[e] = f, e + 8
                }

                function M(t, r, e, n, i, o) {
                    if (e + n > t.length) throw new RangeError("Index out of range");
                    if (e < 0) throw new RangeError("Index out of range")
                }

                function N(t, r, e, n, o) {
                    return r = +r, e >>>= 0, o || M(t, 0, e, 4), i.write(t, r, e, n, 23, 4), e + 4
                }

                function P(t, r, e, n, o) {
                    return r = +r, e >>>= 0, o || M(t, 0, e, 8), i.write(t, r, e, n, 52, 8), e + 8
                }

                r.prototype.slice = function (t, e) {
                    const n = this.length;
                    (t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t);
                    const i = this.subarray(t, e);
                    return Object.setPrototypeOf(i, r.prototype), i
                }, r.prototype.readUintLE = r.prototype.readUIntLE = function (t, r, e) {
                    t >>>= 0, r >>>= 0, e || S(t, r, this.length);
                    let n = this[t], i = 1, o = 0;
                    for (; ++o < r && (i *= 256);) n += this[t + o] * i;
                    return n
                }, r.prototype.readUintBE = r.prototype.readUIntBE = function (t, r, e) {
                    t >>>= 0, r >>>= 0, e || S(t, r, this.length);
                    let n = this[t + --r], i = 1;
                    for (; r > 0 && (i *= 256);) n += this[t + --r] * i;
                    return n
                }, r.prototype.readUint8 = r.prototype.readUInt8 = function (t, r) {
                    return t >>>= 0, r || S(t, 1, this.length), this[t]
                }, r.prototype.readUint16LE = r.prototype.readUInt16LE = function (t, r) {
                    return t >>>= 0, r || S(t, 2, this.length), this[t] | this[t + 1] << 8
                }, r.prototype.readUint16BE = r.prototype.readUInt16BE = function (t, r) {
                    return t >>>= 0, r || S(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, r.prototype.readUint32LE = r.prototype.readUInt32LE = function (t, r) {
                    return t >>>= 0, r || S(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }, r.prototype.readUint32BE = r.prototype.readUInt32BE = function (t, r) {
                    return t >>>= 0, r || S(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, r.prototype.readBigUInt64LE = Z(function (t) {
                    z(t >>>= 0, "offset");
                    const r = this[t], e = this[t + 7];
                    void 0 !== r && void 0 !== e || D(t, this.length - 8);
                    const n = r + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24,
                        i = this[++t] + 256 * this[++t] + 65536 * this[++t] + e * 2 ** 24;
                    return BigInt(n) + (BigInt(i) << BigInt(32))
                }), r.prototype.readBigUInt64BE = Z(function (t) {
                    z(t >>>= 0, "offset");
                    const r = this[t], e = this[t + 7];
                    void 0 !== r && void 0 !== e || D(t, this.length - 8);
                    const n = r * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t],
                        i = this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + e;
                    return (BigInt(n) << BigInt(32)) + BigInt(i)
                }), r.prototype.readIntLE = function (t, r, e) {
                    t >>>= 0, r >>>= 0, e || S(t, r, this.length);
                    let n = this[t], i = 1, o = 0;
                    for (; ++o < r && (i *= 256);) n += this[t + o] * i;
                    return n >= (i *= 128) && (n -= Math.pow(2, 8 * r)), n
                }, r.prototype.readIntBE = function (t, r, e) {
                    t >>>= 0, r >>>= 0, e || S(t, r, this.length);
                    let n = r, i = 1, o = this[t + --n];
                    for (; n > 0 && (i *= 256);) o += this[t + --n] * i;
                    return o >= (i *= 128) && (o -= Math.pow(2, 8 * r)), o
                }, r.prototype.readInt8 = function (t, r) {
                    return t >>>= 0, r || S(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                }, r.prototype.readInt16LE = function (t, r) {
                    t >>>= 0, r || S(t, 2, this.length);
                    const e = this[t] | this[t + 1] << 8;
                    return 32768 & e ? 4294901760 | e : e
                }, r.prototype.readInt16BE = function (t, r) {
                    t >>>= 0, r || S(t, 2, this.length);
                    const e = this[t + 1] | this[t] << 8;
                    return 32768 & e ? 4294901760 | e : e
                }, r.prototype.readInt32LE = function (t, r) {
                    return t >>>= 0, r || S(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, r.prototype.readInt32BE = function (t, r) {
                    return t >>>= 0, r || S(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, r.prototype.readBigInt64LE = Z(function (t) {
                    z(t >>>= 0, "offset");
                    const r = this[t], e = this[t + 7];
                    void 0 !== r && void 0 !== e || D(t, this.length - 8);
                    const n = this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (e << 24);
                    return (BigInt(n) << BigInt(32)) + BigInt(r + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24)
                }), r.prototype.readBigInt64BE = Z(function (t) {
                    z(t >>>= 0, "offset");
                    const r = this[t], e = this[t + 7];
                    void 0 !== r && void 0 !== e || D(t, this.length - 8);
                    const n = (r << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
                    return (BigInt(n) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + e)
                }), r.prototype.readFloatLE = function (t, r) {
                    return t >>>= 0, r || S(t, 4, this.length), i.read(this, t, !0, 23, 4)
                }, r.prototype.readFloatBE = function (t, r) {
                    return t >>>= 0, r || S(t, 4, this.length), i.read(this, t, !1, 23, 4)
                }, r.prototype.readDoubleLE = function (t, r) {
                    return t >>>= 0, r || S(t, 8, this.length), i.read(this, t, !0, 52, 8)
                }, r.prototype.readDoubleBE = function (t, r) {
                    return t >>>= 0, r || S(t, 8, this.length), i.read(this, t, !1, 52, 8)
                }, r.prototype.writeUintLE = r.prototype.writeUIntLE = function (t, r, e, n) {
                    if (t = +t, r >>>= 0, e >>>= 0, !n) {
                        O(this, t, r, e, Math.pow(2, 8 * e) - 1, 0)
                    }
                    let i = 1, o = 0;
                    for (this[r] = 255 & t; ++o < e && (i *= 256);) this[r + o] = t / i & 255;
                    return r + e
                }, r.prototype.writeUintBE = r.prototype.writeUIntBE = function (t, r, e, n) {
                    if (t = +t, r >>>= 0, e >>>= 0, !n) {
                        O(this, t, r, e, Math.pow(2, 8 * e) - 1, 0)
                    }
                    let i = e - 1, o = 1;
                    for (this[r + i] = 255 & t; --i >= 0 && (o *= 256);) this[r + i] = t / o & 255;
                    return r + e
                }, r.prototype.writeUint8 = r.prototype.writeUInt8 = function (t, r, e) {
                    return t = +t, r >>>= 0, e || O(this, t, r, 1, 255, 0), this[r] = 255 & t, r + 1
                }, r.prototype.writeUint16LE = r.prototype.writeUInt16LE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || O(this, t, r, 2, 65535, 0), this[r] = 255 & t, this[r + 1] = t >>> 8, r + 2
                }, r.prototype.writeUint16BE = r.prototype.writeUInt16BE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || O(this, t, r, 2, 65535, 0), this[r] = t >>> 8, this[r + 1] = 255 & t, r + 2
                }, r.prototype.writeUint32LE = r.prototype.writeUInt32LE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || O(this, t, r, 4, 4294967295, 0), this[r + 3] = t >>> 24, this[r + 2] = t >>> 16, this[r + 1] = t >>> 8, this[r] = 255 & t, r + 4
                }, r.prototype.writeUint32BE = r.prototype.writeUInt32BE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || O(this, t, r, 4, 4294967295, 0), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t, r + 4
                }, r.prototype.writeBigUInt64LE = Z(function (t, r = 0) {
                    return C(this, t, r, BigInt(0), BigInt("0xffffffffffffffff"))
                }), r.prototype.writeBigUInt64BE = Z(function (t, r = 0) {
                    return x(this, t, r, BigInt(0), BigInt("0xffffffffffffffff"))
                }), r.prototype.writeIntLE = function (t, r, e, n) {
                    if (t = +t, r >>>= 0, !n) {
                        const n = Math.pow(2, 8 * e - 1);
                        O(this, t, r, e, n - 1, -n)
                    }
                    let i = 0, o = 1, f = 0;
                    for (this[r] = 255 & t; ++i < e && (o *= 256);) t < 0 && 0 === f && 0 !== this[r + i - 1] && (f = 1), this[r + i] = (t / o >> 0) - f & 255;
                    return r + e
                }, r.prototype.writeIntBE = function (t, r, e, n) {
                    if (t = +t, r >>>= 0, !n) {
                        const n = Math.pow(2, 8 * e - 1);
                        O(this, t, r, e, n - 1, -n)
                    }
                    let i = e - 1, o = 1, f = 0;
                    for (this[r + i] = 255 & t; --i >= 0 && (o *= 256);) t < 0 && 0 === f && 0 !== this[r + i + 1] && (f = 1), this[r + i] = (t / o >> 0) - f & 255;
                    return r + e
                }, r.prototype.writeInt8 = function (t, r, e) {
                    return t = +t, r >>>= 0, e || O(this, t, r, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[r] = 255 & t, r + 1
                }, r.prototype.writeInt16LE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || O(this, t, r, 2, 32767, -32768), this[r] = 255 & t, this[r + 1] = t >>> 8, r + 2
                }, r.prototype.writeInt16BE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || O(this, t, r, 2, 32767, -32768), this[r] = t >>> 8, this[r + 1] = 255 & t, r + 2
                }, r.prototype.writeInt32LE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || O(this, t, r, 4, 2147483647, -2147483648), this[r] = 255 & t, this[r + 1] = t >>> 8, this[r + 2] = t >>> 16, this[r + 3] = t >>> 24, r + 4
                }, r.prototype.writeInt32BE = function (t, r, e) {
                    return t = +t, r >>>= 0, e || O(this, t, r, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t, r + 4
                }, r.prototype.writeBigInt64LE = Z(function (t, r = 0) {
                    return C(this, t, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
                }), r.prototype.writeBigInt64BE = Z(function (t, r = 0) {
                    return x(this, t, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
                }), r.prototype.writeFloatLE = function (t, r, e) {
                    return N(this, t, r, !0, e)
                }, r.prototype.writeFloatBE = function (t, r, e) {
                    return N(this, t, r, !1, e)
                }, r.prototype.writeDoubleLE = function (t, r, e) {
                    return P(this, t, r, !0, e)
                }, r.prototype.writeDoubleBE = function (t, r, e) {
                    return P(this, t, r, !1, e)
                }, r.prototype.copy = function (t, e, n, i) {
                    if (!r.isBuffer(t)) throw new TypeError("argument should be a Buffer");
                    if (n || (n = 0), i || 0 === i || (i = this.length), e >= t.length && (e = t.length), e || (e = 0), i > 0 && i < n && (i = n), i === n) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (e < 0) throw new RangeError("targetStart out of bounds");
                    if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
                    if (i < 0) throw new RangeError("sourceEnd out of bounds");
                    i > this.length && (i = this.length), t.length - e < i - n && (i = t.length - e + n);
                    const o = i - n;
                    return this === t && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e, n, i) : Uint8Array.prototype.set.call(t, this.subarray(n, i), e), o
                }, r.prototype.fill = function (t, e, n, i) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (i = e, e = 0, n = this.length) : "string" == typeof n && (i = n, n = this.length), void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
                        if ("string" == typeof i && !r.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
                        if (1 === t.length) {
                            const r = t.charCodeAt(0);
                            ("utf8" === i && r < 128 || "latin1" === i) && (t = r)
                        }
                    } else "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
                    if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                    if (n <= e) return this;
                    let o;
                    if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t) for (o = e; o < n; ++o) this[o] = t; else {
                        const f = r.isBuffer(t) ? t : r.from(t, i), u = f.length;
                        if (0 === u) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                        for (o = 0; o < n - e; ++o) this[o + e] = f[o % u]
                    }
                    return this
                };
                const k = {};

                function $(t, r, e) {
                    k[t] = class extends e {
                        constructor() {
                            super(), Object.defineProperty(this, "message", {
                                value: r.apply(this, arguments),
                                writable: !0,
                                configurable: !0
                            }), this.name = `${this.name} [${t}]`, this.stack, delete this.name
                        }

                        get code() {
                            return t
                        }

                        set code(t) {
                            Object.defineProperty(this, "code", {
                                configurable: !0,
                                enumerable: !0,
                                value: t,
                                writable: !0
                            })
                        }

                        toString() {
                            return `${this.name} [${t}]: ${this.message}`
                        }
                    }
                }

                function j(t) {
                    let r = "", e = t.length;
                    const n = "-" === t[0] ? 1 : 0;
                    for (; e >= n + 4; e -= 3) r = `_${t.slice(e - 3, e)}${r}`;
                    return `${t.slice(0, e)}${r}`
                }

                function F(t, r, e, n, i, o) {
                    if (t > e || t < r) {
                        const n = "bigint" == typeof r ? "n" : "";
                        let i;
                        throw i = o > 3 ? 0 === r || r === BigInt(0) ? `>= 0${n} and < 2${n} ** ${8 * (o + 1)}${n}` : `>= -(2${n} ** ${8 * (o + 1) - 1}${n}) and < 2 ** ` + `${8 * (o + 1) - 1}${n}` : `>= ${r}${n} and <= ${e}${n}`, new k.ERR_OUT_OF_RANGE("value", i, t)
                    }
                    !function (t, r, e) {
                        z(r, "offset"), void 0 !== t[r] && void 0 !== t[r + e] || D(r, t.length - (e + 1))
                    }(n, i, o)
                }

                function z(t, r) {
                    if ("number" != typeof t) throw new k.ERR_INVALID_ARG_TYPE(r, "number", t)
                }

                function D(t, r, e) {
                    if (Math.floor(t) !== t) throw z(t, e), new k.ERR_OUT_OF_RANGE(e || "offset", "an integer", t);
                    if (r < 0) throw new k.ERR_BUFFER_OUT_OF_BOUNDS;
                    throw new k.ERR_OUT_OF_RANGE(e || "offset", `>= ${e ? 1 : 0} and <= ${r}`, t)
                }

                $("ERR_BUFFER_OUT_OF_BOUNDS", function (t) {
                    return t ? `${t} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
                }, RangeError), $("ERR_INVALID_ARG_TYPE", function (t, r) {
                    return `The "${t}" argument must be of type number. Received type ${typeof r}`
                }, TypeError), $("ERR_OUT_OF_RANGE", function (t, r, e) {
                    let n = `The value of "${t}" is out of range.`, i = e;
                    return Number.isInteger(e) && Math.abs(e) > 2 ** 32 ? i = j(String(e)) : "bigint" == typeof e && (i = String(e), (e > BigInt(2) ** BigInt(32) || e < -(BigInt(2) ** BigInt(32))) && (i = j(i)), i += "n"), n += ` It must be ${r}. Received ${i}`
                }, RangeError);
                const Y = /[^+\/0-9A-Za-z-_]/g;

                function q(t, r) {
                    let e;
                    r = r || 1 / 0;
                    const n = t.length;
                    let i = null;
                    const o = [];
                    for (let f = 0; f < n; ++f) {
                        if ((e = t.charCodeAt(f)) > 55295 && e < 57344) {
                            if (!i) {
                                if (e > 56319) {
                                    (r -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                if (f + 1 === n) {
                                    (r -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                i = e;
                                continue
                            }
                            if (e < 56320) {
                                (r -= 3) > -1 && o.push(239, 191, 189), i = e;
                                continue
                            }
                            e = 65536 + (i - 55296 << 10 | e - 56320)
                        } else i && (r -= 3) > -1 && o.push(239, 191, 189);
                        if (i = null, e < 128) {
                            if ((r -= 1) < 0) break;
                            o.push(e)
                        } else if (e < 2048) {
                            if ((r -= 2) < 0) break;
                            o.push(e >> 6 | 192, 63 & e | 128)
                        } else if (e < 65536) {
                            if ((r -= 3) < 0) break;
                            o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128)
                        } else {
                            if (!(e < 1114112)) throw new Error("Invalid code point");
                            if ((r -= 4) < 0) break;
                            o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e | 128)
                        }
                    }
                    return o
                }

                function G(t) {
                    return n.toByteArray(function (t) {
                        if ((t = (t = t.split("=")[0]).trim().replace(Y, "")).length < 2) return "";
                        for (; t.length % 4 != 0;) t += "=";
                        return t
                    }(t))
                }

                function V(t, r, e, n) {
                    let i;
                    for (i = 0; i < n && !(i + e >= r.length || i >= t.length); ++i) r[i + e] = t[i];
                    return i
                }

                function W(t, r) {
                    return t instanceof r || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === r.name
                }

                function X(t) {
                    return t != t
                }

                const J = function () {
                    const t = new Array(256);
                    for (let r = 0; r < 16; ++r) {
                        const e = 16 * r;
                        for (let n = 0; n < 16; ++n) t[e + n] = "0123456789abcdef"[r] + "0123456789abcdef"[n]
                    }
                    return t
                }();

                function Z(t) {
                    return "undefined" == typeof BigInt ? H : t
                }

                function H() {
                    throw new Error("BigInt not supported")
                }
            }).call(this, t("buffer").Buffer)
        }, {"base64-js": 5, buffer: 2, ieee754: 6}], 5: [function (t, r, e) {
            "use strict";
            e.byteLength = function (t) {
                var r = h(t), e = r[0], n = r[1];
                return 3 * (e + n) / 4 - n
            }, e.toByteArray = function (t) {
                var r, e, n = h(t), f = n[0], u = n[1], s = new o(function (t, r, e) {
                    return 3 * (r + e) / 4 - e
                }(0, f, u)), a = 0, c = u > 0 ? f - 4 : f;
                for (e = 0; e < c; e += 4) r = i[t.charCodeAt(e)] << 18 | i[t.charCodeAt(e + 1)] << 12 | i[t.charCodeAt(e + 2)] << 6 | i[t.charCodeAt(e + 3)], s[a++] = r >> 16 & 255, s[a++] = r >> 8 & 255, s[a++] = 255 & r;
                2 === u && (r = i[t.charCodeAt(e)] << 2 | i[t.charCodeAt(e + 1)] >> 4, s[a++] = 255 & r);
                1 === u && (r = i[t.charCodeAt(e)] << 10 | i[t.charCodeAt(e + 1)] << 4 | i[t.charCodeAt(e + 2)] >> 2, s[a++] = r >> 8 & 255, s[a++] = 255 & r);
                return s
            }, e.fromByteArray = function (t) {
                for (var r, e = t.length, i = e % 3, o = [], f = 0, u = e - i; f < u; f += 16383) o.push(a(t, f, f + 16383 > u ? u : f + 16383));
                1 === i ? (r = t[e - 1], o.push(n[r >> 2] + n[r << 4 & 63] + "==")) : 2 === i && (r = (t[e - 2] << 8) + t[e - 1], o.push(n[r >> 10] + n[r >> 4 & 63] + n[r << 2 & 63] + "="));
                return o.join("")
            };
            for (var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = 0, s = f.length; u < s; ++u) n[u] = f[u], i[f.charCodeAt(u)] = u;

            function h(t) {
                var r = t.length;
                if (r % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var e = t.indexOf("=");
                return -1 === e && (e = r), [e, e === r ? 0 : 4 - e % 4]
            }

            function a(t, r, e) {
                for (var i, o, f = [], u = r; u < e; u += 3) i = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2]), f.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
                return f.join("")
            }

            i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63
        }, {}], 6: [function (t, r, e) {
            e.read = function (t, r, e, n, i) {
                var o, f, u = 8 * i - n - 1, s = (1 << u) - 1, h = s >> 1, a = -7, c = e ? i - 1 : 0, p = e ? -1 : 1,
                    l = t[r + c];
                for (c += p, o = l & (1 << -a) - 1, l >>= -a, a += u; a > 0; o = 256 * o + t[r + c], c += p, a -= 8) ;
                for (f = o & (1 << -a) - 1, o >>= -a, a += n; a > 0; f = 256 * f + t[r + c], c += p, a -= 8) ;
                if (0 === o) o = 1 - h; else {
                    if (o === s) return f ? NaN : 1 / 0 * (l ? -1 : 1);
                    f += Math.pow(2, n), o -= h
                }
                return (l ? -1 : 1) * f * Math.pow(2, o - n)
            }, e.write = function (t, r, e, n, i, o) {
                var f, u, s, h = 8 * o - i - 1, a = (1 << h) - 1, c = a >> 1,
                    p = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = n ? 0 : o - 1, y = n ? 1 : -1,
                    g = r < 0 || 0 === r && 1 / r < 0 ? 1 : 0;
                for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (u = isNaN(r) ? 1 : 0, f = a) : (f = Math.floor(Math.log(r) / Math.LN2), r * (s = Math.pow(2, -f)) < 1 && (f--, s *= 2), (r += f + c >= 1 ? p / s : p * Math.pow(2, 1 - c)) * s >= 2 && (f++, s /= 2), f + c >= a ? (u = 0, f = a) : f + c >= 1 ? (u = (r * s - 1) * Math.pow(2, i), f += c) : (u = r * Math.pow(2, c - 1) * Math.pow(2, i), f = 0)); i >= 8; t[e + l] = 255 & u, l += y, u /= 256, i -= 8) ;
                for (f = f << i | u, h += i; h > 0; t[e + l] = 255 & f, l += y, f /= 256, h -= 8) ;
                t[e + l - y] |= 128 * g
            }
        }, {}]
    }, {}, [4])(4)
});

/*!
 * Library to detect file mime type of a Uint8Array.
 *
 * Modified from https://github.com/sindresorhus/file-type to be used standalone on browser based apps.
 *
 * This library requires Node "buffer" module as a pre-requisite. The "buffer" module is made available in this repo
 * for standalone use via the `buffer.js` script which needs to be loaded before this file on the page.
 *
 * Author: Kartik Visweswaran, Krajee.com
*/
var KrajeeFileTypeConfig = {
    minimumBytes: 4100, defaultMessages: "End-Of-Stream", tarHeaderChecksumMatches: function (e, i = 0) {
        var t = Number.parseInt(e.toString("utf8", 148, 154).replace(/\0.*$/, "").trim(), 8);
        if (Number.isNaN(t)) return !1;
        var $ = 256;
        for (let r = i; r < i + 148; r++) $ += e[r];
        for (let x = i + 156; x < i + 512; x++) $ += e[x];
        return t === $
    }, uint32SyncSafeToken: {
        get: function (e, i) {
            return 127 & e[i + 3] | e[i + 2] << 7 | e[i + 1] << 14 | e[i] << 21
        }, len: 4
    }, dv: function (e) {
        return new DataView(e.buffer, e.byteOffset)
    }, Token: {
        UINT8: {
            len: 1, get: function (e, i) {
                return KrajeeFileTypeConfig.dv(e).getUint8(i)
            }, put: function (e, i, t) {
                return KrajeeFileTypeConfig.dv(e).setUint8(i, t), i + 1
            }
        }, UINT16_LE: {
            len: 2, get: function (e, i) {
                return KrajeeFileTypeConfig.dv(e).getUint16(i, !0)
            }, put: function (e, i, t) {
                return KrajeeFileTypeConfig.dv(e).setUint16(i, t, !0), i + 2
            }
        }, UINT16_BE: {
            len: 2, get: function (e, i) {
                return KrajeeFileTypeConfig.dv(e).getUint16(i)
            }, put: function (e, i, t) {
                return KrajeeFileTypeConfig.dv(e).setUint16(i, t), i + 2
            }
        }, INT32_BE: {
            len: 4, get: function (e, i) {
                return KrajeeFileTypeConfig.dv(e).getInt32(i)
            }, put: function (e, i, t) {
                return KrajeeFileTypeConfig.dv(e).setInt32(i, t), i + 4
            }
        }, UINT32_LE: {
            len: 4, get: function (e, i) {
                return KrajeeFileTypeConfig.dv(e).getUint32(i, !0)
            }, put: function (e, i, t) {
                return KrajeeFileTypeConfig.dv(e).setUint32(i, t, !0), i + 4
            }
        }, UINT32_BE: {
            len: 4, get: function (e, i) {
                return KrajeeFileTypeConfig.dv(e).getUint32(i)
            }, put: function (e, i, t) {
                return KrajeeFileTypeConfig.dv(e).setUint32(i, t), i + 4
            }
        }, UINT64_LE: {
            len: 8, get: function (e, i) {
                return KrajeeFileTypeConfig.dv(e).getBigUint64(i, !0)
            }, put: function (e, i, t) {
                return KrajeeFileTypeConfig.dv(e).setBigUint64(i, t, !0), i + 8
            }
        }, UINT64_BE: {
            len: 8, get: function (e, i) {
                return KrajeeFileTypeConfig.dv(e).getBigUint64(i)
            }, put: function (e, i, t) {
                return KrajeeFileTypeConfig.dv(e).setBigUint64(i, t), i + 8
            }
        }
    }
};

class EndOfStreamError extends Error {
    constructor() {
        super(KrajeeFileTypeConfig.defaultMessages)
    }
}

class StringType {
    constructor(e, i) {
        this.len = e, this.encoding = i
    }

    get(e, i) {
        return Buffer.from(e).toString(this.encoding, i, i + this.len)
    }
}

async function fileTypeFromTokenizer(e) {
    try {
        return new FileTypeParser().parse(e)
    } catch (i) {
        if (!(i instanceof EndOfStreamError)) throw i
    }
}

class BufferTokenizer {
    constructor(e, i) {
        this.position = 0, this.numBuffer = new Uint8Array(8), this.fileInfo = i || {}, this.uint8Array = e, this.fileInfo.size = this.fileInfo.size ? this.fileInfo.size : e.length
    }

    async readToken(e, i = this.position) {
        let t = Buffer.alloc(e.len), $ = await this.readBuffer(t, {position: i});
        if ($ < e.len) throw new EndOfStreamError;
        return e.get(t, 0)
    }

    async peekToken(e, i = this.position) {
        let t = Buffer.alloc(e.len), $ = await this.peekBuffer(t, {position: i});
        if ($ < e.len) throw new EndOfStreamError;
        return e.get(t, 0)
    }

    async readBuffer(e, i) {
        if (i && i.position) {
            if (i.position < this.position) throw Error("`options.position` must be equal or greater than `tokenizer.position`");
            this.position = i.position
        }
        let t = await this.peekBuffer(e, i);
        return this.position += t, t
    }

    async peekBuffer(e, i) {
        let t = this.normalizeOptions(e, i), $ = Math.min(this.uint8Array.length - t.position, t.length);
        if (t.mayBeLess || !($ < t.length)) return e.set(this.uint8Array.subarray(t.position, t.position + $), t.offset), $;
        throw new EndOfStreamError
    }

    async readNumber(e) {
        let i = await this.readBuffer(this.numBuffer, {length: e.len});
        if (i < e.len) throw new EndOfStreamError;
        return e.get(this.numBuffer, 0)
    }

    async peekNumber(e) {
        let i = await this.peekBuffer(this.numBuffer, {length: e.len});
        if (i < e.len) throw new EndOfStreamError;
        return e.get(this.numBuffer, 0)
    }

    async close() {
    }

    async ignore(e) {
        if (void 0 !== this.fileInfo.size) {
            let i = this.fileInfo.size - this.position;
            if (e > i) return this.position += i, i
        }
        return this.position += e, e
    }

    normalizeOptions(e, i) {
        if (i && void 0 !== i.position && i.position < this.position) throw Error("`options.position` must be equal or greater than `tokenizer.position`");
        return i ? {
            mayBeLess: !0 === i.mayBeLess,
            offset: i.offset ? i.offset : 0,
            length: i.length ? i.length : e.length - (i.offset ? i.offset : 0),
            position: i.position ? i.position : this.position
        } : {mayBeLess: !1, offset: 0, length: e.length, position: this.position}
    }
}

class FileTypeParser {
    _check(e, i, t) {
        for (let [$, r] of (t = {offset: 0, ...t}, i.entries())) if (t.mask) {
            if (r !== (t.mask[$] & e[$ + t.offset])) return !1
        } else if (r !== e[$ + t.offset]) return !1;
        return !0
    }

    check(e, i) {
        return this._check(this.buffer, e, i)
    }

    stringToBytes(e) {
        return [...e].map(e => e.charCodeAt(0))
    }

    checkString(e, i) {
        return this.check(this.stringToBytes(e), i)
    }

    async parse(e) {
        if (!(e instanceof Uint8Array || e instanceof ArrayBuffer || e instanceof BufferTokenizer)) throw TypeError(`Expected the \`input\` argument to be of type \`Uint8Array\` or \`Buffer\` or \`ArrayBuffer\`, got \`${typeof e}\``);
        let i = e;
        if (!(i instanceof BufferTokenizer)) {
            let t = e instanceof Uint8Array ? e : new Uint8Array(e);
            if (!(t && t.length > 1)) return;
            i = new BufferTokenizer(t)
        }
        try {
            return this.parseTokenizer(i)
        } catch ($) {
            if (!($ instanceof EndOfStreamError)) throw $
        }
    }

    async parseTokenizer(e) {
        let i = KrajeeFileTypeConfig.Token;
        if (this.buffer = Buffer.alloc(KrajeeFileTypeConfig.minimumBytes), void 0 === e.fileInfo.size && (e.fileInfo.size = Number.MAX_SAFE_INTEGER), this.tokenizer = e, await e.peekBuffer(this.buffer, {
            length: 12,
            mayBeLess: !0
        }), this.check([66, 77])) return {ext: "bmp", mime: "image/bmp"};
        if (this.check([11, 119])) return {ext: "ac3", mime: "audio/vnd.dolby.dd-raw"};
        if (this.check([120, 1])) return {ext: "dmg", mime: "application/x-apple-diskimage"};
        if (this.check([77, 90])) return {ext: "exe", mime: "application/x-msdownload"};
        if (this.check([37, 33])) return (await e.peekBuffer(this.buffer, {
            length: 24,
            mayBeLess: !0
        }), this.checkString("PS-Adobe-", {offset: 2}) && this.checkString(" EPSF-", {offset: 14})) ? {
            ext: "eps",
            mime: "application/eps"
        } : {ext: "ps", mime: "application/postscript"};
        if (this.check([31, 160]) || this.check([31, 157])) return {ext: "Z", mime: "application/x-compress"};
        if (this.check([71, 73, 70])) return {ext: "gif", mime: "image/gif"};
        if (this.check([255, 216, 255])) return {ext: "jpg", mime: "image/jpeg"};
        if (this.check([73, 73, 188])) return {ext: "jxr", mime: "image/vnd.ms-photo"};
        if (this.check([31, 139, 8])) return {ext: "gz", mime: "application/gzip"};
        if (this.check([66, 90, 104])) return {ext: "bz2", mime: "application/x-bzip2"};
        if (this.checkString("ID3")) {
            await e.ignore(6);
            let t = await e.readToken(KrajeeFileTypeConfig.uint32SyncSafeToken);
            return e.position + t > e.fileInfo.size ? {
                ext: "mp3",
                mime: "audio/mpeg"
            } : (await e.ignore(t), console.log("KV SAYS", typeof e, e), fileTypeFromTokenizer(e))
        }
        if (this.checkString("MP+")) return {ext: "mpc", mime: "audio/x-musepack"};
        if ((67 === this.buffer[0] || 70 === this.buffer[0]) && this.check([87, 83], {offset: 1})) return {
            ext: "swf",
            mime: "application/x-shockwave-flash"
        };
        if (this.checkString("FLIF")) return {ext: "flif", mime: "image/flif"};
        if (this.checkString("8BPS")) return {ext: "psd", mime: "image/vnd.adobe.photoshop"};
        if (this.checkString("WEBP", {offset: 8})) return {ext: "webp", mime: "image/webp"};
        if (this.checkString("MPCK")) return {ext: "mpc", mime: "audio/x-musepack"};
        if (this.checkString("FORM")) return {ext: "aif", mime: "audio/aiff"};
        if (this.checkString("icns", {offset: 0})) return {ext: "icns", mime: "image/icns"};
        if (this.check([80, 75, 3, 4])) {
            try {
                for (; e.position + 30 < e.fileInfo.size;) {
                    await e.readBuffer(this.buffer, {length: 30});
                    let $ = {
                        compressedSize: this.buffer.readUInt32LE(18),
                        uncompressedSize: this.buffer.readUInt32LE(22),
                        filenameLength: this.buffer.readUInt16LE(26),
                        extraFieldLength: this.buffer.readUInt16LE(28)
                    };
                    if ($.filename = await e.readToken(new StringType($.filenameLength, "utf-8")), await e.ignore($.extraFieldLength), "META-INF/mozilla.rsa" === $.filename) return {
                        ext: "xpi",
                        mime: "application/x-xpinstall"
                    };
                    if ($.filename.endsWith(".rels") || $.filename.endsWith(".xml")) {
                        let r = $.filename.split("/")[0];
                        switch (r) {
                            case"_rels":
                                break;
                            case"word":
                                return {
                                    ext: "docx",
                                    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                };
                            case"ppt":
                                return {
                                    ext: "pptx",
                                    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                                };
                            case"xl":
                                return {
                                    ext: "xlsx",
                                    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                }
                        }
                    }
                    if ($.filename.startsWith("xl/")) return {
                        ext: "xlsx",
                        mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    };
                    if ($.filename.startsWith("3D/") && $.filename.endsWith(".model")) return {
                        ext: "3mf",
                        mime: "model/3mf"
                    };
                    if ("mimetype" === $.filename && $.compressedSize === $.uncompressedSize) {
                        let x = (await e.readToken(new StringType($.compressedSize, "utf-8"))).trim();
                        switch (x) {
                            case"application/epub+zip":
                                return {ext: "epub", mime: "application/epub+zip"};
                            case"application/vnd.oasis.opendocument.text":
                                return {ext: "odt", mime: "application/vnd.oasis.opendocument.text"};
                            case"application/vnd.oasis.opendocument.spreadsheet":
                                return {ext: "ods", mime: "application/vnd.oasis.opendocument.spreadsheet"};
                            case"application/vnd.oasis.opendocument.presentation":
                                return {ext: "odp", mime: "application/vnd.oasis.opendocument.presentation"}
                        }
                    }
                    if (0 === $.compressedSize) {
                        let n = -1;
                        for (; n < 0 && e.position < e.fileInfo.size;) await e.peekBuffer(this.buffer, {mayBeLess: !0}), n = this.buffer.indexOf("504B0304", 0, "hex"), await e.ignore(n >= 0 ? n : this.buffer.length)
                    } else await e.ignore($.compressedSize)
                }
            } catch (s) {
                if (!(s instanceof EndOfStreamError)) throw s
            }
            return {ext: "zip", mime: "application/zip"}
        }
        if (this.checkString("OggS")) {
            await e.ignore(28);
            let a = Buffer.alloc(8);
            return (await e.readBuffer(a), this._check(a, [79, 112, 117, 115, 72, 101, 97, 100])) ? {
                ext: "opus",
                mime: "audio/opus"
            } : this._check(a, [128, 116, 104, 101, 111, 114, 97]) ? {
                ext: "ogv",
                mime: "video/ogg"
            } : this._check(a, [1, 118, 105, 100, 101, 111, 0]) ? {
                ext: "ogm",
                mime: "video/ogg"
            } : this._check(a, [127, 70, 76, 65, 67]) ? {
                ext: "oga",
                mime: "audio/ogg"
            } : this._check(a, [83, 112, 101, 101, 120, 32, 32]) ? {
                ext: "spx",
                mime: "audio/ogg"
            } : this._check(a, [1, 118, 111, 114, 98, 105, 115]) ? {ext: "ogg", mime: "audio/ogg"} : {
                ext: "ogx",
                mime: "application/ogg"
            }
        }
        if (this.check([80, 75]) && (3 === this.buffer[2] || 5 === this.buffer[2] || 7 === this.buffer[2]) && (4 === this.buffer[3] || 6 === this.buffer[3] || 8 === this.buffer[3])) return {
            ext: "zip",
            mime: "application/zip"
        };
        if (this.checkString("ftyp", {offset: 4}) && (96 & this.buffer[8]) != 0) {
            let f = this.buffer.toString("binary", 8, 12).replace("\0", " ").trim();
            switch (f) {
                case"avif":
                case"avis":
                    return {ext: "avif", mime: "image/avif"};
                case"mif1":
                    return {ext: "heic", mime: "image/heif"};
                case"msf1":
                    return {ext: "heic", mime: "image/heif-sequence"};
                case"heic":
                case"heix":
                    return {ext: "heic", mime: "image/heic"};
                case"hevc":
                case"hevx":
                    return {ext: "heic", mime: "image/heic-sequence"};
                case"qt":
                    return {ext: "mov", mime: "video/quicktime"};
                case"M4V":
                case"M4VH":
                case"M4VP":
                    return {ext: "m4v", mime: "video/x-m4v"};
                case"M4P":
                    return {ext: "m4p", mime: "video/mp4"};
                case"M4B":
                    return {ext: "m4b", mime: "audio/mp4"};
                case"M4A":
                    return {ext: "m4a", mime: "audio/x-m4a"};
                case"F4V":
                    return {ext: "f4v", mime: "video/mp4"};
                case"F4P":
                    return {ext: "f4p", mime: "video/mp4"};
                case"F4A":
                    return {ext: "f4a", mime: "audio/mp4"};
                case"F4B":
                    return {ext: "f4b", mime: "audio/mp4"};
                case"crx":
                    return {ext: "cr3", mime: "image/x-canon-cr3"};
                default:
                    if (f.startsWith("3g")) {
                        if (f.startsWith("3g2")) return {ext: "3g2", mime: "video/3gpp2"};
                        return {ext: "3gp", mime: "video/3gpp"}
                    }
                    return {ext: "mp4", mime: "video/mp4"}
            }
        }
        if (this.checkString("MThd")) return {ext: "mid", mime: "audio/midi"};
        if (this.checkString("wOFF") && (this.check([0, 1, 0, 0], {offset: 4}) || this.checkString("OTTO", {offset: 4}))) return {
            ext: "woff",
            mime: "font/woff"
        };
        if (this.checkString("wOF2") && (this.check([0, 1, 0, 0], {offset: 4}) || this.checkString("OTTO", {offset: 4}))) return {
            ext: "woff2",
            mime: "font/woff2"
        };
        if (this.check([212, 195, 178, 161]) || this.check([161, 178, 195, 212])) return {
            ext: "pcap",
            mime: "application/vnd.tcpdump.pcap"
        };
        if (this.checkString("DSD ")) return {ext: "dsf", mime: "audio/x-dsf"};
        if (this.checkString("LZIP")) return {ext: "lz", mime: "application/x-lzip"};
        if (this.checkString("fLaC")) return {ext: "flac", mime: "audio/x-flac"};
        if (this.check([66, 80, 71, 251])) return {ext: "bpg", mime: "image/bpg"};
        if (this.checkString("wvpk")) return {ext: "wv", mime: "audio/wavpack"};
        if (this.checkString("%PDF")) {
            await e.ignore(1350);
            let c = Buffer.alloc(Math.min(10485760, e.fileInfo.size));
            return (await e.readBuffer(c, {mayBeLess: !0}), c.includes(Buffer.from("AIPrivateData"))) ? {
                ext: "ai",
                mime: "application/postscript"
            } : {ext: "pdf", mime: "application/pdf"}
        }
        if (this.check([0, 97, 115, 109])) return {ext: "wasm", mime: "application/wasm"};
        if (this.check([73, 73])) {
            let o = await this.readTiffHeader(!1);
            if (o) return o
        }
        if (this.check([77, 77])) {
            let m = await this.readTiffHeader(!0);
            if (m) return m
        }
        if (this.checkString("MAC ")) return {ext: "ape", mime: "audio/ape"};
        if (this.check([26, 69, 223, 163])) {
            async function h() {
                let t = await e.peekNumber(i.UINT8), $ = 128, r = 0;
                for (; (t & $) == 0;) ++r, $ >>= 1;
                let x = Buffer.alloc(r + 1);
                return await e.readBuffer(x), x
            }

            async function p() {
                let e = await h(), i = await h();
                i[0] ^= 128 >> i.length - 1;
                let t = Math.min(6, i.length);
                return {id: e.readUIntBE(0, e.length), len: i.readUIntBE(i.length - t, t)}
            }

            async function u(i, t) {
                for (; t > 0;) {
                    let $ = await p();
                    if (17026 === $.id) {
                        let r = await e.readToken(new StringType($.len, "utf-8"));
                        return r.replace(/\00.*$/g, "")
                    }
                    await e.ignore($.len), --t
                }
            }

            let l = await p(), g = await u(1, l.len);
            switch (g) {
                case"webm":
                    return {ext: "webm", mime: "video/webm"};
                case"matroska":
                    return {ext: "mkv", mime: "video/x-matroska"};
                default:
                    return
            }
        }
        if (this.check([82, 73, 70, 70])) {
            if (this.check([65, 86, 73], {offset: 8})) return {ext: "avi", mime: "video/vnd.avi"};
            if (this.check([87, 65, 86, 69], {offset: 8})) return {ext: "wav", mime: "audio/vnd.wave"};
            if (this.check([81, 76, 67, 77], {offset: 8})) return {ext: "qcp", mime: "audio/qcelp"}
        }
        if (this.checkString("SQLi")) return {ext: "sqlite", mime: "application/x-sqlite3"};
        if (this.check([78, 69, 83, 26])) return {ext: "nes", mime: "application/x-nintendo-nes-rom"};
        if (this.checkString("Cr24")) return {ext: "crx", mime: "application/x-google-chrome-extension"};
        if (this.checkString("MSCF") || this.checkString("ISc(")) return {
            ext: "cab",
            mime: "application/vnd.ms-cab-compressed"
        };
        if (this.check([237, 171, 238, 219])) return {ext: "rpm", mime: "application/x-rpm"};
        if (this.check([197, 208, 211, 198])) return {ext: "eps", mime: "application/eps"};
        if (this.check([40, 181, 47, 253])) return {ext: "zst", mime: "application/zstd"};
        if (this.check([127, 69, 76, 70])) return {ext: "elf", mime: "application/x-elf"};
        if (this.check([79, 84, 84, 79, 0])) return {ext: "otf", mime: "font/otf"};
        if (this.checkString("#!AMR")) return {ext: "amr", mime: "audio/amr"};
        if (this.checkString("{\\rtf")) return {ext: "rtf", mime: "application/rtf"};
        if (this.check([70, 76, 86, 1])) return {ext: "flv", mime: "video/x-flv"};
        if (this.checkString("IMPM")) return {ext: "it", mime: "audio/x-it"};
        if (this.checkString("-lh0-", {offset: 2}) || this.checkString("-lh1-", {offset: 2}) || this.checkString("-lh2-", {offset: 2}) || this.checkString("-lh3-", {offset: 2}) || this.checkString("-lh4-", {offset: 2}) || this.checkString("-lh5-", {offset: 2}) || this.checkString("-lh6-", {offset: 2}) || this.checkString("-lh7-", {offset: 2}) || this.checkString("-lzs-", {offset: 2}) || this.checkString("-lz4-", {offset: 2}) || this.checkString("-lz5-", {offset: 2}) || this.checkString("-lhd-", {offset: 2})) return {
            ext: "lzh",
            mime: "application/x-lzh-compressed"
        };
        if (this.check([0, 0, 1, 186])) {
            if (this.check([33], {offset: 4, mask: [241]})) return {ext: "mpg", mime: "video/MP1S"};
            if (this.check([68], {offset: 4, mask: [196]})) return {ext: "mpg", mime: "video/MP2P"}
        }
        if (this.checkString("ITSF")) return {ext: "chm", mime: "application/vnd.ms-htmlhelp"};
        if (this.check([253, 55, 122, 88, 90, 0])) return {ext: "xz", mime: "application/x-xz"};
        if (this.checkString("<?xml ")) return {ext: "xml", mime: "application/xml"};
        if (this.check([55, 122, 188, 175, 39, 28])) return {ext: "7z", mime: "application/x-7z-compressed"};
        if (this.check([82, 97, 114, 33, 26, 7]) && (0 === this.buffer[6] || 1 === this.buffer[6])) return {
            ext: "rar",
            mime: "application/x-rar-compressed"
        };
        if (this.checkString("solid ")) return {ext: "stl", mime: "model/stl"};
        if (this.checkString("BLENDER")) return {ext: "blend", mime: "application/x-blender"};
        if (this.checkString("!<arch>")) {
            await e.ignore(8);
            let k = await e.readToken(new StringType(13, "ascii"));
            return "debian-binary" === k ? {ext: "deb", mime: "application/x-deb"} : {
                ext: "ar",
                mime: "application/x-unix-archive"
            }
        }
        if (this.check([137, 80, 78, 71, 13, 10, 26, 10])) {
            async function d() {
                return {length: await e.readToken(i.INT32_BE), type: await e.readToken(new StringType(4, "binary"))}
            }

            await e.ignore(8);
            do {
                let _ = await d();
                if (_.length < 0) return;
                switch (_.type) {
                    case"IDAT":
                        return {ext: "png", mime: "image/png"};
                    case"acTL":
                        return {ext: "apng", mime: "image/apng"};
                    default:
                        await e.ignore(_.length + 4)
                }
            } while (e.position + 8 < e.fileInfo.size);
            return {ext: "png", mime: "image/png"}
        }
        if (this.check([65, 82, 82, 79, 87, 49, 0, 0])) return {ext: "arrow", mime: "application/x-apache-arrow"};
        if (this.check([103, 108, 84, 70, 2, 0, 0, 0])) return {ext: "glb", mime: "model/gltf-binary"};
        if (this.check([102, 114, 101, 101], {offset: 4}) || this.check([109, 100, 97, 116], {offset: 4}) || this.check([109, 111, 111, 118], {offset: 4}) || this.check([119, 105, 100, 101], {offset: 4})) return {
            ext: "mov",
            mime: "video/quicktime"
        };
        if (this.check([239, 187, 191]) && this.checkString("<?xml", {offset: 3})) return {
            ext: "xml",
            mime: "application/xml"
        };
        if (this.check([73, 73, 82, 79, 8, 0, 0, 0, 24])) return {ext: "orf", mime: "image/x-olympus-orf"};
        if (this.checkString("gimp xcf ")) return {ext: "xcf", mime: "image/x-xcf"};
        if (this.check([73, 73, 85, 0, 24, 0, 0, 0, 136, 231, 116, 216])) return {
            ext: "rw2",
            mime: "image/x-panasonic-rw2"
        };
        if (this.check([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
            async function F() {
                let t = Buffer.alloc(16);
                return await e.readBuffer(t), {id: t, size: Number(await e.readToken(i.UINT64_LE))}
            }

            for (await e.ignore(30); e.position + 24 < e.fileInfo.size;) {
                let w = await F(), S = w.size - 24;
                if (this._check(w.id, [145, 7, 220, 183, 183, 169, 207, 17, 142, 230, 0, 192, 12, 32, 83, 101])) {
                    let B = Buffer.alloc(16);
                    if (S -= await e.readBuffer(B), this._check(B, [64, 158, 105, 248, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43])) return {
                        ext: "asf",
                        mime: "audio/x-ms-asf"
                    };
                    if (this._check(B, [192, 239, 25, 188, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43])) return {
                        ext: "asf",
                        mime: "video/x-ms-asf"
                    };
                    break
                }
                await e.ignore(S)
            }
            return {ext: "asf", mime: "application/vnd.ms-asf"}
        }
        if (this.check([171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10])) return {ext: "ktx", mime: "image/ktx"};
        if ((this.check([126, 16, 4]) || this.check([126, 24, 4])) && this.check([48, 77, 73, 69], {offset: 4})) return {
            ext: "mie",
            mime: "application/x-mie"
        };
        if (this.check([39, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], {offset: 2})) return {
            ext: "shp",
            mime: "application/x-esri-shape"
        };
        if (this.check([0, 0, 0, 12, 106, 80, 32, 32, 13, 10, 135, 10])) {
            await e.ignore(20);
            let T = await e.readToken(new StringType(4, "ascii"));
            switch (T) {
                case"jp2 ":
                    return {ext: "jp2", mime: "image/jp2"};
                case"jpx ":
                    return {ext: "jpx", mime: "image/jpx"};
                case"jpm ":
                    return {ext: "jpm", mime: "image/jpm"};
                case"mjp2":
                    return {ext: "mj2", mime: "image/mj2"};
                default:
                    return
            }
        }
        if (this.check([255, 10]) || this.check([0, 0, 0, 12, 74, 88, 76, 32, 13, 10, 135, 10])) return {
            ext: "jxl",
            mime: "image/jxl"
        };
        if (this.check([254, 255, 0, 60, 0, 63, 0, 120, 0, 109, 0, 108]) || this.check([255, 254, 60, 0, 63, 0, 120, 0, 109, 0, 108, 0])) return {
            ext: "xml",
            mime: "application/xml"
        };
        if (this.check([0, 0, 1, 186]) || this.check([0, 0, 1, 179])) return {ext: "mpg", mime: "video/mpeg"};
        if (this.check([0, 1, 0, 0, 0])) return {ext: "ttf", mime: "font/ttf"};
        if (this.check([0, 0, 1, 0])) return {ext: "ico", mime: "image/x-icon"};
        if (this.check([0, 0, 2, 0])) return {ext: "cur", mime: "image/x-icon"};
        if (this.check([208, 207, 17, 224, 161, 177, 26, 225])) return {ext: "cfb", mime: "application/x-cfb"};
        if (await e.peekBuffer(this.buffer, {
            length: Math.min(256, e.fileInfo.size),
            mayBeLess: !0
        }), this.checkString("BEGIN:")) {
            if (this.checkString("VCARD", {offset: 6})) return {ext: "vcf", mime: "text/vcard"};
            if (this.checkString("VCALENDAR", {offset: 6})) return {ext: "ics", mime: "text/calendar"}
        }
        if (this.checkString("FUJIFILMCCD-RAW")) return {ext: "raf", mime: "image/x-fujifilm-raf"};
        if (this.checkString("Extended Module:")) return {ext: "xm", mime: "audio/x-xm"};
        if (this.checkString("Creative Voice File")) return {ext: "voc", mime: "audio/x-voc"};
        if (this.check([4, 0, 0, 0]) && this.buffer.length >= 16) {
            let y = this.buffer.readUInt32LE(12);
            if (y > 12 && this.buffer.length >= y + 16) try {
                let v = this.buffer.slice(16, y + 16).toString(), E = JSON.parse(v);
                if (E.files) return {ext: "asar", mime: "application/x-asar"}
            } catch (b) {
                console.log(b)
            }
        }
        if (this.check([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2])) return {ext: "mxf", mime: "application/mxf"};
        if (this.checkString("SCRM", {offset: 44})) return {ext: "s3m", mime: "audio/x-s3m"};
        if (this.check([71]) && this.check([71], {offset: 188}) || this.check([71], {offset: 4}) && this.check([71], {offset: 196})) return {
            ext: "mts",
            mime: "video/mp2t"
        };
        if (this.check([66, 79, 79, 75, 77, 79, 66, 73], {offset: 60})) return {
            ext: "mobi",
            mime: "application/x-mobipocket-ebook"
        };
        if (this.check([68, 73, 67, 77], {offset: 128})) return {ext: "dcm", mime: "application/dicom"};
        if (this.check([76, 0, 0, 0, 1, 20, 2, 0, 0, 0, 0, 0, 192, 0, 0, 0, 0, 0, 0, 70])) return {
            ext: "lnk",
            mime: "application/x.ms.shortcut"
        };
        if (this.check([98, 111, 111, 107, 0, 0, 0, 0, 109, 97, 114, 107, 0, 0, 0, 0])) return {
            ext: "alias",
            mime: "application/x.apple.alias"
        };
        if (this.check([76, 80], {offset: 34}) && (this.check([0, 0, 1], {offset: 8}) || this.check([1, 0, 2], {offset: 8}) || this.check([2, 0, 2], {offset: 8}))) return {
            ext: "eot",
            mime: "application/vnd.ms-fontobject"
        };
        if (this.check([6, 6, 237, 245, 216, 29, 70, 229, 189, 49, 239, 231, 254, 116, 183, 29])) return {
            ext: "indd",
            mime: "application/x-indesign"
        };
        if (await e.peekBuffer(this.buffer, {
            length: Math.min(512, e.fileInfo.size),
            mayBeLess: !0
        }), KrajeeFileTypeConfig.tarHeaderChecksumMatches(this.buffer)) return {ext: "tar", mime: "application/x-tar"};
        if (this.check([255, 254, 255, 14, 83, 0, 107, 0, 101, 0, 116, 0, 99, 0, 104, 0, 85, 0, 112, 0, 32, 0, 77, 0, 111, 0, 100, 0, 101, 0, 108, 0])) return {
            ext: "skp",
            mime: "application/vnd.sketchup.skp"
        };
        if (this.checkString("-----BEGIN PGP MESSAGE-----")) return {ext: "pgp", mime: "application/pgp-encrypted"};
        if (this.buffer.length >= 2 && this.check([255, 224], {offset: 0, mask: [255, 224]})) {
            if (this.check([16], {offset: 1, mask: [22]})) return this.check([8], {offset: 1, mask: [8]}), {
                ext: "aac",
                mime: "audio/aac"
            };
            if (this.check([2], {offset: 1, mask: [6]})) return {ext: "mp3", mime: "audio/mpeg"};
            if (this.check([4], {offset: 1, mask: [6]})) return {ext: "mp2", mime: "audio/mpeg"};
            if (this.check([6], {offset: 1, mask: [6]})) return {ext: "mp1", mime: "audio/mpeg"}
        }
        return {}
    }

    async readTiffTag(e) {
        let i = KrajeeFileTypeConfig.Token, t = await this.tokenizer.readToken(e ? i.UINT16_BE : i.UINT16_LE);
        switch (this.tokenizer.ignore(10), t) {
            case 50341:
                return {ext: "arw", mime: "image/x-sony-arw"};
            case 50706:
                return {ext: "dng", mime: "image/x-adobe-dng"}
        }
    }

    async readTiffIFD(e) {
        let i = KrajeeFileTypeConfig.Token, t = await this.tokenizer.readToken(e ? i.UINT16_BE : i.UINT16_LE);
        for (let $ = 0; $ < t; ++$) {
            let r = await this.readTiffTag(e);
            if (r) return r
        }
    }

    async readTiffHeader(e) {
        let i = KrajeeFileTypeConfig.Token, t = (e ? i.UINT16_BE : i.UINT16_LE).get(this.buffer, 2),
            $ = (e ? i.UINT32_BE : i.UINT32_LE).get(this.buffer, 4);
        if (42 === t) {
            if ($ >= 6) {
                if (this.checkString("CR", {offset: 8})) return {ext: "cr2", mime: "image/x-canon-cr2"};
                if ($ >= 8 && (this.check([28, 0, 254, 0], {offset: 8}) || this.check([31, 0, 11, 0], {offset: 8}))) return {
                    ext: "nef",
                    mime: "image/x-nikon-nef"
                }
            }
            await this.tokenizer.ignore($);
            let r = await this.readTiffIFD(!1);
            return r || {ext: "tif", mime: "image/tiff"}
        }
        if (43 === t) return {ext: "tif", mime: "image/tiff"}
    }
}

!function () {
    "use strict";

    function e(e) {
        return JSON.parse(JSON.stringify(e))
    }

    function t(e) {
        for (var t = y(e); "ÿà" <= t[1].slice(0, 2) && t[1].slice(0, 2) <= "ÿï";) t = [t[0]].concat(t.slice(2));
        return t.join("")
    }

    function a(e) {
        return s(">" + p("B", e.length), e)
    }

    function n(e) {
        return s(">" + p("H", e.length), e)
    }

    function i(e) {
        return s(">" + p("L", e.length), e)
    }

    function r(e, t, r) {
        var o, l, m, y, S = "", f = "";
        if ("Byte" == t) o = e.length, 4 >= o ? f = a(e) + p("\x00", 4 - o) : (f = s(">L", [r]), S = a(e)); else if ("Short" == t) o = e.length, 2 >= o ? f = n(e) + p("\x00\x00", 2 - o) : (f = s(">L", [r]), S = n(e)); else if ("Long" == t) o = e.length, 1 >= o ? f = i(e) : (f = s(">L", [r]), S = i(e)); else if ("Ascii" == t) l = e + "\x00", o = l.length, o > 4 ? (f = s(">L", [r]), S = l) : f = l + p("\x00", 4 - o); else if ("Rational" == t) {
            if ("number" == typeof e[0]) o = 1, m = e[0], y = e[1], l = s(">L", [m]) + s(">L", [y]); else {
                o = e.length, l = "";
                for (var c = 0; o > c; c++) m = e[c][0], y = e[c][1], l += s(">L", [m]) + s(">L", [y])
            }
            f = s(">L", [r]), S = l
        } else if ("SRational" == t) {
            if ("number" == typeof e[0]) o = 1, m = e[0], y = e[1], l = s(">l", [m]) + s(">l", [y]); else {
                o = e.length, l = "";
                for (var c = 0; o > c; c++) m = e[c][0], y = e[c][1], l += s(">l", [m]) + s(">l", [y])
            }
            f = s(">L", [r]), S = l
        } else "Undefined" == t && (o = e.length, o > 4 ? (f = s(">L", [r]), S = e) : f = e + p("\x00", 4 - o));
        var h = s(">L", [o]);
        return [h, f, S]
    }

    function o(e, t, a) {
        var n, i = 8, o = Object.keys(e).length, l = s(">H", [o]);
        n = ["0th", "1st"].indexOf(t) > -1 ? 2 + 12 * o + 4 : 2 + 12 * o;
        var m, p = "", y = "";
        for (var m in e) if ("string" == typeof m && (m = parseInt(m)), !("0th" == t && [34665, 34853].indexOf(m) > -1 || "Exif" == t && 40965 == m || "1st" == t && [513, 514].indexOf(m) > -1)) {
            var S = e[m], f = s(">H", [m]), c = u[t][m].type, h = s(">H", [g[c]]);
            "number" == typeof S && (S = [S]);
            var d = i + n + a + y.length, P = r(S, c, d), C = P[0], R = P[1], L = P[2];
            p += f + h + C + R, y += L
        }
        return [l + p, y]
    }

    function l(e) {
        var t, a;
        if ("ÿØ" == e.slice(0, 2)) t = y(e), a = S(t), a ? this.tiftag = a.slice(10) : this.tiftag = null; else if (["II", "MM"].indexOf(e.slice(0, 2)) > -1) this.tiftag = e; else {
            if ("Exif" != e.slice(0, 4)) throw new Error("Given file is neither JPEG nor TIFF.");
            this.tiftag = e.slice(6)
        }
    }

    function s(e, t) {
        if (!(t instanceof Array)) throw new Error("'pack' error. Got invalid type argument.");
        if (e.length - 1 != t.length) throw new Error("'pack' error. " + (e.length - 1) + " marks, " + t.length + " elements.");
        var a;
        if ("<" == e[0]) a = !0; else {
            if (">" != e[0]) throw new Error("");
            a = !1
        }
        for (var n = "", i = 1, r = null, o = null, l = null; o = e[i];) {
            if ("b" == o.toLowerCase()) {
                if (r = t[i - 1], "b" == o && 0 > r && (r += 256), r > 255 || 0 > r) throw new Error("'pack' error.");
                l = String.fromCharCode(r)
            } else if ("H" == o) {
                if (r = t[i - 1], r > 65535 || 0 > r) throw new Error("'pack' error.");
                l = String.fromCharCode(Math.floor(r % 65536 / 256)) + String.fromCharCode(r % 256), a && (l = l.split("").reverse().join(""))
            } else {
                if ("l" != o.toLowerCase()) throw new Error("'pack' error.");
                if (r = t[i - 1], "l" == o && 0 > r && (r += 4294967296), r > 4294967295 || 0 > r) throw new Error("'pack' error.");
                l = String.fromCharCode(Math.floor(r / 16777216)) + String.fromCharCode(Math.floor(r % 16777216 / 65536)) + String.fromCharCode(Math.floor(r % 65536 / 256)) + String.fromCharCode(r % 256), a && (l = l.split("").reverse().join(""))
            }
            n += l, i += 1
        }
        return n
    }

    function m(e, t) {
        if ("string" != typeof t) throw new Error("'unpack' error. Got invalid type argument.");
        for (var a = 0, n = 1; n < e.length; n++) if ("b" == e[n].toLowerCase()) a += 1; else if ("h" == e[n].toLowerCase()) a += 2; else {
            if ("l" != e[n].toLowerCase()) throw new Error("'unpack' error. Got invalid mark.");
            a += 4
        }
        if (a != t.length) throw new Error("'unpack' error. Mismatch between symbol and string length. " + a + ":" + t.length);
        var i;
        if ("<" == e[0]) i = !0; else {
            if (">" != e[0]) throw new Error("'unpack' error.");
            i = !1
        }
        for (var r = [], o = 0, l = 1, s = null, m = null, p = null, y = ""; m = e[l];) {
            if ("b" == m.toLowerCase()) p = 1, y = t.slice(o, o + p), s = y.charCodeAt(0), "b" == m && s >= 128 && (s -= 256); else if ("H" == m) p = 2, y = t.slice(o, o + p), i && (y = y.split("").reverse().join("")), s = 256 * y.charCodeAt(0) + y.charCodeAt(1); else {
                if ("l" != m.toLowerCase()) throw new Error("'unpack' error. " + m);
                p = 4, y = t.slice(o, o + p), i && (y = y.split("").reverse().join("")), s = 16777216 * y.charCodeAt(0) + 65536 * y.charCodeAt(1) + 256 * y.charCodeAt(2) + y.charCodeAt(3), "l" == m && s >= 2147483648 && (s -= 4294967296)
            }
            r.push(s), o += p, l += 1
        }
        return r
    }

    function p(e, t) {
        for (var a = "", n = 0; t > n; n++) a += e;
        return a
    }

    function y(e) {
        if ("ÿØ" != e.slice(0, 2)) throw new Error("Given data isn't JPEG.");
        for (var t = 2, a = ["ÿØ"]; ;) {
            if ("ÿÚ" == e.slice(t, t + 2)) {
                a.push(e.slice(t));
                break
            }
            var n = m(">H", e.slice(t + 2, t + 4))[0], i = t + n + 2;
            if (a.push(e.slice(t, i)), t = i, t >= e.length) throw new Error("Wrong JPEG data.")
        }
        return a
    }

    function S(e) {
        for (var t, a = 0; a < e.length; a++) if (t = e[a], "ÿá" == t.slice(0, 2) && "Exif\x00\x00" == t.slice(4, 10)) return t;
        return null
    }

    function f(e, t) {
        var a = !1, n = [];
        return e.forEach(function (i, r) {
            "ÿá" == i.slice(0, 2) && "Exif\x00\x00" == i.slice(4, 10) && (a ? n.unshift(r) : (e[r] = t, a = !0))
        }), n.forEach(function (t) {
            e.splice(t, 1)
        }), !a && t && (e = [e[0], t].concat(e.slice(1))), e.join("")
    }

    var c = {};
    if (c.version = "1.0.4", c.remove = function (e) {
        var t = !1;
        if ("ÿØ" == e.slice(0, 2)) ; else {
            if ("data:image/jpeg;base64," != e.slice(0, 23) && "data:image/jpg;base64," != e.slice(0, 22)) throw new Error("Given data is not jpeg.");
            e = d(e.split(",")[1]), t = !0
        }
        var a = y(e), n = a.filter(function (e) {
            return !("ÿá" == e.slice(0, 2) && "Exif\x00\x00" == e.slice(4, 10))
        }), i = n.join("");
        return t && (i = "data:image/jpeg;base64," + h(i)), i
    }, c.insert = function (e, t) {
        var a = !1;
        if ("Exif\x00\x00" != e.slice(0, 6)) throw new Error("Given data is not exif.");
        if ("ÿØ" == t.slice(0, 2)) ; else {
            if ("data:image/jpeg;base64," != t.slice(0, 23) && "data:image/jpg;base64," != t.slice(0, 22)) throw new Error("Given data is not jpeg.");
            t = d(t.split(",")[1]), a = !0
        }
        var n = "ÿá" + s(">H", [e.length + 2]) + e, i = y(t), r = f(i, n);
        return a && (r = "data:image/jpeg;base64," + h(r)), r
    }, c.load = function (e) {
        var t;
        if ("string" != typeof e) throw new Error("'load' gots invalid type argument.");
        if ("ÿØ" == e.slice(0, 2)) t = e; else if ("data:image/jpeg;base64," == e.slice(0, 23) || "data:image/jpg;base64," == e.slice(0, 22)) t = d(e.split(",")[1]); else {
            if ("Exif" != e.slice(0, 4)) throw new Error("'load' gots invalid file data.");
            t = e.slice(6)
        }
        var a = {"0th": {}, Exif: {}, GPS: {}, Interop: {}, "1st": {}, thumbnail: null}, n = new l(t);
        if (null === n.tiftag) return a;
        "II" == n.tiftag.slice(0, 2) ? n.endian_mark = "<" : n.endian_mark = ">";
        var i = m(n.endian_mark + "L", n.tiftag.slice(4, 8))[0];
        a["0th"] = n.get_ifd(i, "0th");
        var r = a["0th"].first_ifd_pointer;
        if (delete a["0th"].first_ifd_pointer, 34665 in a["0th"] && (i = a["0th"][34665], a.Exif = n.get_ifd(i, "Exif")), 34853 in a["0th"] && (i = a["0th"][34853], a.GPS = n.get_ifd(i, "GPS")), 40965 in a.Exif && (i = a.Exif[40965], a.Interop = n.get_ifd(i, "Interop")), "\x00\x00\x00\x00" != r && (i = m(n.endian_mark + "L", r)[0], a["1st"] = n.get_ifd(i, "1st"), 513 in a["1st"] && 514 in a["1st"])) {
            var o = a["1st"][513] + a["1st"][514], s = n.tiftag.slice(a["1st"][513], o);
            a.thumbnail = s
        }
        return a
    }, c.dump = function (a) {
        var n, i, r, l, m, p = 8, y = e(a), S = "Exif\x00\x00MM\x00*\x00\x00\x00\b", f = !1, h = !1, d = !1, u = !1;
        n = "0th" in y ? y["0th"] : {}, "Exif" in y && Object.keys(y.Exif).length || "Interop" in y && Object.keys(y.Interop).length ? (n[34665] = 1, f = !0, i = y.Exif, "Interop" in y && Object.keys(y.Interop).length ? (i[40965] = 1, d = !0, r = y.Interop) : Object.keys(i).indexOf(c.ExifIFD.InteroperabilityTag.toString()) > -1 && delete i[40965]) : Object.keys(n).indexOf(c.ImageIFD.ExifTag.toString()) > -1 && delete n[34665], "GPS" in y && Object.keys(y.GPS).length ? (n[c.ImageIFD.GPSTag] = 1, h = !0, l = y.GPS) : Object.keys(n).indexOf(c.ImageIFD.GPSTag.toString()) > -1 && delete n[c.ImageIFD.GPSTag], "1st" in y && "thumbnail" in y && null != y.thumbnail && (u = !0, y["1st"][513] = 1, y["1st"][514] = 1, m = y["1st"]);
        var P, C, R, L, x, I = o(n, "0th", 0), D = I[0].length + 12 * f + 12 * h + 4 + I[1].length, G = "", A = 0,
            v = "", b = 0, w = "", E = 0, T = "";
        if (f && (P = o(i, "Exif", D), A = P[0].length + 12 * d + P[1].length), h && (C = o(l, "GPS", D + A), v = C.join(""), b = v.length), d) {
            var k = D + A + b;
            R = o(r, "Interop", k), w = R.join(""), E = w.length
        }
        if (u) {
            var k = D + A + b + E;
            if (L = o(m, "1st", k), x = t(y.thumbnail), x.length > 64e3) throw new Error("Given thumbnail is too large. max 64kB")
        }
        var F = "", B = "", M = "", O = "\x00\x00\x00\x00";
        if (f) {
            var N = p + D, U = s(">L", [N]), _ = 34665, H = s(">H", [_]), j = s(">H", [g.Long]), V = s(">L", [1]);
            F = H + j + V + U
        }
        if (h) {
            var N = p + D + A, U = s(">L", [N]), _ = 34853, H = s(">H", [_]), j = s(">H", [g.Long]), V = s(">L", [1]);
            B = H + j + V + U
        }
        if (d) {
            var N = p + D + A + b, U = s(">L", [N]), _ = 40965, H = s(">H", [_]), j = s(">H", [g.Long]),
                V = s(">L", [1]);
            M = H + j + V + U
        }
        if (u) {
            var N = p + D + A + b + E;
            O = s(">L", [N]);
            var J = N + L[0].length + 24 + 4 + L[1].length, X = "\x00\x00\x00\x00" + s(">L", [J]),
                z = "\x00\x00\x00\x00" + s(">L", [x.length]);
            T = L[0] + X + z + "\x00\x00\x00\x00" + L[1] + x
        }
        var W = I[0] + F + B + O + I[1];
        return f && (G = P[0] + M + P[1]), S + W + G + v + w + T
    }, l.prototype = {
        get_ifd: function (e, t) {
            var a, n = {}, i = m(this.endian_mark + "H", this.tiftag.slice(e, e + 2))[0], r = e + 2;
            a = ["0th", "1st"].indexOf(t) > -1 ? "Image" : t;
            for (var o = 0; i > o; o++) {
                e = r + 12 * o;
                var l = m(this.endian_mark + "H", this.tiftag.slice(e, e + 2))[0],
                    s = m(this.endian_mark + "H", this.tiftag.slice(e + 2, e + 4))[0],
                    p = m(this.endian_mark + "L", this.tiftag.slice(e + 4, e + 8))[0],
                    y = this.tiftag.slice(e + 8, e + 12), S = [s, p, y];
                l in u[a] && (n[l] = this.convert_value(S))
            }
            return "0th" == t && (e = r + 12 * i, n.first_ifd_pointer = this.tiftag.slice(e, e + 4)), n
        }, convert_value: function (e) {
            var t, a = null, n = e[0], i = e[1], r = e[2];
            if (1 == n) i > 4 ? (t = m(this.endian_mark + "L", r)[0], a = m(this.endian_mark + p("B", i), this.tiftag.slice(t, t + i))) : a = m(this.endian_mark + p("B", i), r.slice(0, i)); else if (2 == n) i > 4 ? (t = m(this.endian_mark + "L", r)[0], a = this.tiftag.slice(t, t + i - 1)) : a = r.slice(0, i - 1); else if (3 == n) i > 2 ? (t = m(this.endian_mark + "L", r)[0], a = m(this.endian_mark + p("H", i), this.tiftag.slice(t, t + 2 * i))) : a = m(this.endian_mark + p("H", i), r.slice(0, 2 * i)); else if (4 == n) i > 1 ? (t = m(this.endian_mark + "L", r)[0], a = m(this.endian_mark + p("L", i), this.tiftag.slice(t, t + 4 * i))) : a = m(this.endian_mark + p("L", i), r); else if (5 == n) if (t = m(this.endian_mark + "L", r)[0], i > 1) {
                a = [];
                for (var o = 0; i > o; o++) a.push([m(this.endian_mark + "L", this.tiftag.slice(t + 8 * o, t + 4 + 8 * o))[0], m(this.endian_mark + "L", this.tiftag.slice(t + 4 + 8 * o, t + 8 + 8 * o))[0]])
            } else a = [m(this.endian_mark + "L", this.tiftag.slice(t, t + 4))[0], m(this.endian_mark + "L", this.tiftag.slice(t + 4, t + 8))[0]]; else if (7 == n) i > 4 ? (t = m(this.endian_mark + "L", r)[0], a = this.tiftag.slice(t, t + i)) : a = r.slice(0, i); else if (9 == n) i > 1 ? (t = m(this.endian_mark + "L", r)[0], a = m(this.endian_mark + p("l", i), this.tiftag.slice(t, t + 4 * i))) : a = m(this.endian_mark + p("l", i), r); else {
                if (10 != n) throw new Error("Exif might be wrong. Got incorrect value type to decode. type:" + n);
                if (t = m(this.endian_mark + "L", r)[0], i > 1) {
                    a = [];
                    for (var o = 0; i > o; o++) a.push([m(this.endian_mark + "l", this.tiftag.slice(t + 8 * o, t + 4 + 8 * o))[0], m(this.endian_mark + "l", this.tiftag.slice(t + 4 + 8 * o, t + 8 + 8 * o))[0]])
                } else a = [m(this.endian_mark + "l", this.tiftag.slice(t, t + 4))[0], m(this.endian_mark + "l", this.tiftag.slice(t + 4, t + 8))[0]]
            }
            return a instanceof Array && 1 == a.length ? a[0] : a
        }
    }, "undefined" != typeof window && "function" == typeof window.btoa) var h = window.btoa;
    if ("undefined" == typeof h) var h = function (e) {
        for (var t, a, n, i, r, o, l, s = "", m = 0, p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; m < e.length;) t = e.charCodeAt(m++), a = e.charCodeAt(m++), n = e.charCodeAt(m++), i = t >> 2, r = (3 & t) << 4 | a >> 4, o = (15 & a) << 2 | n >> 6, l = 63 & n, isNaN(a) ? o = l = 64 : isNaN(n) && (l = 64), s = s + p.charAt(i) + p.charAt(r) + p.charAt(o) + p.charAt(l);
        return s
    };
    if ("undefined" != typeof window && "function" == typeof window.atob) var d = window.atob;
    if ("undefined" == typeof d) var d = function (e) {
        var t, a, n, i, r, o, l, s = "", m = 0, p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); m < e.length;) i = p.indexOf(e.charAt(m++)), r = p.indexOf(e.charAt(m++)), o = p.indexOf(e.charAt(m++)), l = p.indexOf(e.charAt(m++)), t = i << 2 | r >> 4, a = (15 & r) << 4 | o >> 2, n = (3 & o) << 6 | l, s += String.fromCharCode(t), 64 != o && (s += String.fromCharCode(a)), 64 != l && (s += String.fromCharCode(n));
        return s
    };
    var g = {Byte: 1, Ascii: 2, Short: 3, Long: 4, Rational: 5, Undefined: 7, SLong: 9, SRational: 10}, u = {
        Image: {
            11: {name: "ProcessingSoftware", type: "Ascii"},
            254: {name: "NewSubfileType", type: "Long"},
            255: {name: "SubfileType", type: "Short"},
            256: {name: "ImageWidth", type: "Long"},
            257: {name: "ImageLength", type: "Long"},
            258: {name: "BitsPerSample", type: "Short"},
            259: {name: "Compression", type: "Short"},
            262: {name: "PhotometricInterpretation", type: "Short"},
            263: {name: "Threshholding", type: "Short"},
            264: {name: "CellWidth", type: "Short"},
            265: {name: "CellLength", type: "Short"},
            266: {name: "FillOrder", type: "Short"},
            269: {name: "DocumentName", type: "Ascii"},
            270: {name: "ImageDescription", type: "Ascii"},
            271: {name: "Make", type: "Ascii"},
            272: {name: "Model", type: "Ascii"},
            273: {name: "StripOffsets", type: "Long"},
            274: {name: "Orientation", type: "Short"},
            277: {name: "SamplesPerPixel", type: "Short"},
            278: {name: "RowsPerStrip", type: "Long"},
            279: {name: "StripByteCounts", type: "Long"},
            282: {name: "XResolution", type: "Rational"},
            283: {name: "YResolution", type: "Rational"},
            284: {name: "PlanarConfiguration", type: "Short"},
            290: {name: "GrayResponseUnit", type: "Short"},
            291: {name: "GrayResponseCurve", type: "Short"},
            292: {name: "T4Options", type: "Long"},
            293: {name: "T6Options", type: "Long"},
            296: {name: "ResolutionUnit", type: "Short"},
            301: {name: "TransferFunction", type: "Short"},
            305: {name: "Software", type: "Ascii"},
            306: {name: "DateTime", type: "Ascii"},
            315: {name: "Artist", type: "Ascii"},
            316: {name: "HostComputer", type: "Ascii"},
            317: {name: "Predictor", type: "Short"},
            318: {name: "WhitePoint", type: "Rational"},
            319: {name: "PrimaryChromaticities", type: "Rational"},
            320: {name: "ColorMap", type: "Short"},
            321: {name: "HalftoneHints", type: "Short"},
            322: {name: "TileWidth", type: "Short"},
            323: {name: "TileLength", type: "Short"},
            324: {name: "TileOffsets", type: "Short"},
            325: {name: "TileByteCounts", type: "Short"},
            330: {name: "SubIFDs", type: "Long"},
            332: {name: "InkSet", type: "Short"},
            333: {name: "InkNames", type: "Ascii"},
            334: {name: "NumberOfInks", type: "Short"},
            336: {name: "DotRange", type: "Byte"},
            337: {name: "TargetPrinter", type: "Ascii"},
            338: {name: "ExtraSamples", type: "Short"},
            339: {name: "SampleFormat", type: "Short"},
            340: {name: "SMinSampleValue", type: "Short"},
            341: {name: "SMaxSampleValue", type: "Short"},
            342: {name: "TransferRange", type: "Short"},
            343: {name: "ClipPath", type: "Byte"},
            344: {name: "XClipPathUnits", type: "Long"},
            345: {name: "YClipPathUnits", type: "Long"},
            346: {name: "Indexed", type: "Short"},
            347: {name: "JPEGTables", type: "Undefined"},
            351: {name: "OPIProxy", type: "Short"},
            512: {name: "JPEGProc", type: "Long"},
            513: {name: "JPEGInterchangeFormat", type: "Long"},
            514: {name: "JPEGInterchangeFormatLength", type: "Long"},
            515: {name: "JPEGRestartInterval", type: "Short"},
            517: {name: "JPEGLosslessPredictors", type: "Short"},
            518: {name: "JPEGPointTransforms", type: "Short"},
            519: {name: "JPEGQTables", type: "Long"},
            520: {name: "JPEGDCTables", type: "Long"},
            521: {name: "JPEGACTables", type: "Long"},
            529: {name: "YCbCrCoefficients", type: "Rational"},
            530: {name: "YCbCrSubSampling", type: "Short"},
            531: {name: "YCbCrPositioning", type: "Short"},
            532: {name: "ReferenceBlackWhite", type: "Rational"},
            700: {name: "XMLPacket", type: "Byte"},
            18246: {name: "Rating", type: "Short"},
            18249: {name: "RatingPercent", type: "Short"},
            32781: {name: "ImageID", type: "Ascii"},
            33421: {name: "CFARepeatPatternDim", type: "Short"},
            33422: {name: "CFAPattern", type: "Byte"},
            33423: {name: "BatteryLevel", type: "Rational"},
            33432: {name: "Copyright", type: "Ascii"},
            33434: {name: "ExposureTime", type: "Rational"},
            34377: {name: "ImageResources", type: "Byte"},
            34665: {name: "ExifTag", type: "Long"},
            34675: {name: "InterColorProfile", type: "Undefined"},
            34853: {name: "GPSTag", type: "Long"},
            34857: {name: "Interlace", type: "Short"},
            34858: {name: "TimeZoneOffset", type: "Long"},
            34859: {name: "SelfTimerMode", type: "Short"},
            37387: {name: "FlashEnergy", type: "Rational"},
            37388: {name: "SpatialFrequencyResponse", type: "Undefined"},
            37389: {name: "Noise", type: "Undefined"},
            37390: {name: "FocalPlaneXResolution", type: "Rational"},
            37391: {name: "FocalPlaneYResolution", type: "Rational"},
            37392: {name: "FocalPlaneResolutionUnit", type: "Short"},
            37393: {name: "ImageNumber", type: "Long"},
            37394: {name: "SecurityClassification", type: "Ascii"},
            37395: {name: "ImageHistory", type: "Ascii"},
            37397: {name: "ExposureIndex", type: "Rational"},
            37398: {name: "TIFFEPStandardID", type: "Byte"},
            37399: {name: "SensingMethod", type: "Short"},
            40091: {name: "XPTitle", type: "Byte"},
            40092: {name: "XPComment", type: "Byte"},
            40093: {name: "XPAuthor", type: "Byte"},
            40094: {name: "XPKeywords", type: "Byte"},
            40095: {name: "XPSubject", type: "Byte"},
            50341: {name: "PrintImageMatching", type: "Undefined"},
            50706: {name: "DNGVersion", type: "Byte"},
            50707: {name: "DNGBackwardVersion", type: "Byte"},
            50708: {name: "UniqueCameraModel", type: "Ascii"},
            50709: {name: "LocalizedCameraModel", type: "Byte"},
            50710: {name: "CFAPlaneColor", type: "Byte"},
            50711: {name: "CFALayout", type: "Short"},
            50712: {name: "LinearizationTable", type: "Short"},
            50713: {name: "BlackLevelRepeatDim", type: "Short"},
            50714: {name: "BlackLevel", type: "Rational"},
            50715: {name: "BlackLevelDeltaH", type: "SRational"},
            50716: {name: "BlackLevelDeltaV", type: "SRational"},
            50717: {name: "WhiteLevel", type: "Short"},
            50718: {name: "DefaultScale", type: "Rational"},
            50719: {name: "DefaultCropOrigin", type: "Short"},
            50720: {name: "DefaultCropSize", type: "Short"},
            50721: {name: "ColorMatrix1", type: "SRational"},
            50722: {name: "ColorMatrix2", type: "SRational"},
            50723: {name: "CameraCalibration1", type: "SRational"},
            50724: {name: "CameraCalibration2", type: "SRational"},
            50725: {name: "ReductionMatrix1", type: "SRational"},
            50726: {name: "ReductionMatrix2", type: "SRational"},
            50727: {name: "AnalogBalance", type: "Rational"},
            50728: {name: "AsShotNeutral", type: "Short"},
            50729: {name: "AsShotWhiteXY", type: "Rational"},
            50730: {name: "BaselineExposure", type: "SRational"},
            50731: {name: "BaselineNoise", type: "Rational"},
            50732: {name: "BaselineSharpness", type: "Rational"},
            50733: {name: "BayerGreenSplit", type: "Long"},
            50734: {name: "LinearResponseLimit", type: "Rational"},
            50735: {name: "CameraSerialNumber", type: "Ascii"},
            50736: {name: "LensInfo", type: "Rational"},
            50737: {name: "ChromaBlurRadius", type: "Rational"},
            50738: {name: "AntiAliasStrength", type: "Rational"},
            50739: {name: "ShadowScale", type: "SRational"},
            50740: {name: "DNGPrivateData", type: "Byte"},
            50741: {name: "MakerNoteSafety", type: "Short"},
            50778: {name: "CalibrationIlluminant1", type: "Short"},
            50779: {name: "CalibrationIlluminant2", type: "Short"},
            50780: {name: "BestQualityScale", type: "Rational"},
            50781: {name: "RawDataUniqueID", type: "Byte"},
            50827: {name: "OriginalRawFileName", type: "Byte"},
            50828: {name: "OriginalRawFileData", type: "Undefined"},
            50829: {name: "ActiveArea", type: "Short"},
            50830: {name: "MaskedAreas", type: "Short"},
            50831: {name: "AsShotICCProfile", type: "Undefined"},
            50832: {name: "AsShotPreProfileMatrix", type: "SRational"},
            50833: {name: "CurrentICCProfile", type: "Undefined"},
            50834: {name: "CurrentPreProfileMatrix", type: "SRational"},
            50879: {name: "ColorimetricReference", type: "Short"},
            50931: {name: "CameraCalibrationSignature", type: "Byte"},
            50932: {name: "ProfileCalibrationSignature", type: "Byte"},
            50934: {name: "AsShotProfileName", type: "Byte"},
            50935: {name: "NoiseReductionApplied", type: "Rational"},
            50936: {name: "ProfileName", type: "Byte"},
            50937: {name: "ProfileHueSatMapDims", type: "Long"},
            50938: {name: "ProfileHueSatMapData1", type: "Float"},
            50939: {name: "ProfileHueSatMapData2", type: "Float"},
            50940: {name: "ProfileToneCurve", type: "Float"},
            50941: {name: "ProfileEmbedPolicy", type: "Long"},
            50942: {name: "ProfileCopyright", type: "Byte"},
            50964: {name: "ForwardMatrix1", type: "SRational"},
            50965: {name: "ForwardMatrix2", type: "SRational"},
            50966: {name: "PreviewApplicationName", type: "Byte"},
            50967: {name: "PreviewApplicationVersion", type: "Byte"},
            50968: {name: "PreviewSettingsName", type: "Byte"},
            50969: {name: "PreviewSettingsDigest", type: "Byte"},
            50970: {name: "PreviewColorSpace", type: "Long"},
            50971: {name: "PreviewDateTime", type: "Ascii"},
            50972: {name: "RawImageDigest", type: "Undefined"},
            50973: {name: "OriginalRawFileDigest", type: "Undefined"},
            50974: {name: "SubTileBlockSize", type: "Long"},
            50975: {name: "RowInterleaveFactor", type: "Long"},
            50981: {name: "ProfileLookTableDims", type: "Long"},
            50982: {name: "ProfileLookTableData", type: "Float"},
            51008: {name: "OpcodeList1", type: "Undefined"},
            51009: {name: "OpcodeList2", type: "Undefined"},
            51022: {name: "OpcodeList3", type: "Undefined"}
        }, Exif: {
            33434: {name: "ExposureTime", type: "Rational"},
            33437: {name: "FNumber", type: "Rational"},
            34850: {name: "ExposureProgram", type: "Short"},
            34852: {name: "SpectralSensitivity", type: "Ascii"},
            34855: {name: "ISOSpeedRatings", type: "Short"},
            34856: {name: "OECF", type: "Undefined"},
            34864: {name: "SensitivityType", type: "Short"},
            34865: {name: "StandardOutputSensitivity", type: "Long"},
            34866: {name: "RecommendedExposureIndex", type: "Long"},
            34867: {name: "ISOSpeed", type: "Long"},
            34868: {name: "ISOSpeedLatitudeyyy", type: "Long"},
            34869: {name: "ISOSpeedLatitudezzz", type: "Long"},
            36864: {name: "ExifVersion", type: "Undefined"},
            36867: {name: "DateTimeOriginal", type: "Ascii"},
            36868: {name: "DateTimeDigitized", type: "Ascii"},
            37121: {name: "ComponentsConfiguration", type: "Undefined"},
            37122: {name: "CompressedBitsPerPixel", type: "Rational"},
            37377: {name: "ShutterSpeedValue", type: "SRational"},
            37378: {name: "ApertureValue", type: "Rational"},
            37379: {name: "BrightnessValue", type: "SRational"},
            37380: {name: "ExposureBiasValue", type: "SRational"},
            37381: {name: "MaxApertureValue", type: "Rational"},
            37382: {name: "SubjectDistance", type: "Rational"},
            37383: {name: "MeteringMode", type: "Short"},
            37384: {name: "LightSource", type: "Short"},
            37385: {name: "Flash", type: "Short"},
            37386: {name: "FocalLength", type: "Rational"},
            37396: {name: "SubjectArea", type: "Short"},
            37500: {name: "MakerNote", type: "Undefined"},
            37510: {name: "UserComment", type: "Ascii"},
            37520: {name: "SubSecTime", type: "Ascii"},
            37521: {name: "SubSecTimeOriginal", type: "Ascii"},
            37522: {name: "SubSecTimeDigitized", type: "Ascii"},
            40960: {name: "FlashpixVersion", type: "Undefined"},
            40961: {name: "ColorSpace", type: "Short"},
            40962: {name: "PixelXDimension", type: "Long"},
            40963: {name: "PixelYDimension", type: "Long"},
            40964: {name: "RelatedSoundFile", type: "Ascii"},
            40965: {name: "InteroperabilityTag", type: "Long"},
            41483: {name: "FlashEnergy", type: "Rational"},
            41484: {name: "SpatialFrequencyResponse", type: "Undefined"},
            41486: {name: "FocalPlaneXResolution", type: "Rational"},
            41487: {name: "FocalPlaneYResolution", type: "Rational"},
            41488: {name: "FocalPlaneResolutionUnit", type: "Short"},
            41492: {name: "SubjectLocation", type: "Short"},
            41493: {name: "ExposureIndex", type: "Rational"},
            41495: {name: "SensingMethod", type: "Short"},
            41728: {name: "FileSource", type: "Undefined"},
            41729: {name: "SceneType", type: "Undefined"},
            41730: {name: "CFAPattern", type: "Undefined"},
            41985: {name: "CustomRendered", type: "Short"},
            41986: {name: "ExposureMode", type: "Short"},
            41987: {name: "WhiteBalance", type: "Short"},
            41988: {name: "DigitalZoomRatio", type: "Rational"},
            41989: {name: "FocalLengthIn35mmFilm", type: "Short"},
            41990: {name: "SceneCaptureType", type: "Short"},
            41991: {name: "GainControl", type: "Short"},
            41992: {name: "Contrast", type: "Short"},
            41993: {name: "Saturation", type: "Short"},
            41994: {name: "Sharpness", type: "Short"},
            41995: {name: "DeviceSettingDescription", type: "Undefined"},
            41996: {name: "SubjectDistanceRange", type: "Short"},
            42016: {name: "ImageUniqueID", type: "Ascii"},
            42032: {name: "CameraOwnerName", type: "Ascii"},
            42033: {name: "BodySerialNumber", type: "Ascii"},
            42034: {name: "LensSpecification", type: "Rational"},
            42035: {name: "LensMake", type: "Ascii"},
            42036: {name: "LensModel", type: "Ascii"},
            42037: {name: "LensSerialNumber", type: "Ascii"},
            42240: {name: "Gamma", type: "Rational"}
        }, GPS: {
            0: {name: "GPSVersionID", type: "Byte"},
            1: {name: "GPSLatitudeRef", type: "Ascii"},
            2: {name: "GPSLatitude", type: "Rational"},
            3: {name: "GPSLongitudeRef", type: "Ascii"},
            4: {name: "GPSLongitude", type: "Rational"},
            5: {name: "GPSAltitudeRef", type: "Byte"},
            6: {name: "GPSAltitude", type: "Rational"},
            7: {name: "GPSTimeStamp", type: "Rational"},
            8: {name: "GPSSatellites", type: "Ascii"},
            9: {name: "GPSStatus", type: "Ascii"},
            10: {name: "GPSMeasureMode", type: "Ascii"},
            11: {name: "GPSDOP", type: "Rational"},
            12: {name: "GPSSpeedRef", type: "Ascii"},
            13: {name: "GPSSpeed", type: "Rational"},
            14: {name: "GPSTrackRef", type: "Ascii"},
            15: {name: "GPSTrack", type: "Rational"},
            16: {name: "GPSImgDirectionRef", type: "Ascii"},
            17: {name: "GPSImgDirection", type: "Rational"},
            18: {name: "GPSMapDatum", type: "Ascii"},
            19: {name: "GPSDestLatitudeRef", type: "Ascii"},
            20: {name: "GPSDestLatitude", type: "Rational"},
            21: {name: "GPSDestLongitudeRef", type: "Ascii"},
            22: {name: "GPSDestLongitude", type: "Rational"},
            23: {name: "GPSDestBearingRef", type: "Ascii"},
            24: {name: "GPSDestBearing", type: "Rational"},
            25: {name: "GPSDestDistanceRef", type: "Ascii"},
            26: {name: "GPSDestDistance", type: "Rational"},
            27: {name: "GPSProcessingMethod", type: "Undefined"},
            28: {name: "GPSAreaInformation", type: "Undefined"},
            29: {name: "GPSDateStamp", type: "Ascii"},
            30: {name: "GPSDifferential", type: "Short"},
            31: {name: "GPSHPositioningError", type: "Rational"}
        }, Interop: {1: {name: "InteroperabilityIndex", type: "Ascii"}}
    };
    u["0th"] = u.Image, u["1st"] = u.Image, c.TAGS = u, c.ImageIFD = {
        ProcessingSoftware: 11,
        NewSubfileType: 254,
        SubfileType: 255,
        ImageWidth: 256,
        ImageLength: 257,
        BitsPerSample: 258,
        Compression: 259,
        PhotometricInterpretation: 262,
        Threshholding: 263,
        CellWidth: 264,
        CellLength: 265,
        FillOrder: 266,
        DocumentName: 269,
        ImageDescription: 270,
        Make: 271,
        Model: 272,
        StripOffsets: 273,
        Orientation: 274,
        SamplesPerPixel: 277,
        RowsPerStrip: 278,
        StripByteCounts: 279,
        XResolution: 282,
        YResolution: 283,
        PlanarConfiguration: 284,
        GrayResponseUnit: 290,
        GrayResponseCurve: 291,
        T4Options: 292,
        T6Options: 293,
        ResolutionUnit: 296,
        TransferFunction: 301,
        Software: 305,
        DateTime: 306,
        Artist: 315,
        HostComputer: 316,
        Predictor: 317,
        WhitePoint: 318,
        PrimaryChromaticities: 319,
        ColorMap: 320,
        HalftoneHints: 321,
        TileWidth: 322,
        TileLength: 323,
        TileOffsets: 324,
        TileByteCounts: 325,
        SubIFDs: 330,
        InkSet: 332,
        InkNames: 333,
        NumberOfInks: 334,
        DotRange: 336,
        TargetPrinter: 337,
        ExtraSamples: 338,
        SampleFormat: 339,
        SMinSampleValue: 340,
        SMaxSampleValue: 341,
        TransferRange: 342,
        ClipPath: 343,
        XClipPathUnits: 344,
        YClipPathUnits: 345,
        Indexed: 346,
        JPEGTables: 347,
        OPIProxy: 351,
        JPEGProc: 512,
        JPEGInterchangeFormat: 513,
        JPEGInterchangeFormatLength: 514,
        JPEGRestartInterval: 515,
        JPEGLosslessPredictors: 517,
        JPEGPointTransforms: 518,
        JPEGQTables: 519,
        JPEGDCTables: 520,
        JPEGACTables: 521,
        YCbCrCoefficients: 529,
        YCbCrSubSampling: 530,
        YCbCrPositioning: 531,
        ReferenceBlackWhite: 532,
        XMLPacket: 700,
        Rating: 18246,
        RatingPercent: 18249,
        ImageID: 32781,
        CFARepeatPatternDim: 33421,
        CFAPattern: 33422,
        BatteryLevel: 33423,
        Copyright: 33432,
        ExposureTime: 33434,
        ImageResources: 34377,
        ExifTag: 34665,
        InterColorProfile: 34675,
        GPSTag: 34853,
        Interlace: 34857,
        TimeZoneOffset: 34858,
        SelfTimerMode: 34859,
        FlashEnergy: 37387,
        SpatialFrequencyResponse: 37388,
        Noise: 37389,
        FocalPlaneXResolution: 37390,
        FocalPlaneYResolution: 37391,
        FocalPlaneResolutionUnit: 37392,
        ImageNumber: 37393,
        SecurityClassification: 37394,
        ImageHistory: 37395,
        ExposureIndex: 37397,
        TIFFEPStandardID: 37398,
        SensingMethod: 37399,
        XPTitle: 40091,
        XPComment: 40092,
        XPAuthor: 40093,
        XPKeywords: 40094,
        XPSubject: 40095,
        PrintImageMatching: 50341,
        DNGVersion: 50706,
        DNGBackwardVersion: 50707,
        UniqueCameraModel: 50708,
        LocalizedCameraModel: 50709,
        CFAPlaneColor: 50710,
        CFALayout: 50711,
        LinearizationTable: 50712,
        BlackLevelRepeatDim: 50713,
        BlackLevel: 50714,
        BlackLevelDeltaH: 50715,
        BlackLevelDeltaV: 50716,
        WhiteLevel: 50717,
        DefaultScale: 50718,
        DefaultCropOrigin: 50719,
        DefaultCropSize: 50720,
        ColorMatrix1: 50721,
        ColorMatrix2: 50722,
        CameraCalibration1: 50723,
        CameraCalibration2: 50724,
        ReductionMatrix1: 50725,
        ReductionMatrix2: 50726,
        AnalogBalance: 50727,
        AsShotNeutral: 50728,
        AsShotWhiteXY: 50729,
        BaselineExposure: 50730,
        BaselineNoise: 50731,
        BaselineSharpness: 50732,
        BayerGreenSplit: 50733,
        LinearResponseLimit: 50734,
        CameraSerialNumber: 50735,
        LensInfo: 50736,
        ChromaBlurRadius: 50737,
        AntiAliasStrength: 50738,
        ShadowScale: 50739,
        DNGPrivateData: 50740,
        MakerNoteSafety: 50741,
        CalibrationIlluminant1: 50778,
        CalibrationIlluminant2: 50779,
        BestQualityScale: 50780,
        RawDataUniqueID: 50781,
        OriginalRawFileName: 50827,
        OriginalRawFileData: 50828,
        ActiveArea: 50829,
        MaskedAreas: 50830,
        AsShotICCProfile: 50831,
        AsShotPreProfileMatrix: 50832,
        CurrentICCProfile: 50833,
        CurrentPreProfileMatrix: 50834,
        ColorimetricReference: 50879,
        CameraCalibrationSignature: 50931,
        ProfileCalibrationSignature: 50932,
        AsShotProfileName: 50934,
        NoiseReductionApplied: 50935,
        ProfileName: 50936,
        ProfileHueSatMapDims: 50937,
        ProfileHueSatMapData1: 50938,
        ProfileHueSatMapData2: 50939,
        ProfileToneCurve: 50940,
        ProfileEmbedPolicy: 50941,
        ProfileCopyright: 50942,
        ForwardMatrix1: 50964,
        ForwardMatrix2: 50965,
        PreviewApplicationName: 50966,
        PreviewApplicationVersion: 50967,
        PreviewSettingsName: 50968,
        PreviewSettingsDigest: 50969,
        PreviewColorSpace: 50970,
        PreviewDateTime: 50971,
        RawImageDigest: 50972,
        OriginalRawFileDigest: 50973,
        SubTileBlockSize: 50974,
        RowInterleaveFactor: 50975,
        ProfileLookTableDims: 50981,
        ProfileLookTableData: 50982,
        OpcodeList1: 51008,
        OpcodeList2: 51009,
        OpcodeList3: 51022,
        NoiseProfile: 51041
    }, c.ExifIFD = {
        ExposureTime: 33434,
        FNumber: 33437,
        ExposureProgram: 34850,
        SpectralSensitivity: 34852,
        ISOSpeedRatings: 34855,
        OECF: 34856,
        SensitivityType: 34864,
        StandardOutputSensitivity: 34865,
        RecommendedExposureIndex: 34866,
        ISOSpeed: 34867,
        ISOSpeedLatitudeyyy: 34868,
        ISOSpeedLatitudezzz: 34869,
        ExifVersion: 36864,
        DateTimeOriginal: 36867,
        DateTimeDigitized: 36868,
        ComponentsConfiguration: 37121,
        CompressedBitsPerPixel: 37122,
        ShutterSpeedValue: 37377,
        ApertureValue: 37378,
        BrightnessValue: 37379,
        ExposureBiasValue: 37380,
        MaxApertureValue: 37381,
        SubjectDistance: 37382,
        MeteringMode: 37383,
        LightSource: 37384,
        Flash: 37385,
        FocalLength: 37386,
        SubjectArea: 37396,
        MakerNote: 37500,
        UserComment: 37510,
        SubSecTime: 37520,
        SubSecTimeOriginal: 37521,
        SubSecTimeDigitized: 37522,
        FlashpixVersion: 40960,
        ColorSpace: 40961,
        PixelXDimension: 40962,
        PixelYDimension: 40963,
        RelatedSoundFile: 40964,
        InteroperabilityTag: 40965,
        FlashEnergy: 41483,
        SpatialFrequencyResponse: 41484,
        FocalPlaneXResolution: 41486,
        FocalPlaneYResolution: 41487,
        FocalPlaneResolutionUnit: 41488,
        SubjectLocation: 41492,
        ExposureIndex: 41493,
        SensingMethod: 41495,
        FileSource: 41728,
        SceneType: 41729,
        CFAPattern: 41730,
        CustomRendered: 41985,
        ExposureMode: 41986,
        WhiteBalance: 41987,
        DigitalZoomRatio: 41988,
        FocalLengthIn35mmFilm: 41989,
        SceneCaptureType: 41990,
        GainControl: 41991,
        Contrast: 41992,
        Saturation: 41993,
        Sharpness: 41994,
        DeviceSettingDescription: 41995,
        SubjectDistanceRange: 41996,
        ImageUniqueID: 42016,
        CameraOwnerName: 42032,
        BodySerialNumber: 42033,
        LensSpecification: 42034,
        LensMake: 42035,
        LensModel: 42036,
        LensSerialNumber: 42037,
        Gamma: 42240
    }, c.GPSIFD = {
        GPSVersionID: 0,
        GPSLatitudeRef: 1,
        GPSLatitude: 2,
        GPSLongitudeRef: 3,
        GPSLongitude: 4,
        GPSAltitudeRef: 5,
        GPSAltitude: 6,
        GPSTimeStamp: 7,
        GPSSatellites: 8,
        GPSStatus: 9,
        GPSMeasureMode: 10,
        GPSDOP: 11,
        GPSSpeedRef: 12,
        GPSSpeed: 13,
        GPSTrackRef: 14,
        GPSTrack: 15,
        GPSImgDirectionRef: 16,
        GPSImgDirection: 17,
        GPSMapDatum: 18,
        GPSDestLatitudeRef: 19,
        GPSDestLatitude: 20,
        GPSDestLongitudeRef: 21,
        GPSDestLongitude: 22,
        GPSDestBearingRef: 23,
        GPSDestBearing: 24,
        GPSDestDistanceRef: 25,
        GPSDestDistance: 26,
        GPSProcessingMethod: 27,
        GPSAreaInformation: 28,
        GPSDateStamp: 29,
        GPSDifferential: 30,
        GPSHPositioningError: 31
    }, c.InteropIFD = {InteroperabilityIndex: 1}, c.GPSHelper = {
        degToDmsRational: function (e) {
            var t = Math.abs(e), a = t % 1 * 60, n = a % 1 * 60, i = Math.floor(t), r = Math.floor(a),
                o = Math.round(100 * n);
            return [[i, 1], [r, 1], [o, 100]]
        }, dmsRationalToDeg: function (e, t) {
            var a = "S" === t || "W" === t ? -1 : 1,
                n = e[0][0] / e[0][1] + e[1][0] / e[1][1] / 60 + e[2][0] / e[2][1] / 3600;
            return n * a
        }
    }, "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = c), exports.piexif = c) : window.piexif = c
}();

/*!
 * bootstrap-fileinput v5.5.2
 * http://plugins.krajee.com/file-input
 *
 * Author: Kartik Visweswaran
 * Copyright: 2014 - 2022, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD-3-Clause
 * https://github.com/kartik-v/bootstrap-fileinput/blob/master/LICENSE.md
 */
!function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof module && "object" == typeof module.exports ? require("jquery") : window.jQuery)
}(function (e) {
    "use strict";
    e.fn.fileinputLocales = {}, e.fn.fileinputThemes = {}, e.fn.fileinputBsVersion || (e.fn.fileinputBsVersion = window.bootstrap && window.bootstrap.Alert && window.bootstrap.Alert.VERSION || window.Alert && window.Alert.VERSION || "3.x.x"), String.prototype.setTokens = function (e) {
        var t, i, a = this.toString();
        for (t in e) e.hasOwnProperty(t) && (i = new RegExp("{" + t + "}", "g"), a = a.replace(i, e[t]));
        return a
    }, Array.prototype.flatMap || (Array.prototype.flatMap = function (e) {
        return [].concat(this.map(e))
    });
    var t, i;
    t = {
        FRAMES: ".kv-preview-thumb",
        SORT_CSS: "file-sortable",
        INIT_FLAG: "init-",
        SCRIPT_SRC: document && document.currentScript && document.currentScript.src || null,
        OBJECT_PARAMS: '<param name="controller" value="true" />\n<param name="allowFullScreen" value="true" />\n<param name="allowScriptAccess" value="always" />\n<param name="autoPlay" value="false" />\n<param name="autoStart" value="false" />\n<param name="quality" value="high" />\n',
        DEFAULT_PREVIEW: '<div class="file-preview-other">\n<span class="{previewFileIconClass}">{previewFileIcon}</span>\n</div>',
        MODAL_ID: "kvFileinputModal",
        MODAL_EVENTS: ["show", "shown", "hide", "hidden", "loaded"],
        logMessages: {
            ajaxError: "{status}: {error}. Error Details: {text}.",
            badDroppedFiles: "Error scanning dropped files!",
            badExifParser: "Error loading the piexif.js library. {details}",
            badInputType: 'The input "type" must be set to "file" for initializing the "bootstrap-fileinput" plugin.',
            exifWarning: 'To avoid this warning, either set "autoOrientImage" to "false" OR ensure you have loaded the "piexif.js" library correctly on your page before the "fileinput.js" script.',
            invalidChunkSize: 'Invalid upload chunk size: "{chunkSize}". Resumable uploads are disabled.',
            invalidThumb: 'Invalid thumb frame with id: "{id}".',
            noResumableSupport: "The browser does not support resumable or chunk uploads.",
            noUploadUrl: 'The "uploadUrl" is not set. Ajax uploads and resumable uploads have been disabled.',
            retryStatus: "Retrying upload for chunk # {chunk} for {filename}... retry # {retry}.",
            chunkQueueError: "Could not push task to ajax pool for chunk index # {index}.",
            resumableMaxRetriesReached: "Maximum resumable ajax retries ({n}) reached.",
            resumableRetryError: "Could not retry the resumable request (try # {n})... aborting.",
            resumableAborting: "Aborting / cancelling the resumable request.",
            resumableRequestError: "Error processing resumable request. {msg}"
        },
        objUrl: window.URL || window.webkitURL,
        getZoomPlaceholder: function () {
            var e, i = t.SCRIPT_SRC, a = "?kvTemp__2873389129__=";
            return i ? (e = i.substring(0, i.lastIndexOf("/")), e.substring(0, e.lastIndexOf("/") + 1) + "img/loading.gif" + a) : a
        },
        isBs: function (t) {
            var i = e.trim((e.fn.fileinputBsVersion || "") + "");
            return t = parseInt(t, 10), i ? t === parseInt(i.charAt(0), 10) : 4 === t
        },
        defaultButtonCss: function (e) {
            return "btn-default btn-" + (e ? "" : "outline-") + "secondary"
        },
        now: function () {
            return (new Date).getTime()
        },
        round: function (e) {
            return e = parseFloat(e), isNaN(e) ? 0 : Math.floor(Math.round(e))
        },
        getArray: function (e) {
            var t, i = [], a = e && e.length || 0;
            for (t = 0; a > t; t++) i.push(e[t]);
            return i
        },
        getFileRelativePath: function (e) {
            return String(e.newPath || e.relativePath || e.webkitRelativePath || t.getFileName(e) || null)
        },
        getFileId: function (e, i) {
            var a = t.getFileRelativePath(e);
            return "function" == typeof i ? i(e) : e && a ? e.size + "_" + encodeURIComponent(a).replace(/%/g, "_") : null
        },
        getFrameSelector: function (e, t) {
            return t = t || "", '[id="' + e + '"]' + t
        },
        getZoomSelector: function (e, i) {
            return t.getFrameSelector("zoom-" + e, i)
        },
        getFrameElement: function (e, i, a) {
            return e.find(t.getFrameSelector(i, a))
        },
        getZoomElement: function (e, i, a) {
            return e.find(t.getZoomSelector(i, a))
        },
        getElapsed: function (i) {
            var a = i, r = "", n = {},
                o = {year: 31536e3, month: 2592e3, week: 604800, day: 86400, hour: 3600, minute: 60, second: 1};
            return t.getObjectKeys(o).forEach(function (e) {
                n[e] = Math.floor(a / o[e]), a -= n[e] * o[e]
            }), e.each(n, function (e, t) {
                t > 0 && (r += (r ? " " : "") + t + e.substring(0, 1))
            }), r
        },
        debounce: function (e, t) {
            var i;
            return function () {
                var a = arguments, r = this;
                clearTimeout(i), i = setTimeout(function () {
                    e.apply(r, a)
                }, t)
            }
        },
        stopEvent: function (e) {
            e.stopPropagation(), e.preventDefault()
        },
        getFileName: function (e) {
            return e ? e.fileName || e.name || "" : ""
        },
        createObjectURL: function (e) {
            return t.objUrl && t.objUrl.createObjectURL && e ? t.objUrl.createObjectURL(e) : ""
        },
        revokeObjectURL: function (e) {
            t.objUrl && t.objUrl.revokeObjectURL && e && t.objUrl.revokeObjectURL(e)
        },
        compare: function (e, t, i) {
            return void 0 !== e && (i ? e === t : e.match(t))
        },
        isIE: function (e) {
            var t, i;
            return "Microsoft Internet Explorer" !== navigator.appName ? !1 : 10 === e ? new RegExp("msie\\s" + e, "i").test(navigator.userAgent) : (t = document.createElement("div"), t.innerHTML = "<!--[if IE " + e + "]> <i></i> <![endif]-->", i = t.getElementsByTagName("i").length, document.body.appendChild(t), t.parentNode.removeChild(t), i)
        },
        canOrientImage: function (t) {
            var i = e(document.createElement("img")).css({width: "1px", height: "1px"}).insertAfter(t),
                a = i.css("image-orientation");
            return i.remove(), !!a
        },
        canAssignFilesToInput: function () {
            var e = document.createElement("input");
            try {
                return e.type = "file", e.files = null, !0
            } catch (t) {
                return !1
            }
        },
        getDragDropFolders: function (e) {
            var t, i, a = e ? e.length : 0, r = 0;
            if (a > 0 && e[0].webkitGetAsEntry()) for (t = 0; a > t; t++) i = e[t].webkitGetAsEntry(), i && i.isDirectory && r++;
            return r
        },
        initModal: function (t) {
            var i = e("body");
            i.length && t.appendTo(i)
        },
        isFunction: function (e) {
            return "function" == typeof e
        },
        isEmpty: function (i, a) {
            return void 0 === i || null === i || "" === i ? !0 : t.isString(i) && a ? "" === e.trim(i) : t.isArray(i) ? 0 === i.length : !(!e.isPlainObject(i) || !e.isEmptyObject(i))
        },
        isArray: function (e) {
            return Array.isArray(e) || "[object Array]" === Object.prototype.toString.call(e)
        },
        isString: function (e) {
            return "[object String]" === Object.prototype.toString.call(e)
        },
        ifSet: function (e, t, i) {
            return i = i || "", t && "object" == typeof t && e in t ? t[e] : i
        },
        cleanArray: function (e) {
            return e instanceof Array || (e = []), e.filter(function (e) {
                return void 0 !== e && null !== e
            })
        },
        spliceArray: function (t, i, a) {
            var r, n, o = 0, s = [];
            if (!(t instanceof Array)) return [];
            for (n = e.extend(!0, [], t), a && n.reverse(), r = 0; r < n.length; r++) r !== i && (s[o] = n[r], o++);
            return a && s.reverse(), s
        },
        getNum: function (e, t) {
            return t = t || 0, "number" == typeof e ? e : ("string" == typeof e && (e = parseFloat(e)), isNaN(e) ? t : e)
        },
        hasFileAPISupport: function () {
            return !(!window.File || !window.FileReader)
        },
        hasDragDropSupport: function () {
            var e = document.createElement("div");
            return !t.isIE(9) && (void 0 !== e.draggable || void 0 !== e.ondragstart && void 0 !== e.ondrop)
        },
        hasFileUploadSupport: function () {
            return t.hasFileAPISupport() && window.FormData
        },
        hasBlobSupport: function () {
            try {
                return !!window.Blob && Boolean(new Blob)
            } catch (e) {
                return !1
            }
        },
        hasArrayBufferViewSupport: function () {
            try {
                return 100 === new Blob([new Uint8Array(100)]).size
            } catch (e) {
                return !1
            }
        },
        hasResumableUploadSupport: function () {
            return t.hasFileUploadSupport() && t.hasBlobSupport() && t.hasArrayBufferViewSupport() && (!!Blob.prototype.webkitSlice || !!Blob.prototype.mozSlice || !!Blob.prototype.slice || !1)
        },
        dataURI2Blob: function (e) {
            var i, a, r, n, o, s,
                l = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
                d = t.hasBlobSupport(), c = (d || l) && window.atob && window.ArrayBuffer && window.Uint8Array;
            if (!c) return null;
            for (i = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : decodeURIComponent(e.split(",")[1]), a = new ArrayBuffer(i.length), r = new Uint8Array(a), n = 0; n < i.length; n += 1) r[n] = i.charCodeAt(n);
            return o = e.split(",")[0].split(":")[1].split(";")[0], d ? new Blob([t.hasArrayBufferViewSupport() ? r : a], {type: o}) : (s = new l, s.append(a), s.getBlob(o))
        },
        arrayBuffer2String: function (e) {
            if (window.TextDecoder) return new TextDecoder("utf-8").decode(e);
            var t, i, a, r, n = Array.prototype.slice.apply(new Uint8Array(e)), o = "", s = 0;
            for (t = n.length; t > s;) switch (i = n[s++], i >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    o += String.fromCharCode(i);
                    break;
                case 12:
                case 13:
                    a = n[s++], o += String.fromCharCode((31 & i) << 6 | 63 & a);
                    break;
                case 14:
                    a = n[s++], r = n[s++], o += String.fromCharCode((15 & i) << 12 | (63 & a) << 6 | (63 & r) << 0)
            }
            return o
        },
        isHtml: function (e) {
            var t = document.createElement("div");
            t.innerHTML = e;
            for (var i = t.childNodes, a = i.length; a--;) if (1 === i[a].nodeType) return !0;
            return !1
        },
        isPdf: function (e) {
            return t.isEmpty(e) ? !1 : (e = e.toString().trim().replace(/\n/g, " "), 0 === e.length ? !1 : void 0)
        },
        isSvg: function (e) {
            return t.isEmpty(e) ? !1 : (e = e.toString().trim().replace(/\n/g, " "), 0 === e.length ? !1 : e.match(/^\s*<\?xml/i) && (e.match(/<!DOCTYPE svg/i) || e.match(/<svg/i)))
        },
        getMimeType: function (e, t, i) {
            var a = e || "";
            switch (a) {
                case"ffd8ffe0":
                case"ffd8ffe1":
                case"ffd8ffe2":
                    return "image/jpeg";
                case"89504e47":
                    return "image/png";
                case"47494638":
                    return "image/gif";
                case"49492a00":
                    return "image/tiff";
                case"52494646":
                    return "image/webp";
                case"41433130":
                    return "image/vnd.dwg";
                case"66747970":
                    return "video/3gp";
                case"4f676753":
                    return "video/ogg";
                case"1a45dfa3":
                    return "video/mkv";
                case"000001ba":
                case"000001b3":
                    return "video/mpeg";
                case"3026b275":
                    return "video/wmv";
                case"25504446":
                    return "application/pdf";
                case"25215053":
                    return "application/ps";
                case"504b0304":
                case"504b0506":
                case"504b0508":
                    return "application/zip";
                case"377abcaf":
                    return "application/7z";
                case"75737461":
                    return "application/tar";
                case"7801730d":
                    return "application/dmg";
                default:
                    switch (a.substring(0, 6)) {
                        case"435753":
                            return "application/x-shockwave-flash";
                        case"494433":
                            return "audio/mp3";
                        case"425a68":
                            return "application/bzip";
                        default:
                            switch (a.substring(0, 4)) {
                                case"424d":
                                    return "image/bmp";
                                case"fffb":
                                    return "audio/mp3";
                                case"4d5a":
                                    return "application/exe";
                                case"1f9d":
                                case"1fa0":
                                    return "application/zip";
                                case"1f8b":
                                    return "application/gzip";
                                default:
                                    return t && !t.match(/[^\u0000-\u007f]/) ? "application/text-plain" : i
                            }
                    }
            }
        },
        addCss: function (e, t) {
            e.removeClass(t).addClass(t)
        },
        getElement: function (i, a, r) {
            return t.isEmpty(i) || t.isEmpty(i[a]) ? r : e(i[a])
        },
        createElement: function (t, i) {
            return i = i || "div", e(e.parseHTML("<" + i + ">" + t + "</" + i + ">"))
        },
        uniqId: function () {
            return ((new Date).getTime() + Math.floor(Math.random() * Math.pow(10, 15))).toString(36)
        },
        cspBuffer: {
            CSP_ATTRIB: "data-csp-01928735", domElementsStyles: {}, stash: function (i) {
                var a = this, r = e.parseHTML("<div>" + i + "</div>"), n = e(r);
                n.find("[style]").each(function (i, r) {
                    var n = e(r), o = n[0].style, s = t.uniqId(), l = {};
                    o && o.length && (e(o).each(function () {
                        l[this] = o[this]
                    }), a.domElementsStyles[s] = l, n.removeAttr("style").attr(a.CSP_ATTRIB, s))
                }), n.filter("*").removeAttr("style");
                var o = Object.values ? Object.values(r) : Object.keys(r).map(function (e) {
                    return r[e]
                });
                return o.flatMap(function (e) {
                    return e.innerHTML
                }).join("")
            }, apply: function (t) {
                var i = this, a = e(t);
                a.find("[" + i.CSP_ATTRIB + "]").each(function (t, a) {
                    var r = e(a), n = r.attr(i.CSP_ATTRIB), o = i.domElementsStyles[n];
                    o && r.css(o), r.removeAttr(i.CSP_ATTRIB)
                }), i.domElementsStyles = {}
            }
        },
        setHtml: function (e, i) {
            var a = t.cspBuffer;
            return e.html(a.stash(i)), a.apply(e), e
        },
        htmlEncode: function (e, t) {
            return void 0 === e ? t || null : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
        },
        replaceTags: function (t, i) {
            var a = t;
            return i ? (e.each(i, function (e, t) {
                "function" == typeof t && (t = t()), a = a.split(e).join(t)
            }), a) : a
        },
        cleanMemory: function (e) {
            var i = e.is("img") ? e.attr("src") : e.find("source").attr("src");
            t.revokeObjectURL(i)
        },
        findFileName: function (e) {
            var t = e.lastIndexOf("/");
            return -1 === t && (t = e.lastIndexOf("\\")), e.split(e.substring(t, t + 1)).pop()
        },
        checkFullScreen: function () {
            return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
        },
        toggleFullScreen: function (e) {
            var i = document, a = i.documentElement, r = t.checkFullScreen();
            a && e && !r ? a.requestFullscreen ? a.requestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : r && (i.exitFullscreen ? i.exitFullscreen() : i.msExitFullscreen ? i.msExitFullscreen() : i.mozCancelFullScreen ? i.mozCancelFullScreen() : i.webkitExitFullscreen && i.webkitExitFullscreen())
        },
        moveArray: function (t, i, a, r) {
            var n = e.extend(!0, [], t);
            if (r && n.reverse(), a >= n.length) for (var o = a - n.length; o-- + 1;) n.push(void 0);
            return n.splice(a, 0, n.splice(i, 1)[0]), r && n.reverse(), n
        },
        closeButton: function (e) {
            return e = (t.isBs(5) ? "btn-close" : "close") + (e ? " " + e : ""), '<button type="button" class="btn btn-light bg-transparent btn-sm ' + e + '" aria-label="Close">\n' + (t.isBs(5) ? "" : '  <span aria-hidden="true">&times;</span>\n') + "</button>"
        },
        getRotation: function (e) {
            switch (e) {
                case 2:
                    return "rotateY(180deg)";
                case 3:
                    return "rotate(180deg)";
                case 4:
                    return "rotate(180deg) rotateY(180deg)";
                case 5:
                    return "rotate(270deg) rotateY(180deg)";
                case 6:
                    return "rotate(90deg)";
                case 7:
                    return "rotate(90deg) rotateY(180deg)";
                case 8:
                    return "rotate(270deg)";
                default:
                    return ""
            }
        },
        setTransform: function (e, t) {
            e && (e.style.transform = t, e.style.webkitTransform = t, e.style["-moz-transform"] = t, e.style["-ms-transform"] = t, e.style["-o-transform"] = t)
        },
        getObjectKeys: function (t) {
            var i = [];
            return t && e.each(t, function (e) {
                i.push(e)
            }), i
        },
        getObjectSize: function (e) {
            return t.getObjectKeys(e).length
        },
        whenAll: function (i) {
            var a, r, n, o, s, l, d = [].slice, c = 1 === arguments.length && t.isArray(i) ? i : d.call(arguments),
                u = e.Deferred(), f = 0, p = c.length, g = p;
            for (n = o = s = Array(p), l = function (e, t, i) {
                return function () {
                    i !== c && f++, u.notifyWith(t[e] = this, i[e] = d.call(arguments)), --g || u[(f ? "reject" : "resolve") + "With"](t, i)
                }
            }, a = 0; p > a; a++) (r = c[a]) && e.isFunction(r.promise) ? r.promise().done(l(a, s, c)).fail(l(a, n, o)) : (u.notifyWith(this, r), --g);
            return g || u.resolveWith(s, c), u.promise()
        }
    }, i = function (i, a) {
        var r = this;
        r.$element = e(i), r.$parent = r.$element.parent(), r._validate() && (r.isPreviewable = t.hasFileAPISupport(), r.isIE9 = t.isIE(9), r.isIE10 = t.isIE(10), (r.isPreviewable || r.isIE9) && (r._init(a), r._listen()), r.$element.removeClass("file-loading"))
    }, i.prototype = {
        constructor: i, _cleanup: function () {
            var e = this;
            e.reader = null, e.clearFileStack(), e.fileBatchCompleted = !0, e.isError = !1, e.isDuplicateError = !1, e.isPersistentError = !1, e.cancelling = !1, e.paused = !1, e.lastProgress = 0, e._initAjax()
        }, _isAborted: function () {
            var e = this;
            return e.cancelling || e.paused
        }, _initAjax: function () {
            var i = this, a = i.taskManager = {
                pool: {}, addPool: function (e) {
                    return a.pool[e] = new a.TasksPool(e)
                }, getPool: function (e) {
                    return a.pool[e]
                }, addTask: function (e, t) {
                    return new a.Task(e, t)
                }, TasksPool: function (i) {
                    var r = this;
                    r.id = i, r.cancelled = !1, r.cancelledDeferrer = e.Deferred(), r.tasks = {}, r.addTask = function (e, t) {
                        return r.tasks[e] = new a.Task(e, t)
                    }, r.size = function () {
                        return t.getObjectSize(r.tasks)
                    }, r.run = function (i) {
                        var a, n, o, s = 0, l = !1, d = t.getObjectKeys(r.tasks).map(function (e) {
                            return r.tasks[e]
                        }), c = [], u = e.Deferred();
                        if (r.cancelled) return r.cancelledDeferrer.resolve(), u.reject();
                        if (!i) {
                            var f = t.getObjectKeys(r.tasks).map(function (e) {
                                return r.tasks[e].deferred
                            });
                            return t.whenAll(f).done(function () {
                                var e = t.getArray(arguments);
                                r.cancelled ? (u.reject.apply(null, e), r.cancelledDeferrer.resolve()) : (u.resolve.apply(null, e), r.cancelledDeferrer.reject())
                            }).fail(function () {
                                var e = t.getArray(arguments);
                                u.reject.apply(null, e), r.cancelled ? r.cancelledDeferrer.resolve() : r.cancelledDeferrer.reject()
                            }), e.each(r.tasks, function (e) {
                                a = r.tasks[e], a.run()
                            }), u
                        }
                        for (n = function (t) {
                            e.when(t.deferred).fail(function () {
                                l = !0, o.apply(null, arguments)
                            }).always(o)
                        }, o = function () {
                            var e = t.getArray(arguments);
                            return u.notify(e), c.push(e), r.cancelled ? (u.reject.apply(null, c), void r.cancelledDeferrer.resolve()) : (c.length === r.size() && (l ? u.reject.apply(null, c) : u.resolve.apply(null, c)), void (d.length && (a = d.shift(), n(a), a.run())))
                        }; d.length && s++ < i;) a = d.shift(), n(a), a.run();
                        return u
                    }, r.cancel = function () {
                        return r.cancelled = !0, r.cancelledDeferrer
                    }
                }, Task: function (i, a) {
                    var r = this;
                    r.id = i, r.deferred = e.Deferred(), r.logic = a, r.context = null, r.run = function () {
                        var e = t.getArray(arguments);
                        return e.unshift(r.deferred), a.apply(r.context, e), r.deferred
                    }, r.runWithContext = function (e) {
                        return r.context = e, r.run()
                    }
                }
            };
            i.ajaxQueue = [], i.ajaxRequests = [], i.ajaxPool = null, i.ajaxAborted = !1
        }, _init: function (i, a) {
            var r, n, o, s, l = this, d = l.$element;
            l.options = i, l.zoomPlaceholder = t.getZoomPlaceholder(), l.canOrientImage = t.canOrientImage(d), e.each(i, function (e, i) {
                switch (e) {
                    case"minFileCount":
                    case"maxFileCount":
                    case"maxTotalFileCount":
                    case"minFileSize":
                    case"maxFileSize":
                    case"maxFilePreviewSize":
                    case"resizeQuality":
                    case"resizeIfSizeMoreThan":
                    case"progressUploadThreshold":
                    case"initialPreviewCount":
                    case"zoomModalHeight":
                    case"minImageHeight":
                    case"maxImageHeight":
                    case"minImageWidth":
                    case"maxImageWidth":
                    case"bytesToKB":
                        l[e] = t.getNum(i);
                        break;
                    default:
                        l[e] = i
                }
            }), (!l.bytesToKB || l.bytesToKB <= 0) && (l.bytesToKB = 1024), void 0 === l.errorCloseButton && (l.errorCloseButton = t.closeButton("kv-error-close" + (t.isBs(5) ? "  float-end" : ""))), l.maxTotalFileCount > 0 && l.maxTotalFileCount < l.maxFileCount && (l.maxTotalFileCount = l.maxFileCount), l.rtl && (s = l.previewZoomButtonIcons.prev, l.previewZoomButtonIcons.prev = l.previewZoomButtonIcons.next, l.previewZoomButtonIcons.next = s), !isNaN(l.maxAjaxThreads) && l.maxAjaxThreads < l.resumableUploadOptions.maxThreads && (l.resumableUploadOptions.maxThreads = l.maxAjaxThreads), l._initFileManager(), "function" == typeof l.autoOrientImage && (l.autoOrientImage = l.autoOrientImage()), "function" == typeof l.autoOrientImageInitial && (l.autoOrientImageInitial = l.autoOrientImageInitial()), a || l._cleanup(), l.duplicateErrors = [], l.$form = d.closest("form"), l._initTemplateDefaults(), l.uploadFileAttr = t.isEmpty(d.attr("name")) ? "file_data" : d.attr("name"), o = l._getLayoutTemplate("progress"), l.progressTemplate = o.replace("{class}", l.progressClass), l.progressInfoTemplate = o.replace("{class}", l.progressInfoClass), l.progressPauseTemplate = o.replace("{class}", l.progressPauseClass), l.progressCompleteTemplate = o.replace("{class}", l.progressCompleteClass), l.progressErrorTemplate = o.replace("{class}", l.progressErrorClass), l.isDisabled = d.attr("disabled") || d.attr("readonly"), l.isDisabled && d.attr("disabled", !0), l.isClickable = l.browseOnZoneClick && l.showPreview && (l.dropZoneEnabled || !t.isEmpty(l.defaultPreviewContent)), l.isAjaxUpload = t.hasFileUploadSupport() && !t.isEmpty(l.uploadUrl), l.dropZoneEnabled = t.hasDragDropSupport() && l.dropZoneEnabled, l.isAjaxUpload || (l.dropZoneEnabled = l.dropZoneEnabled && t.canAssignFilesToInput()), l.slug = "function" == typeof i.slugCallback ? i.slugCallback : l._slugDefault, l.mainTemplate = l.showCaption ? l._getLayoutTemplate("main1") : l._getLayoutTemplate("main2"), l.captionTemplate = l._getLayoutTemplate("caption"), l.previewGenericTemplate = l._getPreviewTemplate("generic"), !l.imageCanvas && l.resizeImage && (l.maxImageWidth || l.maxImageHeight) && (l.imageCanvas = document.createElement("canvas"), l.imageCanvasContext = l.imageCanvas.getContext("2d")), t.isEmpty(d.attr("id")) && d.attr("id", t.uniqId()), l.namespace = ".fileinput_" + d.attr("id").replace(/-/g, "_"), void 0 === l.$container ? l.$container = l._createContainer() : l._refreshContainer(), n = l.$container, l.$dropZone = n.find(".file-drop-zone"), l.$progress = n.find(".kv-upload-progress"), l.$btnUpload = n.find(".fileinput-upload"), l.$captionContainer = t.getElement(i, "elCaptionContainer", n.find(".file-caption")), l.$caption = t.getElement(i, "elCaptionText", n.find(".file-caption-name")), t.isEmpty(l.msgPlaceholder) || (r = d.attr("multiple") ? l.filePlural : l.fileSingle, l.$caption.attr("placeholder", l.msgPlaceholder.replace("{files}", r))), l.$captionIcon = l.$captionContainer.find(".file-caption-icon"), l.$previewContainer = t.getElement(i, "elPreviewContainer", n.find(".file-preview")), l.$preview = t.getElement(i, "elPreviewImage", n.find(".file-preview-thumbnails")), l.$previewStatus = t.getElement(i, "elPreviewStatus", n.find(".file-preview-status")), l.$errorContainer = t.getElement(i, "elErrorContainer", l.$previewContainer.find(".kv-fileinput-error")), l._validateDisabled(), t.isEmpty(l.msgErrorClass) || t.addCss(l.$errorContainer, l.msgErrorClass), a ? l._errorsExist() || l.$errorContainer.hide() : (l._resetErrors(), l.$errorContainer.hide(), l.previewInitId = "thumb-" + d.attr("id"), l._initPreviewCache(), l._initPreview(!0), l._initPreviewActions(), l.$parent.hasClass("file-loading") && (l.$container.insertBefore(l.$parent), l.$parent.remove())), l._setFileDropZoneTitle(), d.attr("disabled") && l.disable(), l._initZoom(), l.hideThumbnailContent && t.addCss(l.$preview, "hide-content")
        }, _initFileManager: function () {
            var i = this;
            i.uploadStartTime = t.now(), i.fileManager = {
                stack: {},
                filesProcessed: [],
                errors: [],
                loadedImages: {},
                totalImages: 0,
                totalFiles: null,
                totalSize: null,
                uploadedSize: 0,
                stats: {},
                bpsLog: [],
                bps: 0,
                initStats: function (e) {
                    var a = {started: t.now()};
                    e ? i.fileManager.stats[e] = a : i.fileManager.stats = a
                },
                getUploadStats: function (e, a, r) {
                    var n, o = i.fileManager, s = e ? o.stats[e] && o.stats[e].started || t.now() : i.uploadStartTime,
                        l = (t.now() - s) / 1e3, d = Math.ceil(l ? a / l : 0), c = r - a,
                        u = o.bpsLog.length ? i.bitrateUpdateDelay : 0;
                    return setTimeout(function () {
                        var e, t, i, a = 0, r = 0;
                        for (o.bpsLog.push(d), o.bpsLog.sort(function (e, t) {
                            return e - t
                        }), t = o.bpsLog.length, i = t > 10 ? t - 10 : Math.ceil(t / 2), e = t; e > i; e--) r = parseFloat(o.bpsLog[e]), a++;
                        o.bps = 64 * (a > 0 ? r / a : 0)
                    }, u), n = {
                        fileId: e,
                        started: s,
                        elapsed: l,
                        loaded: a,
                        total: r,
                        bps: o.bps,
                        bitrate: i._getSize(o.bps, !1, i.bitRateUnits),
                        pendingBytes: c
                    }, e ? o.stats[e] = n : o.stats = n, n
                },
                exists: function (t) {
                    return -1 !== e.inArray(t, i.fileManager.getIdList())
                },
                count: function () {
                    return i.fileManager.getIdList().length
                },
                total: function () {
                    var e = i.fileManager;
                    return e.totalFiles || (e.totalFiles = e.count()), e.totalFiles
                },
                getTotalSize: function () {
                    var t = i.fileManager;
                    return t.totalSize ? t.totalSize : (t.totalSize = 0, e.each(i.getFileStack(), function (e, i) {
                        var a = parseFloat(i.size);
                        t.totalSize += isNaN(a) ? 0 : a
                    }), t.totalSize)
                },
                add: function (e, a) {
                    a || (a = i.fileManager.getId(e)), a && (i.fileManager.stack[a] = {
                        file: e,
                        name: t.getFileName(e),
                        relativePath: t.getFileRelativePath(e),
                        size: e.size,
                        nameFmt: i._getFileName(e, ""),
                        sizeFmt: i._getSize(e.size)
                    })
                },
                remove: function (e) {
                    var t = i._getThumbFileId(e);
                    i.fileManager.removeFile(t)
                },
                removeFile: function (e) {
                    var t = i.fileManager;
                    e && (delete t.stack[e], delete t.loadedImages[e])
                },
                move: function (t, a) {
                    var r = {}, n = i.fileManager.stack;
                    (t || a) && t !== a && (e.each(n, function (e, i) {
                        e !== t && (r[e] = i), e === a && (r[t] = n[t])
                    }), i.fileManager.stack = r)
                },
                list: function () {
                    var t = [];
                    return e.each(i.getFileStack(), function (e, i) {
                        i && i.file && t.push(i.file)
                    }), t
                },
                isPending: function (t) {
                    return -1 === e.inArray(t, i.fileManager.filesProcessed) && i.fileManager.exists(t)
                },
                isProcessed: function () {
                    var t = !0, a = i.fileManager;
                    return e.each(i.getFileStack(), function (e) {
                        a.isPending(e) && (t = !1)
                    }), t
                },
                clear: function () {
                    var e = i.fileManager;
                    i.isDuplicateError = !1, i.isPersistentError = !1, e.totalFiles = null, e.totalSize = null, e.uploadedSize = 0, e.stack = {}, e.errors = [], e.filesProcessed = [], e.stats = {}, e.bpsLog = [], e.bps = 0, e.clearImages()
                },
                clearImages: function () {
                    i.fileManager.loadedImages = {}, i.fileManager.totalImages = 0
                },
                addImage: function (e, t) {
                    i.fileManager.loadedImages[e] = t
                },
                removeImage: function (e) {
                    delete i.fileManager.loadedImages[e]
                },
                getImageIdList: function () {
                    return t.getObjectKeys(i.fileManager.loadedImages)
                },
                getImageCount: function () {
                    return i.fileManager.getImageIdList().length
                },
                getId: function (e) {
                    return i._getFileId(e)
                },
                getIndex: function (e) {
                    return i.fileManager.getIdList().indexOf(e)
                },
                getThumb: function (t) {
                    var a = null;
                    return i._getThumbs().each(function () {
                        var r = e(this);
                        i._getThumbFileId(r) === t && (a = r)
                    }), a
                },
                getThumbIndex: function (e) {
                    var t = i._getThumbFileId(e);
                    return i.fileManager.getIndex(t)
                },
                getIdList: function () {
                    return t.getObjectKeys(i.fileManager.stack)
                },
                getFile: function (e) {
                    return i.fileManager.stack[e] || null
                },
                getFileName: function (e, t) {
                    var a = i.fileManager.getFile(e);
                    return a ? t ? a.nameFmt || "" : a.name || "" : ""
                },
                getFirstFile: function () {
                    var e = i.fileManager.getIdList(), t = e && e.length ? e[0] : null;
                    return i.fileManager.getFile(t)
                },
                setFile: function (e, t) {
                    i.fileManager.getFile(e) ? i.fileManager.stack[e].file = t : i.fileManager.add(t, e)
                },
                setProcessed: function (e) {
                    i.fileManager.filesProcessed.push(e)
                },
                getProgress: function () {
                    var e = i.fileManager.total(), t = i.fileManager.filesProcessed.length;
                    return e ? Math.ceil(t / e * 100) : 0
                },
                setProgress: function (e, t) {
                    var a = i.fileManager.getFile(e);
                    !isNaN(t) && a && (a.progress = t)
                }
            }
        }, _setUploadData: function (i, a) {
            var r = this;
            e.each(a, function (e, a) {
                var n = r.uploadParamNames[e] || e;
                t.isArray(a) ? i.append(n, a[0], a[1]) : i.append(n, a)
            })
        }, _initResumableUpload: function () {
            var i, a = this, r = a.resumableUploadOptions, n = t.logMessages, o = a.fileManager;
            if (a.enableResumableUpload) {
                if (r.fallback !== !1 && "function" != typeof r.fallback && (r.fallback = function (e) {
                    e._log(n.noResumableSupport), e.enableResumableUpload = !1
                }), !t.hasResumableUploadSupport() && r.fallback !== !1) return void r.fallback(a);
                if (!a.uploadUrl && a.enableResumableUpload) return a._log(n.noUploadUrl), void (a.enableResumableUpload = !1);
                if (r.chunkSize = parseFloat(r.chunkSize), r.chunkSize <= 0 || isNaN(r.chunkSize)) return a._log(n.invalidChunkSize, {chunkSize: r.chunkSize}), void (a.enableResumableUpload = !1);
                i = a.resumableManager = {
                    init: function (e, t, n) {
                        i.logs = [], i.stack = [], i.error = "", i.id = e, i.file = t.file, i.fileName = t.name, i.fileIndex = n, i.completed = !1, i.lastProgress = 0, a.showPreview && (i.$thumb = o.getThumb(e) || null, i.$progress = i.$btnDelete = null, i.$thumb && i.$thumb.length && (i.$progress = i.$thumb.find(".file-thumb-progress"), i.$btnDelete = i.$thumb.find(".kv-file-remove"))), i.chunkSize = r.chunkSize * a.bytesToKB, i.chunkCount = i.getTotalChunks()
                    }, setAjaxError: function (e, t, o, s) {
                        e.responseJSON && e.responseJSON.error && (o = e.responseJSON.error.toString()), s || (i.error = o), r.showErrorLog && a._log(n.ajaxError, {
                            status: e.status,
                            error: o,
                            text: e.responseText || ""
                        })
                    }, reset: function () {
                        i.stack = [], i.chunksProcessed = {}
                    }, setProcessed: function (t) {
                        var n, s, l = i.id, d = i.$thumb, c = i.$progress, u = d && d.length,
                            f = {id: u ? d.attr("id") : "", index: o.getIndex(l), fileId: l},
                            p = a.resumableUploadOptions.skipErrorsAndProceed;
                        i.completed = !0, i.lastProgress = 0, u && d.removeClass("file-uploading"), "success" === t ? (o.uploadedSize += i.file.size, a.showPreview && (a._setProgress(101, c), a._setThumbStatus(d, "Success"), a._initUploadSuccess(i.chunksProcessed[l].data, d)), o.removeFile(l), delete i.chunksProcessed[l], a._raise("fileuploaded", [f.id, f.index, f.fileId]), o.isProcessed() && a._setProgress(101)) : "cancel" !== t && (a.showPreview && (a._setThumbStatus(d, "Error"), a._setPreviewError(d, !0), a._setProgress(101, c, a.msgProgressError), a._setProgress(101, a.$progress, a.msgProgressError), a.cancelling = !p), a.$errorContainer.find('li[data-file-id="' + f.fileId + '"]').length || (s = {
                            file: i.fileName,
                            max: r.maxRetries,
                            error: i.error
                        }, n = a.msgResumableUploadRetriesExceeded.setTokens(s), e.extend(f, s), a._showFileError(n, f, "filemaxretries"), p && (o.removeFile(l), delete i.chunksProcessed[l], o.isProcessed() && a._setProgress(101)))), o.isProcessed() && i.reset()
                    }, check: function () {
                        var t = !0;
                        e.each(i.logs, function (e, i) {
                            return i ? void 0 : (t = !1, !1)
                        })
                    }, processedResumables: function () {
                        var e, t = i.logs, a = 0;
                        if (!t || !t.length) return 0;
                        for (e = 0; e < t.length; e++) t[e] === !0 && a++;
                        return a
                    }, getUploadedSize: function () {
                        var e = i.processedResumables() * i.chunkSize;
                        return e > i.file.size ? i.file.size : e
                    }, getTotalChunks: function () {
                        var e = parseFloat(i.chunkSize);
                        return !isNaN(e) && e > 0 ? Math.ceil(i.file.size / e) : 0
                    }, getProgress: function () {
                        var e = i.processedResumables(), t = i.chunkCount;
                        return 0 === t ? 0 : Math.ceil(e / t * 100)
                    }, checkAborted: function (e) {
                        a._isAborted() && (clearInterval(e), a.unlock())
                    }, upload: function () {
                        var e, r = o.getIdList(), n = "new";
                        e = setInterval(function () {
                            var s;
                            if (i.checkAborted(e), "new" === n && (a.lock(), n = "processing", s = r.shift(), o.initStats(s), o.stack[s] && (i.init(s, o.stack[s], o.getIndex(s)), i.processUpload())), !o.isPending(s) && i.completed && (n = "new"), o.isProcessed()) {
                                var l = a.$preview.find(".file-preview-initial");
                                l.length && (t.addCss(l, t.SORT_CSS), a._initSortable()), clearInterval(e), a._clearFileInput(), a.unlock(), setTimeout(function () {
                                    var e = a.previewCache.data;
                                    e && (a.initialPreview = e.content, a.initialPreviewConfig = e.config, a.initialPreviewThumbTags = e.tags), a._raise("filebatchuploadcomplete", [a.initialPreview, a.initialPreviewConfig, a.initialPreviewThumbTags, a._getExtraData()])
                                }, a.processDelay)
                            }
                        }, a.processDelay)
                    }, uploadResumable: function () {
                        var e, t, n = a.taskManager, o = i.chunkCount;
                        for (t = n.addPool(i.id), e = 0; o > e; e++) i.logs[e] = !(!i.chunksProcessed[i.id] || !i.chunksProcessed[i.id][e]), i.logs[e] || i.pushAjax(e, 0);
                        t.run(r.maxThreads).done(function () {
                            i.setProcessed("success")
                        }).fail(function () {
                            i.setProcessed(t.cancelled ? "cancel" : "error")
                        })
                    }, processUpload: function () {
                        var n, s, l, d, c, u, f, p = i.id;
                        return r.testUrl ? (n = new FormData, s = o.stack[p], a._setUploadData(n, {
                            fileId: p,
                            fileName: s.fileName,
                            fileSize: s.size,
                            fileRelativePath: s.relativePath,
                            chunkSize: i.chunkSize,
                            chunkCount: i.chunkCount
                        }), l = function (e) {
                            f = a._getOutData(n, e), a._raise("filetestbeforesend", [p, o, i, f])
                        }, d = function (r, s, l) {
                            f = a._getOutData(n, l, r);
                            var d = a.uploadParamNames, c = d.chunksUploaded || "chunksUploaded", u = [p, o, i, f];
                            r[c] && t.isArray(r[c]) ? (i.chunksProcessed[p] || (i.chunksProcessed[p] = {}), e.each(r[c], function (e, t) {
                                i.logs[t] = !0, i.chunksProcessed[p][t] = !0
                            }), i.chunksProcessed[p].data = r, a._raise("filetestsuccess", u)) : a._raise("filetesterror", u), i.uploadResumable()
                        }, c = function (e, t, r) {
                            f = a._getOutData(n, e), a._raise("filetestajaxerror", [p, o, i, f]), i.setAjaxError(e, t, r, !0), i.uploadResumable()
                        }, u = function () {
                            a._raise("filetestcomplete", [p, o, i, a._getOutData(n)])
                        }, void a._ajaxSubmit(l, d, u, c, n, p, i.fileIndex, r.testUrl)) : void i.uploadResumable()
                    }, pushAjax: function (e, t) {
                        var r = a.taskManager, o = r.getPool(i.id);
                        o.addTask(o.size() + 1, function (e) {
                            var t, r = i.stack.shift();
                            t = r[0], i.chunksProcessed[i.id] && i.chunksProcessed[i.id][t] ? a._log(n.chunkQueueError, {index: t}) : i.sendAjax(t, r[1], e)
                        }), i.stack.push([e, t])
                    }, sendAjax: function (e, s, l) {
                        var d, c = i.chunkSize, u = i.id, f = i.file, p = i.$thumb, g = t.logMessages, m = i.$btnDelete,
                            h = function (e, t) {
                                t && (e = e.setTokens(t)), e = g.resumableRequestError.setTokens({msg: e}), a._log(e), l.reject(e)
                            };
                        if (!i.chunksProcessed[u] || !i.chunksProcessed[u][e]) {
                            if (s > r.maxRetries) return h(g.resumableMaxRetriesReached, {n: r.maxRetries}), void i.setProcessed("error");
                            var v, w, b, _, C, x,
                                y = f.slice ? "slice" : f.mozSlice ? "mozSlice" : f.webkitSlice ? "webkitSlice" : "slice",
                                T = f[y](c * e, c * (e + 1));
                            v = new FormData, d = o.stack[u], a._setUploadData(v, {
                                chunkCount: i.chunkCount,
                                chunkIndex: e,
                                chunkSize: c,
                                chunkSizeStart: c * e,
                                fileBlob: [T, i.fileName],
                                fileId: u,
                                fileName: i.fileName,
                                fileRelativePath: d.relativePath,
                                fileSize: f.size,
                                retryCount: s
                            }), i.$progress && i.$progress.length && i.$progress.show(), b = function (r) {
                                w = a._getOutData(v, r), a.showPreview && (p.hasClass("file-preview-success") || (a._setThumbStatus(p, "Loading"), t.addCss(p, "file-uploading")), m.attr("disabled", !0)), a._raise("filechunkbeforesend", [u, e, s, o, i, w])
                            }, _ = function (t, d, c) {
                                if (a._isAborted()) return void h(g.resumableAborting);
                                w = a._getOutData(v, c, t);
                                var f = a.uploadParamNames, p = f.chunkIndex || "chunkIndex", m = [u, e, s, o, i, w];
                                t.error ? (r.showErrorLog && a._log(n.retryStatus, {
                                    retry: s + 1,
                                    filename: i.fileName,
                                    chunk: e
                                }), a._raise("filechunkerror", m), i.pushAjax(e, s + 1), i.error = t.error, h(t.error)) : (i.logs[t[p]] = !0, i.chunksProcessed[u] || (i.chunksProcessed[u] = {}), i.chunksProcessed[u][t[p]] = !0, i.chunksProcessed[u].data = t, l.resolve.call(null, t), a._raise("filechunksuccess", m), i.check())
                            }, C = function (t, r, n) {
                                return a._isAborted() ? void h(g.resumableAborting) : (w = a._getOutData(v, t), i.setAjaxError(t, r, n), a._raise("filechunkajaxerror", [u, e, s, o, i, w]), i.pushAjax(e, s + 1), void h(g.resumableRetryError, {n: s - 1}))
                            }, x = function () {
                                a._isAborted() || a._raise("filechunkcomplete", [u, e, s, o, i, a._getOutData(v)])
                            }, a._ajaxSubmit(b, _, x, C, v, u, i.fileIndex)
                        }
                    }
                }, i.reset()
            }
        }, _initTemplateDefaults: function () {
            var i, a, r, n, o, s, l, d, c, u, f, p, g, m, h, v, w, b, _, C, x, y, T, P, k, F, S, I, E, A, z, D, j, $, U,
                M, R, B, O, L, N, Z, H, W, V = this, q = function (e, i) {
                    return '<object class="kv-preview-data file-preview-' + e + '" title="{caption}" data="{data}" type="' + i + '"' + B + ">\n" + t.DEFAULT_PREVIEW + "\n</object>\n"
                }, K = "btn btn-sm btn-kv " + t.defaultButtonCss();
            i = '{preview}\n<div class="kv-upload-progress kv-hidden"></div><div class="clearfix"></div>\n<div class="file-caption {class}">\n  <div class="input-group {inputGroupClass}">\n      {caption}\n<span class="file-caption-icon"></span>\n' + (t.isBs(5) ? "" : '<div class="input-group-btn input-group-append">\n') + "      {remove}\n      {cancel}\n      {pause}\n      {upload}\n      {browse}\n" + (t.isBs(5) ? "" : "    </div>\n") + "  </div>", a = '{preview}\n<div class="kv-upload-progress kv-hidden"></div>\n<div class="clearfix"></div>\n<span class="{class}">{remove}\n{cancel}\n{upload}\n{browse}\n</span>', r = '<div class="file-preview {class}">\n  {close}  <div class="{dropClass} clearfix">\n    <div class="file-preview-thumbnails clearfix">\n    </div>\n    <div class="file-preview-status text-center text-success"></div>\n    <div class="kv-fileinput-error"></div>\n  </div>\n</div>',
                o = t.closeButton("fileinput-remove"), n = '<i class="bi-file-earmark-arrow-up"></i>', s = '<input readonly class="file-caption-name form-control {class}">\n', l = '<button type="{type}" title="{title}" class="{css}" {status} {tabIndexConfig}>{icon} {label}</button>', d = '<a href="{href}" title="{title}" class="{css}" {status} {tabIndexConfig}>{icon} {label}</a>', c = '<div class="{css}" {status} {tabIndexConfig}>{icon} {label}</div>', H = t.MODAL_ID + "Label", u = '<div id="' + t.MODAL_ID + '" class="file-zoom-dialog modal fade" aria-labelledby="' + H + '" {tabIndexConfig}></div>', f = '<div class="modal-dialog modal-lg{rtl}" role="document">\n  <div class="modal-content">\n    <div class="modal-header kv-zoom-header">\n      <h6 class="modal-title kv-zoom-title" id="' + H + '"><span class="kv-zoom-caption"></span> <span class="kv-zoom-size"></span></h6>\n      <div class="kv-zoom-actions">{rotate}{toggleheader}{fullscreen}{borderless}{close}</div>\n    </div>\n    <div class="floating-buttons"></div>\n    <div class="kv-zoom-body file-zoom-content {zoomFrameClass}"></div>\n{prev} {next}\n    <div class="kv-zoom-description"></div>\n  </div>\n</div>\n', W = '<button type="button" class="kv-desc-hide" aria-label="Close">{closeIcon}</button>', p = '<div class="progress">\n    <div class="{class}" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n        {status}\n     </div>\n</div>{stats}', Z = '<div class="text-primary file-upload-stats"><span class="pending-time">{pendingTime}</span> <span class="upload-speed">{uploadSpeed}</span></div>', g = " <samp>({sizeText})</samp>", m = '<div class="file-thumbnail-footer">\n    <div class="file-footer-caption" title="{caption}">\n        <div class="file-caption-info">{caption}</div>\n        <div class="file-size-info">{size}</div>\n    </div>\n    {progress}\n{indicator}\n{actions}\n</div>', h = '<div class="file-actions">\n    <div class="file-footer-buttons">\n        {rotate} {download} {upload} {delete} {zoom} {other}    </div>\n</div>\n{drag}\n<div class="clearfix"></div>', v = '<button type="button" class="kv-file-remove {removeClass}" title="{removeTitle}" {dataUrl}{dataKey}>{removeIcon}</button>\n', w = '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">{uploadIcon}</button>', N = '<button type="button" class="kv-file-rotate {rotateClass}" title="{rotateTitle}">{rotateIcon}</button>', b = '<a class="kv-file-download {downloadClass}" title="{downloadTitle}" href="{downloadUrl}" download="{caption}" target="_blank">{downloadIcon}</a>', _ = '<button type="button" class="kv-file-zoom {zoomClass}" title="{zoomTitle}">{zoomIcon}</button>', C = '<span class="file-drag-handle {dragClass}" title="{dragTitle}">{dragIcon}</span>', x = '<div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>', y = '<div class="file-preview-frame {frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-fileid="{fileid}" data-filename="{filename}" data-template="{template}" data-zoom="{zoomData}"', T = y + '><div class="kv-file-content">\n', P = y + ' title="{caption}"><div class="kv-file-content">\n', k = "</div>{footer}\n{zoomCache}</div>\n", F = "{content}\n", B = " {style}", S = q("html", "text/html"), E = q("text", "text/plain;charset=UTF-8"), M = q("pdf", "application/pdf"), I = '<img src="{data}" class="file-preview-image kv-preview-data" title="{title}" alt="{alt}"' + B + ">\n", A = '<iframe class="kv-preview-data file-preview-office" src="https://view.officeapps.live.com/op/embed.aspx?src={data}"' + B + "></iframe>", z = '<iframe class="kv-preview-data file-preview-gdocs" src="https://docs.google.com/gview?url={data}&embedded=true"' + B + "></iframe>", D = '<video class="kv-preview-data file-preview-video" controls' + B + '>\n<source src="{data}" type="{type}">\n' + t.DEFAULT_PREVIEW + "\n</video>\n", j = '<!--suppress ALL --><audio class="kv-preview-data file-preview-audio" controls' + B + '>\n<source src="{data}" type="{type}">\n' + t.DEFAULT_PREVIEW + "\n</audio>\n", $ = '<embed class="kv-preview-data file-preview-flash" src="{data}" type="application/x-shockwave-flash"' + B + ">\n", U = '<object class="kv-preview-data file-preview-object file-object {typeCss}" data="{data}" type="{type}"' + B + '>\n<param name="movie" value="{caption}" />\n' + t.OBJECT_PARAMS + " " + t.DEFAULT_PREVIEW + "\n</object>\n", R = '<div class="kv-preview-data file-preview-other-frame"' + B + ">\n" + t.DEFAULT_PREVIEW + "\n</div>\n", O = '<div class="kv-zoom-cache">{zoomContent}</div>', L = {
                width: "100%",
                height: "100%",
                "min-height": "480px"
            }, V._isPdfRendered() && (M = V.pdfRendererTemplate.replace("{renderer}", V._encodeURI(V.pdfRendererUrl))), V.defaults = {
                layoutTemplates: {
                    main1: i,
                    main2: a,
                    preview: r,
                    close: o,
                    fileIcon: n,
                    caption: s,
                    modalMain: u,
                    modal: f,
                    descriptionClose: W,
                    progress: p,
                    stats: Z,
                    size: g,
                    footer: m,
                    indicator: x,
                    actions: h,
                    actionDelete: v,
                    actionRotate: N,
                    actionUpload: w,
                    actionDownload: b,
                    actionZoom: _,
                    actionDrag: C,
                    btnDefault: l,
                    btnLink: d,
                    btnBrowse: c,
                    zoomCache: O
                },
                previewMarkupTags: {tagBefore1: T, tagBefore2: P, tagAfter: k},
                previewContentTemplates: {
                    generic: F,
                    html: S,
                    image: I,
                    text: E,
                    office: A,
                    gdocs: z,
                    video: D,
                    audio: j,
                    flash: $,
                    object: U,
                    pdf: M,
                    other: R
                },
                allowedPreviewTypes: ["image", "html", "text", "video", "audio", "flash", "pdf", "object"],
                previewTemplates: {},
                previewSettings: {
                    image: {width: "auto", height: "auto", "max-width": "100%", "max-height": "100%"},
                    html: {width: "213px", height: "160px"},
                    text: {width: "213px", height: "160px"},
                    office: {width: "213px", height: "160px"},
                    gdocs: {width: "213px", height: "160px"},
                    video: {width: "213px", height: "160px"},
                    audio: {width: "100%", height: "30px"},
                    flash: {width: "213px", height: "160px"},
                    object: {width: "213px", height: "160px"},
                    pdf: {width: "100%", height: "160px", position: "relative"},
                    other: {width: "213px", height: "160px"}
                },
                previewSettingsSmall: {
                    image: {
                        width: "auto",
                        height: "auto",
                        "max-width": "100%",
                        "max-height": "100%"
                    },
                    html: {width: "100%", height: "160px"},
                    text: {width: "100%", height: "160px"},
                    office: {width: "100%", height: "160px"},
                    gdocs: {width: "100%", height: "160px"},
                    video: {width: "100%", height: "auto"},
                    audio: {width: "100%", height: "30px"},
                    flash: {width: "100%", height: "auto"},
                    object: {width: "100%", height: "auto"},
                    pdf: {width: "100%", height: "160px"},
                    other: {width: "100%", height: "160px"}
                },
                previewZoomSettings: {
                    image: {width: "auto", height: "auto", "max-width": "100%", "max-height": "100%"},
                    html: L,
                    text: L,
                    office: {width: "100%", height: "100%", "max-width": "100%", "min-height": "480px"},
                    gdocs: {width: "100%", height: "100%", "max-width": "100%", "min-height": "480px"},
                    video: {width: "auto", height: "100%", "max-width": "100%"},
                    audio: {width: "100%", height: "30px"},
                    flash: {width: "auto", height: "480px"},
                    object: {width: "auto", height: "100%", "max-width": "100%", "min-height": "480px"},
                    pdf: L,
                    other: {width: "auto", height: "100%", "min-height": "480px"}
                },
                mimeTypeAliases: {"video/quicktime": "video/mp4"},
                fileTypeSettings: {
                    image: function (e, i) {
                        return t.compare(e, "image.*") && !t.compare(e, /(tiff?|wmf)$/i) || t.compare(i, /\.(gif|png|jpe?g)$/i)
                    }, html: function (e, i) {
                        return t.compare(e, "text/html") || t.compare(i, /\.(htm|html)$/i)
                    }, office: function (e, i) {
                        return t.compare(e, /(word|excel|powerpoint|office)$/i) || t.compare(i, /\.(docx?|xlsx?|pptx?|pps|potx?)$/i)
                    }, gdocs: function (e, i) {
                        return t.compare(e, /(word|excel|powerpoint|office|iwork-pages|tiff?)$/i) || t.compare(i, /\.(docx?|xlsx?|pptx?|pps|potx?|rtf|ods|odt|pages|ai|dxf|ttf|tiff?|wmf|e?ps)$/i)
                    }, text: function (e, i) {
                        return t.compare(e, "text.*") || t.compare(i, /\.(xml|javascript)$/i) || t.compare(i, /\.(txt|md|nfo|ini|json|php|js|css)$/i)
                    }, video: function (e, i) {
                        return t.compare(e, "video.*") && (t.compare(e, /(ogg|mp4|mp?g|mov|webm|3gp)$/i) || t.compare(i, /\.(og?|mp4|webm|mp?g|mov|3gp)$/i))
                    }, audio: function (e, i) {
                        return t.compare(e, "audio.*") && (t.compare(i, /(ogg|mp3|mp?g|wav)$/i) || t.compare(i, /\.(og?|mp3|mp?g|wav)$/i))
                    }, flash: function (e, i) {
                        return t.compare(e, "application/x-shockwave-flash", !0) || t.compare(i, /\.(swf)$/i)
                    }, pdf: function (e, i) {
                        return t.compare(e, "application/pdf", !0) || t.compare(i, /\.(pdf)$/i)
                    }, object: function () {
                        return !0
                    }, other: function () {
                        return !0
                    }
                },
                fileActionSettings: {
                    showRemove: !0,
                    showUpload: !0,
                    showDownload: !0,
                    showZoom: !0,
                    showDrag: !0,
                    showRotate: !0,
                    removeIcon: '<i class="bi-trash"></i>',
                    removeClass: K,
                    removeErrorClass: "btn btn-sm btn-kv btn-danger",
                    removeTitle: "Remove file",
                    uploadIcon: '<i class="bi-upload"></i>',
                    uploadClass: K,
                    uploadTitle: "Upload file",
                    uploadRetryIcon: '<i class="bi-cloud-arrow-up-fill"></i>',
                    uploadRetryTitle: "Retry upload",
                    downloadIcon: '<i class="bi-download"></i>',
                    downloadClass: K,
                    downloadTitle: "Download file",
                    rotateIcon: '<i class="bi-arrow-clockwise"></i>',
                    rotateClass: K,
                    rotateTitle: "Rotate 90 deg. clockwise",
                    zoomIcon: '<i class="bi-zoom-in"></i>',
                    zoomClass: K,
                    zoomTitle: "View Details",
                    dragIcon: '<i class="bi-arrows-move"></i>',
                    dragClass: "text-primary",
                    dragTitle: "Move / Rearrange",
                    dragSettings: {},
                    indicatorNew: '<i class="bi-plus-lg text-warning"></i>',
                    indicatorSuccess: '<i class="bi-check-lg text-success"></i>',
                    indicatorError: '<i class="bi-exclamation-lg text-danger"></i>',
                    indicatorLoading: '<i class="bi-hourglass-bottom text-muted"></i>',
                    indicatorPaused: '<i class="bi-pause-fill text-primary"></i>',
                    indicatorNewTitle: "Not uploaded yet",
                    indicatorSuccessTitle: "Uploaded",
                    indicatorErrorTitle: "Upload Error",
                    indicatorLoadingTitle: "Subiendo &hellip;",
                    indicatorPausedTitle: "Upload Paused"
                }
            }, e.each(V.defaults, function (t, i) {
                return "allowedPreviewTypes" === t ? void (void 0 === V.allowedPreviewTypes && (V.allowedPreviewTypes = i)) : void (V[t] = e.extend(!0, {}, i, V[t]))
            }), V._initPreviewTemplates()
        }, _initPreviewTemplates: function () {
            var i, a = this, r = a.previewMarkupTags, n = r.tagAfter;
            e.each(a.previewContentTemplates, function (e, o) {
                t.isEmpty(a.previewTemplates[e]) && (i = r.tagBefore2, "generic" !== e && "image" !== e || (i = r.tagBefore1), a._isPdfRendered() && "pdf" === e && (i = i.replace("kv-file-content", "kv-file-content kv-pdf-rendered")), a.previewTemplates[e] = i + o + n)
            })
        }, _initPreviewCache: function () {
            var i = this;
            i.previewCache = {
                data: {}, init: function () {
                    var e = i.initialPreview;
                    e.length > 0 && !t.isArray(e) && (e = e.split(i.initialPreviewDelimiter)), i.previewCache.data = {
                        content: e,
                        config: i.initialPreviewConfig,
                        tags: i.initialPreviewThumbTags
                    }
                }, count: function (e) {
                    if (!i.previewCache.data || !i.previewCache.data.content) return 0;
                    if (e) {
                        var t = i.previewCache.data.content.filter(function (e) {
                            return null !== e
                        });
                        return t.length
                    }
                    return i.previewCache.data.content.length
                }, get: function (e, a) {
                    var r, n, o, s, l, d, c, u = t.INIT_FLAG + e, f = i.previewCache.data, p = f.config[e],
                        g = f.content[e], m = t.ifSet("previewAsData", p, i.initialPreviewAsData),
                        h = p ? {title: p.title || null, alt: p.alt || null} : {title: null, alt: null},
                        v = function (e, a, r, n, o, s, l, d) {
                            var c = " file-preview-initial " + t.SORT_CSS + (l ? " " + l : ""),
                                u = i.previewInitId + "-" + s, f = p && p.fileId || u;
                            return i._generatePreviewTemplate(e, a, r, n, u, f, !1, null, null, c, o, s, d, h, p && p.zoomData || a)
                        };
                    return g && g.length ? (a = void 0 === a ? !0 : a, o = t.ifSet("type", p, i.initialPreviewFileType || "generic"), l = t.ifSet("filename", p, t.ifSet("caption", p)), d = t.ifSet("filetype", p, o), s = i.previewCache.footer(e, a, p && p.size || null), c = t.ifSet("frameClass", p), r = m ? v(o, g, l, d, s, u, c) : v("generic", g, l, d, s, u, c, o).setTokens({content: f.content[e]}), f.tags.length && f.tags[e] && (r = t.replaceTags(r, f.tags[e])), t.isEmpty(p) || t.isEmpty(p.frameAttr) || (n = t.createElement(r), n.find(".file-preview-initial").attr(p.frameAttr), r = n.html(), n.remove()), r) : ""
                }, clean: function (e) {
                    e.content = t.cleanArray(e.content), e.config = t.cleanArray(e.config), e.tags = t.cleanArray(e.tags), i.previewCache.data = e
                }, add: function (e, a, r, n) {
                    var o, s = i.previewCache.data;
                    return e && e.length ? (o = e.length - 1, t.isArray(e) || (e = e.split(i.initialPreviewDelimiter)), n && s.content ? (o = s.content.push(e[0]) - 1, s.config[o] = a, s.tags[o] = r) : (s.content = e, s.config = a, s.tags = r), i.previewCache.clean(s), o) : 0
                }, set: function (e, a, r, n) {
                    var o, s, l = i.previewCache.data;
                    if (e && e.length && (t.isArray(e) || (e = e.split(i.initialPreviewDelimiter)), s = e.filter(function (e) {
                        return null !== e
                    }), s.length)) {
                        if (void 0 === l.content && (l.content = []), void 0 === l.config && (l.config = []), void 0 === l.tags && (l.tags = []), n) {
                            for (o = 0; o < e.length; o++) e[o] && l.content.push(e[o]);
                            for (o = 0; o < a.length; o++) a[o] && l.config.push(a[o]);
                            for (o = 0; o < r.length; o++) r[o] && l.tags.push(r[o])
                        } else l.content = e, l.config = a, l.tags = r;
                        i.previewCache.clean(l)
                    }
                }, unset: function (a) {
                    var r = i.previewCache.count(), n = i.reversePreviewOrder;
                    if (r) {
                        if (1 === r) return i.previewCache.data.content = [], i.previewCache.data.config = [], i.previewCache.data.tags = [], i.initialPreview = [], i.initialPreviewConfig = [], void (i.initialPreviewThumbTags = []);
                        i.previewCache.data.content = t.spliceArray(i.previewCache.data.content, a, n), i.previewCache.data.config = t.spliceArray(i.previewCache.data.config, a, n), i.previewCache.data.tags = t.spliceArray(i.previewCache.data.tags, a, n);
                        var o = e.extend(!0, {}, i.previewCache.data);
                        i.previewCache.clean(o)
                    }
                }, out: function () {
                    var e, t, a, r = "", n = i.previewCache.count();
                    if (0 === n) return {content: "", caption: ""};
                    for (t = 0; n > t; t++) a = i.previewCache.get(t), r = i.reversePreviewOrder ? a + r : r + a;
                    return e = i._getMsgSelected(n), {content: r, caption: e}
                }, footer: function (e, a, r) {
                    var n = i.previewCache.data || {};
                    if (t.isEmpty(n.content)) return "";
                    (t.isEmpty(n.config) || t.isEmpty(n.config[e])) && (n.config[e] = {}), a = void 0 === a ? !0 : a;
                    var o, s = n.config[e], l = t.ifSet("caption", s), d = t.ifSet("width", s, "auto"),
                        c = t.ifSet("url", s, !1), u = t.ifSet("key", s, null), f = t.ifSet("fileId", s, null),
                        p = i.fileActionSettings, g = i.initialPreviewShowDelete || !1,
                        m = i.initialPreviewDownloadUrl ? i.initialPreviewDownloadUrl + "?key=" + u + (f ? "&fileId=" + f : "") : "",
                        h = s.downloadUrl || m, v = s.filename || s.caption || "", w = !!h,
                        b = t.ifSet("showRemove", s, g), _ = t.ifSet("showRotate", s, t.ifSet("showRotate", p, !0)),
                        C = t.ifSet("showDownload", s, t.ifSet("showDownload", p, w)),
                        x = t.ifSet("showZoom", s, t.ifSet("showZoom", p, !0)),
                        y = t.ifSet("showDrag", s, t.ifSet("showDrag", p, !0)), T = c === !1 && a;
                    return C = C && s.downloadUrl !== !1 && !!h, o = i._renderFileActions(s, !1, C, b, _, x, y, T, c, u, !0, h, v), i._getLayoutTemplate("footer").setTokens({
                        progress: i._renderThumbProgress(),
                        actions: o,
                        caption: l,
                        size: i._getSize(r),
                        width: d,
                        indicator: ""
                    })
                }
            }, i.previewCache.init()
        }, _isPdfRendered: function () {
            var e = this, t = e.usePdfRenderer, i = "function" == typeof t ? t() : !!t;
            return i && e.pdfRendererUrl
        }, _handler: function (e, t, i) {
            var a = this, r = a.namespace, n = t.split(" ").join(r + " ") + r;
            e && e.length && e.off(n).on(n, i)
        }, _encodeURI: function (e) {
            var t = this;
            return t.encodeUrl ? encodeURI(e) : e
        }, _log: function (e, t) {
            var i = this, a = i.$element.attr("id");
            i.showConsoleLogs && (a && (e = '"' + a + '": ' + e), e = "bootstrap-fileinput: " + e, "object" == typeof t && (e = e.setTokens(t)), window.console && "undefined" != typeof window.console.log ? window.console.log(e) : window.alert(e))
        }, _validate: function () {
            var e = this, i = "file" === e.$element.attr("type");
            return i || e._log(t.logMessages.badInputType), i
        }, _errorsExist: function () {
            var i, a = this, r = a.$errorContainer.find("li");
            return r.length ? !0 : (i = t.createElement(a.$errorContainer.html()), i.find(".kv-error-close").remove(), i.find("ul").remove(), !!e.trim(i.text()).length)
        }, _errorHandler: function (e, t) {
            var i = this, a = e.target.error, r = function (e) {
                i._showError(e.replace("{name}", t))
            };
            r(a.code === a.NOT_FOUND_ERR ? i.msgFileNotFound : a.code === a.SECURITY_ERR ? i.msgFileSecured : a.code === a.NOT_READABLE_ERR ? i.msgFileNotReadable : a.code === a.ABORT_ERR ? i.msgFilePreviewAborted : i.msgFilePreviewError)
        }, _addError: function (e) {
            var i = this, a = i.$errorContainer;
            e && a.length && (t.setHtml(a, i.errorCloseButton + e), i._handler(a.find(".kv-error-close"), "click", function () {
                setTimeout(function () {
                    i.showPreview && !i.getFrames().length && i.clear(), a.fadeOut("slow")
                }, i.processDelay)
            }))
        }, _setValidationError: function (e) {
            var i = this;
            e = (e ? e + " " : "") + "has-error", i.$container.removeClass(e).addClass("has-error"), t.addCss(i.$caption, "is-invalid")
        }, _resetErrors: function (e) {
            var t = this, i = t.$errorContainer, a = t.resumableUploadOptions.retainErrorHistory;
            t.isPersistentError || t.enableResumableUpload && a && !t.clearInput || (t.clearInput = !1, t.isError = !1, t.$container.removeClass("has-error"), t.$caption.removeClass("is-invalid is-valid file-processing"), i.html(""), e ? i.fadeOut("slow") : i.hide())
        }, _showFolderError: function (e) {
            var t, i = this, a = i.$errorContainer;
            e && (i.isAjaxUpload || i._clearFileInput(), t = i.msgFoldersNotAllowed.replace("{n}", e), i._addError(t), i._setValidationError(), a.fadeIn(i.fadeDelay), i._raise("filefoldererror", [e, t]))
        }, showUserError: function (e, t, i) {
            var a, r = this;
            r.uploadInitiated && (t && t.fileId ? (i || r.$errorContainer.find('[data-file-id="' + t.fileId + '"]').remove(), a = r.fileManager.getFileName(t.fileId), a && (e = "<b>" + a + ":</b> " + e)) : i || r.$errorContainer.html(""), r._showFileError(e, t, "fileusererror"))
        }, _showFileError: function (e, t, i) {
            var a = this, r = a.$errorContainer, n = i || "fileuploaderror", o = t && t.fileId || "",
                s = t && t.id ? '<li data-thumb-id="' + t.id + '" data-file-id="' + o + '">' + e + "</li>" : "<li>" + e + "</li>";
            return 0 === r.find("ul").length ? a._addError("<ul>" + s + "</ul>") : r.find("ul").append(s), r.fadeIn(a.fadeDelay), a._raise(n, [t, e]), a._setValidationError("file-input-new"), !0
        }, _showError: function (e, t, i) {
            var a = this, r = a.$errorContainer, n = i || "fileerror";
            return t = t || {}, t.reader = a.reader, a._addError(e), r.fadeIn(a.fadeDelay), a._raise(n, [t, e]), a.isAjaxUpload || a._clearFileInput(), a._setValidationError("file-input-new"), a.$btnUpload.attr("disabled", !0), !0
        }, _noFilesError: function (e) {
            var t = this, i = t.minFileCount > 1 ? t.filePlural : t.fileSingle,
                a = t.msgFilesTooLess.replace("{n}", t.minFileCount).replace("{files}", i), r = t.$errorContainer;
            a = "<li>" + a + "</li>", 0 === r.find("ul").length ? t._addError("<ul>" + a + "</ul>") : r.find("ul").append(a), t.isError = !0, t._updateFileDetails(0), r.fadeIn(t.fadeDelay), t._raise("fileerror", [e, a]), t._clearFileInput(), t._setValidationError()
        }, _parseError: function (t, i, a, r) {
            var n, o, s, l = this, d = e.trim(a + "");
            return o = i.responseJSON && i.responseJSON.error ? i.responseJSON.error.toString() : "", s = o ? o : i.responseText, l.cancelling && l.msgUploadAborted && (d = l.msgUploadAborted), l.showAjaxErrorDetails && s && (o ? d = e.trim(o + "") : (s = e.trim(s.replace(/\n\s*\n/g, "\n")), n = s.length ? "<pre>" + s + "</pre>" : "", d += d ? n : s)), d || (d = l.msgAjaxError.replace("{operation}", t)), l.cancelling = !1, r ? "<b>" + r + ": </b>" + d : d
        }, _parseFileType: function (e, i) {
            var a, r, n, o, s = this, l = s.allowedPreviewTypes || [];
            if ("application/text-plain" === e) return "text";
            for (o = 0; o < l.length; o++) if (n = l[o], a = s.fileTypeSettings[n], r = a(e, i) ? n : "", !t.isEmpty(r)) return r;
            return "other"
        }, _getPreviewIcon: function (t) {
            var i, a = this, r = null;
            return t && t.indexOf(".") > -1 && (i = t.split(".").pop(), a.previewFileIconSettings && (r = a.previewFileIconSettings[i] || a.previewFileIconSettings[i.toLowerCase()] || null), a.previewFileExtSettings && e.each(a.previewFileExtSettings, function (e, t) {
                return a.previewFileIconSettings[e] && t(i) ? void (r = a.previewFileIconSettings[e]) : void 0
            })), r || a.previewFileIcon
        }, _parseFilePreviewIcon: function (e, t) {
            var i = this, a = i._getPreviewIcon(t), r = e;
            return r.indexOf("{previewFileIcon}") > -1 && (r = r.setTokens({
                previewFileIconClass: i.previewFileIconClass,
                previewFileIcon: a
            })), r
        }, _raise: function (t, i) {
            var a = this, r = e.Event(t);
            void 0 !== i ? a.$element.trigger(r, i) : a.$element.trigger(r);
            var n = r.result, o = n === !1;
            if (r.isDefaultPrevented() || o) return !1;
            if ("filebatchpreupload" === r.type && (n || o)) return a.ajaxAborted = n, !1;
            switch (t) {
                case"filebatchuploadcomplete":
                case"filebatchuploadsuccess":
                case"fileuploaded":
                case"fileclear":
                case"filecleared":
                case"filereset":
                case"fileerror":
                case"filefoldererror":
                case"filecustomerror":
                case"filesuccessremove":
                    break;
                default:
                    a.ajaxAborted || (a.ajaxAborted = n)
            }
            return !0
        }, _listenFullScreen: function (e) {
            var t, i, a = this, r = a.$modal;
            r && r.length && (t = r && r.find(".btn-kv-fullscreen"), i = r && r.find(".btn-kv-borderless"), t.length && i.length && (t.removeClass("active").attr("aria-pressed", "false"), i.removeClass("active").attr("aria-pressed", "false"), e ? t.addClass("active").attr("aria-pressed", "true") : i.addClass("active").attr("aria-pressed", "true"), r.hasClass("file-zoom-fullscreen") ? a._maximizeZoomDialog() : e ? a._maximizeZoomDialog() : i.removeClass("active").attr("aria-pressed", "false")))
        }, _listen: function () {
            var i, a = this, r = a.$element, n = a.$form, o = a.$container;
            a._handler(r, "click", function (e) {
                a._initFileSelected(), r.hasClass("file-no-browse") && (r.data("zoneClicked") ? r.data("zoneClicked", !1) : e.preventDefault())
            }), a._handler(r, "change", e.proxy(a._change, a)), a._handler(a.$caption, "paste", e.proxy(a.paste, a)), a.showBrowse && (a._handler(a.$btnFile, "click", e.proxy(a._browse, a)), a._handler(a.$btnFile, "keypress", function (e) {
                var t = e.keyCode || e.which;
                13 === t && (r.trigger("click"), a._browse(e))
            })), a._handler(o.find(".fileinput-remove:not([disabled])"), "click", e.proxy(a.clear, a)), a._handler(o.find(".fileinput-cancel"), "click", e.proxy(a.cancel, a)), a._handler(o.find(".fileinput-pause"), "click", e.proxy(a.pause, a)), a._initDragDrop(), a._handler(n, "reset", e.proxy(a.clear, a)), a.isAjaxUpload || a._handler(n, "submit", e.proxy(a._submitForm, a)), a._handler(a.$container.find(".fileinput-upload"), "click", e.proxy(a._uploadClick, a)), a._handler(e(window), "resize", function () {
                a._listenFullScreen(screen.width === window.innerWidth && screen.height === window.innerHeight)
            }), i = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", a._handler(e(document), i, function () {
                a._listenFullScreen(t.checkFullScreen())
            }), a.$caption.on("focus", function () {
                a.$captionContainer.focus()
            }), a._autoFitContent(), a._initClickable(), a._refreshPreview()
        }, _autoFitContent: function () {
            var t, i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, a = this,
                r = 400 > i ? a.previewSettingsSmall || a.defaults.previewSettingsSmall : a.previewSettings || a.defaults.previewSettings;
            e.each(r, function (e, i) {
                t = ".file-preview-frame .file-preview-" + e, a.$preview.find(t + ".kv-preview-data," + t + " .kv-preview-data").css(i)
            })
        }, _scanDroppedItems: function (e, i, a) {
            a = a || "";
            var r, n, o, s = this, l = function (e) {
                s._log(t.logMessages.badDroppedFiles), s._log(e)
            };
            e.isFile ? e.file(function (e) {
                a && (e.newPath = a + e.name), i.push(e)
            }, l) : e.isDirectory && (n = e.createReader(), (o = function () {
                n.readEntries(function (t) {
                    if (t && t.length > 0) {
                        for (r = 0; r < t.length; r++) s._scanDroppedItems(t[r], i, a + e.name + "/");
                        o()
                    }
                    return null
                }, l)
            })())
        }, _initDragDrop: function () {
            var t = this, i = t.$dropZone;
            t.dropZoneEnabled && t.showPreview && (t._handler(i, "dragenter dragover", e.proxy(t._zoneDragEnter, t)), t._handler(i, "dragleave", e.proxy(t._zoneDragLeave, t)), t._handler(i, "drop", e.proxy(t._zoneDrop, t)), t._handler(e(document), "dragenter dragover drop", t._zoneDragDropInit))
        }, _zoneDragDropInit: function (e) {
            e.stopPropagation(), e.preventDefault()
        }, _zoneDragEnter: function (i) {
            var a = this, r = i.originalEvent.dataTransfer, n = e.inArray("Files", r.types) > -1;
            return a._zoneDragDropInit(i), a.isDisabled || !n ? (r.effectAllowed = "none", void (r.dropEffect = "none")) : (r.dropEffect = "copy", void (a._raise("fileDragEnter", {
                sourceEvent: i,
                files: r.types.Files
            }) && t.addCss(a.$dropZone, "file-highlighted")))
        }, _zoneDragLeave: function (e) {
            var t = this;
            t._zoneDragDropInit(e), t.isDisabled || t._raise("fileDragLeave", {sourceEvent: e}) && t.$dropZone.removeClass("file-highlighted")
        }, _dropFiles: function (e, t) {
            var i = this, a = i.$element;
            i.isAjaxUpload ? i._change(e, t) : (i.changeTriggered = !0, a.get(0).files = t, setTimeout(function () {
                i.changeTriggered = !1, a.trigger("change" + i.namespace)
            }, i.processDelay)), i.$dropZone.removeClass("file-highlighted")
        }, _zoneDrop: function (e) {
            var i, a = this, r = (a.$element, e.originalEvent.dataTransfer), n = r.files, o = r.items,
                s = t.getDragDropFolders(o);
            if (e.preventDefault(), !a.isDisabled && !t.isEmpty(n) && a._raise("fileDragDrop", {
                sourceEvent: e,
                files: n
            })) if (s > 0) {
                if (!a.isAjaxUpload) return void a._showFolderError(s);
                for (n = [], i = 0; i < o.length; i++) {
                    var l = o[i].webkitGetAsEntry();
                    l && a._scanDroppedItems(l, n)
                }
                setTimeout(function () {
                    a._dropFiles(e, n)
                }, 500)
            } else a._dropFiles(e, n)
        }, _uploadClick: function (e) {
            var i, a = this, r = a.$container.find(".fileinput-upload"),
                n = !r.hasClass("disabled") && t.isEmpty(r.attr("disabled"));
            if (!e || !e.isDefaultPrevented()) {
                if (!a.isAjaxUpload) return void (n && "submit" !== r.attr("type") && (e.preventDefault(), i = r.closest("form"), i.length && i.trigger("submit")));
                e.preventDefault(), n && a.upload()
            }
        }, _submitForm: function () {
            var e = this;
            return e._isFileSelectionValid() && !e._abort({})
        }, _clearPreview: function () {
            var t = this, i = t.showUploadedThumbs ? t.getFrames(":not(.file-preview-success)") : t.getFrames();
            i.each(function () {
                var t = e(this);
                t.remove()
            }), t.getFrames().length && t.showPreview || t._resetUpload(), t._validateDefaultPreview()
        }, _initSortable: function () {
            var i, a, r, n, o = this, s = o.$preview, l = "." + t.SORT_CSS, d = e("body"), c = e("html"),
                u = o.reversePreviewOrder, f = window.Sortable;
            f && 0 !== s.find(l).length && (a = d.length ? d : c.length ? c : o.$container, r = function () {
                a.addClass("file-grabbing")
            }, n = function () {
                a.removeClass("file-grabbing")
            }, i = {
                handle: ".drag-handle-init",
                dataIdAttr: "data-fileid",
                animation: 600,
                draggable: l,
                scroll: !1,
                forceFallback: !0,
                onChoose: r,
                onStart: r,
                onUnchoose: n,
                onEnd: n,
                onSort: function (i) {
                    var a, r = i.oldIndex, n = i.newIndex, s = 0, l = o.initialPreviewConfig.length,
                        d = l > 0 && n >= l, c = e(i.item);
                    d && (n = l - 1), o.initialPreview = t.moveArray(o.initialPreview, r, n, u), o.initialPreviewConfig = t.moveArray(o.initialPreviewConfig, r, n, u), o.previewCache.init(), o.getFrames(".file-preview-initial").each(function () {
                        e(this).attr("data-fileindex", t.INIT_FLAG + s), s++
                    }), d && (a = o.getFrames(":not(.file-preview-initial):first"), a.length && c.slideUp(function () {
                        c.insertBefore(a).slideDown()
                    })), o._raise("filesorted", {
                        previewId: c.attr("id"),
                        oldIndex: r,
                        newIndex: n,
                        stack: o.initialPreviewConfig
                    })
                }
            }, e.extend(!0, i, o.fileActionSettings.dragSettings), o.sortable && o.sortable.destroy(), o.sortable = f.create(s[0], i))
        }, _setPreviewContent: function (e) {
            var i = this;
            t.setHtml(i.$preview, e), i._autoFitContent()
        }, _initPreviewImageOrientations: function () {
            var t = this, i = 0, a = t.canOrientImage;
            (t.autoOrientImageInitial || a) && t.getFrames(".file-preview-initial").each(function () {
                var r, n, o, s = e(this), l = t.initialPreviewConfig[i];
                l && l.exif && l.exif.Orientation && (o = s.attr("id"), r = s.find(">.kv-file-content img"), n = t._getZoom(o, " >.kv-file-content img"), a ? r.css("image-orientation", t.autoOrientImageInitial ? "from-image" : "none") : t.setImageOrientation(r, n, l.exif.Orientation, s)), i++
            })
        }, _initPreview: function (e) {
            var i, a = this, r = a.initialCaption || "";
            return a.previewCache.count(!0) ? (i = a.previewCache.out(), r = e && a.initialCaption ? a.initialCaption : i.caption, a._setPreviewContent(i.content), a._setInitThumbAttr(), a._setCaption(r), a._initSortable(), t.isEmpty(i.content) || a.$container.removeClass("file-input-new"), void a._initPreviewImageOrientations()) : (a._clearPreview(), void (e ? a._setCaption(r) : a._initCaption()))
        }, _getZoomButton: function (e) {
            var i = this, a = i.previewZoomButtonIcons[e], r = i.previewZoomButtonClasses[e],
                n = ' title="' + (i.previewZoomButtonTitles[e] || "") + '" ', o = t.isBs(5) ? "bs-" : "",
                s = n + ("close" === e ? " data-" + o + 'dismiss="modal" aria-hidden="true"' : "");
            return "fullscreen" !== e && "borderless" !== e && "toggleheader" !== e || (s += ' data-toggle="button" aria-pressed="false" autocomplete="off"'), '<button type="button" class="' + r + " btn-kv-" + e + '"' + s + ">" + a + "</button>"
        }, _getModalContent: function () {
            var e = this;
            return e._getLayoutTemplate("modal").setTokens({
                rtl: e.rtl ? " kv-rtl" : "",
                zoomFrameClass: e.frameClass,
                prev: e._getZoomButton("prev"),
                next: e._getZoomButton("next"),
                rotate: e._getZoomButton("rotate"),
                toggleheader: e._getZoomButton("toggleheader"),
                fullscreen: e._getZoomButton("fullscreen"),
                borderless: e._getZoomButton("borderless"),
                close: e._getZoomButton("close")
            })
        }, _listenModalEvent: function (e) {
            var i = this, a = i.$modal, r = function (e) {
                return {sourceEvent: e, previewId: a.data("previewId"), modal: a}
            };
            a.on(e + ".bs.modal", function (n) {
                if ("bs.modal" === n.namespace) {
                    var o = a.find(".btn-fullscreen"), s = a.find(".btn-borderless");
                    a.data("fileinputPluginId") === i.$element.attr("id") && i._raise("filezoom" + e, r(n)), "shown" === e && (i._handleRotation(a, a.find(".file-zoom-detail"), a.data("angle")), s.removeClass("active").attr("aria-pressed", "false"), o.removeClass("active").attr("aria-pressed", "false"), a.hasClass("file-zoom-fullscreen") && (i._maximizeZoomDialog(), t.checkFullScreen() ? o.addClass("active").attr("aria-pressed", "true") : s.addClass("active").attr("aria-pressed", "true")))
                }
            })
        }, _initZoom: function () {
            var i, a = this, r = a._getLayoutTemplate("modalMain"), n = "#" + t.MODAL_ID;
            r = a._setTabIndex("modal", r), a.showPreview && (a.$modal = e(n), a.$modal && a.$modal.length || (i = t.createElement(t.cspBuffer.stash(r)).insertAfter(a.$container), a.$modal = e(n).insertBefore(i), t.cspBuffer.apply(a.$modal), i.remove()), t.initModal(a.$modal), a.$modal.html(t.cspBuffer.stash(a._getModalContent())), t.cspBuffer.apply(a.$modal), e.each(t.MODAL_EVENTS, function (e, t) {
                a._listenModalEvent(t)
            }))
        }, _initZoomButtons: function () {
            var t, i, a = this, r = a.$modal, n = r.data("previewId") || "", o = a.getFrames().toArray(), s = o.length,
                l = r.find(".btn-kv-prev"), d = r.find(".btn-kv-next");
            r.find(".btn-kv-rotate");
            return o.length < 2 ? (l.hide(), void d.hide()) : (l.show(), d.show(), void (s && (t = e(o[0]), i = e(o[s - 1]), l.removeAttr("disabled"), d.removeAttr("disabled"), a.reversePreviewOrder && ([l, d] = [d, l]), t.length && t.attr("id") === n && l.attr("disabled", !0), i.length && i.attr("id") === n && d.attr("disabled", !0))))
        }, _maximizeZoomDialog: function () {
            var t = this, i = t.$modal, a = i.find(".modal-header:visible"), r = i.find(".modal-footer:visible"),
                n = i.find(".kv-zoom-body"), o = e(window).height(), s = 0;
            i.addClass("file-zoom-fullscreen"), a && a.length && (o -= a.outerHeight(!0)), r && r.length && (o -= r.outerHeight(!0)), n && n.length && (s = n.outerHeight(!0) - n.height(), o -= s), i.find(".kv-zoom-body").height(o)
        }, _resizeZoomDialog: function (e) {
            var i = this, a = i.$modal, r = a.find(".btn-kv-fullscreen"), n = a.find(".btn-kv-borderless");
            if (a.hasClass("file-zoom-fullscreen")) t.toggleFullScreen(!1), e ? r.hasClass("active") || (a.removeClass("file-zoom-fullscreen"), i._resizeZoomDialog(!0), n.hasClass("active") && n.removeClass("active").attr("aria-pressed", "false")) : r.hasClass("active") ? r.removeClass("active").attr("aria-pressed", "false") : (a.removeClass("file-zoom-fullscreen"), i.$modal.find(".kv-zoom-body").css("height", i.zoomModalHeight)); else {
                if (!e) return void i._maximizeZoomDialog();
                t.toggleFullScreen(!0)
            }
            a.focus()
        }, _setZoomContent: function (i, a) {
            var r, n, o, s, l, d, c, u, f, p, g, m, h = this, v = i.attr("id"), w = h._getZoom(v), b = h.$modal,
                _ = b.find(".btn-kv-fullscreen"), C = b.find(".btn-kv-borderless"), x = b.find(".btn-kv-toggleheader"),
                y = i.data("zoom");
            y && (y = decodeURIComponent(y), m = w.html().replace(h.zoomPlaceholder, "").setTokens({zoomData: y}), w.html(m), i.data("zoom", ""), w.attr("data-zoom", y)), n = w.attr("data-template") || "generic", r = w.find(".kv-file-content"), o = r.length ? r.html() : "", p = i.data("caption") || h.msgZoomModalHeading, g = i.data("size") || "", u = i.data("description") || "", b.find(".kv-zoom-caption").attr("title", p).html(p), b.find(".kv-zoom-size").html(g), f = b.find(".kv-zoom-description").hide(), u && (h.showDescriptionClose && (u = h._getLayoutTemplate("descriptionClose").setTokens({closeIcon: h.previewZoomButtonIcons.close}) + "</button>" + u), f.show().html(u), h.showDescriptionClose && h._handler(b.find(".kv-desc-hide"), "click", function () {
                e(this).parent().fadeOut("fast", function () {
                    b.focus()
                })
            })), s = b.find(".kv-zoom-body"), b.removeClass("kv-single-content"), a ? (c = s.addClass("file-thumb-loading").clone().insertAfter(s), t.setHtml(s, o).hide(), c.fadeOut("fast", function () {
                s.fadeIn("fast", function () {
                    s.removeClass("file-thumb-loading")
                }), c.remove()
            })) : t.setHtml(s, o), d = h.previewZoomSettings[n], d && (l = s.find(".kv-preview-data"), t.addCss(l, "file-zoom-detail"), e.each(d, function (e, t) {
                l.css(e, t), (l.attr("width") && "width" === e || l.attr("height") && "height" === e) && l.removeAttr(e)
            })), b.data("previewId", v), h._handler(b.find(".btn-kv-prev"), "click", function () {
                h._zoomSlideShow("prev", v)
            }), h._handler(b.find(".btn-kv-next"), "click", function () {
                h._zoomSlideShow("next", v)
            }), h._handler(_, "click", function () {
                h._resizeZoomDialog(!0)
            }), h._handler(C, "click", function () {
                h._resizeZoomDialog(!1)
            }), h._handler(x, "click", function () {
                var e, t = b.find(".modal-header"), i = b.find(".floating-buttons"), a = t.find(".kv-zoom-actions"),
                    r = function (e) {
                        var i = h.$modal.find(".kv-zoom-body"), a = h.zoomModalHeight;
                        b.hasClass("file-zoom-fullscreen") && (a = i.outerHeight(!0), e || (a -= t.outerHeight(!0))), i.css("height", e ? a + e : a)
                    };
                t.is(":visible") ? (e = t.outerHeight(!0), t.slideUp("slow", function () {
                    a.find(".btn").appendTo(i), r(e)
                })) : (i.find(".btn").appendTo(a), t.slideDown("slow", function () {
                    r()
                })), b.focus()
            }), h._handler(b, "keydown", function (t) {
                var i, a, r = t.which || t.keyCode, n = h.processDelay + 1, o = e(this).find(".btn-kv-prev"),
                    s = e(this).find(".btn-kv-next"), l = e(this).data("previewId");
                [i, a] = h.rtl ? [39, 37] : [37, 39], e.each({prev: [o, i], next: [s, a]}, function (e, t) {
                    var i = t[0], a = t[1];
                    r === a && i.length && (b.focus(), i.attr("disabled") || (i.blur(), setTimeout(function () {
                        i.focus(), h._zoomSlideShow(e, l),
                            setTimeout(function () {
                                i.attr("disabled") && b.focus()
                            }, n)
                    }, n)))
                })
            })
        }, _showModal: function (e) {
            var i, a, r, n = this, o = n.$modal;
            e && e.length && (t.initModal(o), t.setHtml(o, n._getModalContent()), n._setZoomContent(e), o.removeClass("rotatable"), o.data({
                backdrop: !1,
                fileinputPluginId: n.$element.attr("id")
            }), o.find(".kv-zoom-body").css("height", n.zoomModalHeight), i = e.find(".kv-file-content > :first-child"), i.length && (a = i.css("transform"), a && o.find(".file-zoom-detail").css("transform", a)), e.hasClass("rotatable") && o.addClass("rotatable"), e.data("angle") && o.data("angle", e.data("angle")), r = e.data("angle") || 0, o.modal("show"), n._initZoomButtons(), n._initRotateZoom(e, i))
        }, _zoomPreview: function (e) {
            var i, a = this;
            if (!e.length) throw "Cannot zoom to detailed preview!";
            i = e.closest(t.FRAMES), a._showModal(i)
        }, _zoomSlideShow: function (t, i) {
            var a, r, n, o, s, l, d = this, c = d.$modal, u = c.find(".kv-zoom-actions .btn-kv-" + t),
                f = d.getFrames().toArray(), p = [], g = f.length;
            if (d.reversePreviewOrder && (t = "prev" === t ? "next" : "prev"), !u.attr("disabled")) {
                for (r = 0; g > r; r++) n = e(f[r]), n && n.length && n.find(".kv-file-zoom:visible").length && p.push(f[r]);
                for (g = p.length, r = 0; g > r; r++) if (e(p[r]).attr("id") === i) {
                    o = "prev" === t ? r - 1 : r + 1;
                    break
                }
                0 > o || o >= g || !p[o] || (a = e(p[o]), a.length && d._setZoomContent(a, t), d._initZoomButtons(), a.length && a.hasClass("rotatable") ? (s = a.data("angle") || 0, c.addClass("rotatable").data("angle", s), l = a.find(".kv-file-content > :first-child"), d._initRotateZoom(a, l)) : c.removeClass("rotatable").removeData("angle"), d._raise("filezoom" + t, {
                    previewId: i,
                    modal: d.$modal
                }))
            }
        }, _initZoomButton: function () {
            var t = this;
            t.$preview.find(".kv-file-zoom").each(function () {
                var i = e(this);
                t._handler(i, "click", function () {
                    t._zoomPreview(i)
                })
            })
        }, _inputFileCount: function () {
            return this.$element[0].files.length
        }, _refreshPreview: function () {
            var t, i = this;
            (i._inputFileCount() || i.isAjaxUpload) && i.showPreview && i.isPreviewable && (i.isAjaxUpload && i.fileManager.count() > 0 ? (t = e.extend(!0, [], i.getFileList()), i.fileManager.clear(), i._clearFileInput()) : t = i.$element[0].files, t && t.length && i.readFiles(t))
        }, _clearObjects: function (t) {
            t.find("video audio").each(function () {
                this.pause(), e(this).remove()
            }), t.find("img object div").each(function () {
                e(this).remove()
            })
        }, _clearFileInput: function () {
            var t, i, a, r = this, n = r.$element;
            r._inputFileCount() && (t = n.closest("form"), i = e(document.createElement("form")), a = e(document.createElement("div")), n.before(a), t.length ? t.after(i) : a.after(i), i.append(n).trigger("reset"), a.before(n).remove(), i.remove())
        }, _resetUpload: function () {
            var e = this;
            e.uploadInitiated = !1, e.uploadStartTime = t.now(), e.uploadCache = [], e.$btnUpload.removeAttr("disabled"), e._setProgress(0), e._hideProgress(), e._resetErrors(!1), e._initAjax(), e.fileManager.clearImages(), e._resetCanvas(), e.overwriteInitial && (e.initialPreview = [], e.initialPreviewConfig = [], e.initialPreviewThumbTags = [], e.previewCache.data = {
                content: [],
                config: [],
                tags: []
            })
        }, _resetCanvas: function () {
            var e = this;
            e.imageCanvas && e.imageCanvasContext && e.imageCanvasContext.clearRect(0, 0, e.imageCanvas.width, e.imageCanvas.height)
        }, _hasInitialPreview: function () {
            var e = this;
            return !e.overwriteInitial && e.previewCache.count(!0)
        }, _resetPreview: function () {
            var i, a, r, n = this, o = n.showUploadedThumbs, s = !n.removeFromPreviewOnError,
                l = (o || s) && n.isDuplicateError;
            n.previewCache.count(!0) ? (i = n.previewCache.out(), l && (r = t.createElement("").insertAfter(n.$container), n.getFrames().each(function () {
                var t = e(this);
                (o && t.hasClass("file-preview-success") || s && t.hasClass("file-preview-error")) && r.append(t)
            })), n._setPreviewContent(i.content), n._setInitThumbAttr(), a = n.initialCaption ? n.initialCaption : i.caption, n._setCaption(a), l && (r.contents().appendTo(n.$preview), r.remove())) : (n._clearPreview(), n._initCaption()), n.showPreview && (n._initZoom(), n._initSortable()), n.isDuplicateError = !1
        }, _clearDefaultPreview: function () {
            var e = this;
            e.$preview.find(".file-default-preview").remove()
        }, _validateDefaultPreview: function () {
            var e = this;
            e.showPreview && !t.isEmpty(e.defaultPreviewContent) && (e._setPreviewContent('<div class="file-default-preview">' + e.defaultPreviewContent + "</div>"), e.$container.removeClass("file-input-new"), e._initClickable())
        }, _resetPreviewThumbs: function (e) {
            var t, i = this;
            return e ? (i._clearPreview(), void i.clearFileStack()) : void (i._hasInitialPreview() ? (t = i.previewCache.out(), i._setPreviewContent(t.content), i._setInitThumbAttr(), i._setCaption(t.caption), i._initPreviewActions()) : i._clearPreview())
        }, _getLayoutTemplate: function (e) {
            var i = this, a = i.layoutTemplates[e];
            return t.isEmpty(i.customLayoutTags) ? a : t.replaceTags(a, i.customLayoutTags)
        }, _getPreviewTemplate: function (e) {
            var i = this, a = i.previewTemplates, r = a[e] || a.other;
            return t.isEmpty(i.customPreviewTags) ? r : t.replaceTags(r, i.customPreviewTags)
        }, _getOutData: function (e, t, i, a) {
            var r = this;
            return t = t || {}, i = i || {}, a = a || r.fileManager.list(), {
                formdata: e,
                files: a,
                filenames: r.filenames,
                filescount: r.getFilesCount(),
                extra: r._getExtraData(),
                response: i,
                reader: r.reader,
                jqXHR: t
            }
        }, _getMsgSelected: function (e, t) {
            var i = this, a = 1 === e ? i.fileSingle : i.filePlural;
            return e > 0 ? i.msgSelected.replace("{n}", e).replace("{files}", a) : t ? i.msgProcessing : i.msgNoFilesSelected
        }, _getFrame: function (e, i) {
            var a = this, r = t.getFrameElement(a.$preview, e);
            return !a.showPreview || i || r.length || a._log(t.logMessages.invalidThumb, {id: e}), r
        }, _getZoom: function (e, i) {
            var a = this, r = t.getZoomElement(a.$preview, e, i);
            return a.showPreview && !r.length && a._log(t.logMessages.invalidThumb, {id: e}), r
        }, _getThumbs: function (e) {
            return e = e || "", this.getFrames(":not(.file-preview-initial)" + e)
        }, _getThumbId: function (e) {
            var t = this;
            return t.previewInitId + "-" + e
        }, _getExtraData: function (e, t) {
            var i = this, a = i.uploadExtraData;
            return "function" == typeof i.uploadExtraData && (a = i.uploadExtraData(e, t)), a
        }, _initXhr: function (e, i) {
            var a = this, r = a.fileManager, n = function (e) {
                var n = 0, o = e.total, s = e.loaded || e.position, l = r.getUploadStats(i, s, o);
                e.lengthComputable && !a.enableResumableUpload && (n = t.round(s / o * 100)), i ? a._setFileUploadStats(i, n, l) : a._setProgress(n, null, null, a._getStats(l)), a._raise("fileajaxprogress", [l])
            };
            return e.upload && (a.progressDelay && (n = t.debounce(n, a.progressDelay)), e.upload.addEventListener("progress", n, !1)), e
        }, _initAjaxSettings: function () {
            var t = this;
            t._ajaxSettings = e.extend(!0, {}, t.ajaxSettings), t._ajaxDeleteSettings = e.extend(!0, {}, t.ajaxDeleteSettings)
        }, _mergeAjaxCallback: function (e, t, i) {
            var a, r = this, n = r._ajaxSettings, o = r.mergeAjaxCallbacks;
            "delete" === i && (n = r._ajaxDeleteSettings, o = r.mergeAjaxDeleteCallbacks), a = n[e], o && "function" == typeof a ? "before" === o ? n[e] = function () {
                a.apply(this, arguments), t.apply(this, arguments)
            } : n[e] = function () {
                t.apply(this, arguments), a.apply(this, arguments)
            } : n[e] = t
        }, _ajaxSubmit: function (t, i, a, r, n, o, s, l) {
            var d, c, u, f = this, p = f.taskManager;
            f._raise("filepreajax", [n, o, s]) && (n.append("initialPreview", JSON.stringify(f.initialPreview)), n.append("initialPreviewConfig", JSON.stringify(f.initialPreviewConfig)), n.append("initialPreviewThumbTags", JSON.stringify(f.initialPreviewThumbTags)), f._initAjaxSettings(), f._mergeAjaxCallback("beforeSend", t), f._mergeAjaxCallback("success", i), f._mergeAjaxCallback("complete", a), f._mergeAjaxCallback("error", r), l = l || f.uploadUrlThumb || f.uploadUrl, "function" == typeof l && (l = l()), u = f._getExtraData(o, s) || {}, "object" == typeof u && e.each(u, function (e, t) {
                n.append(e, t)
            }), c = {
                xhr: function () {
                    var t = e.ajaxSettings.xhr();
                    return f._initXhr(t, o)
                },
                url: f._encodeURI(l),
                type: "POST",
                dataType: "json",
                data: n,
                cache: !1,
                processData: !1,
                contentType: !1
            }, d = e.extend(!0, {}, c, f._ajaxSettings), f.ajaxQueue.push(d), p.addTask(o + "-" + s, function () {
                var t, i, a = this.self;
                t = a.ajaxQueue.shift(), i = e.ajax(t), a.ajaxRequests.push(i)
            }).runWithContext({self: f}))
        }, _mergeArray: function (e, i) {
            var a = this, r = t.cleanArray(a[e]), n = t.cleanArray(i);
            a[e] = r.concat(n)
        }, _initUploadSuccess: function (i, a, r) {
            var n, o, s, l, d, c, u, f, p, g = this;
            return !g.showPreview || "object" != typeof i || e.isEmptyObject(i) ? void g._resetCaption() : (void 0 !== i.initialPreview && i.initialPreview.length > 0 && (g.hasInitData = !0, d = i.initialPreview || [], c = i.initialPreviewConfig || [], u = i.initialPreviewThumbTags || [], n = void 0 === i.append || i.append, d.length > 0 && !t.isArray(d) && (d = d.split(g.initialPreviewDelimiter)), d.length && (g._mergeArray("initialPreview", d), g._mergeArray("initialPreviewConfig", c), g._mergeArray("initialPreviewThumbTags", u)), void 0 !== a ? r ? (f = a.attr("id"), p = g._getUploadCacheIndex(f), null !== p && (g.uploadCache[p] = {
                id: f,
                content: d[0],
                config: c[0] || [],
                tags: u[0] || [],
                append: n
            })) : (s = g.previewCache.add(d[0], c[0], u[0], n), o = g.previewCache.get(s, !1), l = t.createElement(o).hide().appendTo(a), a.fadeOut("slow", function () {
                var e = l.find("> .file-preview-frame");
                e && e.length && e.insertBefore(a).fadeIn("slow").css("display:inline-block"), g._initPreviewActions(), g._clearFileInput(), a.remove(), l.remove(), g._initSortable()
            })) : (g.previewCache.set(d, c, u, n), g._initPreview(), g._initPreviewActions())), void g._resetCaption())
        }, _getUploadCacheIndex: function (e) {
            var t, i, a = this, r = a.uploadCache.length;
            for (t = 0; r > t; t++) if (i = a.uploadCache[t], i.id === e) return t;
            return null
        }, _initSuccessThumbs: function () {
            var i = this;
            i.showPreview && setTimeout(function () {
                i._getThumbs(t.FRAMES + ".file-preview-success").each(function () {
                    var a = e(this), r = a.find(".kv-file-remove");
                    r.removeAttr("disabled"), i._handler(r, "click", function () {
                        var e = a.attr("id"), r = i._raise("filesuccessremove", [e, a.attr("data-fileindex")]);
                        t.cleanMemory(a), r !== !1 && (i.$caption.attr("title", ""), a.fadeOut("slow", function () {
                            i.fileManager;
                            a.remove(), i.getFrames().length || i.reset()
                        }))
                    })
                })
            }, i.processDelay)
        }, _updateInitialPreview: function () {
            var t = this, i = t.uploadCache;
            t.showPreview && (e.each(i, function (e, i) {
                t.previewCache.add(i.content, i.config, i.tags, i.append)
            }), t.hasInitData && (t._initPreview(), t._initPreviewActions()))
        }, _getThumbFileId: function (e) {
            var t = this;
            return t.showPreview && void 0 !== e ? e.attr("data-fileid") : null
        }, _getThumbFile: function (e) {
            var t = this, i = t._getThumbFileId(e);
            return i ? t.fileManager.getFile(i) : null
        }, _uploadSingle: function (i, a, r, n) {
            var o, s, l, d, c, u, f, p, g, m, h, v, w, b = this, _ = b.fileManager, C = _.count(), x = new FormData,
                y = b._getThumbId(a), T = C > 0 || !e.isEmptyObject(b.uploadExtraData),
                P = b.ajaxOperations.uploadThumb, k = _.getFile(a), F = {id: y, index: i, fileId: a},
                S = b.fileManager.getFileName(a, !0), I = function () {
                    n && n.resolve && n.resolve()
                }, E = function () {
                    n && n.reject && n.reject()
                };
            b.enableResumableUpload || (b.uploadInitiated = !0, b.showPreview && (s = _.getThumb(a), f = s.find(".file-thumb-progress"), d = s.find(".kv-file-upload"), c = s.find(".kv-file-remove"), f.show()), 0 === C || !T || b.showPreview && d && d.hasClass("disabled") || b._abort(F) || (w = function () {
                u ? _.errors.push(a) : _.removeFile(a), _.setProcessed(a), _.isProcessed() && (b.fileBatchCompleted = !0, l())
            }, l = function () {
                var e;
                b.fileBatchCompleted && setTimeout(function () {
                    var i = 0 === _.count(), a = _.errors.length;
                    b._updateInitialPreview(), b.unlock(i), i && b._clearFileInput(), e = b.$preview.find(".file-preview-initial"), b.uploadAsync && e.length && (t.addCss(e, t.SORT_CSS), b._initSortable()), b._raise("filebatchuploadcomplete", [_.stack, b._getExtraData()]), b.retryErrorUploads && 0 !== a || _.clear(), b._setProgress(101), b.ajaxAborted = !1, b.uploadInitiated = !1
                }, b.processDelay)
            }, p = function (n) {
                o = b._getOutData(x, n), _.initStats(a), b.fileBatchCompleted = !1, r || (b.ajaxAborted = !1), b.showPreview && (s.hasClass("file-preview-success") || (b._setThumbStatus(s, "Loading"), t.addCss(s, "file-uploading")), d.attr("disabled", !0), c.attr("disabled", !0)), r || b.lock(), -1 !== _.errors.indexOf(a) && delete _.errors[a], b._raise("filepreupload", [o, y, i, b._getThumbFileId(s)]), e.extend(!0, F, o), b._abort(F) && (n.abort(), r || (b._setThumbStatus(s, "New"), s.removeClass("file-uploading"), d.removeAttr("disabled"), c.removeAttr("disabled")), b._setProgressCancelled())
            }, m = function (n, l, c) {
                var p = b.showPreview && s.attr("id") ? s.attr("id") : y;
                o = b._getOutData(x, c, n), e.extend(!0, F, o), setTimeout(function () {
                    t.isEmpty(n) || t.isEmpty(n.error) ? (b.showPreview && (b._setThumbStatus(s, "Success"), d.hide(), b._initUploadSuccess(n, s, r), b._setProgress(101, f)), b._raise("fileuploaded", [o, p, i, b._getThumbFileId(s)]), r ? (w(), I()) : b.fileManager.remove(s)) : (u = !0, g = b._parseError(P, c, b.msgUploadError, b.fileManager.getFileName(a)), b._showFileError(g, F), b._setPreviewError(s, !0), b.retryErrorUploads || d.hide(), r && (w(), I()), b._setProgress(101, b._getFrame(p).find(".file-thumb-progress"), b.msgUploadError))
                }, b.processDelay)
            }, h = function () {
                b.showPreview && (d.removeAttr("disabled"), c.removeAttr("disabled"), s.removeClass("file-uploading")), r ? l() : (b.unlock(!1), b._clearFileInput()), b._initSuccessThumbs()
            }, v = function (t, i, n) {
                g = b._parseError(P, t, n, b.fileManager.getFileName(a)), u = !0, setTimeout(function () {
                    var i;
                    r && (w(), E()), b.fileManager.setProgress(a, 100), b._setPreviewError(s, !0), b.retryErrorUploads || d.hide(), e.extend(!0, F, b._getOutData(x, t)), b._setProgress(101, b.$progress, b.msgAjaxProgressError.replace("{operation}", P)), i = b.showPreview && s ? s.find(".file-thumb-progress") : "", b._setProgress(101, i, b.msgUploadError), b._showFileError(g, F)
                }, b.processDelay)
            }, b._setFileData(x, k.file, S, a), b._setUploadData(x, {fileId: a}), b._ajaxSubmit(p, m, h, v, x, a, i)))
        }, _setFileData: function (e, t, i, a) {
            var r = this, n = r.preProcessUpload;
            n && "function" == typeof n ? e.append(r.uploadFileAttr, n(a, t)) : e.append(r.uploadFileAttr, t, i)
        }, _checkBatchPreupload: function (t, i) {
            var a = this, r = a._raise("filebatchpreupload", [t]);
            return r ? !0 : (a._abort(t), i && i.abort(), a._getThumbs().each(function () {
                var t = e(this), i = t.find(".kv-file-upload"), r = t.find(".kv-file-remove");
                t.hasClass("file-preview-loading") && (a._setThumbStatus(t, "New"), t.removeClass("file-uploading")), i.removeAttr("disabled"), r.removeAttr("disabled")
            }), a._setProgressCancelled(), !1)
        }, _uploadBatch: function () {
            var i, a, r, n, o, s, l = this, d = l.fileManager, c = d.total(), u = {},
                f = c > 0 || !e.isEmptyObject(l.uploadExtraData), p = new FormData, g = l.ajaxOperations.uploadBatch;
            if (0 !== c && f && !l._abort(u)) {
                s = function () {
                    l.fileManager.clear(), l._clearFileInput()
                }, i = function (i) {
                    l.lock(), d.initStats();
                    var a = l._getOutData(p, i);
                    l.ajaxAborted = !1, l.showPreview && l._getThumbs().each(function () {
                        var i = e(this), a = i.find(".kv-file-upload"), r = i.find(".kv-file-remove");
                        i.hasClass("file-preview-success") || (l._setThumbStatus(i, "Loading"), t.addCss(i, "file-uploading")), a.attr("disabled", !0), r.attr("disabled", !0)
                    }), l._checkBatchPreupload(a, i)
                }, a = function (i, a, r) {
                    var n = l._getOutData(p, r, i), d = 0, c = l._getThumbs(":not(.file-preview-success)"),
                        u = t.isEmpty(i) || t.isEmpty(i.errorkeys) ? [] : i.errorkeys;
                    t.isEmpty(i) || t.isEmpty(i.error) ? (l._raise("filebatchuploadsuccess", [n]), s(), l.showPreview ? (c.each(function () {
                        var t = e(this);
                        l._setThumbStatus(t, "Success"), t.removeClass("file-uploading"), t.find(".kv-file-upload").hide().removeAttr("disabled")
                    }), l._initUploadSuccess(i)) : l.reset(), l._setProgress(101)) : (l.showPreview && (c.each(function () {
                        var t = e(this);
                        t.removeClass("file-uploading"), t.find(".kv-file-upload").removeAttr("disabled"), t.find(".kv-file-remove").removeAttr("disabled"), 0 === u.length || -1 !== e.inArray(d, u) ? (l._setPreviewError(t, !0), l.retryErrorUploads || (t.find(".kv-file-upload").hide(), l.fileManager.remove(t))) : (t.find(".kv-file-upload").hide(), l._setThumbStatus(t, "Success"), l.fileManager.remove(t)), t.hasClass("file-preview-error") && !l.retryErrorUploads || d++
                    }), l._initUploadSuccess(i)), o = l._parseError(g, r, l.msgUploadError), l._showFileError(o, n, "filebatchuploaderror"), l._setProgress(101, l.$progress, l.msgUploadError))
                }, n = function () {
                    l.unlock(), l._initSuccessThumbs(), l._clearFileInput(), l._raise("filebatchuploadcomplete", [l.fileManager.stack, l._getExtraData()])
                }, r = function (t, i, a) {
                    var r = l._getOutData(p, t);
                    o = l._parseError(g, t, a), l._showFileError(o, r, "filebatchuploaderror"), l.uploadFileCount = c - 1, l.showPreview && (l._getThumbs().each(function () {
                        var t = e(this);
                        t.removeClass("file-uploading"), l._getThumbFile(t) && l._setPreviewError(t)
                    }), l._getThumbs().removeClass("file-uploading"), l._getThumbs(" .kv-file-upload").removeAttr("disabled"), l._getThumbs(" .kv-file-delete").removeAttr("disabled"), l._setProgress(101, l.$progress, l.msgAjaxProgressError.replace("{operation}", g)))
                };
                var m = 0;
                e.each(l.fileManager.stack, function (e, i) {
                    t.isEmpty(i.file) || l._setFileData(p, i.file, i.nameFmt || "untitled_" + m, e), m++
                }), l._ajaxSubmit(i, a, n, r, p)
            }
        }, _uploadExtraOnly: function () {
            var e, i, a, r, n, o = this, s = {}, l = new FormData, d = o.ajaxOperations.uploadExtra;
            e = function (e) {
                o.lock();
                var t = o._getOutData(l, e);
                o._setProgress(50), s.data = t, s.xhr = e, o._checkBatchPreupload(t, e)
            }, i = function (e, i, a) {
                var r = o._getOutData(l, a, e);
                t.isEmpty(e) || t.isEmpty(e.error) ? (o._raise("filebatchuploadsuccess", [r]), o._clearFileInput(), o._initUploadSuccess(e), o._setProgress(101)) : (n = o._parseError(d, a, o.msgUploadError), o._showFileError(n, r, "filebatchuploaderror"))
            }, a = function () {
                o.unlock(), o._clearFileInput(), o._raise("filebatchuploadcomplete", [o.fileManager.stack, o._getExtraData()])
            }, r = function (e, t, i) {
                var a = o._getOutData(l, e);
                n = o._parseError(d, e, i), s.data = a, o._showFileError(n, a, "filebatchuploaderror"), o._setProgress(101, o.$progress, o.msgAjaxProgressError.replace("{operation}", d))
            }, o._ajaxSubmit(e, i, a, r, l)
        }, _deleteFileIndex: function (i) {
            var a = this, r = i.attr("data-fileindex"), n = a.reversePreviewOrder;
            r.substring(0, 5) === t.INIT_FLAG && (r = parseInt(r.replace(t.INIT_FLAG, "")), a.initialPreview = t.spliceArray(a.initialPreview, r, n), a.initialPreviewConfig = t.spliceArray(a.initialPreviewConfig, r, n), a.initialPreviewThumbTags = t.spliceArray(a.initialPreviewThumbTags, r, n), a.getFrames().each(function () {
                var i = e(this), a = i.attr("data-fileindex");
                a.substring(0, 5) === t.INIT_FLAG && (a = parseInt(a.replace(t.INIT_FLAG, "")), a > r && (a--, i.attr("data-fileindex", t.INIT_FLAG + a)))
            }))
        }, _resetCaption: function () {
            var e = this;
            setTimeout(function () {
                var t, i, a, r = "", n = e.previewCache.count(!0), o = e.fileManager.count(),
                    s = ":not(.file-preview-success):not(.file-preview-error)",
                    l = e.showPreview && e.getFrames(s).length;
                0 !== o || 0 !== n || l ? (t = n + o, t > 1 ? r = e._getMsgSelected(t) : 0 === o ? (a = e.initialPreviewConfig[0], r = "", a && (r = a.caption || a.filename || ""), r || (r = e._getMsgSelected(t))) : (i = e.fileManager.getFirstFile(), r = i ? i.nameFmt : "_"), e._setCaption(r)) : e.reset()
            }, e.processDelay)
        }, _handleRotation: function (t, i, a) {
            var r, n, o, s, l, d, c, u, f, p = this, g = "", m = 1, h = i[0], v = i.parent(), w = e("body"),
                b = !!w.length;
            return b && w.addClass("kv-overflow-hidden"), !i.length || t.hasClass("hide-rotate") ? void (b && w.removeClass("kv-overflow-hidden")) : (s = i.css("transform"), s && i.css("transform", "none"), s && i.css("transform", s), a = a || 0, o = a % 360, r = "rotate(" + a + "deg)", n = "rotate(" + o + "deg)", g = "", 90 !== o && 270 !== o || (d = h.naturalWidth || i.outerWidth() || 0, l = h.naturalHeight || i.outerHeight() || 0, m = d > l && 0 != d ? (l / d).toFixed(2) : 1, v.length && (u = v.height(), f = v.width(), c = Math.min(d, f), u > m * c && (m = c > u && 0 != c ? (u / c).toFixed(2) : 1)), 1 !== m && (g = " scale(" + m + ")")), i.addClass("rotate-animate").css("transform", r + g), void setTimeout(function () {
                i.removeClass("rotate-animate").css("transform", n + g), b && w.removeClass("kv-overflow-hidden"), t.data("angle", o)
            }, p.fadeDelay))
        }, _initRotateButton: function () {
            var i = this;
            i.getFrames(".rotatable .kv-file-rotate").each(function () {
                var a = e(this), r = a.closest(t.FRAMES), n = r.find(".kv-file-content > :first-child");
                i._handler(a, "click", function () {
                    var e = (r.data("angle") || 0) + 90;
                    i._handleRotation(r, n, e)
                })
            })
        }, _initRotateZoom: function (e, t) {
            var i = this, a = i.$modal, r = a.find(".btn-kv-rotate"), n = e.data("angle");
            a.data("angle", n), r.length && (r.off("click"), a.hasClass("rotatable") && r.on("click", function () {
                n = (a.data("angle") || 0) + 90, a.data("angle", n), i._handleRotation(a, a.find(".file-zoom-detail"), n), i._handleRotation(e, t, n), e.hasClass("hide-rotate") && e.data("angle", n)
            }))
        }, _initFileActions: function () {
            var i = this;
            i.showPreview && (i._initZoomButton(), i._initRotateButton(), i.getFrames(" .kv-file-remove").each(function () {
                var a, r, n = e(this), o = n.closest(t.FRAMES), s = o.attr("id"), l = o.attr("data-fileindex");
                i.fileManager;
                i._handler(n, "click", function () {
                    return r = i._raise("filepreremove", [s, l]), r !== !1 && i._validateMinCount() ? (a = o.hasClass("file-preview-error"), t.cleanMemory(o), void o.fadeOut("slow", function () {
                        i.fileManager.remove(o), i._clearObjects(o), o.remove(), s && a && i.$errorContainer.find('li[data-thumb-id="' + s + '"]').fadeOut("fast", function () {
                            e(this).remove(), i._errorsExist() || i._resetErrors()
                        }), i._clearFileInput(), i._resetCaption(), i._raise("fileremoved", [s, l])
                    })) : !1
                })
            }), i.getFrames(" .kv-file-upload").each(function () {
                var a = e(this);
                i._handler(a, "click", function () {
                    var e = a.closest(t.FRAMES), r = i._getThumbFileId(e);
                    i._hideProgress(), e.hasClass("file-preview-error") && !i.retryErrorUploads || i._uploadSingle(i.fileManager.getIndex(r), r, !1)
                })
            }))
        }, _initPreviewActions: function () {
            var i = this, a = i.$preview, r = i.deleteExtraData || {}, n = t.FRAMES + " .kv-file-remove",
                o = i.fileActionSettings, s = o.removeClass, l = o.removeErrorClass, d = function () {
                    var e = i.isAjaxUpload ? i.previewCache.count(!0) : i._inputFileCount();
                    i.getFrames().length || e ? i._resetCaption() : (i._setCaption(""), i.reset(), i.initialCaption = "")
                };
            i._initZoomButton(), i._initRotateButton(), a.find(n).each(function () {
                var a, n, o, c, u = e(this), f = u.data("url") || i.deleteUrl, p = u.data("key"),
                    g = i.ajaxOperations.deleteThumb;
                if (!t.isEmpty(f) && void 0 !== p) {
                    "function" == typeof f && (f = f());
                    var m, h, v, w, b, _ = u.closest(t.FRAMES), C = i.previewCache.data, x = _.attr("data-fileindex");
                    x = parseInt(x.replace(t.INIT_FLAG, "")), v = t.isEmpty(C.config) && t.isEmpty(C.config[x]) ? null : C.config[x], b = t.isEmpty(v) || t.isEmpty(v.extra) ? r : v.extra, w = v && (v.filename || v.caption) || "", "function" == typeof b && (b = b()), h = {
                        id: u.attr("id"),
                        key: p,
                        extra: b
                    }, n = function (e) {
                        i.ajaxAborted = !1, i._raise("filepredelete", [p, e, b]), i._abort() ? e.abort() : (u.removeClass(l), t.addCss(_, "file-uploading"), t.addCss(u, "disabled " + s))
                    }, o = function (e, r, n) {
                        var o, c;
                        return t.isEmpty(e) || t.isEmpty(e.error) ? (_.removeClass("file-uploading").addClass("file-deleted"), void _.fadeOut("slow", function () {
                            x = parseInt(_.attr("data-fileindex").replace(t.INIT_FLAG, "")), i.previewCache.unset(x), i._deleteFileIndex(_), o = i.previewCache.count(!0), c = o > 0 ? i._getMsgSelected(o) : "", i._setCaption(c), i._raise("filedeleted", [p, n, b]), i._clearObjects(_), _.remove(), d()
                        })) : (h.jqXHR = n, h.response = e, a = i._parseError(g, n, i.msgDeleteError, w), i._showFileError(a, h, "filedeleteerror"), _.removeClass("file-uploading"), u.removeClass("disabled " + s).addClass(l), void d())
                    }, c = function (e, t, a) {
                        var r = i._parseError(g, e, a, w);
                        h.jqXHR = e, h.response = {}, i._showFileError(r, h, "filedeleteerror"), _.removeClass("file-uploading"), u.removeClass("disabled " + s).addClass(l), d()
                    }, i._initAjaxSettings(), i._mergeAjaxCallback("beforeSend", n, "delete"), i._mergeAjaxCallback("success", o, "delete"), i._mergeAjaxCallback("error", c, "delete"), m = e.extend(!0, {}, {
                        url: i._encodeURI(f),
                        type: "POST",
                        dataType: "json",
                        data: e.extend(!0, {}, {key: p}, b)
                    }, i._ajaxDeleteSettings), i._handler(u, "click", function () {
                        return i._validateMinCount() ? (i.ajaxAborted = !1, i._raise("filebeforedelete", [p, b]), void (i.ajaxAborted instanceof Promise ? i.ajaxAborted.then(function (t) {
                            t || e.ajax(m)
                        }) : i.ajaxAborted || e.ajax(m))) : !1
                    })
                }
            })
        }, _hideFileIcon: function () {
            var e = this;
            e.overwriteInitial && e.$captionContainer.removeClass("icon-visible")
        }, _showFileIcon: function () {
            var e = this;
            t.addCss(e.$captionContainer, "icon-visible")
        }, _getSize: function (t, i, a) {
            var r, n, o = this, s = parseFloat(t), l = 0, d = o.bytesToKB, c = o.fileSizeGetter, u = s;
            if (!e.isNumeric(t) || !e.isNumeric(s)) return "";
            if ("function" == typeof c) r = c(s); else {
                if (a || (a = o.sizeUnits), s > 0) {
                    for (; u >= d;) u /= d, ++l;
                    a[l] || (u = s, l = 0)
                }
                n = u.toFixed(2), n == u && (n = u), r = n + " " + a[l]
            }
            return i ? r : o._getLayoutTemplate("size").replace("{sizeText}", r)
        }, _getFileType: function (e) {
            var t = this;
            return t.mimeTypeAliases[e] || e
        }, _generatePreviewTemplate: function (i, a, r, n, o, s, l, d, c, u, f, p, g, m, h) {
            var v, w, b, _, C, x, y = this, T = y.slug(r), P = "", k = "", F = c || r,
                S = F.split(".").pop().toLowerCase(),
                I = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, E = T,
                A = T, z = "type-default", D = f || y._renderFileFooter(i, T, d, "auto", l),
                j = -1 !== e.inArray(S, y.alwaysPreviewFileExtensions), $ = y.preferIconicPreview && !j,
                U = y.preferIconicZoomPreview && !j, M = $ ? "other" : i;
            return b = 400 > I ? y.previewSettingsSmall[M] || y.defaults.previewSettingsSmall[M] : y.previewSettings[M] || y.defaults.previewSettings[M], b && e.each(b, function (e, t) {
                k += e + ":" + t + ";"
            }), _ = function (a, l, d, c, f) {
                var h, v = d ? "zoom-" + o : o, w = y._getPreviewTemplate(a), b = (u || "") + " " + c;
                return y.frameClass && (b = y.frameClass + " " + b), d && (b = b.replace(" " + t.SORT_CSS, "")), w = y._parseFilePreviewIcon(w, r), "object" !== i || n || e.each(y.defaults.fileTypeSettings, function (e, t) {
                    "object" !== e && "other" !== e && t(r, n) && (z = "type-" + e)
                }), t.isEmpty(m) || (void 0 !== m.title && null !== m.title && (E = m.title), void 0 !== m.alt && null !== m.alt && (A = E = m.alt)), h = {
                    previewId: v,
                    caption: T,
                    title: E,
                    alt: A,
                    frameClass: b,
                    type: y._getFileType(n),
                    fileindex: p,
                    fileid: s || "",
                    filename: F,
                    typeCss: z,
                    footer: D,
                    data: d && f ? y.zoomPlaceholder + "{zoomData}" : l,
                    template: g || i,
                    style: k ? 'style="' + k + '"' : "",
                    zoomData: f ? encodeURIComponent(f) : ""
                }, d && (h.zoomCache = "", h.zoomData = "{zoomData}"), w.setTokens(h)
            }, p = p || o.slice(o.lastIndexOf("-") + 1), x = y.fileActionSettings.showRotate && -1 !== e.inArray(S, y.rotatableFileExtensions), y.fileActionSettings.showZoom && (C = "kv-zoom-thumb", x && (C += " rotatable" + (U ? " hide-rotate" : "")), P = _(U ? "other" : i, a, !0, C, h)), P = "\n" + y._getLayoutTemplate("zoomCache").replace("{zoomContent}", P), "function" == typeof y.sanitizeZoomCache && (P = y.sanitizeZoomCache(P)), C = "kv-preview-thumb", x && (w = $ || y.hideThumbnailContent || !!y.previewFileIconSettings[S], C += " rotatable" + (w ? " hide-rotate" : "")), v = _($ ? "other" : i, a, !1, C, h), v.setTokens({zoomCache: P})
        }, _addToPreview: function (e, i) {
            var a, r = this;
            return i = t.cspBuffer.stash(i), a = r.reversePreviewOrder ? e.prepend(i) : e.append(i), t.cspBuffer.apply(e), a
        }, _previewDefault: function (e, i) {
            var a = this, r = a.$preview;
            if (a.showPreview) {
                var n, o = t.getFileName(e), s = e ? e.type : "", l = e.size || 0, d = a._getFileName(e, ""),
                    c = i === !0 && !a.isAjaxUpload, u = t.createObjectURL(e), f = a.fileManager.getId(e),
                    p = a._getThumbId(f);
                a._clearDefaultPreview(), n = a._generatePreviewTemplate("other", u, o, s, p, f, c, l), a._addToPreview(r, n), a._setThumbAttr(p, d, l), i === !0 && a.isAjaxUpload && a._setThumbStatus(a._getFrame(p), "Error")
            }
        }, _previewFile: function (e, i, a, r, n) {
            if (this.showPreview) {
                var o, s = this, l = t.getFileName(i), d = n.type, c = n.name, u = s._parseFileType(d, l),
                    f = s.$preview, p = i.size || 0, g = "image" === u ? a.target.result : r, m = s.fileManager,
                    h = m.getId(i), v = s._getThumbId(h);
                o = s._generatePreviewTemplate(u, g, l, d, v, h, !1, p, n.filename), s._clearDefaultPreview(), s._addToPreview(f, o);
                var w = s._getFrame(v);
                s._validateImageOrientation(w.find("img"), i, v, h, c, d, p, g), s._setThumbAttr(v, c, p), s._initSortable()
            }
        }, _setThumbAttr: function (e, t, i, a) {
            var r = this, n = r._getFrame(e);
            n.length && (i = i && i > 0 ? r._getSize(i) : "", n.data({caption: t, size: i, description: a || ""}))
        }, _setInitThumbAttr: function () {
            var e, i, a, r, n, o = this, s = o.previewCache.data, l = o.previewCache.count(!0);
            if (0 !== l) for (var d = 0; l > d; d++) e = s.config[d], n = o.previewInitId + "-" + t.INIT_FLAG + d, i = t.ifSet("caption", e, t.ifSet("filename", e)), a = t.ifSet("size", e), r = t.ifSet("description", e), o._setThumbAttr(n, i, a, r)
        }, _slugDefault: function (e) {
            return t.isEmpty(e, !0) ? "" : String(e).replace(/[\[\]\/\{}:;#%=\(\)\*\+\?\\\^\$\|<>&"']/g, "_")
        }, _updateFileDetails: function (e) {
            var i, a, r, n, o, s = this, l = s.$element,
                d = t.isIE(9) && t.findFileName(l.val()) || l[0].files[0] && l[0].files[0].name;
            !d && s.fileManager.count() > 0 ? (o = s.fileManager.getFirstFile(), i = o.nameFmt) : i = d ? s.slug(d) : "_", a = s.isAjaxUpload ? s.fileManager.count() : e, n = s.previewCache.count(!0) + a, r = 1 === a ? i : s._getMsgSelected(n, !s.isAjaxUpload && !s.isError), s.isError ? (s.$previewContainer.removeClass("file-thumb-loading"), s._initCapStatus(), s.$previewStatus.html(""), s.$captionContainer.removeClass("icon-visible")) : s._showFileIcon(), s._setCaption(r, s.isError), s.$container.removeClass("file-input-new file-input-ajax-new"), s._raise("fileselect", [e, i]), s.previewCache.count(!0) && s._initPreviewActions()
        }, _setThumbStatus: function (e, i) {
            var a = this;
            if (a.showPreview) {
                var r = "indicator" + i, n = r + "Title", o = "file-preview-" + i.toLowerCase(),
                    s = e.find(".file-upload-indicator"), l = a.fileActionSettings;
                e.removeClass("file-preview-success file-preview-error file-preview-paused file-preview-loading"), "Success" === i && e.find(".file-drag-handle").remove(), t.setHtml(s, l[r]), s.attr("title", l[n]), e.addClass(o), "Error" !== i || a.retryErrorUploads || e.find(".kv-file-upload").attr("disabled", !0)
            }
        }, _setProgressCancelled: function () {
            var e = this;
            e._setProgress(101, e.$progress, e.msgCancelled)
        }, _setProgress: function (e, i, a, r) {
            var n = this;
            if (i = i || n.$progress, i.length) {
                var o, s = Math.min(e, 100), l = n.progressUploadThreshold,
                    d = 100 >= e ? n.progressTemplate : n.progressCompleteTemplate,
                    c = 100 > s ? n.progressTemplate : a ? n.paused ? n.progressPauseTemplate : n.progressErrorTemplate : d;
                e >= 100 && (r = ""), t.isEmpty(c) || (o = l && s > l && 100 >= e ? c.setTokens({
                    percent: l,
                    status: n.msgUploadThreshold
                }) : c.setTokens({
                    percent: s,
                    status: e > 100 ? n.msgUploadEnd : s + "%"
                }), r = r || "", o = o.setTokens({stats: r}), t.setHtml(i, o), a && t.setHtml(i.find('[role="progressbar"]'), a))
            }
        }, _hasFiles: function () {
            var e = this.$element[0];
            return !!(e && e.files && e.files.length)
        }, _setFileDropZoneTitle: function () {
            var e, i = this, a = i.$container.find(".file-drop-zone"), r = i.dropZoneTitle;
            i.isClickable && (e = t.isEmpty(i.$element.attr("multiple")) ? i.fileSingle : i.filePlural, r += i.dropZoneClickTitle.replace("{files}", e)), a.find("." + i.dropZoneTitleClass).remove(), !i.showPreview || 0 === a.length || i.fileManager.count() > 0 || !i.dropZoneEnabled || i.previewCache.count() > 0 || !i.isAjaxUpload && i._hasFiles() || (0 === a.find(t.FRAMES).length && t.isEmpty(i.defaultPreviewContent) && a.prepend('<div class="' + i.dropZoneTitleClass + '">' + r + "</div>"), i.$container.removeClass("file-input-new"), t.addCss(i.$container, "file-input-ajax-new"))
        }, _getStats: function (e) {
            var i, a, r = this;
            return r.showUploadStats && e && e.bitrate ? (a = r._getLayoutTemplate("stats"), i = e.elapsed && e.bps ? r.msgPendingTime.setTokens({time: t.getElapsed(Math.ceil(e.pendingBytes / e.bps))}) : r.msgCalculatingTime, a.setTokens({
                uploadSpeed: e.bitrate,
                pendingTime: i
            })) : ""
        }, _setResumableProgress: function (e, t, i) {
            var a = this, r = a.resumableManager, n = i ? r : a, o = i ? i.find(".file-thumb-progress") : null;
            0 === n.lastProgress && (n.lastProgress = e), e < n.lastProgress && (e = n.lastProgress), a._setProgress(e, o, null, a._getStats(t)), n.lastProgress = e
        }, _toggleResumableProgress: function (e, i) {
            var a = this, r = a.$progress;
            r && r.length && t.setHtml(r, e.setTokens({percent: 101, status: i, stats: ""}))
        }, _setFileUploadStats: function (i, a, r) {
            var n = this, o = n.$progress;
            if (n.showPreview || o && o.length) {
                var s, l = n.fileManager, d = n.resumableManager, c = l.getThumb(i), u = 0, f = l.getTotalSize(),
                    p = e.extend(!0, {}, r);
                if (n.enableResumableUpload) {
                    var g, m = r.loaded, h = d.getUploadedSize(), v = d.file.size;
                    m += h, g = l.uploadedSize + m, a = t.round(100 * m / v), r.pendingBytes = v - h, n._setResumableProgress(a, r, c), s = Math.floor(100 * g / f), p.pendingBytes = f - g, n._setResumableProgress(s, p)
                } else l.setProgress(i, a), o = c && c.length ? c.find(".file-thumb-progress") : null, n._setProgress(a, o, null, n._getStats(r)), e.each(l.stats, function (e, t) {
                    u += t.loaded
                }), p.pendingBytes = f - u, s = t.round(u / f * 100), n._setProgress(s, null, null, n._getStats(p))
            }
        }, _validateMinCount: function () {
            var e = this, t = e.isAjaxUpload ? e.fileManager.count() : e._inputFileCount();
            return e.validateInitialCount && e.minFileCount > 0 && e._getFileCount(t - 1) < e.minFileCount ? (e._noFilesError({}), !1) : !0
        }, _getFileCount: function (e, t) {
            var i = this, a = 0;
            return void 0 === t && (t = i.validateInitialCount && !i.overwriteInitial), t && (a = i.previewCache.count(!0), e += a), e
        }, _getFileId: function (e) {
            return t.getFileId(e, this.generateFileId)
        }, _getFileName: function (e, i) {
            var a = this, r = t.getFileName(e);
            return r ? a.slug(r) : i
        }, _getFileNames: function (e) {
            var t = this;
            return t.filenames.filter(function (t) {
                return e ? void 0 !== t : void 0 !== t && null !== t
            })
        }, _setPreviewError: function (e, t) {
            var i = this, a = i.removeFromPreviewOnError && !i.retryErrorUploads;
            if (t && !a || i.fileManager.remove(e), i.showPreview) {
                if (a) return void e.remove();
                i._setThumbStatus(e, "Error"), i._refreshUploadButton(e)
            }
        }, _refreshUploadButton: function (e) {
            var i = this, a = e.find(".kv-file-upload"), r = i.fileActionSettings, n = r.uploadIcon, o = r.uploadTitle;
            a.length && (i.retryErrorUploads && (n = r.uploadRetryIcon, o = r.uploadRetryTitle), a.attr("title", o), t.setHtml(a, n))
        }, _isValidSize: function (e, i, a, r, n, o) {
            var s, l, d, c = this, u = "Small" === e ? "min" : "max", f = c[u + "Image" + i];
            return t.isEmpty(f) || !a.length ? !0 : (d = a[0], l = "Width" === i ? d.naturalWidth || d.width : d.naturalHeight || d.height, ("Small" === e ? l >= f : f >= l) ? !0 : (s = c["msgImage" + i + e] || 'Image "{name}" has a size validation error (limit "{size}").', c._showFileError(s.setTokens({
                name: n,
                size: f,
                dimension: l
            }), o), c._setPreviewError(r), c.fileManager.remove(r), c._clearFileInput(), !1))
        }, _getExifObj: function (e) {
            var i, a = this, r = t.logMessages.exifWarning;
            if ("data:image/jpeg;base64," !== e.slice(0, 23) && "data:image/jpg;base64," !== e.slice(0, 22)) return void (i = null);
            try {
                i = window.piexif ? window.piexif.load(e) : null
            } catch (n) {
                i = null, r = n && n.message || ""
            }
            return !i && a.showExifErrorLog && a._log(t.logMessages.badExifParser, {details: r}), i
        }, setImageOrientation: function (i, a, r, n) {
            var o, s, l, d = this, c = !i || !i.length, u = !a || !a.length, f = !1,
                p = c && n && "image" === n.attr("data-template");
            c && u || (l = "load.fileinputimageorient", p ? (i = a, a = null, i.css(d.previewSettings.image), s = e(document.createElement("div")).appendTo(n.find(".kv-file-content")), o = e(document.createElement("span")).insertBefore(i), i.css("visibility", "hidden").removeClass("file-zoom-detail").appendTo(s)) : f = !i.is(":visible"), i.off(l).on(l, function () {
                f && (d.$preview.removeClass("hide-content"), n.find(".kv-file-content").css("visibility", "hidden"));
                var e = i[0], l = a && a.length ? a[0] : null, c = e.offsetHeight, u = e.offsetWidth,
                    g = t.getRotation(r);
                if (f && (n.find(".kv-file-content").css("visibility", "visible"), d.$preview.addClass("hide-content")), i.data("orientation", r), l && a.data("orientation", r), 5 > r) return t.setTransform(e, g), void t.setTransform(l, g);
                var m = Math.atan(u / c), h = Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)),
                    v = h ? c / Math.cos(Math.PI / 2 + m) / h : 1, w = " scale(" + Math.abs(v) + ")";
                t.setTransform(e, g + w), t.setTransform(l, g + w), p && (i.css("visibility", "visible").insertAfter(o).addClass("file-zoom-detail"), o.remove(), s.remove())
            }))
        }, _validateImageOrientation: function (i, a, r, n, o, s, l, d) {
            var c, u, f = this, p = null, g = f.autoOrientImage;
            return p = f._getExifObj(d), f.canOrientImage ? (i.css("image-orientation", g ? "from-image" : "none"), void f._validateImage(r, n, o, s, l, d, p)) : (u = t.getZoomSelector(r, " img"), (c = p ? p["0th"][piexif.ImageIFD.Orientation] : null) ? (f.setImageOrientation(i, e(u), c, f._getFrame(r)), f._raise("fileimageoriented", {
                $img: i,
                file: a
            }), void f._validateImage(r, n, o, s, l, d, p)) : void f._validateImage(r, n, o, s, l, d, p))
        }, _validateImage: function (e, t, i, a, r, n, o) {
            var s, l, d, c = this, u = c.$preview, f = c._getFrame(e), p = f.attr("data-fileindex"), g = f.find("img");
            i = i || "Untitled", g.one("load", function () {
                g.data("validated") || (g.data("validated", !0), l = f.width(), d = u.width(), l > d && g.css("width", "100%"), s = {
                    ind: p,
                    id: e,
                    fileId: t
                }, setTimeout(function () {
                    var l, d;
                    l = c._isValidSize("Small", "Width", g, f, i, s), d = c._isValidSize("Small", "Height", g, f, i, s), c.resizeImage || (l = l && c._isValidSize("Large", "Width", g, f, i, s), d = d && c._isValidSize("Large", "Height", g, f, i, s)), c._raise("fileimageloaded", [e]), f.data("exif", o), l && d && (c.fileManager.addImage(t, {
                        ind: p,
                        img: g,
                        thumb: f,
                        pid: e,
                        typ: a,
                        siz: r,
                        validated: !1,
                        imgData: n,
                        exifObj: o
                    }), c._validateAllImages())
                }, c.processDelay))
            }).one("error", function () {
                c._raise("fileimageloaderror", [e])
            })
        }, _validateAllImages: function () {
            var t, i = this, a = {val: 0}, r = i.fileManager.getImageCount(), n = i.resizeIfSizeMoreThan;
            r === i.fileManager.totalImages && (i._raise("fileimagesloaded"), i.resizeImage && e.each(i.fileManager.loadedImages, function (e, o) {
                o.validated || (t = o.siz, t && t > n * i.bytesToKB && i._getResizedImage(e, o, a, r), o.validated = !0)
            }))
        }, _getResizedImage: function (i, a, r, n) {
            var o, s, l, d, c, u, f, p, g, m, h = this, v = e(a.img)[0], w = v.naturalWidth, b = v.naturalHeight, _ = 1,
                C = h.maxImageWidth || w, x = h.maxImageHeight || b, y = !(!w || !b), T = h.imageCanvas,
                P = h.imageCanvasContext, k = a.typ, F = a.pid, S = a.ind, I = a.thumb, E = a.exifObj;
            if (c = function (e, t, i) {
                h.isAjaxUpload ? h._showFileError(e, t, i) : h._showError(e, t, i), h._setPreviewError(I)
            }, p = h.fileManager.getFile(i), g = {
                id: F,
                index: S,
                fileId: i
            }, m = [i, F, S], (!p || !y || C >= w && x >= b) && (y && p && h._raise("fileimageresized", m), r.val++, r.val === n && h._raise("fileimagesresized"), !y)) return void c(h.msgImageResizeError, g, "fileimageresizeerror");
            k = k || h.resizeDefaultImageType, s = w > C, l = b > x, _ = "width" === h.resizePreference ? s ? C / w : l ? x / b : 1 : l ? x / b : s ? C / w : 1, h._resetCanvas(), w *= _, b *= _, T.width = w, T.height = b;
            try {
                P.drawImage(v, 0, 0, w, b), d = T.toDataURL(k, h.resizeQuality), E && (f = window.piexif.dump(E), d = window.piexif.insert(f, d)), o = t.dataURI2Blob(d), h.fileManager.setFile(i, o), h._raise("fileimageresized", m), r.val++, r.val === n && h._raise("fileimagesresized", [void 0, void 0]), o instanceof Blob || c(h.msgImageResizeError, g, "fileimageresizeerror")
            } catch (A) {
                r.val++, r.val === n && h._raise("fileimagesresized", [void 0, void 0]), u = h.msgImageResizeException.replace("{errors}", A.message), c(u, g, "fileimageresizeexception")
            }
        }, _showProgress: function () {
            var e = this;
            e.$progress && e.$progress.length && e.$progress.show()
        }, _hideProgress: function () {
            var e = this;
            e.$progress && e.$progress.length && e.$progress.hide()
        }, _initBrowse: function (e) {
            var i = this, a = i.$element;
            i.showBrowse ? i.$btnFile = e.find(".btn-file").append(a) : (a.appendTo(e).attr("tabindex", -1), t.addCss(a, "file-no-browse"))
        }, _initClickable: function () {
            var i, a, r = this;
            r.isClickable && (i = r.$dropZone, r.isAjaxUpload || (a = r.$preview.find(".file-default-preview"), a.length && (i = a)), t.addCss(i, "clickable"), i.attr("tabindex", -1), r._handler(i, "click", function (t) {
                var a = e(t.target);
                r.$errorContainer.is(":visible") || a.parents(".file-preview-thumbnails").length && !a.parents(".file-default-preview").length || (r.$element.data("zoneClicked", !0).trigger("click"), i.blur())
            }))
        }, _initCaption: function () {
            var e = this, i = e.initialCaption || "";
            return e.overwriteInitial || t.isEmpty(i) ? (e.$caption.val(""), !1) : (e._setCaption(i), !0)
        }, _setCaption: function (i, a) {
            var r, n, o, s, l, d, c = this;
            if (c.$caption.length) {
                if (c.$captionContainer.removeClass("icon-visible"), a) r = e("<div>" + c.msgValidationError + "</div>").text(), s = c.fileManager.count(), s ? (d = c.fileManager.getFirstFile(), l = 1 === s && d ? d.nameFmt : c._getMsgSelected(s)) : l = c._getMsgSelected(c.msgNo), n = t.isEmpty(i) ? l : i, o = '<span class="' + c.msgValidationErrorClass + '">' + c.msgValidationErrorIcon + "</span>"; else {
                    if (t.isEmpty(i)) return void c.$caption.attr("title", "");
                    r = e("<div>" + i + "</div>").text(), n = r, o = c._getLayoutTemplate("fileIcon")
                }
                c.$captionContainer.addClass("icon-visible"), c.$caption.attr("title", r).val(n), t.setHtml(c.$captionIcon, o)
            }
        }, _createContainer: function () {
            var e = this, i = {"class": "file-input file-input-new" + (e.rtl ? " kv-rtl" : "")},
                a = t.createElement(t.cspBuffer.stash(e._renderMain()));
            return t.cspBuffer.apply(a), a.insertBefore(e.$element).attr(i), e._initBrowse(a), e.theme && a.addClass("theme-" + e.theme), a
        }, _refreshContainer: function () {
            var e = this, i = e.$container, a = e.$element;
            a.insertAfter(i), t.setHtml(i, e._renderMain()), e._initBrowse(i), e._validateDisabled()
        }, _validateDisabled: function () {
            var e = this;
            e.$caption.attr({readonly: e.isDisabled})
        }, _setTabIndex: function (e, t) {
            var i = this, a = i.tabIndexConfig[e];
            return t.setTokens({tabIndexConfig: void 0 === a || null === a ? "" : 'tabindex="' + a + '"'})
        }, _renderMain: function () {
            var e = this, t = e.dropZoneEnabled ? " file-drop-zone" : "file-drop-disabled",
                i = e.showClose ? e._getLayoutTemplate("close") : "",
                a = e.showPreview ? e._getLayoutTemplate("preview").setTokens({
                    "class": e.previewClass,
                    dropClass: t
                }) : "", r = e.isDisabled ? e.captionClass + " file-caption-disabled" : e.captionClass,
                n = e.captionTemplate.setTokens({"class": r + " kv-fileinput-caption"});
            return n = e._setTabIndex("caption", n), e.mainTemplate.setTokens({
                "class": e.mainClass + (!e.showBrowse && e.showCaption ? " no-browse" : ""),
                inputGroupClass: e.inputGroupClass,
                preview: a,
                close: i,
                caption: n,
                upload: e._renderButton("upload"),
                remove: e._renderButton("remove"),
                cancel: e._renderButton("cancel"),
                pause: e._renderButton("pause"),
                browse: e._renderButton("browse")
            })
        }, _renderButton: function (e) {
            var i = this, a = i._getLayoutTemplate("btnDefault"), r = i[e + "Class"], n = i[e + "Title"],
                o = i[e + "Icon"], s = i[e + "Label"], l = i.isDisabled ? " disabled" : "", d = "button";
            switch (e) {
                case"remove":
                    if (!i.showRemove) return "";
                    break;
                case"cancel":
                    if (!i.showCancel) return "";
                    r += " kv-hidden";
                    break;
                case"pause":
                    if (!i.showPause) return "";
                    r += " kv-hidden";
                    break;
                case"upload":
                    if (!i.showUpload) return "";
                    i.isAjaxUpload && !i.isDisabled ? a = i._getLayoutTemplate("btnLink").replace("{href}", i.uploadUrl) : d = "submit";
                    break;
                case"browse":
                    if (!i.showBrowse) return "";
                    a = i._getLayoutTemplate("btnBrowse");
                    break;
                default:
                    return ""
            }
            return a = i._setTabIndex(e, a), r += "browse" === e ? " btn-file" : " fileinput-" + e + " fileinput-" + e + "-button", t.isEmpty(s) || (s = ' <span class="' + i.buttonLabelClass + '">' + s + "</span>"), a.setTokens({
                type: d,
                css: r,
                title: n,
                status: l,
                icon: o,
                label: s
            })
        }, _renderThumbProgress: function () {
            var e = this;
            return '<div class="file-thumb-progress kv-hidden">' + e.progressInfoTemplate.setTokens({
                percent: 101,
                status: e.msgUploadBegin,
                stats: ""
            }) + "</div>"
        }, _renderFileFooter: function (e, i, a, r, n) {
            var o, s, l = this, d = l.fileActionSettings, c = d.showRemove, u = d.showDrag, f = d.showUpload,
                p = d.showRotate, g = d.showZoom, m = l._getLayoutTemplate("footer"),
                h = l._getLayoutTemplate("indicator"), v = n ? d.indicatorError : d.indicatorNew,
                w = n ? d.indicatorErrorTitle : d.indicatorNewTitle, b = h.setTokens({indicator: v, indicatorTitle: w});
            return a = l._getSize(a), s = {
                type: e,
                caption: i,
                size: a,
                width: r,
                progress: "",
                indicator: b
            }, l.isAjaxUpload ? (s.progress = l._renderThumbProgress(), s.actions = l._renderFileActions(s, f, !1, c, p, g, u, !1, !1, !1)) : s.actions = l._renderFileActions(s, !1, !1, !1, !1, g, u, !1, !1, !1), o = m.setTokens(s), o = t.replaceTags(o, l.previewThumbTags)
        }, _renderFileActions: function (e, t, i, a, r, n, o, s, l, d, c, u, f) {
            var p = this;
            if (!e.type && c && (e.type = "image"), p.enableResumableUpload ? t = !1 : "function" == typeof t && (t = t(e)), "function" == typeof i && (i = i(e)), "function" == typeof a && (a = a(e)), "function" == typeof n && (n = n(e)), "function" == typeof o && (o = o(e)), "function" == typeof r && (r = r(e)), !(t || i || a || r || n || o)) return "";
            var g, m = l === !1 ? "" : ' data-url="' + l + '"', h = "", v = "", w = "",
                b = d === !1 ? "" : ' data-key="' + d + '"', _ = "", C = "", x = "",
                y = p._getLayoutTemplate("actions"), T = p.fileActionSettings,
                P = p.otherActionButtons.setTokens({dataKey: b, key: d}),
                k = s ? T.removeClass + " disabled" : T.removeClass;
            return a && (_ = p._getLayoutTemplate("actionDelete").setTokens({
                removeClass: k,
                removeIcon: T.removeIcon,
                removeTitle: T.removeTitle,
                dataUrl: m,
                dataKey: b,
                key: d
            })), r && (w = p._getLayoutTemplate("actionRotate").setTokens({
                rotateClass: T.rotateClass,
                rotateIcon: T.rotateIcon,
                rotateTitle: T.rotateTitle
            })), t && (C = p._getLayoutTemplate("actionUpload").setTokens({
                uploadClass: T.uploadClass,
                uploadIcon: T.uploadIcon,
                uploadTitle: T.uploadTitle
            })), i && (x = p._getLayoutTemplate("actionDownload").setTokens({
                downloadClass: T.downloadClass,
                downloadIcon: T.downloadIcon,
                downloadTitle: T.downloadTitle,
                downloadUrl: u || p.initialPreviewDownloadUrl
            }), x = x.setTokens({
                filename: f,
                key: d
            })), n && (h = p._getLayoutTemplate("actionZoom").setTokens({
                zoomClass: T.zoomClass,
                zoomIcon: T.zoomIcon,
                zoomTitle: T.zoomTitle
            })), o && c && (g = "drag-handle-init " + T.dragClass, v = p._getLayoutTemplate("actionDrag").setTokens({
                dragClass: g,
                dragTitle: T.dragTitle,
                dragIcon: T.dragIcon
            })), y.setTokens({"delete": _, upload: C, download: x, rotate: w, zoom: h, drag: v, other: P})
        }, _browse: function (e) {
            var t = this;
            e && e.isDefaultPrevented() || !t._raise("filebrowse") || (t.isError && !t.isAjaxUpload && t.clear(), t.focusCaptionOnBrowse && t.$captionContainer.focus())
        }, _change: function (i) {
            var a = this;
            if (e(document.body).off("focusin.fileinput focusout.fileinput"), a.changeTriggered) return void a._toggleLoading("hide");
            a._toggleLoading("show");
            var r, n, o, s, l = a.$element, d = arguments.length > 1, c = a.isAjaxUpload,
                u = d ? arguments[1] : l[0].files, f = a.fileManager.count(), p = t.isEmpty(l.attr("multiple")),
                g = !c && p ? 1 : a.maxFileCount, m = a.maxTotalFileCount, h = m > 0 && m > g, v = p && f > 0,
                w = function (t, i, r, n) {
                    var o = e.extend(!0, {}, a._getOutData(null, {}, {}, u), {id: r, index: n}),
                        s = {id: r, index: n, file: i, files: u};
                    return a.isPersistentError = !0, a._toggleLoading("hide"), c ? a._showFileError(t, o) : a._showError(t, s)
                }, b = function (e, t, i) {
                    var r = i ? a.msgTotalFilesTooMany : a.msgFilesTooMany;
                    r = r.replace("{m}", t).replace("{n}", e), a.isError = w(r, null, null, null), a.$captionContainer.removeClass("icon-visible"), a._setCaption("", !0), a.$container.removeClass("file-input-new file-input-ajax-new")
                };
            if (a.reader = null, a._resetUpload(), a._hideFileIcon(), a.dropZoneEnabled && a.$container.find(".file-drop-zone ." + a.dropZoneTitleClass).remove(), c || (u = i.target && void 0 === i.target.files ? i.target.value ? [{name: i.target.value.replace(/^.+\\/, "")}] : [] : i.target.files || {}), r = u, t.isEmpty(r) || 0 === r.length) return c || a.clear(), void a._raise("fileselectnone");
            if (a._resetErrors(), s = r.length, o = c ? a.fileManager.count() + s : s, n = a._getFileCount(o, h ? !1 : void 0), g > 0 && n > g) {
                if (!a.autoReplace || s > g) return void b(a.autoReplace && s > g ? s : n, g);
                n > g && a._resetPreviewThumbs(c)
            } else {
                if (h && (n = a._getFileCount(o, !0), m > 0 && n > m)) {
                    if (!a.autoReplace || s > g) return void b(a.autoReplace && s > m ? s : n, m, !0);
                    n > g && a._resetPreviewThumbs(c)
                }
                !c || v ? (a._resetPreviewThumbs(!1), v && a.clearFileStack()) : !c || 0 !== f || a.previewCache.count(!0) && !a.overwriteInitial || a._resetPreviewThumbs(!0)
            }
            a.autoReplace && a._getThumbs().each(function () {
                var t = e(this);
                (t.hasClass("file-preview-success") || t.hasClass("file-preview-error")) && t.remove()
            }), a.readFiles(r), a._toggleLoading("hide")
        }, _abort: function (t) {
            var i, a = this;
            return a.ajaxAborted && "object" == typeof a.ajaxAborted && void 0 !== a.ajaxAborted.message ? (i = e.extend(!0, {}, a._getOutData(null), t), i.abortData = a.ajaxAborted.data || {}, i.abortMessage = a.ajaxAborted.message, a._setProgress(101, a.$progress, a.msgCancelled), a._showFileError(a.ajaxAborted.message, i, "filecustomerror"), a.cancel(), a.unlock(), !0) : !!a.ajaxAborted
        }, _resetFileStack: function () {
            var t = this, i = 0;
            t._getThumbs().each(function () {
                var a = e(this), r = a.attr("data-fileindex"), n = a.attr("id");
                "-1" !== r && -1 !== r && (t._getThumbFile(a) ? a.attr({"data-fileindex": "-1"}) : (a.attr({"data-fileindex": i}), i++), t._getZoom(n).attr({"data-fileindex": a.attr("data-fileindex")}))
            })
        }, _isFileSelectionValid: function (e) {
            var t = this;
            return e = e || 0, t.required && !t.getFilesCount() ? (t.$errorContainer.html(""), t._showFileError(t.msgFileRequired), !1) : t.minFileCount > 0 && t._getFileCount(e) < t.minFileCount ? (t._noFilesError({}), !1) : !0
        }, _canPreview: function (e) {
            var i = this;
            if (!(e && i.showPreview && i.$preview && i.$preview.length)) return !1;
            var a, r, n, o, s = e.name || "", l = e.type || "", d = (e.size || 0) / i.bytesToKB,
                c = i._parseFileType(l, s), u = i.allowedPreviewTypes, f = i.allowedPreviewMimeTypes,
                p = i.allowedPreviewExtensions || [], g = i.disabledPreviewTypes, m = i.disabledPreviewMimeTypes,
                h = i.disabledPreviewExtensions || [],
                v = i.maxFilePreviewSize && parseFloat(i.maxFilePreviewSize) || 0,
                w = new RegExp("\\.(" + p.join("|") + ")$", "i"), b = new RegExp("\\.(" + h.join("|") + ")$", "i");
            return a = !u || -1 !== u.indexOf(c), r = !f || -1 !== f.indexOf(l), n = !p.length || t.compare(s, w), o = g && -1 !== g.indexOf(c) || m && -1 !== m.indexOf(l) || h.length && t.compare(s, b) || v && !isNaN(v) && d > v, !o && (a || r || n)
        }, addToStack: function (e, t) {
            var i = this;
            i.stackIsUpdating = !0, i.fileManager.add(e, t), i._refreshPreview(), i.stackIsUpdating = !1
        }, clearFileStack: function () {
            var e = this;
            return e.fileManager.clear(), e._initResumableUpload(), e.enableResumableUpload ? (null === e.showPause && (e.showPause = !0), null === e.showCancel && (e.showCancel = !1)) : (e.showPause = !1, null === e.showCancel && (e.showCancel = !0)), e.$element
        }, getFileStack: function () {
            return this.fileManager.stack
        }, getFileList: function () {
            return this.fileManager.list()
        }, getFilesSize: function () {
            return this.fileManager.getTotalSize()
        }, getFilesCount: function (e) {
            var t = this, i = t.isAjaxUpload ? t.fileManager.count() : t._inputFileCount();
            return e && (i += t.previewCache.count(!0)), t._getFileCount(i)
        }, _initCapStatus: function (e) {
            var t = this, i = t.$caption;
            i.removeClass("is-valid file-processing"), e && ("processing" === e ? i.addClass("file-processing") : i.addClass("is-valid"))
        }, _toggleLoading: function (e) {
            var t = this;
            t.$previewStatus.html("hide" === e ? "" : t.msgProcessing), t.$container.removeClass("file-thumb-loading"), t._initCapStatus("hide" === e ? "" : "processing"), "hide" !== e && (t.dropZoneEnabled && t.$container.find(".file-drop-zone ." + t.dropZoneTitleClass).remove(), t.$container.addClass("file-thumb-loading"))
        }, _initFileSelected: function () {
            var t = this, i = t.$element, a = e(document.body), r = "focusin.fileinput focusout.fileinput";
            a.length ? a.off(r).on("focusout.fileinput", function () {
                t._toggleLoading("show")
            }).on("focusin.fileinput", function () {
                setTimeout(function () {
                    i.val() || t._setFileDropZoneTitle(), a.off(r), t._toggleLoading("hide")
                }, 2500)
            }) : t._toggleLoading("hide")
        }, readFiles: function (i) {
            this.reader = new FileReader;
            var a, r = this, n = r.reader, o = r.$previewContainer, s = r.$previewStatus, l = r.msgLoading,
                d = r.msgProgress, c = r.previewInitId, u = i.length, f = r.fileTypeSettings, p = r.allowedFileTypes,
                g = p ? p.length : 0, m = r.allowedFileExtensions, h = t.isEmpty(m) ? "" : m.join(", "),
                v = function (t, n, o, s, l) {
                    var d, c = e.extend(!0, {}, r._getOutData(null, {}, {}, i), {id: o, index: s, fileId: l}),
                        f = {id: o, index: s, fileId: l, file: n, files: i};
                    r._previewDefault(n, !0), d = r._getFrame(o, !0), r._toggleLoading("hide"), r.isAjaxUpload ? setTimeout(function () {
                        a(s + 1)
                    }, r.processDelay) : (r.unlock(), u = 0), r.removeFromPreviewOnError && d.length ? d.remove() : (r._initFileActions(), d.find(".kv-file-upload").remove()), r.isPersistentError = !0, r.isError = r.isAjaxUpload ? r._showFileError(t, c) : r._showError(t, f), r._updateFileDetails(u)
                };
            r.fileManager.clearImages(), e.each(i, function (e, t) {
                var i = r.fileTypeSettings.image;
                i && i(t.type) && r.fileManager.totalImages++
            }), a = function (w) {
                var b, _ = r.$errorContainer, C = r.fileManager;
                if (w >= u) return r.unlock(), r.duplicateErrors.length && (b = "<li>" + r.duplicateErrors.join("</li><li>") + "</li>", 0 === _.find("ul").length ? t.setHtml(_, r.errorCloseButton + "<ul>" + b + "</ul>") : _.find("ul").append(b), _.fadeIn(r.fadeDelay), r._handler(_.find(".kv-error-close"), "click", function () {
                    _.fadeOut(r.fadeDelay)
                }), r.duplicateErrors = []), r.isAjaxUpload ? (r._raise("filebatchselected", [C.stack]), 0 !== C.count() || r.isError || r.reset()) : r._raise("filebatchselected", [i]), o.removeClass("file-thumb-loading"), r._initCapStatus("valid"), void s.html("");
                r.lock(!0);
                var x, y, T, P, k, F, S, I, E, A, z, D, j, $, U, M, R, B = i[w], O = B && B.size || 0,
                    L = r._getSize(O, !0), N = f.image, Z = O / r.bytesToKB, H = "", W = 0, V = "", q = !1, K = 0;
                if (R = function (e) {
                    e = e || B, x = D = r._getFileId(B), y = c + "-" + x, z = t.createObjectURL(e), A = r._getFileName(B, "")
                }, M = function () {
                    var e = !!C.loadedImages[x], t = d.setTokens({index: w + 1, files: u, percent: 50, name: A});
                    setTimeout(function () {
                        s.html(t), r._updateFileDetails(u), r.getFilesCount(!0) > 0 && r.getFrames(":visible") && r.$dropZone.find("." + r.dropZoneTitleClass).remove(), a(w + 1)
                    }, r.processDelay), r._raise("fileloaded", [B, y, x, w, n]) && r.isAjaxUpload ? e || C.add(B) : e && C.removeFile(x)
                }, B) {
                    if (R(), g > 0) for (P = 0; g > P; P++) I = p[P], E = r.msgFileTypes[I] || I, V += 0 === P ? E : ", " + E;
                    if (A === !1) return void a(w + 1);
                    if (0 === A.length) return k = r.msgInvalidFileName.replace("{name}", t.htmlEncode(t.getFileName(B), "[unknown]")), void v(k, B, y, w, D);
                    if (t.isEmpty(m) || (H = new RegExp("\\.(" + m.join("|") + ")$", "i")), r.isAjaxUpload && C.exists(D) || r._getFrame(y, !0).length) {
                        var G = {id: y, index: w, fileId: D, file: B, files: i};
                        return k = r.msgDuplicateFile.setTokens({
                            name: A,
                            size: L
                        }), void (r.isAjaxUpload ? (r.stackIsUpdating || (r.duplicateErrors.push(k), r.isDuplicateError = !0, r._raise("fileduplicateerror", [B, D, A, L, y, w])), a(w + 1), r._updateFileDetails(u)) : (r._showError(k, G), r.unlock(), u = 0, r._clearFileInput(), r.reset(), r._updateFileDetails(u)))
                    }
                    if (r.maxFileSize > 0 && Z > r.maxFileSize) return k = r.msgSizeTooLarge.setTokens({
                        name: A,
                        size: L,
                        maxSize: r._getSize(r.maxFileSize * r.bytesToKB, !0)
                    }), void v(k, B, y, w, D);
                    if (null !== r.minFileSize && Z <= t.getNum(r.minFileSize)) return k = r.msgSizeTooSmall.setTokens({
                        name: A,
                        size: L,
                        minSize: r._getSize(r.minFileSize * r.bytesToKB, !0)
                    }), void v(k, B, y, w, D);
                    if (!t.isEmpty(p) && t.isArray(p)) {
                        for (P = 0; P < p.length; P += 1) S = p[P], $ = f[S], W += $ && "function" == typeof $ && $(B.type, t.getFileName(B)) ? 1 : 0;
                        if (0 === W) return k = r.msgInvalidFileType.setTokens({
                            name: A,
                            types: V
                        }), void v(k, B, y, w, D)
                    }
                    if (0 === W && !t.isEmpty(m) && t.isArray(m) && !t.isEmpty(H) && (F = t.compare(A, H), W += t.isEmpty(F) ? 0 : F.length, 0 === W)) return k = r.msgInvalidFileExtension.setTokens({
                        name: A,
                        extensions: h
                    }), void v(k, B, y, w, D);
                    if (!r._canPreview(B)) return j = r._raise("filebeforeload", [B, w, n]), r.isAjaxUpload && j && C.add(B), r.showPreview && j && (o.addClass("file-thumb-loading"), r._initCapStatus("processing"), r._previewDefault(B), r._initFileActions()), void setTimeout(function () {
                        j && r._updateFileDetails(u), a(w + 1), r._raise("fileloaded", [B, y, x, w])
                    }, 10);
                    U = N(B.type, A), s.html(l.replace("{index}", w + 1).replace("{files}", u)), o.addClass("file-thumb-loading"), r._initCapStatus("processing"), n.onerror = function (e) {
                        r._errorHandler(e, A)
                    }, n.onload = function (i) {
                        var a, l, d, c, u, p, g = [], m = function (e, d) {
                            if (t.isEmpty(e) && (u = t.arrayBuffer2String(n.result), e = t.isSvg(u) ? "image/svg+xml" : t.getMimeType(a, u, B.type)), l = {
                                name: A,
                                type: e || ""
                            }, d && "undefined" != typeof File) try {
                                var c = l.filename = A + "." + d;
                                T = new File([B], c, {type: l.type}), R(T)
                            } catch (f) {
                            }
                            if (U = N(e, "")) {
                                var p = new FileReader;
                                return p.onerror = function (e) {
                                    r._errorHandler(e, A)
                                }, p.onload = function (e) {
                                    return r.isAjaxUpload && !r._raise("filebeforeload", [B, w, n]) ? (q = !0, r._resetCaption(), n.abort(), s.html(""), o.removeClass("file-thumb-loading"), r._initCapStatus("valid"), void r.enable()) : (r._previewFile(w, B, e, z, l), r._initFileActions(), void M())
                                }, void p.readAsDataURL(B)
                            }
                            return r.isAjaxUpload && !r._raise("filebeforeload", [B, w, n]) ? (q = !0, r._resetCaption(), n.abort(), s.html(""), o.removeClass("file-thumb-loading"), r._initCapStatus("valid"), void r.enable()) : (r._previewFile(w, B, i, z, l), r._initFileActions(), void M())
                        };
                        if (p = B.type, l = {name: A, type: p}, e.each(f, function (e, t) {
                            "object" !== e && "other" !== e && "function" == typeof t && t(p, A) && K++
                        }), "undefined" != typeof FileTypeParser) d = new Uint8Array(i.target.result), (new FileTypeParser).parse(d).then(function (e) {
                            m(e && e.mime || p, e && e.ext || "")
                        }); else {
                            if (0 === K) {
                                for (d = new Uint8Array(i.target.result), P = 0; P < d.length; P++) c = d[P].toString(16), g.push(c);
                                a = g.join("").toLowerCase().substring(0, 8), p = t.getMimeType(a, "", "")
                            }
                            m(p)
                        }
                    }, n.onprogress = function (e) {
                        if (e.lengthComputable) {
                            var t = e.loaded / e.total * 100, i = Math.ceil(t);
                            k = d.setTokens({index: w + 1, files: u, percent: i, name: A}), setTimeout(function () {
                                q || s.html(k)
                            }, r.processDelay)
                        }
                    }, n.readAsArrayBuffer(B)
                }
            }, a(0), r._updateFileDetails(u)
        }, lock: function (e) {
            var t = this, i = t.$container;
            return t._resetErrors(), t.disable(), !e && t.showCancel && i.find(".fileinput-cancel").show(), !e && t.showPause && i.find(".fileinput-pause").show(), t._initCapStatus("processing"), t._raise("filelock", [t.fileManager.stack, t._getExtraData()]), t.$element
        }, unlock: function (e) {
            var t = this, i = t.$container;
            return void 0 === e && (e = !0), t.enable(), i.removeClass("is-locked"), t.showCancel && i.find(".fileinput-cancel").hide(), t.showPause && i.find(".fileinput-pause").hide(), e && t._resetFileStack(), t._initCapStatus(), t._raise("fileunlock", [t.fileManager.stack, t._getExtraData()]), t.$element
        }, resume: function () {
            var e = this, t = e.fileManager, i = !1, a = e.resumableManager;
            return t.bpsLog = [], t.bps = 0, e.enableResumableUpload ? (e.paused ? e._toggleResumableProgress(e.progressPauseTemplate, e.msgUploadResume) : i = !0, e.paused = !1, i && e._toggleResumableProgress(e.progressInfoTemplate, e.msgUploadBegin), setTimeout(function () {
                a.upload()
            }, e.processDelay), e.$element) : e.$element
        }, paste: function (e) {
            var t = this, i = e.originalEvent, a = i.clipboardData && i.clipboardData.files || null;
            return a && t._dropFiles(e, a), t.$element
        }, pause: function () {
            var t, i = this, a = i.resumableManager, r = i.ajaxRequests, n = r.length, o = a.getProgress(),
                s = i.fileActionSettings, l = i.taskManager, d = l.getPool(a.id);
            if (!i.enableResumableUpload) return i.$element;
            if (d && d.cancel(), i._raise("fileuploadpaused", [i.fileManager, a]), n > 0) for (t = 0; n > t; t += 1) i.paused = !0, r[t].abort();
            return i.showPreview && i._getThumbs().each(function () {
                var t, a = e(this), r = i._getLayoutTemplate("stats"), n = a.find(".file-upload-indicator");
                a.removeClass("file-uploading"), n.attr("title") === s.indicatorLoadingTitle && (i._setThumbStatus(a, "Paused"), t = r.setTokens({
                    pendingTime: i.msgPaused,
                    uploadSpeed: ""
                }), i.paused = !0, i._setProgress(o, a.find(".file-thumb-progress"), o + "%", t)), i._getThumbFile(a) || a.find(".kv-file-remove").removeClass("disabled").removeAttr("disabled")
            }), i._setProgress(101, i.$progress, i.msgPaused), i.$element
        }, cancel: function () {
            var t, i = this, a = i.ajaxRequests, r = i.resumableManager, n = i.taskManager,
                o = r ? n.getPool(r.id) : void 0, s = a.length;
            if (i.enableResumableUpload && o ? (o.cancel().done(function () {
                i._setProgressCancelled()
            }), r.reset(), i._raise("fileuploadcancelled", [i.fileManager, r])) : (i.ajaxPool && i.ajaxPool.cancel(), i._raise("fileuploadcancelled", [i.fileManager])), i._initAjax(), s > 0) for (t = 0; s > t; t += 1) i.cancelling = !0, a[t].abort();
            return i._getThumbs().each(function () {
                var t = e(this), a = t.find(".file-thumb-progress");
                t.removeClass("file-uploading"), i._setProgress(0, a), a.hide(), i._getThumbFile(t) || (t.find(".kv-file-upload").removeClass("disabled").removeAttr("disabled"), t.find(".kv-file-remove").removeClass("disabled").removeAttr("disabled")), i.unlock()
            }), setTimeout(function () {
                i._setProgressCancelled()
            }, i.processDelay), i.$element
        }, clear: function () {
            var i, a = this;
            if (a._raise("fileclear")) return a.clearInput = !0, a.$btnUpload.removeAttr("disabled"), a._getThumbs().find("video,audio,img").each(function () {
                t.cleanMemory(e(this))
            }), a._clearFileInput(), a._resetUpload(), a.clearFileStack(), a.isDuplicateError = !1, a.isPersistentError = !1, a._resetErrors(!0), a._hasInitialPreview() ? (a._showFileIcon(), a._resetPreview(), a._initPreviewActions(), a.$container.removeClass("file-input-new")) : (a._getThumbs().each(function () {
                a._clearObjects(e(this))
            }), a.isAjaxUpload && (a.previewCache.data = {}), a.$preview.html(""), i = !a.overwriteInitial && a.initialCaption.length > 0 ? a.initialCaption : "", a.$caption.attr("title", "").val(i), t.addCss(a.$container, "file-input-new"), a._validateDefaultPreview()), 0 === a.$container.find(t.FRAMES).length && (a._initCaption() || a.$captionContainer.removeClass("icon-visible")), a._hideFileIcon(), a.focusCaptionOnClear && a.$captionContainer.focus(), a._setFileDropZoneTitle(), a._raise("filecleared"), a.$element
        }, reset: function () {
            var e = this;
            if (e._raise("filereset")) return e.lastProgress = 0, e._resetPreview(), e.$container.find(".fileinput-filename").text(""), t.addCss(e.$container, "file-input-new"), e.getFrames().length && e.$container.removeClass("file-input-new"), e.clearFileStack(), e._setFileDropZoneTitle(), e.$element
        }, disable: function () {
            var e = this, i = e.$container;
            return e.isDisabled = !0, e._raise("filedisabled"), e.$element.attr("disabled", "disabled"), i.addClass("is-locked"), t.addCss(i.find(".btn-file"), "disabled"), i.find(".kv-fileinput-caption").addClass("file-caption-disabled"), i.find(".fileinput-remove, .fileinput-upload, .file-preview-frame button").attr("disabled", !0), e._initDragDrop(), e.$element
        }, enable: function () {
            var e = this, t = e.$container;
            return e.isDisabled = !1, e._raise("fileenabled"), e.$element.removeAttr("disabled"), t.removeClass("is-locked"), t.find(".kv-fileinput-caption").removeClass("file-caption-disabled"), t.find(".fileinput-remove, .fileinput-upload, .file-preview-frame button").removeAttr("disabled"), t.find(".btn-file").removeClass("disabled"), e._initDragDrop(), e.$element
        }, upload: function () {
            var i, a, r = this, n = r.fileManager, o = n.count(), s = r.taskManager,
                l = !e.isEmptyObject(r._getExtraData());
            if (n.bpsLog = [], n.bps = 0, r.isAjaxUpload && !r.isDisabled && r._isFileSelectionValid(o)) {
                if (r.lastProgress = 0, r._resetUpload(), 0 === o && !l) return void r._showFileError(r.msgUploadEmpty);
                if (r.cancelling = !1, r.uploadInitiated = !0, r._showProgress(), r.lock(), 0 === o && l) return r._setProgress(2), void r._uploadExtraOnly();
                if (r.enableResumableUpload) return r.resume();
                if (r.uploadAsync || r.enableResumableUpload) {
                    if (a = r._getOutData(null), !r._checkBatchPreupload(a)) return;
                    r.fileBatchCompleted = !1, r.uploadCache = [], e.each(r.getFileStack(), function (e) {
                        var t = r._getThumbId(e);
                        r.uploadCache.push({id: t, content: null, config: null, tags: null, append: !0})
                    }), r.$preview.find(".file-preview-initial").removeClass(t.SORT_CSS), r._initSortable()
                }
                if (r._setProgress(2), r.hasInitData = !1, r.uploadAsync) {
                    i = 0;
                    var d = r.ajaxPool = s.addPool(t.uniqId());
                    return e.each(r.getFileStack(), function (e) {
                        d.addTask(e + i, function (t) {
                            r._uploadSingle(i, e, !0, t)
                        }), i++
                    }), void d.run(r.maxAjaxThreads).done(function () {
                        r._log("Async upload batch completed successfully."), r._raise("filebatchuploadsuccess", [n.stack, r._getExtraData()])
                    }).fail(function () {
                        r._log("Async upload batch completed with errors."), r._raise("filebatchuploaderror", [n.stack, r._getExtraData()])
                    })
                }
                return r._uploadBatch(), r.$element
            }
        }, destroy: function () {
            var t = this, i = t.$form, a = t.$container, r = t.$element, n = t.namespace;
            return e(document).off(n), e(window).off(n), i && i.length && i.off(n), t.isAjaxUpload && t._clearFileInput(), t._cleanup(), t._initPreviewCache(), r.insertBefore(a).off(n).removeData(), a.off().remove(), r
        }, refresh: function (i) {
            var a = this, r = a.$element;
            return i = "object" != typeof i || t.isEmpty(i) ? a.options : e.extend(!0, {}, a.options, i), a._init(i, !0), a._listen(), r
        }, zoom: function (e) {
            var t = this, i = t._getFrame(e);
            t._showModal(i)
        }, getExif: function (e) {
            var t = this, i = t._getFrame(e);
            return i && i.data("exif") || null
        }, getFrames: function (i) {
            var a, r = this;
            return i = i || "", a = r.$preview.find(t.FRAMES + i), r.reversePreviewOrder && (a = e(a.get().reverse())), a
        }, getPreview: function () {
            var e = this;
            return {content: e.initialPreview, config: e.initialPreviewConfig, tags: e.initialPreviewThumbTags}
        }
    }, e.fn.fileinput = function (a) {
        if (t.hasFileAPISupport() || t.isIE(9)) {
            var r = Array.apply(null, arguments), n = [];
            switch (r.shift(), this.each(function () {
                var o, s = e(this), l = s.data("fileinput"), d = "object" == typeof a && a,
                    c = d.theme || s.data("theme"), u = {}, f = {},
                    p = d.language || s.data("language") || e.fn.fileinput.defaults.language || "en";
                l || (c && (f = e.fn.fileinputThemes[c] || {}), "en" === p || t.isEmpty(e.fn.fileinputLocales[p]) || (u = e.fn.fileinputLocales[p] || {}), o = e.extend(!0, {}, e.fn.fileinput.defaults, f, e.fn.fileinputLocales.en, u, d, s.data()), l = new i(this, o), s.data("fileinput", l)), "string" == typeof a && n.push(l[a].apply(l, r))
            }), n.length) {
                case 0:
                    return this;
                case 1:
                    return n[0];
                default:
                    return n
            }
        }
    };
    var a = 'class="kv-preview-data file-preview-pdf" src="{renderer}?file={data}" {style}',
        r = "btn btn-sm btn-kv " + t.defaultButtonCss(), n = "btn " + t.defaultButtonCss();
    e.fn.fileinput.defaults = {
        language: "en",
        bytesToKB: 1024,
        showCaption: !0,
        showBrowse: !0,
        showPreview: !0,
        showRemove: !0,
        showUpload: !0,
        showUploadStats: !0,
        showCancel: null,
        showPause: null,
        showClose: !0,
        showUploadedThumbs: !0,
        showConsoleLogs: !1,
        browseOnZoneClick: !1,
        autoReplace: !1,
        showDescriptionClose: !0,
        autoOrientImage: function () {
            var e = window.navigator.userAgent, t = !!e.match(/WebKit/i), i = !!e.match(/iP(od|ad|hone)/i),
                a = i && t && !e.match(/CriOS/i);
            return !a
        },
        autoOrientImageInitial: !0,
        showExifErrorLog: !1,
        required: !1,
        rtl: !1,
        hideThumbnailContent: !1,
        encodeUrl: !0,
        focusCaptionOnBrowse: !0,
        focusCaptionOnClear: !0,
        generateFileId: null,
        previewClass: "",
        captionClass: "",
        frameClass: "krajee-default",
        mainClass: "",
        inputGroupClass: "",
        mainTemplate: null,
        fileSizeGetter: null,
        initialCaption: "",
        initialPreview: [],
        initialPreviewDelimiter: "*$$*",
        initialPreviewAsData: !1,
        initialPreviewFileType: "image",
        initialPreviewConfig: [],
        initialPreviewThumbTags: [],
        previewThumbTags: {},
        initialPreviewShowDelete: !0,
        initialPreviewDownloadUrl: "",
        removeFromPreviewOnError: !1,
        deleteUrl: "",
        deleteExtraData: {},
        overwriteInitial: !0,
        sanitizeZoomCache: function (e) {
            var i = t.createElement(e);
            return i.find("input,textarea,select,datalist,form,.file-thumbnail-footer").remove(), i.html()
        },
        previewZoomButtonIcons: {
            prev: '<i class="bi-chevron-left"></i>',
            next: '<i class="bi-chevron-right"></i>',
            rotate: '<i class="bi-arrow-clockwise"></i>',
            toggleheader: '<i class="bi-arrows-expand"></i>',
            fullscreen: '<i class="bi-arrows-fullscreen"></i>',
            borderless: '<i class="bi-arrows-angle-expand"></i>',
            close: '<i class="bi-x-lg"></i>'
        },
        previewZoomButtonClasses: {
            prev: "btn btn-default btn-outline-secondary btn-navigate",
            next: "btn btn-default btn-outline-secondary btn-navigate",
            rotate: r,
            toggleheader: r,
            fullscreen: r,
            borderless: r,
            close: r
        },
        previewTemplates: {},
        previewContentTemplates: {},
        preferIconicPreview: !1,
        preferIconicZoomPreview: !1,
        alwaysPreviewFileExtensions: [],
        rotatableFileExtensions: ["jpg", "jpeg", "png", "gif"],
        allowedFileTypes: null,
        allowedFileExtensions: null,
        allowedPreviewTypes: void 0,
        allowedPreviewMimeTypes: null,
        allowedPreviewExtensions: null,
        disabledPreviewTypes: void 0,
        disabledPreviewExtensions: ["msi", "exe", "com", "zip", "rar", "app", "vb", "scr"],
        disabledPreviewMimeTypes: null,
        defaultPreviewContent: null,
        customLayoutTags: {},
        customPreviewTags: {},
        previewFileIcon: '<i class="bi-file-earmark-fill"></i>',
        previewFileIconClass: "file-other-icon",
        previewFileIconSettings: {},
        previewFileExtSettings: {},
        buttonLabelClass: "hidden-xs",
        browseIcon: '<i class="bi-folder2-open"></i> ',
        browseClass: "btn btn-primary",
        removeIcon: '<i class="bi-trash"></i>',
        removeClass: n,
        cancelIcon: '<i class="bi-slash-circle"></i>',
        cancelClass: n,
        pauseIcon: '<i class="bi-pause-fill"></i>',
        pauseClass: n,
        uploadIcon: '<i class="bi-upload"></i>',
        uploadClass: n,
        uploadUrl: null,
        uploadUrlThumb: null,
        uploadAsync: !0,
        uploadParamNames: {
            chunkCount: "chunkCount",
            chunkIndex: "chunkIndex",
            chunkSize: "chunkSize",
            chunkSizeStart: "chunkSizeStart",
            chunksUploaded: "chunksUploaded",
            fileBlob: "fileBlob",
            fileId: "fileId",
            fileName: "fileName",
            fileRelativePath: "fileRelativePath",
            fileSize: "fileSize",
            retryCount: "retryCount"
        },
        maxAjaxThreads: 5,
        fadeDelay: 800,
        processDelay: 100,
        bitrateUpdateDelay: 500,
        queueDelay: 10,
        progressDelay: 0,
        enableResumableUpload: !1,
        resumableUploadOptions: {
            fallback: null,
            testUrl: null,
            chunkSize: 2048,
            maxThreads: 4,
            maxRetries: 3,
            showErrorLog: !0,
            retainErrorHistory: !1,
            skipErrorsAndProceed: !1
        },
        uploadExtraData: {},
        zoomModalHeight: 485,
        minImageWidth: null,
        minImageHeight: null,
        maxImageWidth: null,
        maxImageHeight: null,
        resizeImage: !1,
        resizePreference: "width",
        resizeQuality: .92,
        resizeDefaultImageType: "image/jpeg",
        resizeIfSizeMoreThan: 0,
        minFileSize: -1,
        maxFileSize: 0,
        maxFilePreviewSize: 25600,
        minFileCount: 0,
        maxFileCount: 0,
        maxTotalFileCount: 0,
        validateInitialCount: !1,
        msgValidationErrorClass: "text-danger",
        msgValidationErrorIcon: '<i class="bi-exclamation-circle-fill"></i> ',
        msgErrorClass: "file-error-message",
        progressThumbClass: "progress-bar progress-bar-striped active progress-bar-animated",
        progressClass: "progress-bar bg-success progress-bar-success progress-bar-striped active progress-bar-animated",
        progressInfoClass: "progress-bar bg-info progress-bar-info progress-bar-striped active progress-bar-animated",
        progressCompleteClass: "progress-bar bg-success progress-bar-success",
        progressPauseClass: "progress-bar bg-primary progress-bar-primary progress-bar-striped active progress-bar-animated",
        progressErrorClass: "progress-bar bg-danger progress-bar-danger",
        progressUploadThreshold: 99,
        previewFileType: "image",
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null,
        elErrorContainer: null,
        errorCloseButton: void 0,
        slugCallback: null,
        dropZoneEnabled: !0,
        dropZoneTitleClass: "file-drop-zone-title",
        fileActionSettings: {},
        otherActionButtons: "",
        textEncoding: "UTF-8",
        preProcessUpload: null,
        ajaxSettings: {},
        ajaxDeleteSettings: {},
        showAjaxErrorDetails: !0,
        mergeAjaxCallbacks: !1,
        mergeAjaxDeleteCallbacks: !1,
        retryErrorUploads: !0,
        reversePreviewOrder: !1,
        usePdfRenderer: function () {
            var e = !!window.MSInputMethodContext && !!document.documentMode;
            return !!navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/i) || e
        },
        pdfRendererUrl: "",
        pdfRendererTemplate: "<iframe " + a + "></iframe>",
        tabIndexConfig: {browse: 500, remove: 500, upload: 500, cancel: null, pause: null, modal: -1}
    }, e.fn.fileinputLocales.en = {
        sizeUnits: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        bitRateUnits: ["B/s", "KB/s", "MB/s", "GB/s", "TB/s", "PB/s", "EB/s", "ZB/s", "YB/s"],
        fileSingle: "archivo",
        filePlural: "archivos",
        browseLabel: "Buscar &hellip;",
        removeLabel: "Eliminar",
        removeTitle: "Borrar archivos sin procesar",
        cancelLabel: "Cancelar",
        cancelTitle: "Abortar subida en curso",
        pauseLabel: "Pausa",
        pauseTitle: "Pausa de subida en curso",
        uploadLabel: "Subir",
        uploadTitle: "Subir archivos seleccionados",
        msgNo: "No",
        msgNoFilesSelected: "No hay archivos seleccionados",
        msgCancelled: "Cancelado",
        msgPaused: "Pausado",
        msgPlaceholder: "Seleccionar archivos ...",
        msgZoomModalHeading: "Previsualización detallada",
        msgFileRequired: "Debes seleccionar un archivos para subir.",
        msgSizeTooSmall: 'Archivo "{name}" (<b>{size}</b>) es demasiado pequeño y debería ser más grande que <b>{minSize}</b>.',
        msgSizeTooLarge: 'File "{name}" (<b>{size}</b>) exceeds maximum allowed upload size of <b>{maxSize}</b>.',
        msgFilesTooLess: "You must select at least <b>{n}</b> {files} to upload.",
        msgFilesTooMany: "Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>.",
        msgTotalFilesTooMany: "You can upload a maximum of <b>{m}</b> files (<b>{n}</b> files detected).",
        msgFileNotFound: 'File "{name}" not found!',
        msgFileSecured: 'Security restrictions prevent reading the file "{name}".',
        msgFileNotReadable: 'File "{name}" is not readable.',
        msgFilePreviewAborted: 'File preview aborted for "{name}".',
        msgFilePreviewError: 'An error occurred while reading the file "{name}".',
        msgInvalidFileName: 'Invalid or unsupported characters in file name "{name}".',
        msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.',
        msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.',
        msgFileTypes: {
            image: "image",
            html: "HTML",
            text: "text",
            video: "video",
            audio: "audio",
            flash: "flash",
            pdf: "PDF",
            object: "object"
        },
        msgUploadAborted: "The file upload was aborted",
        msgUploadThreshold: "Procesando &hellip;",
        msgUploadBegin: "Iniciando &hellip;",
        msgUploadEnd: "Hecho",
        msgUploadResume: "Continuando subida &hellip;",
        msgUploadEmpty: "Sin datos válidos",
        msgUploadError: "Error subiendo",
        msgDeleteError: "Error Borrando",
        msgProgressError: "Error",
        msgValidationError: "Error de validación",
        msgLoading: "Cargando archivo {index} de {files} &hellip;",
        msgProgress: "Cargando archivo {index} de {files} - {name} - {percent}% completado.",
        msgSelected: "{n} {files} seleccionados",
        msgProcessing: "Procesando ...",
        msgFoldersNotAllowed: "Solo arrastras y soltar! {n} carpeta(s) han sido ignoradas.",
        msgImageWidthSmall: 'Width of image file "{name}" must be at least <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageHeightSmall: 'Height of image file "{name}" must be at least <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageWidthLarge: 'Width of image file "{name}" cannot exceed <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageHeightLarge: 'Height of image file "{name}" cannot exceed <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageResizeError: "Could not get the image dimensions to resize.",
        msgImageResizeException: "Error while resizing the image.<pre>{errors}</pre>",
        msgAjaxError: "Something went wrong with the {operation} operation. Please try again later!",
        msgAjaxProgressError: "{operation} failed",
        msgDuplicateFile: 'File "{name}" of same size "{size}" has already been selected earlier. Skipping duplicate selection.',
        msgResumableUploadRetriesExceeded: "Upload aborted beyond <b>{max}</b> retries for file <b>{file}</b>! Error Details: <pre>{error}</pre>",
        msgPendingTime: "{time} remaining",
        msgCalculatingTime: "calculating time remaining",
        ajaxOperations: {
            deleteThumb: "file delete",
            uploadThumb: "file upload",
            uploadBatch: "batch file upload",
            uploadExtra: "form data upload"
        },
        dropZoneTitle: "Arrastra los archivos aquí &hellip;",
        dropZoneClickTitle: "<br>(or click to select {files})",
        previewZoomButtonTitles: {
            prev: "View previous file",
            next: "View next file",
            rotate: "Rotate 90 deg. clockwise",
            toggleheader: "Toggle header",
            fullscreen: "Toggle full screen",
            borderless: "Toggle borderless mode",
            close: "Close detailed preview"
        }
    }, e.fn.fileinput.Constructor = i, e(document).ready(function () {
        var t = e("input.file[type=file]");
        t.length && t.fileinput()
    })
});
