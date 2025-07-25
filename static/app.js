"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect;
function App() {
  var _useState = useState('home'),
    _useState2 = _slicedToArray(_useState, 2),
    view = _useState2[0],
    setView = _useState2[1]; // home, match, quiz, results
  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    scenario = _useState4[0],
    setScenario = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    matchedProverb = _useState6[0],
    setMatchedProverb = _useState6[1];
  var _useState7 = useState({
      num_questions: 5,
      quiz_type: 'mixture'
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    quizConfig = _useState8[0],
    setQuizConfig = _useState8[1];
  var _useState9 = useState(null),
    _useState0 = _slicedToArray(_useState9, 2),
    quiz = _useState0[0],
    setQuiz = _useState0[1];
  var _useState1 = useState(0),
    _useState10 = _slicedToArray(_useState1, 2),
    currentQuestionIndex = _useState10[0],
    setCurrentQuestionIndex = _useState10[1];
  var _useState11 = useState([]),
    _useState12 = _slicedToArray(_useState11, 2),
    answers = _useState12[0],
    setAnswers = _useState12[1];
  var _useState13 = useState(null),
    _useState14 = _slicedToArray(_useState13, 2),
    results = _useState14[0],
    setResults = _useState14[1];
  var _useState15 = useState(null),
    _useState16 = _slicedToArray(_useState15, 2),
    error = _useState16[0],
    setError = _useState16[1];
  var _useState17 = useState(false),
    _useState18 = _slicedToArray(_useState17, 2),
    loading = _useState18[0],
    setLoading = _useState18[1];
  var _useState19 = useState(''),
    _useState20 = _slicedToArray(_useState19, 2),
    userName = _useState20[0],
    setUserName = _useState20[1]; // New state for user name

  var handleMatchScenario = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response, text, data, _data;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setLoading(true);
            setError(null);
            _context.prev = 2;
            _context.next = 5;
            return fetch('/match_scenario', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                scenario: scenario
              })
            });
          case 5:
            response = _context.sent;
            _context.next = 8;
            return response.text();
          case 8:
            text = _context.sent;
            try {
              data = text ? JSON.parse(text) : null;
            } catch (parseError) {
              console.error('JSON Parse Error:', parseError);
              data = null;
            }
            if (response.ok && data) {
              setMatchedProverb(data);
              setView('match');
            } else {
              setError(((_data = data) === null || _data === void 0 ? void 0 : _data.error) || 'No data returned from server. Please try again.');
            }
            _context.next = 17;
            break;
          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](2);
            console.error('Error in handleMatchScenario:', _context.t0);
            setError('Error connecting to the server');
          case 17:
            setLoading(false);
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[2, 13]]);
    }));
    return function handleMatchScenario() {
      return _ref.apply(this, arguments);
    };
  }();
  var handleCreateQuiz = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var response, data;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            setLoading(true);
            setError(null);
            if (userName.trim()) {
              _context2.next = 6;
              break;
            }
            setError('Please enter your name before starting the quiz.');
            setLoading(false);
            return _context2.abrupt("return");
          case 6:
            _context2.prev = 6;
            _context2.next = 9;
            return fetch('/create_quiz', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(_objectSpread(_objectSpread({}, quizConfig), {}, {
                user_name: userName
              }))
            });
          case 9:
            response = _context2.sent;
            _context2.next = 12;
            return response.json();
          case 12:
            data = _context2.sent;
            if (response.ok) {
              setQuiz(data);
              setCurrentQuestionIndex(0);
              setAnswers([]);
              setView('quiz');
            } else {
              setError(data.error || 'Failed to create quiz');
            }
            _context2.next = 19;
            break;
          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](6);
            setError('Error connecting to the server, Please try again later.');
          case 19:
            setLoading(false);
          case 20:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[6, 16]]);
    }));
    return function handleCreateQuiz() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleAnswer = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(choice) {
      var response, data, newAnswer;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            setLoading(true);
            setError(null);
            _context3.prev = 2;
            _context3.next = 5;
            return fetch('/check_answer', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                quiz_id: quiz.quiz_id,
                question_id: quiz.quiz[currentQuestionIndex].question_id,
                choice: choice
              })
            });
          case 5:
            response = _context3.sent;
            _context3.next = 8;
            return response.json();
          case 8:
            data = _context3.sent;
            if (response.ok) {
              newAnswer = {
                question_id: quiz.quiz[currentQuestionIndex].question_id,
                choice: choice,
                result: data
              };
              setAnswers(function (prevAnswers) {
                var updatedAnswers = [].concat(_toConsumableArray(prevAnswers), [newAnswer]);
                if (currentQuestionIndex < quiz.quiz.length - 1) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                  if (updatedAnswers.length === quiz.quiz.length) {
                    handleSubmitQuiz(updatedAnswers);
                  } else {
                    setError('Not all questions were answered. Please try again.');
                  }
                }
                return updatedAnswers;
              });
            } else {
              setError(data.error || 'Failed to check answer');
            }
            _context3.next = 15;
            break;
          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](2);
            setError('Error connecting to the server');
          case 15:
            setLoading(false);
          case 16:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[2, 12]]);
    }));
    return function handleAnswer(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleSubmitQuiz = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(answersToSubmit) {
      var response, errorData, data;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            setLoading(true);
            setError(null);
            _context4.prev = 2;
            _context4.next = 5;
            return fetch('/submit_quiz', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                quiz_id: quiz.quiz_id,
                answers: answersToSubmit.map(function (a) {
                  return {
                    question_id: a.question_id,
                    choice: a.choice
                  };
                }),
                user_name: userName
              })
            });
          case 5:
            response = _context4.sent;
            if (response.ok) {
              _context4.next = 11;
              break;
            }
            _context4.next = 9;
            return response.json();
          case 9:
            errorData = _context4.sent;
            throw new Error(errorData.error || 'Failed to submit quiz');
          case 11:
            _context4.next = 13;
            return response.json();
          case 13:
            data = _context4.sent;
            setResults(data);
            setView('results');

            // REMOVE automatic download code from here!
            // Download will now be triggered by button click in results view.
            _context4.next = 21;
            break;
          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](2);
            setError(_context4.t0.message);
          case 21:
            _context4.prev = 21;
            setLoading(false);
            return _context4.finish(21);
          case 24:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[2, 18, 21, 24]]);
    }));
    return function handleSubmitQuiz(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();

  // Add this new function for manual download:
  var handleDownloadResults = function handleDownloadResults() {
    if (!results) return;
    var csvContent = results.csv_content;
    var filename = results.results_file;
    var blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  var resetQuiz = function resetQuiz() {
    setQuiz(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults(null);
    setUserName(''); // Reset name on returning to home
    setView('home');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto p-6 rounded-lg shadow-xl"
  }, view === 'home' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl font-bold mb-6 text-center text-red-600"
  }, "Yoruba Proverb Quiz"), /*#__PURE__*/React.createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-semibold mb-3 text-yellow-600"
  }, "Match a Scenario to a Proverb"), /*#__PURE__*/React.createElement("textarea", {
    className: "w-full p-3 border-2 border-green-500 rounded-lg focus:outline-none focus:border-yellow-500",
    rows: "4",
    value: scenario,
    onChange: function onChange(e) {
      return setScenario(e.target.value);
    },
    placeholder: "Enter a scenario..."
  }), /*#__PURE__*/React.createElement("button", {
    className: "mt-3 w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition duration-300",
    onClick: handleMatchScenario,
    disabled: loading || !scenario.trim()
  }, loading ? 'Loading...' : 'Find Proverb')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-semibold mb-3 text-yellow-600"
  }, "Take a Proverb Quiz"), /*#__PURE__*/React.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block mb-2 text-green-700"
  }, "Your Name:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "w-full p-3 border-2 border-green-500 rounded-lg focus:outline-none focus:border-yellow-500",
    value: userName,
    onChange: function onChange(e) {
      return setUserName(e.target.value);
    },
    placeholder: "Enter your name..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block mb-2 text-green-700"
  }, "Number of Questions (1-20):"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "w-full p-3 border-2 border-green-500 rounded-lg focus:outline-none focus:border-yellow-500",
    value: quizConfig.num_questions,
    onChange: function onChange(e) {
      return setQuizConfig(_objectSpread(_objectSpread({}, quizConfig), {}, {
        num_questions: parseInt(e.target.value) || 1
      }));
    },
    min: "1",
    max: "20"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block mb-2 text-green-700"
  }, "Quiz Type:"), /*#__PURE__*/React.createElement("select", {
    className: "w-full p-3 border-2 border-green-500 rounded-lg focus:outline-none focus:border-yellow-500",
    value: quizConfig.quiz_type,
    onChange: function onChange(e) {
      return setQuizConfig(_objectSpread(_objectSpread({}, quizConfig), {}, {
        quiz_type: e.target.value
      }));
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "mixture"
  }, "Mixture"), /*#__PURE__*/React.createElement("option", {
    value: "proverb_to_scenario"
  }, "Proverb to Scenario"), /*#__PURE__*/React.createElement("option", {
    value: "scenario_to_proverb"
  }, "Scenario to Proverb"))), /*#__PURE__*/React.createElement("button", {
    className: "w-full bg-yellow-500 text-gray-800 p-3 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 transition duration-300",
    onClick: handleCreateQuiz,
    disabled: loading || quizConfig.num_questions < 1 || quizConfig.num_questions > 20 || !userName.trim()
  }, loading ? 'Loading...' : 'Start Quiz')), error && /*#__PURE__*/React.createElement("p", {
    className: "text-red-500 mt-5"
  }, error)), view === 'match' && matchedProverb && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-bold mb-5 text-yellow-600"
  }, "Matched Proverb"), /*#__PURE__*/React.createElement("p", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "text-green-700"
  }, "Scenario:"), " ", scenario), /*#__PURE__*/React.createElement("p", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "text-green-700"
  }, "Scenario Query Response ", /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: matchedProverb.response || 'N/A'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "mt-5 w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300",
    onClick: function onClick() {
      return setView('home');
    }
  }, "Back to Home")), view === 'quiz' && quiz && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-bold mb-5 text-yellow-600"
  }, "Question ", currentQuestionIndex + 1, "/", quiz.quiz.length), quiz.quiz[currentQuestionIndex].type === 'proverb_to_scenario' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "text-green-700"
  }, "Context:"), " ", quiz.quiz[currentQuestionIndex].context), /*#__PURE__*/React.createElement("p", {
    className: "mb-4 text-green-700"
  }, "Choose the proverb that best matches the context:"), quiz.quiz[currentQuestionIndex].options.map(function (option, index) {
    return /*#__PURE__*/React.createElement("button", {
      key: index,
      className: "w-full mb-3 p-3 border-2 border-green-500 rounded-lg hover:bg-yellow-100 disabled:bg-gray-400 transition duration-300",
      onClick: function onClick() {
        return handleAnswer(index);
      },
      disabled: loading
    }, option.proverb, " (", option.translation, ")");
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "text-green-700"
  }, "Proverb:"), " ", quiz.quiz[currentQuestionIndex].proverb), /*#__PURE__*/React.createElement("p", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "text-green-700"
  }, "Translation:"), " ", quiz.quiz[currentQuestionIndex].translation), /*#__PURE__*/React.createElement("p", {
    className: "mb-4 text-green-700"
  }, "Choose the context that best matches the proverb:"), quiz.quiz[currentQuestionIndex].options.map(function (option, index) {
    return /*#__PURE__*/React.createElement("button", {
      key: index,
      className: "w-full mb-3 p-3 border-2 border-green-500 rounded-lg hover:bg-yellow-100 disabled:bg-gray-400 transition duration-300",
      onClick: function onClick() {
        return handleAnswer(index);
      },
      disabled: loading
    }, option.context);
  })), answers[currentQuestionIndex] && /*#__PURE__*/React.createElement("div", {
    className: "mt-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: answers[currentQuestionIndex].result.correct ? 'text-green-500' : 'text-red-500'
  }, answers[currentQuestionIndex].result.message)), error && /*#__PURE__*/React.createElement("p", {
    className: "text-red-500 mt-5"
  }, error)), view === 'results' && results && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-bold mb-5 text-yellow-600"
  }, "Quiz Results"), /*#__PURE__*/React.createElement("p", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "text-green-700"
  }, "Score:"), " ", results.score, "/", results.total, " (", results.percentage.toFixed(1), "%)"), /*#__PURE__*/React.createElement("p", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "text-green-700"
  }, "Grade:"), " ", results.grade), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-semibold mt-5 mb-3 text-yellow-600"
  }, "Breakdown by Type:"), Object.entries(results.breakdown).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      type = _ref6[0],
      stats = _ref6[1];
    return /*#__PURE__*/React.createElement("p", {
      key: type,
      className: "mb-2"
    }, type.replace('_', ' ').toUpperCase(), ": ", stats.correct, "/", stats.total, " (", stats.percentage.toFixed(1), "%)");
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-semibold mt-5 mb-3 text-yellow-600"
  }, "Question-by-Question Results:"), results.results.map(function (result, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "mb-5"
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", {
      className: "text-green-700"
    }, "Question ", result.question_id + 1, " (", result.type.replace('_', ' ').toUpperCase(), "):"), ' ', result.correct ? 'Correct' : 'Incorrect'), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", {
      className: "text-green-700"
    }, "Selected:"), " ", result.selected), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", {
      className: "text-green-700"
    }, "Correct Answer:"), " ", result.correct_answer), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", {
      className: "text-green-700"
    }, "Feedback:"), " ", result.message));
  }), /*#__PURE__*/React.createElement("p", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "text-green-700"
  }, "Results saved to:"), " ", results.results_file), /*#__PURE__*/React.createElement("button", {
    className: "mt-5 w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 text-center block",
    onClick: handleDownloadResults
  }, "Download Results"), /*#__PURE__*/React.createElement("button", {
    className: "mt-5 w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300",
    onClick: resetQuiz
  }, "Back to Home")));
}
var root = ReactDOM.createRoot ? ReactDOM.createRoot(document.getElementById('root')) : document.getElementById('root');
if (ReactDOM.createRoot) {
  root.render(/*#__PURE__*/React.createElement(App, null));
} else {
  ReactDOM.render(/*#__PURE__*/React.createElement(App, null), document.getElementById('root'));
}
