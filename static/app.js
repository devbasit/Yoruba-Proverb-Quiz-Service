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
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
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
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, text, data, _data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            setLoading(true);
            setError(null);
            _context.p = 1;
            _context.n = 2;
            return fetch('/match_scenario', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                scenario: scenario
              })
            });
          case 2:
            response = _context.v;
            _context.n = 3;
            return response.text();
          case 3:
            text = _context.v;
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
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            console.error('Error in handleMatchScenario:', _t);
            setError('Error connecting to the server');
          case 5:
            setLoading(false);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[1, 4]]);
    }));
    return function handleMatchScenario() {
      return _ref.apply(this, arguments);
    };
  }();
  var handleCreateQuiz = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var response, data, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            setLoading(true);
            setError(null);
            if (userName.trim()) {
              _context2.n = 1;
              break;
            }
            setError('Please enter your name before starting the quiz.');
            setLoading(false);
            return _context2.a(2);
          case 1:
            _context2.p = 1;
            _context2.n = 2;
            return fetch('/create_quiz', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(_objectSpread(_objectSpread({}, quizConfig), {}, {
                user_name: userName
              }))
            });
          case 2:
            response = _context2.v;
            _context2.n = 3;
            return response.json();
          case 3:
            data = _context2.v;
            if (response.ok) {
              setQuiz(data);
              setCurrentQuestionIndex(0);
              setAnswers([]);
              setView('quiz');
            } else {
              setError(data.error || 'Failed to create quiz');
            }
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            setError('Error connecting to the server, Please try again later.');
          case 5:
            setLoading(false);
          case 6:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 4]]);
    }));
    return function handleCreateQuiz() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleAnswer = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(choice) {
      var response, data, newAnswer, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            setLoading(true);
            setError(null);
            _context3.p = 1;
            _context3.n = 2;
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
          case 2:
            response = _context3.v;
            _context3.n = 3;
            return response.json();
          case 3:
            data = _context3.v;
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
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t3 = _context3.v;
            setError('Error connecting to the server');
          case 5:
            setLoading(false);
          case 6:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 4]]);
    }));
    return function handleAnswer(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleSubmitQuiz = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(answersToSubmit) {
      var response, errorData, data, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            setLoading(true);
            setError(null);
            _context4.p = 1;
            _context4.n = 2;
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
          case 2:
            response = _context4.v;
            if (response.ok) {
              _context4.n = 4;
              break;
            }
            _context4.n = 3;
            return response.json();
          case 3:
            errorData = _context4.v;
            throw new Error(errorData.error || 'Failed to submit quiz');
          case 4:
            _context4.n = 5;
            return response.json();
          case 5:
            data = _context4.v;
            setResults(data);
            setView('results');

            // REMOVE automatic download code from here!
            // Download will now be triggered by button click in results view.
            _context4.n = 7;
            break;
          case 6:
            _context4.p = 6;
            _t4 = _context4.v;
            setError(_t4.message);
          case 7:
            _context4.p = 7;
            setLoading(false);
            return _context4.f(7);
          case 8:
            return _context4.a(2);
        }
      }, _callee4, null, [[1, 6, 7, 8]]);
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
  }, "Create a Quiz"), /*#__PURE__*/React.createElement("div", {
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
