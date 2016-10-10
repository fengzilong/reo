(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.reo = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

// shim for es5
var slice = [].slice;
var tstr = ({}).toString;

function extend(o1, o2 ){
  for(var i in o2) { if( o1[i] === undefined){
    o1[i] = o2[i]
  } }
  return o2;
}


var shim = function(){
  // String proto ;
  extend(String.prototype, {
    trim: function(){
      return this.replace(/^\s+|\s+$/g, '');
    }
  });


  // Array proto;
  extend(Array.prototype, {
    indexOf: function(obj, from){
      var this$1 = this;

      from = from || 0;
      for (var i = from, len = this.length; i < len; i++) {
        if (this$1[i] === obj) { return i; }
      }
      return -1;
    },
    // polyfill from MDN 
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    forEach: function(callback, ctx){
      var k = 0;

      // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
      var O = Object(this);

      var len = O.length >>> 0; 

      if ( typeof callback !== "function" ) {
        throw new TypeError( callback + " is not a function" );
      }

      // 7. Repeat, while k < len
      while( k < len ) {

        var kValue;

        if ( k in O ) {

          kValue = O[ k ];

          callback.call( ctx, kValue, k, O );
        }
        k++;
      }
    },
    // @deprecated
    //  will be removed at 0.5.0
    filter: function(fun, context){

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== "function")
        { throw new TypeError(); }

      var res = [];
      for (var i = 0; i < len; i++)
      {
        if (i in t)
        {
          var val = t[i];
          if (fun.call(context, val, i, t))
            { res.push(val); }
        }
      }

      return res;
    }
  });

  // Function proto;
  extend(Function.prototype, {
    bind: function(context){
      var fn = this;
      var preArgs = slice.call(arguments, 1);
      return function(){
        var args = preArgs.concat(slice.call(arguments));
        return fn.apply(context, args);
      }
    }
  })
  
  // Array
  extend(Array, {
    isArray: function(arr){
      return tstr.call(arr) === "[object Array]";
    }
  })
}

// http://stackoverflow.com/questions/1354064/how-to-convert-characters-to-html-entities-using-plain-javascript
var entities = {
  'quot':34, 
  'amp':38, 
  'apos':39, 
  'lt':60, 
  'gt':62, 
  'nbsp':160, 
  'iexcl':161, 
  'cent':162, 
  'pound':163, 
  'curren':164, 
  'yen':165, 
  'brvbar':166, 
  'sect':167, 
  'uml':168, 
  'copy':169, 
  'ordf':170, 
  'laquo':171, 
  'not':172, 
  'shy':173, 
  'reg':174, 
  'macr':175, 
  'deg':176, 
  'plusmn':177, 
  'sup2':178, 
  'sup3':179, 
  'acute':180, 
  'micro':181, 
  'para':182, 
  'middot':183, 
  'cedil':184, 
  'sup1':185, 
  'ordm':186, 
  'raquo':187, 
  'frac14':188, 
  'frac12':189, 
  'frac34':190, 
  'iquest':191, 
  'Agrave':192, 
  'Aacute':193, 
  'Acirc':194, 
  'Atilde':195, 
  'Auml':196, 
  'Aring':197, 
  'AElig':198, 
  'Ccedil':199, 
  'Egrave':200, 
  'Eacute':201, 
  'Ecirc':202, 
  'Euml':203, 
  'Igrave':204, 
  'Iacute':205, 
  'Icirc':206, 
  'Iuml':207, 
  'ETH':208, 
  'Ntilde':209, 
  'Ograve':210, 
  'Oacute':211, 
  'Ocirc':212, 
  'Otilde':213, 
  'Ouml':214, 
  'times':215, 
  'Oslash':216, 
  'Ugrave':217, 
  'Uacute':218, 
  'Ucirc':219, 
  'Uuml':220, 
  'Yacute':221, 
  'THORN':222, 
  'szlig':223, 
  'agrave':224, 
  'aacute':225, 
  'acirc':226, 
  'atilde':227, 
  'auml':228, 
  'aring':229, 
  'aelig':230, 
  'ccedil':231, 
  'egrave':232, 
  'eacute':233, 
  'ecirc':234, 
  'euml':235, 
  'igrave':236, 
  'iacute':237, 
  'icirc':238, 
  'iuml':239, 
  'eth':240, 
  'ntilde':241, 
  'ograve':242, 
  'oacute':243, 
  'ocirc':244, 
  'otilde':245, 
  'ouml':246, 
  'divide':247, 
  'oslash':248, 
  'ugrave':249, 
  'uacute':250, 
  'ucirc':251, 
  'uuml':252, 
  'yacute':253, 
  'thorn':254, 
  'yuml':255, 
  'fnof':402, 
  'Alpha':913, 
  'Beta':914, 
  'Gamma':915, 
  'Delta':916, 
  'Epsilon':917, 
  'Zeta':918, 
  'Eta':919, 
  'Theta':920, 
  'Iota':921, 
  'Kappa':922, 
  'Lambda':923, 
  'Mu':924, 
  'Nu':925, 
  'Xi':926, 
  'Omicron':927, 
  'Pi':928, 
  'Rho':929, 
  'Sigma':931, 
  'Tau':932, 
  'Upsilon':933, 
  'Phi':934, 
  'Chi':935, 
  'Psi':936, 
  'Omega':937, 
  'alpha':945, 
  'beta':946, 
  'gamma':947, 
  'delta':948, 
  'epsilon':949, 
  'zeta':950, 
  'eta':951, 
  'theta':952, 
  'iota':953, 
  'kappa':954, 
  'lambda':955, 
  'mu':956, 
  'nu':957, 
  'xi':958, 
  'omicron':959, 
  'pi':960, 
  'rho':961, 
  'sigmaf':962, 
  'sigma':963, 
  'tau':964, 
  'upsilon':965, 
  'phi':966, 
  'chi':967, 
  'psi':968, 
  'omega':969, 
  'thetasym':977, 
  'upsih':978, 
  'piv':982, 
  'bull':8226, 
  'hellip':8230, 
  'prime':8242, 
  'Prime':8243, 
  'oline':8254, 
  'frasl':8260, 
  'weierp':8472, 
  'image':8465, 
  'real':8476, 
  'trade':8482, 
  'alefsym':8501, 
  'larr':8592, 
  'uarr':8593, 
  'rarr':8594, 
  'darr':8595, 
  'harr':8596, 
  'crarr':8629, 
  'lArr':8656, 
  'uArr':8657, 
  'rArr':8658, 
  'dArr':8659, 
  'hArr':8660, 
  'forall':8704, 
  'part':8706, 
  'exist':8707, 
  'empty':8709, 
  'nabla':8711, 
  'isin':8712, 
  'notin':8713, 
  'ni':8715, 
  'prod':8719, 
  'sum':8721, 
  'minus':8722, 
  'lowast':8727, 
  'radic':8730, 
  'prop':8733, 
  'infin':8734, 
  'ang':8736, 
  'and':8743, 
  'or':8744, 
  'cap':8745, 
  'cup':8746, 
  'int':8747, 
  'there4':8756, 
  'sim':8764, 
  'cong':8773, 
  'asymp':8776, 
  'ne':8800, 
  'equiv':8801, 
  'le':8804, 
  'ge':8805, 
  'sub':8834, 
  'sup':8835, 
  'nsub':8836, 
  'sube':8838, 
  'supe':8839, 
  'oplus':8853, 
  'otimes':8855, 
  'perp':8869, 
  'sdot':8901, 
  'lceil':8968, 
  'rceil':8969, 
  'lfloor':8970, 
  'rfloor':8971, 
  'lang':9001, 
  'rang':9002, 
  'loz':9674, 
  'spades':9824, 
  'clubs':9827, 
  'hearts':9829, 
  'diams':9830, 
  'OElig':338, 
  'oelig':339, 
  'Scaron':352, 
  'scaron':353, 
  'Yuml':376, 
  'circ':710, 
  'tilde':732, 
  'ensp':8194, 
  'emsp':8195, 
  'thinsp':8201, 
  'zwnj':8204, 
  'zwj':8205, 
  'lrm':8206, 
  'rlm':8207, 
  'ndash':8211, 
  'mdash':8212, 
  'lsquo':8216, 
  'rsquo':8217, 
  'sbquo':8218, 
  'ldquo':8220, 
  'rdquo':8221, 
  'bdquo':8222, 
  'dagger':8224, 
  'Dagger':8225, 
  'permil':8240, 
  'lsaquo':8249, 
  'rsaquo':8250, 
  'euro':8364
}



var entities_1 = entities;

var util = createCommonjsModule(function (module) {
shim();



var _  = module.exports;
var entities = entities_1;
var slice = [].slice;
var o2str = ({}).toString;
var win = typeof window !=='undefined'? window: commonjsGlobal;


_.noop = function(){};
_.uid = (function(){
  var _uid=0;
  return function(){
    return _uid++;
  }
})();

_.extend = function( o1, o2, override ){
  // if(_.typeOf(override) === 'array'){
  //  for(var i = 0, len = override.length; i < len; i++ ){
  //   var key = override[i];
  //   o1[key] = o2[key];
  //  } 
  // }else{
  for(var i in o2){
    if( typeof o1[i] === "undefined" || override === true ){
      o1[i] = o2[i]
    }
  }
  // }
  return o1;
}

_.keys = function(obj){
  if(Object.keys) { return Object.keys(obj); }
  var res = [];
  for(var i in obj) { if(obj.hasOwnProperty(i)){
    res.push(i);
  } }
  return res;
}

_.varName = 'd';
_.setName = 'p_';
_.ctxName = 'c';
_.extName = 'e';

_.rWord = /^[\$\w]+$/;
_.rSimpleAccessor = /^[\$\w]+(\.[\$\w]+)*$/;

_.nextTick = typeof setImmediate === 'function'? 
  setImmediate.bind(win) : 
  function(callback) {
    setTimeout(callback, 0) 
  }



_.prefix = "var " + _.varName + "=" + _.ctxName + ".data;" +  _.extName  + "=" + _.extName + "||'';";


_.slice = function(obj, start, end){
  var res = [];
  for(var i = start || 0, len = end || obj.length; i < len; i++){
    var item = obj[i];
    res.push(item)
  }
  return res;
}

_.typeOf = function (o) {
  return o == null ? String(o) :o2str.call(o).slice(8, -1).toLowerCase();
}


_.makePredicate = function makePredicate(words, prefix) {
    if (typeof words === "string") {
        words = words.split(" ");
    }
    var f = "",
    cats = [];
    out: for (var i = 0; i < words.length; ++i) {
        for (var j = 0; j < cats.length; ++j){
          if (cats[j][0].length === words[i].length) {
              cats[j].push(words[i]);
              continue out;
          }
        }
        cats.push([words[i]]);
    }
    function compareTo(arr) {
        if (arr.length === 1) { return f += "return str === '" + arr[0] + "';"; }
        f += "switch(str){";
        for (var i = 0; i < arr.length; ++i){
           f += "case '" + arr[i] + "':";
        }
        f += "return true}return false;";
    }

    // When there are more than three length categories, an outer
    // switch first dispatches on the lengths, to save on comparisons.
    if (cats.length > 3) {
        cats.sort(function(a, b) {
            return b.length - a.length;
        });
        f += "switch(str.length){";
        for (var i = 0; i < cats.length; ++i) {
            var cat = cats[i];
            f += "case " + cat[0].length + ":";
            compareTo(cat);
        }
        f += "}";

        // Otherwise, simply generate a flat `switch` statement.
    } else {
        compareTo(words);
    }
    return new Function("str", f);
}


_.trackErrorPos = (function (){
  // linebreak
  var lb = /\r\n|[\n\r\u2028\u2029]/g;
  var minRange = 20, maxRange = 20;
  function findLine(lines, pos){
    var tmpLen = 0;
    for(var i = 0,len = lines.length; i < len; i++){
      var lineLen = (lines[i] || "").length;

      if(tmpLen + lineLen > pos) {
        return {num: i, line: lines[i], start: pos - i - tmpLen , prev:lines[i-1], next: lines[i+1] };
      }
      // 1 is for the linebreak
      tmpLen = tmpLen + lineLen ;
    }
  }
  function formatLine(str,  start, num, target){
    var len = str.length;
    var min = start - minRange;
    if(min < 0) { min = 0; }
    var max = start + maxRange;
    if(max > len) { max = len; }

    var remain = str.slice(min, max);
    var prefix = "[" +(num+1) + "] " + (min > 0? ".." : "")
    var postfix = max < len ? "..": "";
    var res = prefix + remain + postfix;
    if(target) { res += "\n" + new Array(start-min + prefix.length + 1).join(" ") + "^^^"; }
    return res;
  }
  return function(input, pos){
    if(pos > input.length-1) { pos = input.length-1; }
    lb.lastIndex = 0;
    var lines = input.split(lb);
    var line = findLine(lines,pos);
    var start = line.start, num = line.num;

    return (line.prev? formatLine(line.prev, start, num-1 ) + '\n': '' ) + 
      formatLine(line.line, start, num, true) + '\n' + 
      (line.next? formatLine(line.next, start, num+1 ) + '\n': '' );

  }
})();


var ignoredRef = /\((\?\!|\?\:|\?\=)/g;
_.findSubCapture = function (regStr) {
  var left = 0,
    right = 0,
    len = regStr.length,
    ignored = regStr.match(ignoredRef); // ignored uncapture
  if(ignored) { ignored = ignored.length }
  else { ignored = 0; }
  for (; len--;) {
    var letter = regStr.charAt(len);
    if (len === 0 || regStr.charAt(len - 1) !== "\\" ) { 
      if (letter === "(") { left++; }
      if (letter === ")") { right++; }
    }
  }
  if (left !== right) { throw "RegExp: "+ regStr + "'s bracket is not marched"; }
  else { return left - ignored; }
};


_.escapeRegExp = function( str){// Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License
  return str.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, function(match){
    return '\\' + match;
  });
};


var rEntity = new RegExp("&(?:(#x[0-9a-fA-F]+)|(#[0-9]+)|(" + _.keys(entities).join('|') + '));', 'gi');

_.convertEntity = function(chr){

  return ("" + chr).replace(rEntity, function(all, hex, dec, capture){
    var charCode;
    if( dec ) { charCode = parseInt( dec.slice(1), 10 ); }
    else if( hex ) { charCode = parseInt( hex.slice(2), 16 ); }
    else { charCode = entities[capture] }

    return String.fromCharCode( charCode )
  });

}


// simple get accessor

_.createObject = function(o, props){
    function Foo() {}
    Foo.prototype = o;
    var res = new Foo;
    if(props) { _.extend(res, props); }
    return res;
}

_.createProto = function(fn, o){
    function Foo() { this.constructor = fn;}
    Foo.prototype = o;
    return (fn.prototype = new Foo());
}



/**
clone
*/
_.clone = function clone(obj){
    var type = _.typeOf(obj);
    if(type === 'array'){
      var cloned = [];
      for(var i=0,len = obj.length; i< len;i++){
        cloned[i] = obj[i]
      }
      return cloned;
    }
    if(type === 'object'){
      var cloned = {};
      for(var i in obj) { if(obj.hasOwnProperty(i)){
        cloned[i] = obj[i];
      } }
      return cloned;
    }
    return obj;
  }

_.equals = function(now, old){
  var type = typeof now;
  if(type === 'number' && typeof old === 'number'&& isNaN(now) && isNaN(old)) { return true }
  return now === old;
}

var dash = /-([a-z])/g;
_.camelCase = function(str){
  return str.replace(dash, function(all, capture){
    return capture.toUpperCase();
  })
}



_.throttle = function throttle(func, wait){
  var wait = wait || 100;
  var context, args, result;
  var timeout = null;
  var previous = 0;
  var later = function() {
    previous = +new Date;
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function() {
    var now = + new Date;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

// hogan escape
// ==============
_.escape = (function(){
  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos = /\'/g,
      rQuot = /\"/g,
      hChars = /[&<>\"\']/;

  return function(str) {
    return hChars.test(str) ?
      str
        .replace(rAmp, '&amp;')
        .replace(rLt, '&lt;')
        .replace(rGt, '&gt;')
        .replace(rApos, '&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }
})();

_.cache = function(max){
  max = max || 1000;
  var keys = [],
      cache = {};
  return {
    set: function(key, value) {
      if (keys.length > this.max) {
        cache[keys.shift()] = undefined;
      }
      // 
      if(cache[key] === undefined){
        keys.push(key);
      }
      cache[key] = value;
      return value;
    },
    get: function(key) {
      if (key === undefined) { return cache; }
      return cache[key];
    },
    max: max,
    len:function(){
      return keys.length;
    }
  };
}

// // setup the raw Expression
// _.touchExpression = function(expr){
//   if(expr.type === 'expression'){
//   }
//   return expr;
// }


// handle the same logic on component's `on-*` and element's `on-*`
// return the fire object
_.handleEvent = function(value, type ){
  var self = this, evaluate;
  if(value.type === 'expression'){ // if is expression, go evaluated way
    evaluate = value.get;
  }
  if(evaluate){
    return function fire(obj){
      self.$update(function(){
        var data = this.data;
        data.$event = obj;
        var res = evaluate(self);
        if(res === false && obj && obj.preventDefault) { obj.preventDefault(); }
        data.$event = undefined;
      })

    }
  }else{
    return function fire(){
      var args = slice.call(arguments)      
      args.unshift(value);
      self.$update(function(){
        self.$emit.apply(self, args);
      })
    }
  }
}

// only call once
_.once = function(fn){
  var time = 0;
  return function(){
    if( time++ === 0) { fn.apply(this, arguments); }
  }
}

_.fixObjStr = function(str){
  if(str.trim().indexOf('{') !== 0){
    return '{' + str + '}';
  }
  return str;
}


_.map= function(array, callback){
  var res = [];
  for (var i = 0, len = array.length; i < len; i++) {
    res.push(callback(array[i], i));
  }
  return res;
}

function log(msg, type){
  if(typeof console !== "undefined")  { console[type || "log"](msg); }
}

_.log = log;




//http://www.w3.org/html/wg/drafts/html/master/single-page.html#void-elements
_.isVoidTag = _.makePredicate("area base br col embed hr img input keygen link menuitem meta param source track wbr r-content");
_.isBooleanAttr = _.makePredicate('selected checked disabled readonly required open autofocus controls autoplay compact loop defer multiple');

_.isFalse - function(){return false}
_.isTrue - function(){return true}

_.isExpr = function(expr){
  return expr && expr.type === 'expression';
}
// @TODO: make it more strict
_.isGroup = function(group){
  return group.inject || group.$inject;
}

_.getCompileFn = function(source, ctx, options){
  return ctx.$compile.bind(ctx,source, options)
}
});

// some fixture test;
// ---------------
var _ = util;
var svg = (function(){
  return typeof document !== "undefined" && document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1" );
})();


var browser = typeof document !== "undefined" && document.nodeType;
// whether have component in initializing
var exprCache = _.cache(1000);
var isRunning = false;

var env = {
	svg: svg,
	browser: browser,
	exprCache: exprCache,
	isRunning: isRunning
};

var config$1 = {
  'BEGIN': '{',
  'END': '}',
  'PRECOMPILE': false
}

var _$2 = util;
var config$4 = config$1;

// some custom tag  will conflict with the Lexer progress
var conflictTag = {"}": "{", "]": "["};
var map1;
var map2;
// some macro for lexer
var macro = {
  'NAME': /(?:[:_A-Za-z][-\.:_0-9A-Za-z]*)/,
  'IDENT': /[\$_A-Za-z][_0-9A-Za-z\$]*/,
  'SPACE': /[\r\n\t\f ]/
}


var test = /a|(b)/.exec("a");
var testSubCapure = test && test[1] === undefined? 
  function(str){ return str !== undefined }
  :function(str){return !!str};

function wrapHander(handler){
  return function(all){
    return {type: handler, value: all }
  }
}

function Lexer$1(input, opts){
  if(conflictTag[config$4.END]){
    this.markStart = conflictTag[config$4.END];
    this.markEnd = config$4.END;
  }

  this.input = (input||"").trim();
  this.opts = opts || {};
  this.map = this.opts.mode !== 2?  map1: map2;
  this.states = ["INIT"];
  if(opts && opts.expression){
     this.states.push("JST");
     this.expression = true;
  }
}

var lo = Lexer$1.prototype


lo.lex = function(str){
  var this$1 = this;

  str = (str || this.input).trim();
  var tokens = [], split, test,mlen, token, state;
  this.input = str, 
  this.marks = 0;
  // init the pos index
  this.index=0;
  var i = 0;
  while(str){
    i++
    state = this$1.state();
    split = this$1.map[state] 
    test = split.TRUNK.exec(str);
    if(!test){
      this$1.error('Unrecoginized Token');
    }
    mlen = test[0].length;
    str = str.slice(mlen)
    token = this$1._process.call(this$1, test, split, str)
    if(token) { tokens.push(token) }
    this$1.index += mlen;
    // if(state == 'TAG' || state == 'JST') str = this.skipspace(str);
  }

  tokens.push({type: 'EOF'});

  return tokens;
}

lo.error = function(msg){
  throw  Error("Parse Error: " + msg +  ':\n' + _$2.trackErrorPos(this.input, this.index));
}

lo._process = function(args, split,str){
  var this$1 = this;

  // console.log(args.join(","), this.state())
  var links = split.links, marched = false, token;

  for(var len = links.length, i=0;i<len ;i++){
    var link = links[i],
      handler = link[2],
      index = link[0];
    // if(args[6] === '>' && index === 6) console.log('haha')
    if(testSubCapure(args[index])) {
      marched = true;
      if(handler){
        token = handler.apply(this$1, args.slice(index, index + link[1]))
        if(token)  { token.pos = this$1.index; }
      }
      break;
    }
  }
  if(!marched){ // in ie lt8 . sub capture is "" but ont 
    switch(str.charAt(0)){
      case "<":
        this.enter("TAG");
        break;
      default:
        this.enter("JST");
        break;
    }
  }
  return token;
}
lo.enter = function(state){
  this.states.push(state)
  return this;
}

lo.state = function(){
  var states = this.states;
  return states[states.length-1];
}

lo.leave = function(state){
  var states = this.states;
  if(!state || states[states.length-1] === state) { states.pop() }
}


Lexer$1.setup = function(){
  macro.END = config$4.END;
  macro.BEGIN = config$4.BEGIN;
  //
  map1 = genMap([
    // INIT
    rules.ENTER_JST,
    rules.ENTER_TAG,
    rules.TEXT,

    //TAG
    rules.TAG_NAME,
    rules.TAG_OPEN,
    rules.TAG_CLOSE,
    rules.TAG_PUNCHOR,
    rules.TAG_ENTER_JST,
    rules.TAG_UNQ_VALUE,
    rules.TAG_STRING,
    rules.TAG_SPACE,
    rules.TAG_COMMENT,

    // JST
    rules.JST_OPEN,
    rules.JST_CLOSE,
    rules.JST_COMMENT,
    rules.JST_EXPR_OPEN,
    rules.JST_IDENT,
    rules.JST_SPACE,
    rules.JST_LEAVE,
    rules.JST_NUMBER,
    rules.JST_PUNCHOR,
    rules.JST_STRING,
    rules.JST_COMMENT
    ])

  // ignored the tag-relative token
  map2 = genMap([
    // INIT no < restrict
    rules.ENTER_JST2,
    rules.TEXT,
    // JST
    rules.JST_COMMENT,
    rules.JST_OPEN,
    rules.JST_CLOSE,
    rules.JST_EXPR_OPEN,
    rules.JST_IDENT,
    rules.JST_SPACE,
    rules.JST_LEAVE,
    rules.JST_NUMBER,
    rules.JST_PUNCHOR,
    rules.JST_STRING,
    rules.JST_COMMENT
    ])
}


function genMap(rules){
  var rule, map = {}, sign;
  for(var i = 0, len = rules.length; i < len ; i++){
    rule = rules[i];
    sign = rule[2] || 'INIT';
    ( map[sign] || (map[sign] = {rules:[], links:[]}) ).rules.push(rule);
  }
  return setup(map);
}

function setup(map){
  var split, rules, trunks, handler, reg, retain, rule;
  function replaceFn(all, one){
    return typeof macro[one] === 'string'? 
      _$2.escapeRegExp(macro[one]) 
      : String(macro[one]).slice(1,-1);
  }

  for(var i in map){

    split = map[i];
    split.curIndex = 1;
    rules = split.rules;
    trunks = [];

    for(var j = 0,len = rules.length; j<len; j++){
      rule = rules[j]; 
      reg = rule[0];
      handler = rule[1];

      if(typeof handler === 'string'){
        handler = wrapHander(handler);
      }
      if(_$2.typeOf(reg) === 'regexp') { reg = reg.toString().slice(1, -1); }

      reg = reg.replace(/\{(\w+)\}/g, replaceFn)
      retain = _$2.findSubCapture(reg) + 1; 
      split.links.push([split.curIndex, retain, handler]); 
      split.curIndex += retain;
      trunks.push(reg);
    }
    split.TRUNK = new RegExp("^(?:(" + trunks.join(")|(") + "))")
  }
  return map;
}

var rules = {

  // 1. INIT
  // ---------------

  // mode1's JST ENTER RULE
  ENTER_JST: [/[^\x00<]*?(?={BEGIN})/, function(all){
    this.enter('JST');
    if(all) { return {type: 'TEXT', value: all} }
  }],

  // mode2's JST ENTER RULE
  ENTER_JST2: [/[^\x00]*?(?={BEGIN})/, function(all){
    this.enter('JST');
    if(all) { return {type: 'TEXT', value: all} }
  }],

  ENTER_TAG: [/[^\x00]*?(?=<[\w\/\!])/, function(all){ 
    this.enter('TAG');
    if(all) { return {type: 'TEXT', value: all} }
  }],

  TEXT: [/[^\x00]+/, 'TEXT' ],

  // 2. TAG
  // --------------------
  TAG_NAME: [/{NAME}/, 'NAME', 'TAG'],
  TAG_UNQ_VALUE: [/[^\{}&"'=><`\r\n\f\t ]+/, 'UNQ', 'TAG'],

  TAG_OPEN: [/<({NAME})\s*/, function(all, one){ //"
    return {type: 'TAG_OPEN', value: one}
  }, 'TAG'],
  TAG_CLOSE: [/<\/({NAME})[\r\n\f\t ]*>/, function(all, one){
    this.leave();
    return {type: 'TAG_CLOSE', value: one }
  }, 'TAG'],

    // mode2's JST ENTER RULE
  TAG_ENTER_JST: [/(?={BEGIN})/, function(){
    this.enter('JST');
  }, 'TAG'],


  TAG_PUNCHOR: [/[\>\/=&]/, function(all){
    if(all === '>') { this.leave(); }
    return {type: all, value: all }
  }, 'TAG'],
  TAG_STRING:  [ /'([^']*)'|"([^"]*)\"/, /*'*/  function(all, one, two){ 
    var value = one || two || "";

    return {type: 'STRING', value: value}
  }, 'TAG'],

  TAG_SPACE: [/{SPACE}+/, null, 'TAG'],
  TAG_COMMENT: [/<\!--([^\x00]*?)--\>/, function(all){
    this.leave()
    // this.leave('TAG')
  } ,'TAG'],

  // 3. JST
  // -------------------

  JST_OPEN: ['{BEGIN}#{SPACE}*({IDENT})', function(all, name){
    return {
      type: 'OPEN',
      value: name
    }
  }, 'JST'],
  JST_LEAVE: [/{END}/, function(all){
    if(this.markEnd === all && this.expression) { return {type: this.markEnd, value: this.markEnd}; }
    if(!this.markEnd || !this.marks ){
      this.firstEnterStart = false;
      this.leave('JST');
      return {type: 'END'}
    }else{
      this.marks--;
      return {type: this.markEnd, value: this.markEnd}
    }
  }, 'JST'],
  JST_CLOSE: [/{BEGIN}\s*\/({IDENT})\s*{END}/, function(all, one){
    this.leave('JST');
    return {
      type: 'CLOSE',
      value: one
    }
  }, 'JST'],
  JST_COMMENT: [/{BEGIN}\!([^\x00]*?)\!{END}/, function(){
    this.leave();
  }, 'JST'],
  JST_EXPR_OPEN: ['{BEGIN}',function(all, one){
    if(all === this.markStart){
      if(this.expression) { return { type: this.markStart, value: this.markStart }; }
      if(this.firstEnterStart || this.marks){
        this.marks++
        this.firstEnterStart = false;
        return { type: this.markStart, value: this.markStart };
      }else{
        this.firstEnterStart = true;
      }
    }
    return {
      type: 'EXPR_OPEN',
      escape: false
    }

  }, 'JST'],
  JST_IDENT: ['{IDENT}', 'IDENT', 'JST'],
  JST_SPACE: [/[ \r\n\f]+/, null, 'JST'],
  JST_PUNCHOR: [/[=!]?==|[-=><+*\/%\!]?\=|\|\||&&|\@\(|\.\.|[<\>\[\]\(\)\-\|\{}\+\*\/%?:\.!,]/, function(all){
    return { type: all, value: all }
  },'JST'],

  JST_STRING:  [ /'([^']*)'|"([^"]*)"/, function(all, one, two){ //"'
    return {type: 'STRING', value: one || two || ""}
  }, 'JST'],
  JST_NUMBER: [/(?:[0-9]*\.[0-9]+|[0-9]+)(e\d+)?/, function(all){
    return {type: 'NUMBER', value: parseFloat(all, 10)};
  }, 'JST']
}


// setup when first config
Lexer$1.setup();



var Lexer_1 = Lexer$1;

var node$1 = {
  element: function(name, attrs, children){
    return {
      type: 'element',
      tag: name,
      attrs: attrs,
      children: children
    }
  },
  attribute: function(name, value, mdf){
    return {
      type: 'attribute',
      name: name,
      value: value,
      mdf: mdf
    }
  },
  "if": function(test, consequent, alternate){
    return {
      type: 'if',
      test: test,
      consequent: consequent,
      alternate: alternate
    }
  },
  list: function(sequence, variable, body, alternate, track){
    return {
      type: 'list',
      sequence: sequence,
      alternate: alternate,
      variable: variable,
      body: body,
      track: track
    }
  },
  expression: function( body, setbody, constant ){
    return {
      type: "expression",
      body: body,
      constant: constant || false,
      setbody: setbody || false
    }
  },
  text: function(text){
    return {
      type: "text",
      text: text
    }
  },
  template: function(template){
    return {
      type: 'template',
      content: template
    }
  }
}

var _$3 = util;

var config$5 = config$1;
var node = node$1;
var Lexer$2 = Lexer_1;
var varName = _$3.varName;
var ctxName = _$3.ctxName;
var extName = _$3.extName;
var isPath = _$3.makePredicate("STRING IDENT NUMBER");
var isKeyWord = _$3.makePredicate("true false undefined null this Array Date JSON Math NaN RegExp decodeURI decodeURIComponent encodeURI encodeURIComponent parseFloat parseInt Object");




function Parser$1(input, opts){
  opts = opts || {};

  this.input = input;
  this.tokens = new Lexer$2(input, opts).lex();
  this.pos = 0;
  this.length = this.tokens.length;
}


var op = Parser$1.prototype;


op.parse = function(){
  this.pos = 0;
  var res= this.program();
  if(this.ll().type === 'TAG_CLOSE'){
    this.error("You may got a unclosed Tag")
  }
  return res;
}

op.ll =  function(k){
  k = k || 1;
  if(k < 0) { k = k + 1; }
  var pos = this.pos + k - 1;
  if(pos > this.length - 1){
      return this.tokens[this.length-1];
  }
  return this.tokens[pos];
}
  // lookahead
op.la = function(k){
  return (this.ll(k) || '').type;
}

op.match = function(type, value){
  var ll;
  if(!(ll = this.eat(type, value))){
    ll  = this.ll();
    this.error('expect [' + type + (value == null? '':':'+ value) + ']" -> got "[' + ll.type + (value==null? '':':'+ll.value) + ']', ll.pos)
  }else{
    return ll;
  }
}

op.error = function(msg, pos){
  msg =  "\n【 parse failed 】 " + msg +  ':\n\n' + _$3.trackErrorPos(this.input, typeof pos === 'number'? pos: this.ll().pos||0);
  throw new Error(msg);
}

op.next = function(k){
  k = k || 1;
  this.pos += k;
}
op.eat = function(type, value){
  var this$1 = this;

  var ll = this.ll();
  if(typeof type !== 'string'){
    for(var len = type.length ; len--;){
      if(ll.type === type[len]) {
        this$1.next();
        return ll;
      }
    }
  }else{
    if( ll.type === type && (typeof value === 'undefined' || ll.value === value) ){
       this.next();
       return ll;
    }
  }
  return false;
}

// program
//  :EOF
//  | (statement)* EOF
op.program = function(){
  var this$1 = this;

  var statements = [],  ll = this.ll();
  while(ll.type !== 'EOF' && ll.type !=='TAG_CLOSE'){

    statements.push(this$1.statement());
    ll = this$1.ll();
  }
  // if(ll.type === 'TAG_CLOSE') this.error("You may have unmatched Tag")
  return statements;
}

// statement
//  : xml
//  | jst
//  | text
op.statement = function(){
  var ll = this.ll();
  switch(ll.type){
    case 'NAME':
    case 'TEXT':
      var text = ll.value;
      this.next();
      while(ll = this.eat(['NAME', 'TEXT'])){
        text += ll.value;
      }
      return node.text(text);
    case 'TAG_OPEN':
      return this.xml();
    case 'OPEN': 
      return this.directive();
    case 'EXPR_OPEN':
      return this.interplation();
    default:
      this.error('Unexpected token: '+ this.la())
  }
}

// xml 
// stag statement* TAG_CLOSE?(if self-closed tag)
op.xml = function(){
  var name, attrs, children, selfClosed;
  name = this.match('TAG_OPEN').value;
  attrs = this.attrs();
  selfClosed = this.eat('/')
  this.match('>');
  if( !selfClosed && !_$3.isVoidTag(name) ){
    children = this.program();
    if(!this.eat('TAG_CLOSE', name)) { this.error('expect </'+name+'> got'+ 'no matched closeTag') }
  }
  return node.element(name, attrs, children);
}

// xentity
//  -rule(wrap attribute)
//  -attribute
//
// __example__
//  name = 1 |  
//  ng-hide |
//  on-click={{}} | 
//  {{#if name}}on-click={{xx}}{{#else}}on-tap={{}}{{/if}}

op.xentity = function(ll){
  var name = ll.value, value, modifier;
  if(ll.type === 'NAME'){
    //@ only for test
    if(~name.indexOf('.')){
      var tmp = name.split('.');
      name = tmp[0];
      modifier = tmp[1]

    }
    if( this.eat("=") ) { value = this.attvalue(modifier); }
    return node.attribute( name, value, modifier );
  }else{
    if( name !== 'if') { this.error("current version. ONLY RULE #if #else #elseif is valid in tag, the rule #" + name + ' is invalid'); }
    return this['if'](true);
  }

}

// stag     ::=    '<' Name (S attr)* S? '>'  
// attr    ::=     Name Eq attvalue
op.attrs = function(isAttribute){
  var this$1 = this;

  var eat
  if(!isAttribute){
    eat = ["NAME", "OPEN"]
  }else{
    eat = ["NAME"]
  }

  var attrs = [], ll;
  while (ll = this.eat(eat)){
    attrs.push(this$1.xentity( ll ))
  }
  return attrs;
}

// attvalue
//  : STRING  
//  | NAME
op.attvalue = function(mdf){
  var ll = this.ll();
  switch(ll.type){
    case "NAME":
    case "UNQ":
    case "STRING":
      this.next();
      var value = ll.value;
      if(~value.indexOf(config$5.BEGIN) && ~value.indexOf(config$5.END) && mdf!=='cmpl'){
        var constant = true;
        var parsed = new Parser$1(value, { mode: 2 }).parse();
        if(parsed.length === 1 && parsed[0].type === 'expression') { return parsed[0]; }
        var body = [];
        parsed.forEach(function(item){
          if(!item.constant) { constant=false; }
          // silent the mutiple inteplation
            body.push(item.body || "'" + item.text.replace(/'/g, "\\'") + "'");        
        });
        body = "[" + body.join(",") + "].join('')";
        value = node.expression(body, null, constant);
      }
      return value;
    case "EXPR_OPEN":
      return this.interplation();
    // case "OPEN":
    //   if(ll.value === 'inc' || ll.value === 'include'){
    //     this.next();
    //     return this.inc();
    //   }else{
    //     this.error('attribute value only support inteplation and {#inc} statement')
    //   }
    //   break;
    default:
      this.error('Unexpected token: '+ this.la())
  }
}


// {{#}}
op.directive = function(){
  var name = this.ll().value;
  this.next();
  if(typeof this[name] === 'function'){
    return this[name]()
  }else{
    this.error('Undefined directive['+ name +']');
  }
}


// {{}}
op.interplation = function(){
  this.match('EXPR_OPEN');
  var res = this.expression(true);
  this.match('END');
  return res;
}

// {{~}}
op.inc = op.include = function(){
  var content = this.expression();
  this.match('END');
  return node.template(content);
}

// {{#if}}
op["if"] = function(tag){
  var this$1 = this;

  var test = this.expression();
  var consequent = [], alternate=[];

  var container = consequent;
  var statement = !tag? "statement" : "attrs";

  this.match('END');

  var ll, close;
  while( ! (close = this.eat('CLOSE')) ){
    ll = this$1.ll();
    if( ll.type === 'OPEN' ){
      switch( ll.value ){
        case 'else':
          container = alternate;
          this$1.next();
          this$1.match( 'END' );
          break;
        case 'elseif':
          this$1.next();
          alternate.push( this$1["if"](tag) );
          return node['if']( test, consequent, alternate );
        default:
          container.push( this$1[statement](true) );
      }
    }else{
      container.push(this$1[statement](true));
    }
  }
  // if statement not matched
  if(close.value !== "if") { this.error('Unmatched if directive') }
  return node["if"](test, consequent, alternate);
}


// @mark   mustache syntax have natrure dis, canot with expression
// {{#list}}
op.list = function(){
  var this$1 = this;

  // sequence can be a list or hash
  var sequence = this.expression(), variable, ll, track;
  var consequent = [], alternate=[];
  var container = consequent;

  this.match('IDENT', 'as');

  variable = this.match('IDENT').value;

  if(this.eat('IDENT', 'by')){
    if(this.eat('IDENT',variable + '_index')){
      track = true;
    }else{
      track = this.expression();
      if(track.constant){
        // true is means constant, we handle it just like xxx_index.
        track = true;
      }
    }
  }

  this.match('END');

  while( !(ll = this.eat('CLOSE')) ){
    if(this$1.eat('OPEN', 'else')){
      container =  alternate;
      this$1.match('END');
    }else{
      container.push(this$1.statement());
    }
  }
  
  if(ll.value !== 'list') { this.error('expect ' + 'list got ' + '/' + ll.value + ' ', ll.pos ); }
  return node.list(sequence, variable, consequent, alternate, track);
}


op.expression = function(){
  var expression;
  if(this.eat('@(')){ //once bind
    expression = this.expr();
    expression.once = true;
    this.match(')')
  }else{
    expression = this.expr();
  }
  return expression;
}

op.expr = function(){
  this.depend = [];

  var buffer = this.filter()

  var body = buffer.get || buffer;
  var setbody = buffer.set;
  return node.expression(body, setbody, !this.depend.length);
}


// filter
// assign ('|' filtername[':' args]) * 
op.filter = function(){
  var this$1 = this;

  var left = this.assign();
  var ll = this.eat('|');
  var buffer = [], setBuffer, prefix,
    attr = "t", 
    set = left.set, get, 
    tmp = "";

  if(ll){
    if(set) { setBuffer = []; }

    prefix = "(function(" + attr + "){";

    do{
      tmp = attr + " = " + ctxName + "._f_('" + this$1.match('IDENT').value+ "' ).get.call( "+_$3.ctxName +"," + attr ;
      if(this$1.eat(':')){
        tmp +=", "+ this$1.arguments("|").join(",") + ");"
      }else{
        tmp += ');'
      }
      buffer.push(tmp);
      setBuffer && setBuffer.unshift( tmp.replace(" ).get.call", " ).set.call") );

    }while(ll = this.eat('|'));
    buffer.push("return " + attr );
    setBuffer && setBuffer.push("return " + attr);

    get =  prefix + buffer.join("") + "})("+left.get+")";
    // we call back to value.
    if(setBuffer){
      // change _ss__(name, _p_) to _s__(name, filterFn(_p_));
      set = set.replace(_$3.setName, 
        prefix + setBuffer.join("") + "})("+　_$3.setName　+")" );

    }
    // the set function is depend on the filter definition. if it have set method, the set will work
    return this.getset(get, set);
  }
  return left;
}

// assign
// left-hand-expr = condition
op.assign = function(){
  var left = this.condition(), ll;
  if(ll = this.eat(['=', '+=', '-=', '*=', '/=', '%='])){
    if(!left.set) { this.error('invalid lefthand expression in assignment expression'); }
    return this.getset( left.set.replace( "," + _$3.setName, "," + this.condition().get ).replace("'='", "'"+ll.type+"'"), left.set);
    // return this.getset('(' + left.get + ll.type  + this.condition().get + ')', left.set);
  }
  return left;
}

// or
// or ? assign : assign
op.condition = function(){

  var test = this.or();
  if(this.eat('?')){
    return this.getset([test.get + "?", 
      this.assign().get, 
      this.match(":").type, 
      this.assign().get].join(""));
  }

  return test;
}

// and
// and && or
op.or = function(){

  var left = this.and();

  if(this.eat('||')){
    return this.getset(left.get + '||' + this.or().get);
  }

  return left;
}
// equal
// equal && and
op.and = function(){

  var left = this.equal();

  if(this.eat('&&')){
    return this.getset(left.get + '&&' + this.and().get);
  }
  return left;
}
// relation
// 
// equal == relation
// equal != relation
// equal === relation
// equal !== relation
op.equal = function(){
  var left = this.relation(), ll;
  // @perf;
  if( ll = this.eat(['==','!=', '===', '!=='])){
    return this.getset(left.get + ll.type + this.equal().get);
  }
  return left
}
// relation < additive
// relation > additive
// relation <= additive
// relation >= additive
// relation in additive
op.relation = function(){
  var left = this.additive(), ll;
  // @perf
  if(ll = (this.eat(['<', '>', '>=', '<=']) || this.eat('IDENT', 'in') )){
    return this.getset(left.get + ll.value + this.relation().get);
  }
  return left
}
// additive :
// multive
// additive + multive
// additive - multive
op.additive = function(){
  var left = this.multive() ,ll;
  if(ll= this.eat(['+','-']) ){
    return this.getset(left.get + ll.value + this.additive().get);
  }
  return left
}
// multive :
// unary
// multive * unary
// multive / unary
// multive % unary
op.multive = function(){
  var left = this.range() ,ll;
  if( ll = this.eat(['*', '/' ,'%']) ){
    return this.getset(left.get + ll.type + this.multive().get);
  }
  return left;
}

op.range = function(){
  var left = this.unary(), ll, right;

  if(ll = this.eat('..')){
    right = this.unary();
    var body = 
      "(function(start,end){var res = [],step=end>start?1:-1; for(var i = start; end>start?i <= end: i>=end; i=i+step){res.push(i); } return res })("+left.get+","+right.get+")"
    return this.getset(body);
  }

  return left;
}



// lefthand
// + unary
// - unary
// ~ unary
// ! unary
op.unary = function(){
  var ll;
  if(ll = this.eat(['+','-','~', '!'])){
    return this.getset('(' + ll.type + this.unary().get + ')') ;
  }else{
    return this.member()
  }
}

// call[lefthand] :
// member args
// member [ expression ]
// member . ident  

op.member = function(base, last, pathes, prevBase){
  var ll, path, extValue;


  var onlySimpleAccessor = false;
  if(!base){ //first
    path = this.primary();
    var type = typeof path;
    if(type === 'string'){ 
      pathes = [];
      pathes.push( path );
      last = path;
      extValue = extName + "." + path
      base = ctxName + "._sg_('" + path + "', " + varName + ", " + extName + ")";
      onlySimpleAccessor = true;
    }else{ //Primative Type
      if(path.get === 'this'){
        base = ctxName;
        pathes = ['this'];
      }else{
        pathes = null;
        base = path.get;
      }
    }
  }else{ // not first enter
    if(typeof last === 'string' && isPath( last) ){ // is valid path
      pathes.push(last);
    }else{
      if(pathes && pathes.length) { this.depend.push(pathes); }
      pathes = null;
    }
  }
  if(ll = this.eat(['[', '.', '('])){
    switch(ll.type){
      case '.':
          // member(object, property, computed)
        var tmpName = this.match('IDENT').value;
        prevBase = base;
        if( this.la() !== "(" ){ 
          base = ctxName + "._sg_('" + tmpName + "', " + base + ")";
        }else{
          base += "['" + tmpName + "']";
        }
        return this.member( base, tmpName, pathes,  prevBase);
      case '[':
          // member(object, property, computed)
        path = this.assign();
        prevBase = base;
        if( this.la() !== "(" ){ 
        // means function call, we need throw undefined error when call function
        // and confirm that the function call wont lose its context
          base = ctxName + "._sg_(" + path.get + ", " + base + ")";
        }else{
          base += "[" + path.get + "]";
        }
        this.match(']')
        return this.member(base, path, pathes, prevBase);
      case '(':
        // call(callee, args)
        var args = this.arguments().join(',');
        base =  base+"(" + args +")";
        this.match(')')
        return this.member(base, null, pathes);
    }
  }
  if( pathes && pathes.length ) { this.depend.push( pathes ); }
  var res =  {get: base};
  if(last){
    res.set = ctxName + "._ss_(" + 
        (last.get? last.get : "'"+ last + "'") + 
        ","+ _$3.setName + ","+ 
        (prevBase?prevBase:_$3.varName) + 
        ", '=', "+ ( onlySimpleAccessor? 1 : 0 ) + ")";
  
  }
  return res;
}

/**
 * 
 */
op.arguments = function(end){
  var this$1 = this;

  end = end || ')'
  var args = [];
  do{
    if(this$1.la() !== end){
      args.push(this$1.assign().get)
    }
  }while( this.eat(','));
  return args
}


// primary :
// this 
// ident
// literal
// array
// object
// ( expression )

op.primary = function(){
  var ll = this.ll();
  switch(ll.type){
    case "{":
      return this.object();
    case "[":
      return this.array();
    case "(":
      return this.paren();
    // literal or ident
    case 'STRING':
      this.next();
      return this.getset("'" + ll.value + "'")
    case 'NUMBER':
      this.next();
      return this.getset(""+ll.value);
    case "IDENT":
      this.next();
      if(isKeyWord(ll.value)){
        return this.getset( ll.value );
      }
      return ll.value;
    default: 
      this.error('Unexpected Token: ' + ll.type);
  }
}

// object
//  {propAssign [, propAssign] * [,]}

// propAssign
//  prop : assign

// prop
//  STRING
//  IDENT
//  NUMBER

op.object = function(){
  var this$1 = this;

  var code = [this.match('{').type];

  var ll = this.eat( ['STRING', 'IDENT', 'NUMBER'] );
  while(ll){
    code.push("'" + ll.value + "'" + this$1.match(':').type);
    var get = this$1.assign().get;
    code.push(get);
    ll = null;
    if(this$1.eat(",") && (ll = this$1.eat(['STRING', 'IDENT', 'NUMBER'])) ) { code.push(","); }
  }
  code.push(this.match('}').type);
  return {get: code.join("")}
}

// array
// [ assign[,assign]*]
op.array = function(){
  var this$1 = this;

  var code = [this.match('[').type], item;
  if( this.eat("]") ){

     code.push("]");
  } else {
    while(item = this.assign()){
      code.push(item.get);
      if(this$1.eat(',')) { code.push(","); }
      else { break; }
    }
    code.push(this.match(']').type);
  }
  return {get: code.join("")};
}

// '(' expression ')'
op.paren = function(){
  this.match('(');
  var res = this.filter()
  res.get = '(' + res.get + ')';
  this.match(')');
  return res;
}

op.getset = function(get, set){
  return {
    get: get,
    set: set
  }
}



var Parser_1 = Parser$1;

// (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org

// klass: a classical JS OOP façade
// https://github.com/ded/klass
// License MIT (c) Dustin Diaz 2014
  
// inspired by backbone's extend and klass
var _$4 = util;
var fnTest = /xy/.test(function(){"xy";}) ? /\bsupr\b/:/.*/;
var isFn = function(o){return typeof o === "function"};


function wrap(k, fn, supro) {
  return function () {
    var tmp = this.supr;
    this.supr = supro[k];
    var ret = fn.apply(this, arguments);
    this.supr = tmp;
    return ret;
  }
}

function process( what, o, supro ) {
  for ( var k in o ) {
    if (o.hasOwnProperty(k)) {

      what[k] = isFn( o[k] ) && isFn( supro[k] ) && 
        fnTest.test( o[k] ) ? wrap(k, o[k], supro) : o[k];
    }
  }
}

// if the property is ["events", "data", "computed"] , we should merge them
var merged = ["events", "data", "computed"];
var mlen = merged.length;
var extend$2 = function extend$2(o){
  o = o || {};
  var supr = this, proto,
    supro = supr && supr.prototype || {};

  if(typeof o === 'function'){
    proto = o.prototype;
    o.implement = implement;
    o.extend = extend$2;
    return o;
  } 
  
  function fn() {
    supr.apply(this, arguments);
  }

  proto = _$4.createProto(fn, supro);

  function implement(o){
    // we need merge the merged property
    var len = mlen;
    for(;len--;){
      var prop = merged[len];
      if(o.hasOwnProperty(prop) && proto.hasOwnProperty(prop)){
        _$4.extend(proto[prop], o[prop], true) 
        delete o[prop];
      }
    }


    process(proto, o, supro); 
    return this;
  }



  fn.implement = implement
  fn.implement(o)
  if(supr.__after__) { supr.__after__.call(fn, supr, o); }
  fn.extend = extend$2;
  return fn;
}

var _const = {
  'COMPONENT_TYPE': 1,
  'ELEMENT_TYPE': 2,
  'NAMESPACE': {
    html: "http://www.w3.org/1999/xhtml",
    svg: "http://www.w3.org/2000/svg"
  }
}

var dom_1 = createCommonjsModule(function (module) {
// thanks for angular && mootools for some concise&cross-platform  implemention
// =====================================

// The MIT License
// Copyright (c) 2010-2014 Google, Inc. http://angularjs.org

// ---
// license: MIT-style license. http://mootools.net


var dom = module.exports;
var env$$1 = env;
var _ = util;
var consts = _const;
var tNode = document.createElement('div')
var addEvent, removeEvent;
var noop = function(){}

var namespaces = consts.NAMESPACE;

dom.body = document.body;

dom.doc = document;

// camelCase
function camelCase(str){
  return ("" + str).replace(/-\D/g, function(match){
    return match.charAt(1).toUpperCase();
  });
}


dom.tNode = tNode;

if(tNode.addEventListener){
  addEvent = function(node, type, fn) {
    node.addEventListener(type, fn, false);
  }
  removeEvent = function(node, type, fn) {
    node.removeEventListener(type, fn, false) 
  }
}else{
  addEvent = function(node, type, fn) {
    node.attachEvent('on' + type, fn);
  }
  removeEvent = function(node, type, fn) {
    node.detachEvent('on' + type, fn); 
  }
}


dom.msie = parseInt((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
if (isNaN(dom.msie)) {
  dom.msie = parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
}

dom.find = function(sl){
  if(document.querySelector) {
    try{
      return document.querySelector(sl);
    }catch(e){

    }
  }
  if(sl.indexOf('#')!==-1) { return document.getElementById( sl.slice(1) ); }
}


dom.inject = function(node, refer, position){

  position = position || 'bottom';
  if(!node) { return ; }
  if(Array.isArray(node)){
    var tmp = node;
    node = dom.fragment();
    for(var i = 0,len = tmp.length; i < len ;i++){
      node.appendChild(tmp[i])
    }
  }

  var firstChild, next;
  switch(position){
    case 'bottom':
      refer.appendChild( node );
      break;
    case 'top':
      if( firstChild = refer.firstChild ){
        refer.insertBefore( node, refer.firstChild );
      }else{
        refer.appendChild( node );
      }
      break;
    case 'after':
      if( next = refer.nextSibling ){
        next.parentNode.insertBefore( node, next );
      }else{
        refer.parentNode.appendChild( node );
      }
      break;
    case 'before':
      refer.parentNode.insertBefore( node, refer );
  }
}


dom.id = function(id){
  return document.getElementById(id);
}

// createElement 
dom.create = function(type, ns, attrs){
  if(ns === 'svg'){
    if(!env$$1.svg) { throw Error('the env need svg support') }
    ns = namespaces.svg;
  }
  return !ns? document.createElement(type): document.createElementNS(ns, type);
}

// documentFragment
dom.fragment = function(){
  return document.createDocumentFragment();
}



var specialAttr = {
  'class': function(node, value){
     ('className' in node && (!node.namespaceURI || node.namespaceURI === namespaces.html  )) ? 
      node.className = (value || '') : node.setAttribute('class', value);
  },
  'for': function(node, value){
    ('htmlFor' in node) ? node.htmlFor = value : node.setAttribute('for', value);
  },
  'style': function(node, value){
    (node.style) ? node.style.cssText = value : node.setAttribute('style', value);
  },
  'value': function(node, value){
    node.value = (value != null) ? value : '';
  }
}


// attribute Setter & Getter
dom.attr = function(node, name, value){
  if (_.isBooleanAttr(name)) {
    if (typeof value !== 'undefined') {
      if (!!value) {
        node[name] = true;
        node.setAttribute(name, name);
        // lt ie7 . the javascript checked setting is in valid
        //http://bytes.com/topic/javascript/insights/799167-browser-quirk-dynamically-appended-checked-checkbox-does-not-appear-checked-ie
        if(dom.msie && dom.msie <=7 ) { node.defaultChecked = true }
      } else {
        node[name] = false;
        node.removeAttribute(name);
      }
    } else {
      return (node[name] ||
               (node.attributes.getNamedItem(name)|| noop).specified) ? name : undefined;
    }
  } else if (typeof (value) !== 'undefined') {
    // if in specialAttr;
    if(specialAttr[name]) { specialAttr[name](node, value); }
    else if(value === null) { node.removeAttribute(name) }
    else { node.setAttribute(name, value); }
  } else if (node.getAttribute) {
    // the extra argument "2" is to get the right thing for a.href in IE, see jQuery code
    // some elements (e.g. Document) don't have get attribute, so return undefined
    var ret = node.getAttribute(name, 2);
    // normalize non-existing attributes to undefined (as jQuery)
    return ret === null ? undefined : ret;
  }
}


dom.on = function(node, type, handler){
  var types = type.split(' ');
  handler.real = function(ev){
    var $event = new Event(ev);
    $event.origin = node;
    handler.call(node, $event);
  }
  types.forEach(function(type){
    type = fixEventName(node, type);
    addEvent(node, type, handler.real);
  });
}
dom.off = function(node, type, handler){
  var types = type.split(' ');
  handler = handler.real || handler;
  types.forEach(function(type){
    type = fixEventName(node, type);
    removeEvent(node, type, handler);
  })
}


dom.text = (function (){
  var map = {};
  if (dom.msie && dom.msie < 9) {
    map[1] = 'innerText';    
    map[3] = 'nodeValue';    
  } else {
    map[1] = map[3] = 'textContent';
  }
  
  return function (node, value) {
    var textProp = map[node.nodeType];
    if (value == null) {
      return textProp ? node[textProp] : '';
    }
    node[textProp] = value;
  }
})();


dom.html = function( node, html ){
  if(typeof html === "undefined"){
    return node.innerHTML;
  }else{
    node.innerHTML = html;
  }
}

dom.replace = function(node, replaced){
  if(replaced.parentNode) { replaced.parentNode.replaceChild(node, replaced); }
}

dom.remove = function(node){
  if(node.parentNode) { node.parentNode.removeChild(node); }
}

// css Settle & Getter from angular
// =================================
// it isnt computed style 
dom.css = function(node, name, value){
  if( _.typeOf(name) === "object" ){
    for(var i in name){
      if( name.hasOwnProperty(i) ){
        dom.css( node, i, name[i] );
      }
    }
    return;
  }
  if ( typeof value !== "undefined" ) {

    name = camelCase(name);
    if(name) { node.style[name] = value; }

  } else {

    var val;
    if (dom.msie <= 8) {
      // this is some IE specific weirdness that jQuery 1.6.4 does not sure why
      val = node.currentStyle && node.currentStyle[name];
      if (val === '') { val = 'auto'; }
    }
    val = val || node.style[name];
    if (dom.msie <= 8) {
      val = val === '' ? undefined : val;
    }
    return  val;
  }
}

dom.addClass = function(node, className){
  var current = node.className || "";
  if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
    node.className = current? ( current + " " + className ) : className;
  }
}

dom.delClass = function(node, className){
  var current = node.className || "";
  node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
}

dom.hasClass = function(node, className){
  var current = node.className || "";
  return (" " + current + " ").indexOf(" " + className + " ") !== -1;
}



// simple Event wrap

//http://stackoverflow.com/questions/11068196/ie8-ie7-onchange-event-is-emited-only-after-repeated-selection
function fixEventName(elem, name){
  return (name === 'change'  &&  dom.msie < 9 && 
      (elem && elem.tagName && elem.tagName.toLowerCase()==='input' && 
        (elem.type === 'checkbox' || elem.type === 'radio')
      )
    )? 'click': name;
}

var rMouseEvent = /^(?:click|dblclick|contextmenu|DOMMouseScroll|mouse(?:\w+))$/
var doc = document;
doc = (!doc.compatMode || doc.compatMode === 'CSS1Compat') ? doc.documentElement : doc.body;
function Event(ev){
  ev = ev || window.event;
  if(ev._fixed) { return ev; }
  this.event = ev;
  this.target = ev.target || ev.srcElement;

  var type = this.type = ev.type;
  var button = this.button = ev.button;

  // if is mouse event patch pageX
  if(rMouseEvent.test(type)){ //fix pageX
    this.pageX = (ev.pageX != null) ? ev.pageX : ev.clientX + doc.scrollLeft;
    this.pageY = (ev.pageX != null) ? ev.pageY : ev.clientY + doc.scrollTop;
    if (type === 'mouseover' || type === 'mouseout'){// fix relatedTarget
      var related = ev.relatedTarget || ev[(type === 'mouseover' ? 'from' : 'to') + 'Element'];
      while (related && related.nodeType === 3) { related = related.parentNode; }
      this.relatedTarget = related;
    }
  }
  // if is mousescroll
  if (type === 'DOMMouseScroll' || type === 'mousewheel'){
    // ff ev.detail: 3    other ev.wheelDelta: -120
    this.wheelDelta = (ev.wheelDelta) ? ev.wheelDelta / 120 : -(ev.detail || 0) / 3;
  }
  
  // fix which
  this.which = ev.which || ev.keyCode;
  if( !this.which && button !== undefined){
    // http://api.jquery.com/event.which/ use which
    this.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
  }
  this._fixed = true;
}

_.extend(Event.prototype, {
  immediateStop: _.isFalse,
  stop: function(){
    this.preventDefault().stopPropagation();
  },
  preventDefault: function(){
    if (this.event.preventDefault) { this.event.preventDefault(); }
    else { this.event.returnValue = false; }
    return this;
  },
  stopPropagation: function(){
    if (this.event.stopPropagation) { this.event.stopPropagation(); }
    else { this.event.cancelBubble = true; }
    return this;
  },
  stopImmediatePropagation: function(){
    if(this.event.stopImmediatePropagation) { this.event.stopImmediatePropagation(); }
  }
})


dom.nextFrame = (function(){
    var request = window.requestAnimationFrame ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame|| 
                  function(callback){
                    setTimeout(callback, 16)
                  }

    var cancel = window.cancelAnimationFrame ||
                 window.webkitCancelAnimationFrame ||
                 window.mozCancelAnimationFrame ||
                 window.webkitCancelRequestAnimationFrame ||
                 function(tid){
                    clearTimeout(tid)
                 }
  
  return function(callback){
    var id = request(callback);
    return function(){ cancel(id); }
  }
})();

// 3ks for angular's raf  service
var k
dom.nextReflow = dom.msie? function(callback){
  return dom.nextFrame(function(){
    k = document.body.offsetWidth;
    callback();
  })
}: dom.nextFrame;
});

var _$5 = util;

function simpleDiff(now, old){
  var nlen = now.length;
  var olen = old.length;
  if(nlen !== olen){
    return true;
  }
  for(var i = 0; i < nlen ; i++){
    if(now[i] !== old[i]) { return  true; }
  }
  return false

}

function equals(a,b){
  return a === b;
}

// array1 - old array
// array2 - new array
function ld(array1, array2, equalFn){
  var n = array1.length;
  var m = array2.length;
  var equalFn = equalFn || equals;
  var matrix = [];
  for(var i = 0; i <= n; i++){
    matrix.push([i]);
  }
  for(var j=1;j<=m;j++){
    matrix[0][j]=j;
  }
  for(var i = 1; i <= n; i++){
    for(var j = 1; j <= m; j++){
      if(equalFn(array1[i-1], array2[j-1])){
        matrix[i][j] = matrix[i-1][j-1];
      }else{
        matrix[i][j] = Math.min(
          matrix[i-1][j]+1, //delete
          matrix[i][j-1]+1//add
          )
      }
    }
  }
  return matrix;
}
// arr2 - new array
// arr1 - old array
function diffArray(arr2, arr1, diff, diffFn) {
  if(!diff) { return simpleDiff(arr2, arr1); }
  var matrix = ld(arr1, arr2, diffFn)
  var n = arr1.length;
  var i = n;
  var m = arr2.length;
  var j = m;
  var edits = [];
  var current = matrix[i][j];
  while(i>0 || j>0){
  // the last line
    if (i === 0) {
      edits.unshift(3);
      j--;
      continue;
    }
    // the last col
    if (j === 0) {
      edits.unshift(2);
      i--;
      continue;
    }
    var northWest = matrix[i - 1][j - 1];
    var west = matrix[i - 1][j];
    var north = matrix[i][j - 1];

    var min = Math.min(north, west, northWest);

    if (min === west) {
      edits.unshift(2); //delete
      i--;
      current = west;
    } else if (min === northWest ) {
      if (northWest === current) {
        edits.unshift(0); //no change
      } else {
        edits.unshift(1); //update
        current = northWest;
      }
      i--;
      j--;
    } else {
      edits.unshift(3); //add
      j--;
      current = north;
    }
  }
  var LEAVE = 0;
  var ADD = 3;
  var DELELE = 2;
  var UPDATE = 1;
  var n = 0;m=0;
  var steps = [];
  var step = {index: null, add:0, removed:[]};

  for(var i=0;i<edits.length;i++){
    if(edits[i] > 0 ){ // NOT LEAVE
      if(step.index === null){
        step.index = m;
      }
    } else { //LEAVE
      if(step.index != null){
        steps.push(step)
        step = {index: null, add:0, removed:[]};
      }
    }
    switch(edits[i]){
      case LEAVE:
        n++;
        m++;
        break;
      case ADD:
        step.add++;
        m++;
        break;
      case DELELE:
        step.removed.push(arr1[n])
        n++;
        break;
      case UPDATE:
        step.add++;
        step.removed.push(arr1[n])
        n++;
        m++;
        break;
    }
  }
  if(step.index != null){
    steps.push(step)
  }
  return steps
}



// diffObject
// ----
// test if obj1 deepEqual obj2
function diffObject( now, last, diff ){


  if(!diff){

    for( var j in now ){
      if( last[j] !== now[j] ) { return true }
    }

    for( var n in last ){
      if(last[n] !== now[n]) { return true; }
    }

  }else{

    var nKeys = _$5.keys(now);
    var lKeys = _$5.keys(last);

    /**
     * [description]
     * @param  {[type]} a    [description]
     * @param  {[type]} b){                   return now[b] [description]
     * @return {[type]}      [description]
     */
    return diffArray(nKeys, lKeys, diff, function(a, b){
      return now[b] === last[a];
    });

  }

  return false;


}

var diff = {
  diffArray: diffArray,
  diffObject: diffObject
}

var _$6 = util;
var dom$1  = dom_1;
var animate = {};
var env$3 = env;


var transitionEnd = 'transitionend';
var animationEnd = 'animationend';
var transitionProperty = 'transition';
var animationProperty = 'animation';

if(!('ontransitionend' in window)){
  if('onwebkittransitionend' in window) {
    
    // Chrome/Saf (+ Mobile Saf)/Android
    transitionEnd += ' webkitTransitionEnd';
    transitionProperty = 'webkitTransition'
  } else if('onotransitionend' in dom$1.tNode || navigator.appName === 'Opera') {

    // Opera
    transitionEnd += ' oTransitionEnd';
    transitionProperty = 'oTransition';
  }
}
if(!('onanimationend' in window)){
  if ('onwebkitanimationend' in window){
    // Chrome/Saf (+ Mobile Saf)/Android
    animationEnd += ' webkitAnimationEnd';
    animationProperty = 'webkitAnimation';

  }else if ('onoanimationend' in dom$1.tNode){
    // Opera
    animationEnd += ' oAnimationEnd';
    animationProperty = 'oAnimation';
  }
}

/**
 * inject node with animation
 * @param  {[type]} node      [description]
 * @param  {[type]} refer     [description]
 * @param  {[type]} direction [description]
 * @return {[type]}           [description]
 */
animate.inject = function( node, refer ,direction, callback ){
  callback = callback || _$6.noop;
  if( Array.isArray(node) ){
    var fragment = dom$1.fragment();
    var count=0;

    for(var i = 0,len = node.length;i < len; i++ ){
      fragment.appendChild(node[i]); 
    }
    dom$1.inject(fragment, refer, direction);

    // if all nodes is done, we call the callback
    var enterCallback = function (){
      count++;
      if( count === len ) { callback(); }
    }
    if(len === count) { callback(); }
    for( i = 0; i < len; i++ ){
      if(node[i].onenter){
        node[i].onenter(enterCallback);
      }else{
        enterCallback();
      }
    }
  }else{
    dom$1.inject( node, refer, direction );
    if(node.onenter){
      node.onenter(callback)
    }else{
      callback();
    }
  }
}

/**
 * remove node with animation
 * @param  {[type]}   node     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
animate.remove = function(node, callback){
  if(!node) { return; }
  var count = 0;
  function loop(){
    count++;
    if(count === len) { callback && callback() }
  }
  if(Array.isArray(node)){
    for(var i = 0, len = node.length; i < len ; i++){
      animate.remove(node[i], loop)
    }
    return node;
  }
  if(node.onleave){
    node.onleave(function(){
      removeDone(node, callback)
    })
  }else{
    removeDone(node, callback)
  }
}

var removeDone = function (node, callback){
    dom$1.remove(node);
    callback && callback();
}



animate.startClassAnimate = function ( node, className,  callback, mode ){
  var activeClassName, timeout, tid, onceAnim;
  if( (!animationEnd && !transitionEnd) || env$3.isRunning ){
    return callback();
  }

  if(mode !== 4){
    onceAnim = _$6.once(function onAnimateEnd(){
      if(tid) { clearTimeout(tid); }

      if(mode === 2) {
        dom$1.delClass(node, activeClassName);
      }
      if(mode !== 3){ // mode hold the class
        dom$1.delClass(node, className);
      }
      dom$1.off(node, animationEnd, onceAnim)
      dom$1.off(node, transitionEnd, onceAnim)

      callback();

    });
  }else{
    onceAnim = _$6.once(function onAnimateEnd(){
      if(tid) { clearTimeout(tid); }
      callback();
    });
  }
  if(mode === 2){ // auto removed
    dom$1.addClass( node, className );

    activeClassName = _$6.map(className.split(/\s+/), function(name){
       return name + '-active';
    }).join(" ");

    dom$1.nextReflow(function(){
      dom$1.addClass( node, activeClassName );
      timeout = getMaxTimeout( node );
      tid = setTimeout( onceAnim, timeout );
    });

  }else if(mode===4){
    dom$1.nextReflow(function(){
      dom$1.delClass( node, className );
      timeout = getMaxTimeout( node );
      tid = setTimeout( onceAnim, timeout );
    });

  }else{
    dom$1.nextReflow(function(){
      dom$1.addClass( node, className );
      timeout = getMaxTimeout( node );
      tid = setTimeout( onceAnim, timeout );
    });
  }



  dom$1.on( node, animationEnd, onceAnim )
  dom$1.on( node, transitionEnd, onceAnim )
  return onceAnim;
}


animate.startStyleAnimate = function(node, styles, callback){
  var timeout, onceAnim, tid;

  dom$1.nextReflow(function(){
    dom$1.css( node, styles );
    timeout = getMaxTimeout( node );
    tid = setTimeout( onceAnim, timeout );
  });


  onceAnim = _$6.once(function onAnimateEnd(){
    if(tid) { clearTimeout(tid); }

    dom$1.off(node, animationEnd, onceAnim)
    dom$1.off(node, transitionEnd, onceAnim)

    callback();

  });

  dom$1.on( node, animationEnd, onceAnim )
  dom$1.on( node, transitionEnd, onceAnim )

  return onceAnim;
}


/**
 * get maxtimeout
 * @param  {Node} node 
 * @return {[type]}   [description]
 */
function getMaxTimeout(node){
  var timeout = 0,
    tDuration = 0,
    tDelay = 0,
    aDuration = 0,
    aDelay = 0,
    ratio = 5 / 3,
    styles;

  if(window.getComputedStyle){

    styles = window.getComputedStyle(node),
    tDuration = getMaxTime( styles[transitionProperty + 'Duration']) || tDuration;
    tDelay = getMaxTime( styles[transitionProperty + 'Delay']) || tDelay;
    aDuration = getMaxTime( styles[animationProperty + 'Duration']) || aDuration;
    aDelay = getMaxTime( styles[animationProperty + 'Delay']) || aDelay;
    timeout = Math.max( tDuration+tDelay, aDuration + aDelay );

  }
  return timeout * 1000 * ratio;
}

function getMaxTime(str){

  var maxTimeout = 0, time;

  if(!str) { return 0; }

  str.split(",").forEach(function(str){

    time = parseFloat(str);
    if( time > maxTimeout ) { maxTimeout = time; }

  });

  return maxTimeout;
}

var animate_1 = animate;

var combine_1 = createCommonjsModule(function (module) {
// some nested  operation in ast 
// --------------------------------

var dom = dom_1;
var animate = animate_1;

var combine = module.exports = {

  // get the initial dom in object
  node: function(item){
    var children,node, nodes;
    if(!item) { return; }
    if(item.element) { return item.element; }
    if(typeof item.node === "function") { return item.node(); }
    if(typeof item.nodeType === "number") { return item; }
    if(item.group) { return combine.node(item.group) }
    if(children = item.children){
      if(children.length === 1){
        return combine.node(children[0]);
      }
      nodes = [];
      for(var i = 0, len = children.length; i < len; i++ ){
        node = combine.node(children[i]);
        if(Array.isArray(node)){
          nodes.push.apply(nodes, node)
        }else if(node) {
          nodes.push(node)
        }
      }
      return nodes;
    }
  },
  // @TODO remove _gragContainer
  inject: function(node, pos ){
    var group = this;
    var fragment = combine.node(group.group || group);
    if(node === false) {
      animate.remove(fragment)
      return group;
    }else{
      if(!fragment) { return group; }
      if(typeof node === 'string') { node = dom.find(node); }
      if(!node) { throw Error('injected node is not found'); }
      // use animate to animate firstchildren
      animate.inject(fragment, node, pos);
    }
    // if it is a component
    if(group.$emit) {
      var preParent = group.parentNode;
      var newParent = (pos ==='after' || pos === 'before')? node.parentNode : node;
      group.parentNode = newParent;
      group.$emit("$inject", node, pos, preParent);
    }
    return group;
  },

  // get the last dom in object(for insertion operation)
  last: function(item){
    var children = item.children;

    if(typeof item.last === "function") { return item.last(); }
    if(typeof item.nodeType === "number") { return item; }

    if(children && children.length) { return combine.last(children[children.length - 1]); }
    if(item.group) { return combine.last(item.group); }

  },

  destroy: function(item, first){
    if(!item) { return; }
    if(Array.isArray(item)){
      for(var i = 0, len = item.length; i < len; i++ ){
        combine.destroy(item[i], first);
      }
    }
    var children = item.children;
    if(typeof item.destroy === "function") { return item.destroy(first); }
    if(typeof item.nodeType === "number" && first)  { dom.remove(item); }
    if(children && children.length){
      combine.destroy(children, true);
      item.children = null;
    }
  }

}


// @TODO: need move to dom.js
dom.element = function( component, all ){
  if(!component) { return !all? null: []; }
  var nodes = combine.node( component );
  if( nodes.nodeType === 1 ) { return all? [nodes]: nodes; }
  var elements = [];
  for(var i = 0; i<nodes.length ;i++){
    var node = nodes[i];
    if( node && node.nodeType === 1){
      if(!all) { return node; }
      elements.push(node);
    } 
  }
  return !all? elements[0]: elements;
}
});

var _$7 = util;
var combine$1 = combine_1

function Group$1(list){
  this.children = list || [];
}


var o = _$7.extend(Group$1.prototype, {
  destroy: function(first){
    combine$1.destroy(this.children, first);
    if(this.ondestroy) { this.ondestroy(); }
    this.children = null;
  },
  get: function(i){
    return this.children[i]
  },
  push: function(item){
    this.children.push( item );
  }
})
o.inject = o.$inject = combine$1.inject



var group = Group$1;

var walkers_1 = createCommonjsModule(function (module) {
var diffArray = diff.diffArray;
var combine = combine_1;
var animate = animate_1;
var node = node$1;
var Group = group;
var dom = dom_1;
var _ = util;


var walkers = module.exports = {};

walkers.list = function(ast, options){

  var Regular = walkers.Regular;  
  var placeholder = document.createComment("Regular list"),
    namespace = options.namespace,
    extra = options.extra;
  var self = this;
  var group$$1 = new Group([placeholder]);
  var indexName = ast.variable + '_index';
  var keyName = ast.variable + '_key';
  var variable = ast.variable;
  var alternate = ast.alternate;
  var track = ast.track, keyOf, extraObj;

  if( track && track !== true ){
    track = this._touchExpr(track);
    extraObj = _.createObject(extra);
    keyOf = function( item, index ){
      extraObj[ variable ] = item;
      extraObj[ indexName ] = index;
      // @FIX keyName
      return track.get( self, extraObj );
    }
  }

  function removeRange(index, rlen){
    for(var j = 0; j< rlen; j++){ //removed
      var removed = group$$1.children.splice( index + 1, 1)[0];
      if(removed) { removed.destroy(true); }
    }
  }

  function addRange(index, end, newList, rawNewValue){
    for(var o = index; o < end; o++){ //add
      // prototype inherit
      var item = newList[o];
      var data = {};
      updateTarget(data, o, item, rawNewValue);

      data = _.createObject(extra, data);
      var section = self.$compile(ast.body, {
        extra: data,
        namespace:namespace,
        record: true,
        outer: options.outer
      })
      section.data = data;
      // autolink
      var insert =  combine.last(group$$1.get(o));
      if(insert.parentNode){
        animate.inject(combine.node(section),insert, 'after');
      }
      // insert.parentNode.insertBefore(combine.node(section), insert.nextSibling);
      group$$1.children.splice( o + 1 , 0, section);
    }
  }

  function updateTarget(target, index, item, rawNewValue){

      target[ indexName ] = index;
      if( rawNewValue ){
        target[ keyName ] = item;
        target[ variable ] = rawNewValue[ item ];
      }else{
        target[ variable ] = item;
        target[keyName] = null
      }
  }


  function updateRange(start, end, newList, rawNewValue){
    for(var k = start; k < end; k++){ // no change
      var sect = group$$1.get( k + 1 ), item = newList[ k ];
      updateTarget(sect.data, k, item, rawNewValue);
    }
  }

  function updateLD(newList, oldList, splices , rawNewValue ){

    var cur = placeholder;
    var m = 0, len = newList.length;

    if(!splices && (len !==0 || oldList.length !==0)  ){
      splices = diffArray(newList, oldList, true);
    }

    if(!splices || !splices.length) { return; }
      
    for(var i = 0; i < splices.length; i++){ //init
      var splice = splices[i];
      var index = splice.index; // beacuse we use a comment for placeholder
      var removed = splice.removed;
      var add = splice.add;
      var rlen = removed.length;
      // for track
      if( track && rlen && add ){
        var minar = Math.min(rlen, add);
        var tIndex = 0;
        while(tIndex < minar){
          if( keyOf(newList[index], index) !== keyOf( removed[0], index ) ){
            removeRange(index, 1)
            addRange(index, index+1, newList, rawNewValue)
          }
          removed.shift();
          add--;
          index++;
          tIndex++;
        }
        rlen = removed.length;
      }
      // update
      updateRange(m, index, newList, rawNewValue);

      removeRange( index ,rlen)

      addRange(index, index+add, newList, rawNewValue)

      m = index + add - rlen;
      m  = m < 0? 0 : m;

    }
    if(m < len){
      for(var i = m; i < len; i++){
        var pair = group$$1.get(i + 1);
        pair.data[indexName] = i;
        // @TODO fix keys
      }
    }
  }

  // if the track is constant test.
  function updateSimple(newList, oldList, rawNewValue ){

    var nlen = newList.length;
    var olen = oldList.length;
    var mlen = Math.min(nlen, olen);

    updateRange(0, mlen, newList, rawNewValue)
    if(nlen < olen){ //need add
      removeRange(nlen, olen-nlen);
    }else if(nlen > olen){
      addRange(olen, nlen, newList, rawNewValue);
    }
  }

  function update(newValue, oldValue, splices){

    var nType = _.typeOf( newValue );
    var oType = _.typeOf( oldValue );

    var newList = getListFromValue( newValue, nType );
    var oldList = getListFromValue( oldValue, oType );

    var rawNewValue;


    var nlen = newList && newList.length;
    var olen = oldList && oldList.length;

    // if previous list has , we need to remove the altnated section.
    if( !olen && nlen && group$$1.get(1) ){
      var altGroup = group$$1.children.pop();
      if(altGroup.destroy)  { altGroup.destroy(true); }
    }

    if( nType === 'object' ) { rawNewValue = newValue; }

    if(track === true){
      updateSimple( newList, oldList,  rawNewValue );
    }else{
      updateLD( newList, oldList, splices, rawNewValue );
    }

    // @ {#list} {#else}
    if( !nlen && alternate && alternate.length){
      var section = self.$compile(alternate, {
        extra: extra,
        record: true,
        outer: options.outer,
        namespace: namespace
      })
      group$$1.children.push(section);
      if(placeholder.parentNode){
        animate.inject(combine.node(section), placeholder, 'after');
      }
    }
  }

  this.$watch(ast.sequence, update, { 
    init: true, 
    diff: track !== true ,
    deep: true
  });
  return group$$1;
}


function updateItem(){
  
}


// {#include } or {#inc template}
walkers.template = function(ast, options){
  var content = ast.content, compiled;
  var placeholder = document.createComment('inlcude');
  var compiled, namespace = options.namespace, extra = options.extra;
  var group$$1 = new Group([placeholder]);
  if(content){
    var self = this;
    this.$watch(content, function(value){
      var removed = group$$1.get(1), type= typeof value;
      if( removed){
        removed.destroy(true); 
        group$$1.children.pop();
      }
      if(!value) { return; }

      group$$1.push( compiled = type === 'function' ? value(): self.$compile( type !== 'object'? String(value): value, {
        record: true, 
        outer: options.outer,
        namespace: namespace, 
        extra: extra}) ); 
      if(placeholder.parentNode) {
        compiled.$inject(placeholder, 'before')
      }
    }, {
      init: true
    });
  }
  return group$$1;
};

function getListFromValue(value, type){
  return type === 'object'? _.keys(value): (
      type === 'array'? value: []
    )
}


// how to resolve this problem
var ii = 0;
walkers['if'] = function(ast, options){
  var self = this, consequent, alternate, extra = options.extra;
  if(options && options.element){ // attribute inteplation
    var update = function(nvalue){
      if(!!nvalue){
        if(alternate) { combine.destroy(alternate) }
        if(ast.consequent) { consequent = self.$compile(ast.consequent, {record: true, element: options.element , extra:extra}); }
      }else{
        if(consequent) { combine.destroy(consequent) }
        if(ast.alternate) { alternate = self.$compile(ast.alternate, {record: true, element: options.element, extra: extra}); }
      }
    }
    this.$watch(ast.test, update, { force: true });
    return {
      destroy: function(){
        if(consequent) { combine.destroy(consequent); }
        else if(alternate) { combine.destroy(alternate); }
      }
    }
  }

  var test, consequent, alternate, node;
  var placeholder = document.createComment("Regular if" + ii++);
  var group$$1 = new Group();
  group$$1.push(placeholder);
  var preValue = null, namespace= options.namespace;


  var update = function (nvalue, old){
    var value = !!nvalue;
    if(value === preValue) { return; }
    preValue = value;
    if(group$$1.children[1]){
      group$$1.children[1].destroy(true);
      group$$1.children.pop();
    }
    if(value){ //true
      if(ast.consequent && ast.consequent.length){
        consequent = self.$compile( ast.consequent , {record:true, outer: options.outer,namespace: namespace, extra:extra })
        // placeholder.parentNode && placeholder.parentNode.insertBefore( node, placeholder );
        group$$1.push(consequent);
        if(placeholder.parentNode){
          animate.inject(combine.node(consequent), placeholder, 'before');
        }
      }
    }else{ //false
      if(ast.alternate && ast.alternate.length){
        alternate = self.$compile(ast.alternate, {record:true, outer: options.outer,namespace: namespace, extra:extra});
        group$$1.push(alternate);
        if(placeholder.parentNode){
          animate.inject(combine.node(alternate), placeholder, 'before');
        }
      }
    }
  }
  this.$watch(ast.test, update, {force: true, init: true});

  return group$$1;
}


walkers.expression = function(ast, options){
  var node = document.createTextNode("");
  this.$watch(ast, function(newval){
    dom.text(node, "" + (newval == null? "": "" + newval) );
  },{init: true})
  return node;
}
walkers.text = function(ast, options){
  var node = document.createTextNode(_.convertEntity(ast.text));
  return node;
}



var eventReg = /^on-(.+)$/

/**
 * walkers element (contains component)
 */
walkers.element = function(ast, options){
  var attrs = ast.attrs, self = this,
    Constructor = this.constructor,
    children = ast.children,
    namespace = options.namespace, 
    extra = options.extra,
    tag = ast.tag,
    Component = Constructor.component(tag),
    ref, group$$1, element;

  if( tag === 'r-content' ){
    _.log('r-content is deprecated, use {#inc this.$body} instead (`{#include}` as same)', 'warn');
    return this.$body && this.$body();
  } 

  if(Component || tag === 'r-component'){
    options.Component = Component;
    return walkers.component.call(this, ast, options)
  }

  if(tag === 'svg') { namespace = "svg"; }
  // @Deprecated: may be removed in next version, use {#inc } instead
  
  if( children && children.length ){
    group$$1 = this.$compile(children, {outer: options.outer,namespace: namespace, extra: extra });
  }

  element = dom.create(tag, namespace, attrs);

  if(group$$1 && !_.isVoidTag(tag)){
    dom.inject( combine.node(group$$1) , element)
  }

  // sort before
  if(!ast.touched){
    attrs.sort(function(a1, a2){
      var d1 = Constructor.directive(a1.name),
        d2 = Constructor.directive(a2.name);
      if( d1 && d2 ) { return (d2.priority || 1) - (d1.priority || 1); }
      if(d1) { return 1; }
      if(d2) { return -1; }
      if(a2.name === "type") { return 1; }
      return -1;
    })
    ast.touched = true;
  }
  // may distinct with if else
  var destroies = walkAttributes.call(this, attrs, element, extra);

  return {
    type: "element",
    group: group$$1,
    node: function(){
      return element;
    },
    last: function(){
      return element;
    },
    destroy: function(first){
      if( first ){
        animate.remove( element, group$$1? group$$1.destroy.bind( group$$1 ): _.noop );
      }else if(group$$1) {
        group$$1.destroy();
      }
      // destroy ref
      if( destroies.length ) {
        destroies.forEach(function( destroy ){
          if( destroy ){
            if( typeof destroy.destroy === 'function' ){
              destroy.destroy()
            }else{
              destroy();
            }
          }
        })
      }
    }
  }
}

walkers.component = function(ast, options){
  var this$1 = this;

  var attrs = ast.attrs, 
    Component = options.Component,
    Constructor = this.constructor,
    isolate, 
    extra = options.extra,
    namespace = options.namespace,
    ref, self = this, is;

  var data = {}, events;

  for(var i = 0, len = attrs.length; i < len; i++){
    var attr = attrs[i];
    // consider disabled   equlasto  disabled={true}
    var value = this$1._touchExpr(attr.value === undefined? true: attr.value);
    if(value.constant) { value = attr.value = value.get(this$1); }
    if(attr.value && attr.value.constant === true){
      value = value.get(this$1);
    }
    var name = attr.name;
    if(!attr.event){
      var etest = name.match(eventReg);
      // event: 'nav'
      if(etest) { attr.event = etest[1]; }
    }

    // @compile modifier
    if(attr.mdf === 'cmpl'){
      value = _.getCompileFn(value, this$1, {
        record: true, 
        namespace:namespace, 
        extra: extra, 
        outer: options.outer
      })
    }
    
    // @if is r-component . we need to find the target Component
    if(name === 'is' && !Component){
      is = value;
      var componentName = this$1.$get(value, true);
      Component = Constructor.component(componentName)
      if(typeof Component !== 'function') { throw new Error("component " + componentName + " has not registed!"); }
    }
    // bind event proxy
    var eventName;
    if(eventName = attr.event){
      events = events || {};
      events[eventName] = _.handleEvent.call(this$1, value, eventName);
      continue;
    }else {
      name = attr.name = _.camelCase(name);
    }

    if(!value || value.type !== 'expression'){
      data[name] = value;
    }else{
      data[name] = value.get(self); 
    }
    if( name === 'ref'  && value != null){
      ref = value
    }
    if( name === 'isolate'){
      // 1: stop: composite -> parent
      // 2. stop: composite <- parent
      // 3. stop 1 and 2: composite <-> parent
      // 0. stop nothing (defualt)
      isolate = value.type === 'expression'? value.get(self): parseInt(value === true? 3: value, 10);
      data.isolate = isolate;
    }
  }

  var definition = { 
    data: data, 
    events: events, 
    $parent: (isolate & 2)? null: this,
    $root: this.$root,
    $outer: options.outer,
    _body: {
      ctx: this,
      ast: ast.children
    }
  }
  var options = {
    namespace: namespace, 
    extra: options.extra
  }


  var component = new Component(definition, options), reflink;


  if(ref && this.$refs){
    reflink = Component.directive('ref').link
    this.$on('$destroy', reflink.call(this, component, ref) )
  }
  if(ref &&  self.$refs) { self.$refs[ref] = component; }
  for(var i = 0, len = attrs.length; i < len; i++){
    var attr = attrs[i];
    var value = attr.value||true;
    var name = attr.name;
    // need compiled
    if(value.type === 'expression' && !attr.event){
      value = self._touchExpr(value);
      // use bit operate to control scope
      if( !(isolate & 2) ) 
        { this$1.$watch(value, (function(name, val){
          this.data[name] = val;
        }).bind(component, name), { sync: true }) }
      if( value.set && !(isolate & 1 ) ) 
        // sync the data. it force the component don't trigger attr.name's first dirty echeck
        { component.$watch(name, self.$update.bind(self, value), {init: true}); }
    }
  }
  if(is && is.type === 'expression'  ){
    var group$$1 = new Group();
    group$$1.push(component);
    this.$watch(is, function(value){
      // found the new component
      var Component = Constructor.component(value);
      if(!Component) { throw new Error("component " + value + " has not registed!"); }
      var ncomponent = new Component(definition);
      var component = group$$1.children.pop();
      group$$1.push(ncomponent);
      ncomponent.$inject(combine.last(component), 'after')
      component.destroy();
      // @TODO  if component changed , we need update ref
      if(ref){
        self.$refs[ref] = ncomponent;
      }
    }, {sync: true})
    return group$$1;
  }
  return component;
}

function walkAttributes(attrs, element, extra){
  var this$1 = this;

  var bindings = []
  for(var i = 0, len = attrs.length; i < len; i++){
    var binding = this$1._walk(attrs[i], {element: element, fromElement: true, attrs: attrs, extra: extra})
    if(binding) { bindings.push(binding); }
  }
  return bindings;
}

walkers.attribute = function(ast ,options){

  var attr = ast;
  var name = attr.name;
  var value = attr.value || "";
  var constant = value.constant;
  var Component = this.constructor;
  var directive = Component.directive(name);
  var element = options.element;
  var self = this;


  value = this._touchExpr(value);

  if(constant) { value = value.get(this); }

  if(directive && directive.link){
    var binding = directive.link.call(self, element, value, name, options.attrs);
    if(typeof binding === 'function') { binding = {destroy: binding}; } 
    return binding;
  } else{
    if(value.type === 'expression' ){
      this.$watch(value, function(nvalue, old){
        dom.attr(element, name, nvalue);
      }, {init: true});
    }else{
      if(_.isBooleanAttr(name)){
        dom.attr(element, name, true);
      }else{
        dom.attr(element, name, value);
      }
    }
    if(!options.fromElement){
      return {
        destroy: function(){
          dom.attr(element, name, null);
        }
      }
    }
  }

}
});

// simplest event emitter 60 lines
// ===============================
var slice$1 = [].slice;
var _$8 = util;
var API = {
  $on: function(event, fn) {
    var this$1 = this;

    if(typeof event === "object"){
      for (var i in event) {
        this$1.$on(i, event[i]);
      }
    }else{
      // @patch: for list
      var context = this;
      var handles = context._handles || (context._handles = {}),
        calls = handles[event] || (handles[event] = []);
      calls.push(fn);
    }
    return this;
  },
  $off: function(event, fn) {
    var context = this;
    if(!context._handles) { return; }
    if(!event) { this._handles = {}; }
    var handles = context._handles,
      calls;

    if (calls = handles[event]) {
      if (!fn) {
        handles[event] = [];
        return context;
      }
      for (var i = 0, len = calls.length; i < len; i++) {
        if (fn === calls[i]) {
          calls.splice(i, 1);
          return context;
        }
      }
    }
    return context;
  },
  // bubble event
  $emit: function(event){
    // @patch: for list
    var context = this;
    var handles = context._handles, calls, args, type;
    if(!event) { return; }
    var args = slice$1.call(arguments, 1);
    var type = event;

    if(!handles) { return context; }
    if(calls = handles[type.slice(1)]){
      for (var j = 0, len = calls.length; j < len; j++) {
        calls[j].apply(context, args)
      }
    }
    if (!(calls = handles[type])) { return context; }
    for (var i = 0, len = calls.length; i < len; i++) {
      calls[i].apply(context, args)
    }
    // if(calls.length) context.$update();
    return context;
  },
  // capture  event
  $one: function(){
    
}
}
// container class
function Event() {}
_$8.extend(Event.prototype, API)

Event.mixTo = function(obj){
  obj = typeof obj === "function" ? obj.prototype : obj;
  _$8.extend(obj, API)
}
var event = Event;

var exprCache$1 = env.exprCache;
var Parser$2 = Parser_1;
var parse$1 = {
  expression: function(expr, simple){
    // @TODO cache
    if( typeof expr === 'string' && ( expr = expr.trim() ) ){
      expr = exprCache$1.get( expr ) || exprCache$1.set( expr, new Parser$2( expr, { mode: 2, expression: true } ).expression() )
    }
    if(expr) { return expr; }
  },
  parse: function(template){
    return new Parser$2(template).parse();
  }
}

var _$9 = util;
var parseExpression = parse$1.expression;
var diff$2 = diff;
var diffArray$1 = diff$2.diffArray;
var diffObject$1 = diff$2.diffObject;

function Watcher$1(){}

var methods = {
  $watch: function(expr, fn, options){
    var this$1 = this;

    var get, once, test, rlen, extra = this.__ext__; //records length
    if(!this._watchers) { this._watchers = []; }

    options = options || {};
    if(options === true){
       options = { deep: true }
    }
    var uid = _$9.uid('w_');
    if(Array.isArray(expr)){
      var tests = [];
      for(var i = 0,len = expr.length; i < len; i++){
          tests.push(this$1.$expression(expr[i]).get)
      }
      var prev = [];
      test = function(context){
        var equal = true;
        for(var i =0, len = tests.length; i < len; i++){
          var splice = tests[i](context, extra);
          if(!_$9.equals(splice, prev[i])){
             equal = false;
             prev[i] = _$9.clone(splice);
          }
        }
        return equal? false: prev;
      }
    }else{
      if(typeof expr === 'function'){
        get = expr.bind(this);      
      }else{
        expr = this._touchExpr( parseExpression(expr) );
        get = expr.get;
        once = expr.once;
      }
    }

    var watcher = {
      id: uid, 
      get: get, 
      fn: fn, 
      once: once, 
      force: options.force,
      // don't use ld to resolve array diff
      diff: options.diff,
      test: test,
      deep: options.deep,
      last: options.sync? get(this): options.last
    }
    
    this._watchers.push( watcher );

    rlen = this._records && this._records.length;
    if(rlen) { this._records[rlen-1].push(uid) }
    // init state.
    if(options.init === true){
      var prephase = this.$phase;
      this.$phase = 'digest';
      this._checkSingleWatch( watcher, this._watchers.length-1 );
      this.$phase = prephase;
    }
    return watcher;
  },
  $unwatch: function(uid){
    var this$1 = this;

    uid = uid.id || uid;
    if(!this._watchers) { this._watchers = []; }
    if(Array.isArray(uid)){
      for(var i =0, len = uid.length; i < len; i++){
        this$1.$unwatch(uid[i]);
      }
    }else{
      var watchers = this._watchers, watcher, wlen;
      if(!uid || !watchers || !(wlen = watchers.length)) { return; }
      for(;wlen--;){
        watcher = watchers[wlen];
        if(watcher && watcher.id === uid ){
          watchers.splice(wlen, 1);
        }
      }
    }
  },
  $expression: function(value){
    return this._touchExpr(parseExpression(value))
  },
  /**
   * the whole digest loop ,just like angular, it just a dirty-check loop;
   * @param  {String} path  now regular process a pure dirty-check loop, but in parse phase, 
   *                  Regular's parser extract the dependencies, in future maybe it will change to dirty-check combine with path-aware update;
   * @return {Void}   
   */

  $digest: function(){
    if(this.$phase === 'digest' || this._mute) { return; }
    this.$phase = 'digest';
    var dirty = false, n =0;
    while(dirty = this._digest()){

      if((++n) > 20){ // max loop
        throw Error('there may a circular dependencies reaches')
      }
    }
    if( n > 0 && this.$emit) { this.$emit("$update"); }
    this.$phase = null;
  },
  // private digest logic
  _digest: function(){
    var this$1 = this;


    var watchers = this._watchers;
    var dirty = false, children, watcher, watcherDirty;
    if(watchers && watchers.length){
      for(var i = 0, len = watchers.length;i < len; i++){
        watcher = watchers[i];
        watcherDirty = this$1._checkSingleWatch(watcher, i);
        if(watcherDirty) { dirty = true; }
      }
    }
    // check children's dirty.
    children = this._children;
    if(children && children.length){
      for(var m = 0, mlen = children.length; m < mlen; m++){
        var child = children[m];
        
        if(child && child._digest()) { dirty = true; }
      }
    }
    return dirty;
  },
  // check a single one watcher 
  _checkSingleWatch: function(watcher, i){
    var dirty = false;
    if(!watcher) { return; }

    var now, last, tlast, tnow,  eq, diff$$1;

    if(!watcher.test){

      now = watcher.get(this);
      last = watcher.last;
      tlast = _$9.typeOf(last);
      tnow = _$9.typeOf(now);
      eq = true, diff$$1;

      // !Object
      if( !(tnow === 'object' && tlast==='object' && watcher.deep) ){
        // Array
        if( tnow === 'array' && ( tlast=='undefined' || tlast === 'array') ){
          diff$$1 = diffArray$1(now, watcher.last || [], watcher.diff)
          if( tlast !== 'array' || diff$$1 === true || diff$$1.length ) { dirty = true; }
        }else{
          eq = _$9.equals( now, last );
          if( !eq || watcher.force ){
            watcher.force = null;
            dirty = true; 
          }
        }
      }else{
        diff$$1 =  diffObject$1( now, last, watcher.diff );
        if( diff$$1 === true || diff$$1.length ) { dirty = true; }
      }
    } else{
      // @TODO 是否把多重改掉
      var result = watcher.test(this);
      if(result){
        dirty = true;
        watcher.fn.apply(this, result)
      }
    }
    if(dirty && !watcher.test){
      if(tnow === 'object' && watcher.deep || tnow === 'array'){
        watcher.last = _$9.clone(now);
      }else{
        watcher.last = now;
      }
      watcher.fn.call(this, now, last, diff$$1)
      if(watcher.once) { this._watchers.splice(i, 1); }
    }

    return dirty;
  },

  /**
   * **tips**: whatever param you passed in $update, after the function called, dirty-check(digest) phase will enter;
   * 
   * @param  {Function|String|Expression} path  
   * @param  {Whatever} value optional, when path is Function, the value is ignored
   * @return {this}     this 
   */
  $set: function(path, value){
    var this$1 = this;

    if(path != null){
      var type = _$9.typeOf(path);
      if( type === 'string' || path.type === 'expression' ){
        path = this.$expression(path);
        path.set(this, value);
      }else if(type === 'function'){
        path.call(this, this.data);
      }else{
        for(var i in path) {
          this$1.$set(i, path[i])
        }
      }
    }
  },
  // 1. expr canbe string or a Expression
  // 2. detect: if true, if expr is a string will directly return;
  $get: function(expr, detect)  {
    if(detect && typeof expr === 'string') { return expr; }
    return this.$expression(expr).get(this);
  },
  $update: function(){
    var rootParent = this;
    do{
      if(rootParent.data.isolate || !rootParent.$parent) { break; }
      rootParent = rootParent.$parent;
    } while(rootParent)

    var prephase =rootParent.$phase;
    rootParent.$phase = 'digest'

    this.$set.apply(this, arguments);

    rootParent.$phase = prephase

    rootParent.$digest();
    return this;
  },
  // auto collect watchers for logic-control.
  _record: function(){
    if(!this._records) { this._records = []; }
    this._records.push([]);
  },
  _release: function(){
    return this._records.pop();
  }
}


_$9.extend(Watcher$1.prototype, methods)


Watcher$1.mixTo = function(obj){
  obj = typeof obj === "function" ? obj.prototype : obj;
  return _$9.extend(obj, methods)
}

var watcher = Watcher$1;

var filter$1 = createCommonjsModule(function (module) {
var f = module.exports = {};

// json:  two way 
//  - get: JSON.stringify
//  - set: JSON.parse
//  - example: `{ title|json }`
f.json = {
  get: function( value ){
    return typeof JSON !== 'undefined'? JSON.stringify(value): value;
  },
  set: function( value ){
    return typeof JSON !== 'undefined'? JSON.parse(value) : value;
  }
}

// last: one-way
//  - get: return the last item in list
//  - example: `{ list|last }`
f.last = function(arr){
  return arr && arr[arr.length - 1];
}

// average: one-way
//  - get: copute the average of the list
//  - example: `{ list| average: "score" }`
f.average = function(array, key){
  array = array || [];
  return array.length? f.total(array, key)/ array.length : 0;
}


// total: one-way
//  - get: copute the total of the list
//  - example: `{ list| total: "score" }`
f.total = function(array, key){
  var total = 0;
  if(!array) { return; }
  array.forEach(function( item ){
    total += key? item[key] : item;
  })
  return total;
}

// var basicSortFn = function(a, b){return b - a}

// f.sort = function(array, key, reverse){
//   var type = typeof key, sortFn; 
//   switch(type){
//     case 'function': sortFn = key; break;
//     case 'string': sortFn = function(a, b){};break;
//     default:
//       sortFn = basicSortFn;
//   }
//   // need other refernce.
//   return array.slice().sort(function(a,b){
//     return reverse? -sortFn(a, b): sortFn(a, b);
//   })
//   return array
// }
});

var env$2 = env;
var Lexer = Lexer_1;
var Parser = Parser_1;
var config$3 = config$1;
var _$1 = util;
var extend$1 = extend$2;
var combine = {};
if(env$2.browser){
  var dom = dom_1;
  var walkers = walkers_1;
  var Group = group;
  var doc = dom.doc;
  combine = combine_1;
}
var events = event;
var Watcher = watcher;
var parse = parse$1;
var filter = filter$1;


/**
* `Regular` is regularjs's NameSpace and BaseClass. Every Component is inherited from it
* 
* @class Regular
* @module Regular
* @constructor
* @param {Object} options specification of the component
*/
var Regular$1 = function(definition, options){
  var prevRunning = env$2.isRunning;
  env$2.isRunning = true;
  var node, template;

  definition = definition || {};
  var usePrototyeString = typeof this.template === 'string' && !definition.template;
  options = options || {};

  definition.data = definition.data || {};
  definition.computed = definition.computed || {};
  definition.events = definition.events || {};
  if(this.data) { _$1.extend(definition.data, this.data); }
  if(this.computed) { _$1.extend(definition.computed, this.computed); }
  if(this.events) { _$1.extend(definition.events, this.events); }

  _$1.extend(this, definition, true);
  if(this.$parent){
     this.$parent._append(this);
  }
  this._children = [];
  this.$refs = {};

  template = this.template;

  // template is a string (len < 16). we will find it container first
  if((typeof template === 'string' && template.length < 16) && (node = dom.find(template))) {
    template = node.innerHTML;
  }
  // if template is a xml
  if(template && template.nodeType) { template = template.innerHTML; }
  if(typeof template === 'string') {
    template = new Parser(template).parse();
    if(usePrototyeString) {
    // avoid multiply compile
      this.constructor.prototype.template = template;
    }else{
      delete this.template;
    }
  }

  this.computed = handleComputed(this.computed);
  this.$root = this.$root || this;
  // if have events
  if(this.events){
    this.$on(this.events);
  }
  this.$emit("$config");
  this.config && this.config(this.data);
  this.$emit("$afterConfig");

  var body = this._body;
  this._body = null;

  if(body && body.ast && body.ast.length){
    this.$body = _$1.getCompileFn(body.ast, body.ctx , {
      outer: this,
      namespace: options.namespace,
      extra: options.extra,
      record: true
    })
  }
  // handle computed
  if(template){
    this.group = this.$compile(template, {namespace: options.namespace});
    combine.node(this);
  }


  if(!this.$parent) { this.$update(); }
  this.$ready = true;
  this.$emit("$init");
  if( this.init ) { this.init(this.data); }
  this.$emit("$afterInit");

  // @TODO: remove, maybe , there is no need to update after init; 
  // if(this.$root === this) this.$update();
  env$2.isRunning = prevRunning;

  // children is not required;
}


walkers && (walkers.Regular = Regular$1);


// description
// -------------------------
// 1. Regular and derived Class use same filter
_$1.extend(Regular$1, {
  // private data stuff
  _directives: { __regexp__:[] },
  _plugins: {},
  _protoInheritCache: [ 'directive', 'use'] ,
  __after__: function(supr, o) {

    var template;
    this.__after__ = supr.__after__;

    // use name make the component global.
    if(o.name) { Regular$1.component(o.name, this); }
    // this.prototype.template = dom.initTemplate(o)
    if(template = o.template){
      var node, name;
      if( typeof template === 'string' && template.length < 16 && ( node = dom.find( template )) ){
        template = node ;
      }

      if(template && template.nodeType){
        if(name = dom.attr(template, 'name')) { Regular$1.component(name, this); }
        template = template.innerHTML;
      } 

      if(typeof template === 'string' ){
        this.prototype.template = config$3.PRECOMPILE? new Parser(template).parse(): template;
      }
    }

    if(o.computed) { this.prototype.computed = handleComputed(o.computed); }
    // inherit directive and other config from supr
    Regular$1._inheritConfig(this, supr);

  },
  /**
   * Define a directive
   *
   * @method directive
   * @return {Object} Copy of ...
   */  
  directive: function(name, cfg){
    var this$1 = this;


    if(_$1.typeOf(name) === "object"){
      for(var k in name){
        if(name.hasOwnProperty(k)) { this$1.directive(k, name[k]); }
      }
      return this;
    }
    var type = _$1.typeOf(name);
    var directives = this._directives, directive;
    if(cfg == null){
      if( type === "string" && (directive = directives[name]) ) { return directive; }
      else{
        var regexp = directives.__regexp__;
        for(var i = 0, len = regexp.length; i < len ; i++){
          directive = regexp[i];
          var test = directive.regexp.test(name);
          if(test) { return directive; }
        }
      }
      return undefined;
    }
    if(typeof cfg === 'function') { cfg = { link: cfg } } 
    if(type === 'string') { directives[name] = cfg; }
    else if(type === 'regexp'){
      cfg.regexp = name;
      directives.__regexp__.push(cfg)
    }
    return this
  },
  plugin: function(name, fn){
    var plugins = this._plugins;
    if(fn == null) { return plugins[name]; }
    plugins[name] = fn;
    return this;
  },
  use: function(fn){
    if(typeof fn === "string") { fn = Regular$1.plugin(fn); }
    if(typeof fn !== "function") { return this; }
    fn(this, Regular$1);
    return this;
  },
  // config the Regularjs's global
  config: function(name, value){
    var needGenLexer = false;
    if(typeof name === "object"){
      for(var i in name){
        // if you config
        if( i ==="END" || i==='BEGIN' )  { needGenLexer = true; }
        config$3[i] = name[i];
      }
    }
    if(needGenLexer) { Lexer.setup(); }
  },
  expression: parse.expression,
  Parser: Parser,
  Lexer: Lexer,
  _addProtoInheritCache: function(name, transform){
    if( Array.isArray( name ) ){
      return name.forEach(Regular$1._addProtoInheritCache);
    }
    var cacheKey = "_" + name + "s"
    Regular$1._protoInheritCache.push(name)
    Regular$1[cacheKey] = {};
    if(Regular$1[name]) { return; }
    Regular$1[name] = function(key, cfg){
      var this$1 = this;

      var cache = this[cacheKey];

      if(typeof key === "object"){
        for(var i in key){
          if(key.hasOwnProperty(i)) { this$1[name](i, key[i]); }
        }
        return this;
      }
      if(cfg == null) { return cache[key]; }
      cache[key] = transform? transform(cfg) : cfg;
      return this;
    }
  },
  _inheritConfig: function(self, supr){

    // prototype inherit some Regular property
    // so every Component will have own container to serve directive, filter etc..
    var defs = Regular$1._protoInheritCache;
    var keys = _$1.slice(defs);
    keys.forEach(function(key){
      self[key] = supr[key];
      var cacheKey = '_' + key + 's';
      if(supr[cacheKey]) { self[cacheKey] = _$1.createObject(supr[cacheKey]); }
    })
    return self;
  }

});

extend$1(Regular$1);

Regular$1._addProtoInheritCache("component")

Regular$1._addProtoInheritCache("filter", function(cfg){
  return typeof cfg === "function"? {get: cfg}: cfg;
})


events.mixTo(Regular$1);
Watcher.mixTo(Regular$1);

Regular$1.implement({
  init: function(){},
  config: function(){},
  destroy: function(){
    // destroy event wont propgation;
    this.$emit("$destroy");
    this.group && this.group.destroy(true);
    this.group = null;
    this.parentNode = null;
    this._watchers = null;
    this._children = [];
    var parent = this.$parent;
    if(parent){
      var index = parent._children.indexOf(this);
      parent._children.splice(index,1);
    }
    this.$parent = null;
    this.$root = null;
    this._handles = null;
    this.$refs = null;
  },

  /**
   * compile a block ast ; return a group;
   * @param  {Array} parsed ast
   * @param  {[type]} record
   * @return {[type]}
   */
  $compile: function(ast, options){
    options = options || {};
    if(typeof ast === 'string'){
      ast = new Parser(ast).parse()
    }
    var preExt = this.__ext__,
      record = options.record, 
      records;

    if(options.extra) { this.__ext__ = options.extra; }

    if(record) { this._record(); }
    var group$$1 = this._walk(ast, options);
    if(record){
      records = this._release();
      var self = this;
      if(records.length){
        // auto destroy all wather;
        group$$1.ondestroy = function(){ self.$unwatch(records); }
      }
    }
    if(options.extra) { this.__ext__ = preExt; }
    return group$$1;
  },


  /**
   * create two-way binding with another component;
   * *warn*: 
   *   expr1 and expr2 must can operate set&get, for example: the 'a.b' or 'a[b + 1]' is set-able, but 'a.b + 1' is not, 
   *   beacuse Regular dont know how to inverse set through the expression;
   *   
   *   if before $bind, two component's state is not sync, the component(passed param) will sync with the called component;
   *
   * *example: *
   *
   * ```javascript
   * // in this example, we need to link two pager component
   * var pager = new Pager({}) // pager compoennt
   * var pager2 = new Pager({}) // another pager component
   * pager.$bind(pager2, 'current'); // two way bind throw two component
   * pager.$bind(pager2, 'total');   // 
   * // or just
   * pager.$bind(pager2, {"current": "current", "total": "total"}) 
   * ```
   * 
   * @param  {Regular} component the
   * @param  {String|Expression} expr1     required, self expr1 to operate binding
   * @param  {String|Expression} expr2     optional, other component's expr to bind with, if not passed, the expr2 will use the expr1;
   * @return          this;
   */
  $bind: function(component, expr1, expr2){
    var this$1 = this;

    var type = _$1.typeOf(expr1);
    if( expr1.type === 'expression' || type === 'string' ){
      this._bind(component, expr1, expr2)
    }else if( type === "array" ){ // multiply same path binding through array
      for(var i = 0, len = expr1.length; i < len; i++){
        this$1._bind(component, expr1[i]);
      }
    }else if(type === "object"){
      for(var i in expr1) { if(expr1.hasOwnProperty(i)){
        this$1._bind(component, i, expr1[i]);
      } }
    }
    // digest
    component.$update();
    return this;
  },
  /**
   * unbind one component( see $bind also)
   *
   * unbind will unbind all relation between two component
   * 
   * @param  {Regular} component [descriptionegular
   * @return {This}    this
   */
  $unbind: function(){
    // todo
  },
  $inject: combine.inject,
  $mute: function(isMute){

    isMute = !!isMute;

    var needupdate = isMute === false && this._mute;

    this._mute = !!isMute;

    if(needupdate) { this.$update(); }
    return this;
  },
  // private bind logic
  _bind: function(component, expr1, expr2){

    var self = this;
    // basic binding

    if(!component || !(component instanceof Regular$1)) { throw "$bind() should pass Regular component as first argument"; }
    if(!expr1) { throw "$bind() should  pass as least one expression to bind"; }

    if(!expr2) { expr2 = expr1; }

    expr1 = parse.expression( expr1 );
    expr2 = parse.expression( expr2 );

    // set is need to operate setting ;
    if(expr2.set){
      var wid1 = this.$watch( expr1, function(value){
        component.$update(expr2, value)
      });
      component.$on('$destroy', function(){
        self.$unwatch(wid1)
      })
    }
    if(expr1.set){
      var wid2 = component.$watch(expr2, function(value){
        self.$update(expr1, value)
      });
      // when brother destroy, we unlink this watcher
      this.$on('$destroy', component.$unwatch.bind(component,wid2))
    }
    // sync the component's state to called's state
    expr2.set(component, expr1.get(this));
  },
  _walk: function(ast, arg1){
    var this$1 = this;

    if( _$1.typeOf(ast) === 'array' ){
      var res = [];

      for(var i = 0, len = ast.length; i < len; i++){
        res.push( this$1._walk(ast[i], arg1) );
      }

      return new Group(res);
    }
    if(typeof ast === 'string') { return doc.createTextNode(ast) }
    return walkers[ast.type || "default"].call(this, ast, arg1);
  },
  _append: function(component){
    this._children.push(component);
    component.$parent = this;
  },
  _handleEvent: function(elem, type, value, attrs){
    var Component = this.constructor,
      fire = typeof value !== "function"? _$1.handleEvent.call( this, value, type ) : value,
      handler = Component.event(type), destroy;

    if ( handler ) {
      destroy = handler.call(this, elem, fire, attrs);
    } else {
      dom.on(elem, type, fire);
    }
    return handler ? destroy : function() {
      dom.off(elem, type, fire);
    }
  },
  // 1. 用来处理exprBody -> Function
  // 2. list里的循环
  _touchExpr: function(expr){
    var  rawget, ext = this.__ext__, touched = {};
    if(expr.type !== 'expression' || expr.touched) { return expr; }
    rawget = expr.get || (expr.get = new Function(_$1.ctxName, _$1.extName , _$1.prefix+ "return (" + expr.body + ")"));
    touched.get = !ext? rawget: function(context){
      return rawget(context, ext)
    }

    if(expr.setbody && !expr.set){
      var setbody = expr.setbody;
      expr.set = function(ctx, value, ext){
        expr.set = new Function(_$1.ctxName, _$1.setName , _$1.extName, _$1.prefix + setbody);          
        return expr.set(ctx, value, ext);
      }
      expr.setbody = null;
    }
    if(expr.set){
      touched.set = !ext? expr.set : function(ctx, value){
        return expr.set(ctx, value, ext);
      }
    }
    _$1.extend(touched, {
      type: 'expression',
      touched: true,
      once: expr.once || expr.constant
    })
    return touched
  },
  // find filter
  _f_: function(name){
    var Component = this.constructor;
    var filter = Component.filter(name);
    if(!filter) { throw Error('filter ' + name + ' is undefined'); }
    return filter;
  },
  // simple accessor get
  _sg_:function(path, defaults, ext){
    if(typeof ext !== 'undefined'){
      // if(path === "demos")  debugger
      var computed = this.computed,
        computedProperty = computed[path];
      if(computedProperty){
        if(computedProperty.type==='expression' && !computedProperty.get) { this._touchExpr(computedProperty); }
        if(computedProperty.get)  { return computedProperty.get(this); }
        else { _$1.log("the computed '" + path + "' don't define the get function,  get data."+path + " altnately", "warn") }
      }
  }
    if(typeof defaults === "undefined" || typeof path == "undefined" ){
      return undefined;
    }
    return (ext && typeof ext[path] !== 'undefined')? ext[path]: defaults[path];

  },
  // simple accessor set
  _ss_:function(path, value, data , op, computed){
    var computed = this.computed,
      op = op || "=", prev, 
      computedProperty = computed? computed[path]:null;

    if(op !== '='){
      prev = computedProperty? computedProperty.get(this): data[path];
      switch(op){
        case "+=":
          value = prev + value;
          break;
        case "-=":
          value = prev - value;
          break;
        case "*=":
          value = prev * value;
          break;
        case "/=":
          value = prev / value;
          break;
        case "%=":
          value = prev % value;
          break;
      }
    }
    if(computedProperty) {
      if(computedProperty.set) { return computedProperty.set(this, value); }
      else { _$1.log("the computed '" + path + "' don't define the set function,  assign data."+path + " altnately", "warn" ) }
    }
    data[path] = value;
    return value;
  }
});

Regular$1.prototype.inject = function(){
  _$1.log("use $inject instead of inject", "error");
  return this.$inject.apply(this, arguments);
}


// only one builtin filter

Regular$1.filter(filter);

var Regular_1 = Regular$1;



var handleComputed = (function(){
  // wrap the computed getter;
  function wrapGet(get){
    return function(context){
      return get.call(context, context.data );
    }
  }
  // wrap the computed setter;
  function wrapSet(set){
    return function(context, value){
      set.call( context, value, context.data );
      return value;
    }
  }

  return function(computed){
    if(!computed) { return; }
    var parsedComputed = {}, handle, pair, type;
    for(var i in computed){
      handle = computed[i]
      type = typeof handle;

      if(handle.type === 'expression'){
        parsedComputed[i] = handle;
        continue;
      }
      if( type === "string" ){
        parsedComputed[i] = parse.expression(handle)
      }else{
        pair = parsedComputed[i] = {type: 'expression'};
        if(type === "function" ){
          pair.get = wrapGet(handle);
        }else{
          if(handle.get) { pair.get = wrapGet(handle.get); }
          if(handle.set) { pair.set = wrapSet(handle.set); }
        }
      } 
    }
    return parsedComputed;
  }
})();

/**
 * event directive  bundle
 *
 */
var _$11 = util;
var dom$2 = dom_1;
var Regular$2 = Regular_1;

Regular$2._addProtoInheritCache("event");

Regular$2.directive( /^on-\w+$/, function( elem, value, name , attrs) {
  if ( !name || !value ) { return; }
  var type = name.split("-")[1];
  return this._handleEvent( elem, type, value, attrs );
});
// TODO.
/**
- $('dx').delegate()
*/
Regular$2.directive( /^(delegate|de)-\w+$/, function( elem, value, name ) {
  var root = this.$root;
  var _delegates = root._delegates || ( root._delegates = {} );
  if ( !name || !value ) { return; }
  var type = name.split("-")[1];
  var fire = _$11.handleEvent.call(this, value, type);

  function delegateEvent(ev){
    matchParent(ev, _delegates[type], root.parentNode);
  }

  if( !_delegates[type] ){
    _delegates[type] = [];

    if(root.parentNode){
      dom$2.on(root.parentNode, type, delegateEvent);
    }else{
      root.$on( "$inject", function( node, position, preParent ){
        var newParent = this.parentNode;
        if( preParent ){
          dom$2.off(preParent, type, delegateEvent);
        }
        if(newParent) { dom$2.on(this.parentNode, type, delegateEvent); }
      })
    }
    root.$on("$destroy", function(){
      if(root.parentNode) { dom$2.off(root.parentNode, type, delegateEvent) }
      _delegates[type] = null;
    })
  }
  var delegate = {
    element: elem,
    fire: fire
  }
  _delegates[type].push( delegate );

  return function(){
    var delegates = _delegates[type];
    if(!delegates || !delegates.length) { return; }
    for( var i = 0, len = delegates.length; i < len; i++ ){
      if( delegates[i] === delegate ) { delegates.splice(i, 1); }
    }
  }

});


function matchParent(ev , delegates, stop){
  if(!stop) { return; }
  var target = ev.target, pair;
  while(target && target !== stop){
    for( var i = 0, len = delegates.length; i < len; i++ ){
      pair = delegates[i];
      if(pair && pair.element === target){
        pair.fire(ev)
      }
    }
    target = target.parentNode;
  }
}

// Regular
var _$12 = util;
var dom$3 = dom_1;
var Regular$3 = Regular_1;

var modelHandlers = {
  "text": initText,
  "select": initSelect,
  "checkbox": initCheckBox,
  "radio": initRadio
}


// @TODO


// two-way binding with r-model
// works on input, textarea, checkbox, radio, select

Regular$3.directive("r-model", function(elem, value){
  var tag = elem.tagName.toLowerCase();
  var sign = tag;
  if(sign === "input") { sign = elem.type || "text"; }
  else if(sign === "textarea") { sign = "text"; }
  if(typeof value === "string") { value = this.$expression(value); }

  if( modelHandlers[sign] ) { return modelHandlers[sign].call(this, elem, value); }
  else if(tag === "input"){
    return modelHandlers.text.call(this, elem, value);
  }
});



// binding <select>

function initSelect( elem, parsed){
  var self = this;
  var wc =this.$watch(parsed, function(newValue){
    var children = _$12.slice(elem.getElementsByTagName('option'))
    children.forEach(function(node, index){
      if(node.value == newValue){
        elem.selectedIndex = index;
      }
    })
  });

  function handler(){
    parsed.set(self, this.value);
    wc.last = this.value;
    self.$update();
  }

  dom$3.on(elem, "change", handler);
  
  if(parsed.get(self) === undefined && elem.value){
     parsed.set(self, elem.value);
  }
  return function destroy(){
    dom$3.off(elem, "change", handler);
  }
}

// input,textarea binding

function initText(elem, parsed){
  var self = this;
  var wc = this.$watch(parsed, function(newValue){
    if(elem.value !== newValue) { elem.value = newValue == null? "": "" + newValue; }
  });

  // @TODO to fixed event
  var handler = function (ev){
    var that = this;
    if(ev.type==='cut' || ev.type==='paste'){
      _$12.nextTick(function(){
        var value = that.value
        parsed.set(self, value);
        wc.last = value;
        self.$update();
      })
    }else{
        var value = that.value
        parsed.set(self, value);
        wc.last = value;
        self.$update();
    }
  };

  if(dom$3.msie !== 9 && "oninput" in dom$3.tNode ){
    elem.addEventListener("input", handler );
  }else{
    dom$3.on(elem, "paste", handler)
    dom$3.on(elem, "keyup", handler)
    dom$3.on(elem, "cut", handler)
    dom$3.on(elem, "change", handler)
  }
  if(parsed.get(self) === undefined && elem.value){
     parsed.set(self, elem.value);
  }
  return function (){
    if(dom$3.msie !== 9 && "oninput" in dom$3.tNode ){
      elem.removeEventListener("input", handler );
    }else{
      dom$3.off(elem, "paste", handler)
      dom$3.off(elem, "keyup", handler)
      dom$3.off(elem, "cut", handler)
      dom$3.off(elem, "change", handler)
    }
  }
}


// input:checkbox  binding

function initCheckBox(elem, parsed){
  var self = this;
  var watcher = this.$watch(parsed, function(newValue){
    dom$3.attr(elem, 'checked', !!newValue);
  });

  var handler = function handler(){
    var value = this.checked;
    parsed.set(self, value);
    watcher.last = value;
    self.$update();
  }
  if(parsed.set) { dom$3.on(elem, "change", handler) }

  if(parsed.get(self) === undefined){
    parsed.set(self, !!elem.checked);
  }

  return function destroy(){
    if(parsed.set) { dom$3.off(elem, "change", handler) }
  }
}


// input:radio binding

function initRadio(elem, parsed){
  var self = this;
  var wc = this.$watch(parsed, function( newValue ){
    if(newValue == elem.value) { elem.checked = true; }
    else { elem.checked = false; }
  });


  var handler = function handler(){
    var value = this.value;
    parsed.set(self, value);
    self.$update();
  }
  if(parsed.set) { dom$3.on(elem, "change", handler) }
  // beacuse only after compile(init), the dom structrue is exsit. 
  if(parsed.get(self) === undefined){
    if(elem.checked) {
      parsed.set(self, elem.value);
    }
  }

  return function destroy(){
    if(parsed.set) { dom$3.off(elem, "change", handler) }
  }
}

var base = createCommonjsModule(function (module) {
// Regular
var _ = util;
var dom = dom_1;
var animate = animate_1;
var Regular = Regular_1;
var consts = _const;
var namespaces = consts.NAMESPACE;








module.exports = {
// **warn**: class inteplation will override this directive 
  'r-class': function(elem, value){

    if(typeof value=== 'string'){
      value = _.fixObjStr(value)
    }
    var isNotHtml = elem.namespaceURI && elem.namespaceURI !== namespaces.html;
    this.$watch(value, function(nvalue){
      var className = isNotHtml? elem.getAttribute('class'): elem.className;
      className = ' '+ (className||'').replace(/\s+/g, ' ') +' ';
      for(var i in nvalue) { if(nvalue.hasOwnProperty(i)){
        className = className.replace(' ' + i + ' ',' ');
        if(nvalue[i] === true){
          className += i+' ';
        }
      } }
      className = className.trim();
      if(isNotHtml){
        dom.attr(elem, 'class', className)
      }else{
        elem.className = className
      }
    },true);
  },
  // **warn**: style inteplation will override this directive 
  'r-style': function(elem, value){
    if(typeof value=== 'string'){
      value = _.fixObjStr(value)
    }
    this.$watch(value, function(nvalue){
      for(var i in nvalue) { if(nvalue.hasOwnProperty(i)){
        dom.css(elem, i, nvalue[i]);
      } }
    },true);
  },
  // when expression is evaluate to true, the elem will add display:none
  // Example: <div r-hide={{items.length > 0}}></div>
  'r-hide': function(elem, value){
    var preBool = null, compelete;
    if( _.isExpr(value) || typeof value === "string"){
      this.$watch(value, function(nvalue){
        var bool = !!nvalue;
        if(bool === preBool) { return; } 
        preBool = bool;
        if(bool){
          if(elem.onleave){
            compelete = elem.onleave(function(){
              elem.style.display = "none"
              compelete = null;
            })
          }else{
            elem.style.display = "none"
          }
          
        }else{
          if(compelete) { compelete(); }
          elem.style.display = "";
          if(elem.onenter){
            elem.onenter();
          }
        }
      });
    }else if(!!value){
      elem.style.display = "none";
    }
  },
  'r-html': function(elem, value){
    this.$watch(value, function(nvalue){
      nvalue = nvalue || "";
      dom.html(elem, nvalue)
    }, {force: true});
  },
  'ref': {
    accept: consts.COMPONENT_TYPE + consts.ELEMENT_TYPE,
    link: function( elem, value ){
      var refs = this.$refs || (this.$refs = {});
      var cval;
      if(_.isExpr(value)){
        this.$watch(value, function(nval, oval){
          cval = nval;
          if(refs[oval] === elem) { refs[oval] = null; }
          if(cval) { refs[cval] = elem; }
        })
      }else{
        refs[cval = value] = elem;
      }
      return function(){
        refs[cval] = null;
      }
    }
  }
}

Regular.directive(module.exports);
});

var _$13 = util;
var animate$1 = animate_1;
var Regular$4 = Regular_1;


var rSpace = /\s+/;
var WHEN_COMMAND = "when";
var EVENT_COMMAND = "on";

/**
 * Animation Plugin
 * @param {Component} Component 
 */


function createSeed(type){

  var steps = [], current = 0, callback = _$13.noop;
  var key;

  var out = {
    type: type,
    start: function(cb){
      key = _$13.uid();
      if(typeof cb === "function") { callback = cb; }
      if(current> 0 ){
        current = 0 ;
      }else{
        out.step();
      }
      return out.compelete;
    },
    compelete: function(){
      key = null;
      callback && callback();
      callback = _$13.noop;
      current = 0;
    },
    step: function(){
      if(steps[current]) { steps[current ]( out.done.bind(out, key) ); }
    },
    done: function(pkey){
      if(pkey !== key) { return; } // means the loop is down
      if( current < steps.length - 1 ) {
        current++;
        out.step();
      }else{
        out.compelete();
      }
    },
    push: function(step){
      steps.push(step)
    }
  }

  return out;
}

Regular$4._addProtoInheritCache("animation")


// builtin animation
Regular$4.animation({
  "wait": function( step ){
    var timeout = parseInt( step.param ) || 0
    return function(done){
      // _.log("delay " + timeout)
      setTimeout( done, timeout );
    }
  },
  "class": function(step){
    var tmp = step.param.split(","),
      className = tmp[0] || "",
      mode = parseInt(tmp[1]) || 1;

    return function(done){
      // _.log(className)
      animate$1.startClassAnimate( step.element, className , done, mode );
    }
  },
  "call": function(step){
    var fn = this.$expression(step.param).get, self = this;
    return function(done){
      // _.log(step.param, 'call')
      fn(self);
      self.$update();
      done()
    }
  },
  "emit": function(step){
    var param = step.param;
    var tmp = param.split(","),
      evt = tmp[0] || "",
      args = tmp[1]? this.$expression(tmp[1]).get: null;

    if(!evt) { throw Error("you shoud specified a eventname in emit command"); }

    var self = this;
    return function(done){
      self.$emit(evt, args? args(self) : undefined);
      done();
    }
  },
  // style: left {10}px,
  style: function(step){
    var styles = {}, 
      param = step.param,
      pairs = param.split(","), valid;
    pairs.forEach(function(pair){
      pair = pair.trim();
      if(pair){
        var tmp = pair.split( rSpace ),
          name = tmp.shift(),
          value = tmp.join(" ");

        if( !name || !value ) { throw Error("invalid style in command: style"); }
        styles[name] = value;
        valid = true;
      }
    })

    return function(done){
      if(valid){
        animate$1.startStyleAnimate(step.element, styles, done);
      }else{
        done();
      }
    }
  }
})



// hancdle the r-animation directive
// el : the element to process
// value: the directive value
function processAnimate( element, value ){
  var this$1 = this;

  var Component = this.constructor;

  if(_$13.isExpr(value)){
    value = value.get(this);
  }

  value = value.trim();

  var composites = value.split(";"), 
    composite, context = this, seeds = [], seed, destroies = [], destroy,
    command, param , current = 0, tmp, animator, self = this;

  function reset( type ){
    seed && seeds.push( seed )
    seed = createSeed( type );
  }

  function whenCallback(start, value){
    if( !!value ) { start() }
  }

  function animationDestroy(element){
    return function(){
      element.onenter = null;
      element.onleave = null;
    } 
  }

  for( var i = 0, len = composites.length; i < len; i++ ){

    composite = composites[i];
    tmp = composite.split(":");
    command = tmp[0] && tmp[0].trim();
    param = tmp[1] && tmp[1].trim();

    if( !command ) { continue; }

    if( command === WHEN_COMMAND ){
      reset("when");
      this$1.$watch(param, whenCallback.bind( this$1, seed.start ) );
      continue;
    }

    if( command === EVENT_COMMAND){
      reset(param);
      if( param === "leave" ){
        element.onleave = seed.start;
        destroies.push( animationDestroy(element) );
      }else if( param === "enter" ){
        element.onenter = seed.start;
        destroies.push( animationDestroy(element) );
      }else{
        if( ("on" + param) in element){ // if dom have the event , we use dom event
          destroies.push(this$1._handleEvent( element, param, seed.start ));
        }else{ // otherwise, we use component event
          this$1.$on(param, seed.start);
          destroies.push(this$1.$off.bind(this$1, param, seed.start));
        }
      }
      continue;
    }

    var animator =  Component.animation(command) 
    if( animator && seed ){
      seed.push(
        animator.call(this$1,{
          element: element,
          done: seed.done,
          param: param 
        })
      )
    }else{
      throw Error( animator? "you should start with `on` or `event` in animation" : ("undefined animator 【" + command +"】" ));
    }
  }

  if(destroies.length){
    return function(){
      destroies.forEach(function(destroy){
        destroy();
      })
    }
  }
}


Regular$4.directive( "r-animation", processAnimate)
Regular$4.directive( "r-anim", processAnimate)

var Regular$5 = Regular_1;

/**
 * Timeout Module
 * @param {Component} Component 
 */
function TimeoutModule(Component){

  Component.implement({
    /**
     * just like setTimeout, but will enter digest automately
     * @param  {Function} fn    
     * @param  {Number}   delay 
     * @return {Number}   timeoutid
     */
    $timeout: function(fn, delay){
      delay = delay || 0;
      return setTimeout(function(){
        fn.call(this);
        this.$update(); //enter digest
      }.bind(this), delay);
    },
    /**
     * just like setInterval, but will enter digest automately
     * @param  {Function} fn    
     * @param  {Number}   interval 
     * @return {Number}   intervalid
     */
    $interval: function(fn, interval){
      interval = interval || 1000/60;
      return setInterval(function(){
        fn.call(this);
        this.$update(); //enter digest
      }.bind(this), interval);
    }
  });
}


Regular$5.plugin('timeout', TimeoutModule);
Regular$5.plugin('$timeout', TimeoutModule);

var index$1 = createCommonjsModule(function (module) {
var env$$1 =  env;
var config = config$1; 
var Regular = module.exports = Regular_1;
var Parser = Regular.Parser;
var Lexer = Regular.Lexer;

if(env$$1.browser){
    
    
    
    Regular.dom = dom_1;
}
Regular.env = env$$1;
Regular.util = util;
Regular.parse = function(str, options){
  options = options || {};

  if(options.BEGIN || options.END){
    if(options.BEGIN) { config.BEGIN = options.BEGIN; }
    if(options.END) { config.END = options.END; }
    Lexer.setup();
  }
  var ast = new Parser(str).parse();
  return !options.stringify? ast : JSON.stringify(ast);
}
});

var eventemitter2 = createCommonjsModule(function (module, exports) {
/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
!function(undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {
      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      this._events.maxListeners = conf.maxListeners !== undefined ? conf.maxListeners : defaultMaxListeners;
      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    } else {
      this._events.maxListeners = defaultMaxListeners;
    }
  }

  function logPossibleMemoryLeak(count) {
    console.error('(node) warning: possible EventEmitter memory ' +
      'leak detected. %d listeners added. ' +
      'Use emitter.setMaxListeners() to increase limit.',
      count);

    if (console.trace){
      console.trace();
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    configure.call(this, conf);
  }
  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {
    var this$1 = this;


    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name !== undefined) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else {
          if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners];
          }

          tree._listeners.push(listener);

          if (
            !tree._listeners.warned &&
            this$1._events.maxListeners > 0 &&
            tree._listeners.length > this$1._events.maxListeners
          ) {
            tree._listeners.warned = true;
            logPossibleMemoryLeak(tree._listeners.length);
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    if (n !== undefined) {
      this._events || init.call(this);
      this._events.maxListeners = n;
      if (!this._conf) { this._conf = {}; }
      this._conf.maxListeners = n;
    }
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      fn.apply(this, arguments);
    }

    listener._origin = fn;

    this.on(event, listener);

    return self;
  };

  EventEmitter.prototype.emit = function() {
    var arguments$1 = arguments;
    var this$1 = this;


    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) {
        return false;
      }
    }

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all && this._all.length) {
      handler = this._all.slice();
      if (al > 3) {
        args = new Array(al);
        for (j = 0; j < al; j++) { args[j] = arguments$1[j]; }
      }

      for (i = 0, l = handler.length; i < l; i++) {
        this$1.event = type;
        switch (al) {
        case 1:
          handler[i].call(this$1, type);
          break;
        case 2:
          handler[i].call(this$1, type, arguments$1[1]);
          break;
        case 3:
          handler[i].call(this$1, type, arguments$1[1], arguments$1[2]);
          break;
        default:
          handler[i].apply(this$1, args);
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) { args[j - 1] = arguments$1[j]; }
          handler.apply(this, args);
        }
        return true;
      } else if (handler) {
        // need to make copy of handlers because list can change in the middle
        // of emit call
        handler = handler.slice();
      }
    }

    if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) { args[j - 1] = arguments$1[j]; }
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this$1.event = type;
        switch (al) {
        case 1:
          handler[i].call(this$1);
          break;
        case 2:
          handler[i].call(this$1, arguments$1[1]);
          break;
        case 3:
          handler[i].call(this$1, arguments$1[1], arguments$1[2]);
          break;
        default:
          handler[i].apply(this$1, args);
        }
      }
      return true;
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }

    return !!this._all;
  };

  EventEmitter.prototype.emitAsync = function() {
    var arguments$1 = arguments;
    var this$1 = this;


    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
        if (!this._events.newListener) { return Promise.resolve([false]); }
    }

    var promises= [];

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all) {
      if (al > 3) {
        args = new Array(al);
        for (j = 1; j < al; j++) { args[j] = arguments$1[j]; }
      }
      for (i = 0, l = this._all.length; i < l; i++) {
        this$1.event = type;
        switch (al) {
        case 1:
          promises.push(this$1._all[i].call(this$1, type));
          break;
        case 2:
          promises.push(this$1._all[i].call(this$1, type, arguments$1[1]));
          break;
        case 3:
          promises.push(this$1._all[i].call(this$1, type, arguments$1[1], arguments$1[2]));
          break;
        default:
          promises.push(this$1._all[i].apply(this$1, args));
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      switch (al) {
      case 1:
        promises.push(handler.call(this));
        break;
      case 2:
        promises.push(handler.call(this, arguments[1]));
        break;
      case 3:
        promises.push(handler.call(this, arguments[1], arguments[2]));
        break;
      default:
        args = new Array(al - 1);
        for (j = 1; j < al; j++) { args[j - 1] = arguments$1[j]; }
        promises.push(handler.apply(this, args));
      }
    } else if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) { args[j - 1] = arguments$1[j]; }
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this$1.event = type;
        switch (al) {
        case 1:
          promises.push(handler[i].call(this$1));
          break;
        case 2:
          promises.push(handler[i].call(this$1, arguments$1[1]));
          break;
        case 3:
          promises.push(handler[i].call(this$1, arguments$1[1], arguments$1[2]));
          break;
        default:
          promises.push(handler[i].apply(this$1, args));
        }
      }
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        return Promise.reject(arguments[1]); // Unhandled 'error' event
      } else {
        return Promise.reject("Uncaught, unspecified 'error' event.");
      }
    }

    return Promise.all(promises);
  };

  EventEmitter.prototype.on = function(type, listener) {
    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if (this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]];
      }

      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (
        !this._events[type].warned &&
        this._events.maxListeners > 0 &&
        this._events[type].length > this._events.maxListeners
      ) {
        this._events[type].warned = true;
        logPossibleMemoryLeak(this._events[type].length);
      }
    }

    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {
    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if (!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    var this$1 = this;

    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) { return this; }
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this$1.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this$1._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this$1.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this$1._events[type];
          }
        }

        this$1.emit("removeListener", type, listener);

        return this$1;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this$1.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this$1._events[type];
        }

        this$1.emit("removeListener", type, listener);
      }
    }

    function recursivelyGarbageCollect(root) {
      if (root === undefined) {
        return;
      }
      var keys = Object.keys(root);
      for (var i in keys) {
        var key = keys[i];
        var obj = root[key];
        if ((obj instanceof Function) || (typeof obj !== "object") || (obj === null))
          { continue; }
        if (Object.keys(obj).length > 0) {
          recursivelyGarbageCollect(root[key]);
        }
        if (Object.keys(obj).length === 0) {
          delete root[key];
        }
      }
    }
    recursivelyGarbageCollect(this.listenerTree);

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var this$1 = this;

    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          this$1.emit("removeListenerAny", fn);
          return this$1;
        }
      }
    } else {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++)
        { this$1.emit("removeListenerAny", fns[i]); }
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else if (this._events) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if (this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) { this._events[type] = []; }
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenerCount = function(type) {
    return this.listeners(type).length;
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (typeof define === 'function' && define.amd) {
     // AMD. Register as an anonymous module.
    define(function() {
      return EventEmitter;
    });
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = EventEmitter;
  }
  else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();
});

var ALWAYS_NOTIFY_KEY = '_(:з」∠)_';

var Store = function Store() {
	this._models = {};
	this._modelArray = [];
	this._state = {};
	this._subscribers = {};
	this._subscribers[ ALWAYS_NOTIFY_KEY ] = [];
};
Store.prototype.replaceState = function replaceState ( nextState ) {
	var models = this._models;
	this._state = nextState;
	for ( var i in nextState ) {
		if ( typeof models[ i ] !== 'undefined' ) {
			models[ i ].replaceState( nextState[ i ] );
		}
	}
	this.notifyViews();
};
Store.prototype.getState = function getState () {
	return this._state;
};
Store.prototype.registerModel = function registerModel ( name, model ) {
		var this$1 = this;

	this._models[ name ] = model;
	this._modelArray.push( model );
	this._state[ name ] = model.state;

	// auto subscribe model changes when added
	model.subscribe( function ( type, payload ) {
		this$1.notify( name, type, payload );
	} );
};
Store.prototype.registerActions = function registerActions ( actions ) {
	if( this._actions ) {
		return console.error( 'actions already registered' );
	}
	this._actions = actions;
};
Store.prototype._commit = function _commit ( type, payload ) {
	var parts = type.split( '/' );
	var name = parts[0];
		var truetype = parts[1];

	var model = this._models[ name ];
	if( model ) {
		return model.commit( truetype, payload );
	}
};
Store.prototype.dispatch = function dispatch ( type, payload ) {
	if ( !this._actions[ type ] ) {
		return console.error( ("action \"" + type + "\" is not found") );
	}
	return this._actions[ type ]( {
		commit: this._commit.bind( this ),
		dispatch: this.dispatch.bind( this )
	}, payload );
};
Store.prototype.notify = function notify ( name, type, payload ) {
		var this$1 = this;

	var cbs = ( this._subscribers[ name ] || [] ).concat( this._subscribers[ ALWAYS_NOTIFY_KEY ] );
	var state = this._state;
	for ( var i = 0, len = cbs.length; i < len; i++ ) {
		var cb = cbs[ i ];
		cb( { type: (name + "/" + type), payload: payload }, this$1._state );
	}
};
Store.prototype.notifyViews = function notifyViews () {
		var this$1 = this;

	var cbs = [];
	for ( var i in this._subscribers ) {
		cbs = cbs.concat( this$1._subscribers[ i ] );
	}
	var state = this._state;
	for ( var i$1 = 0, len = cbs.length; i$1 < len; i$1++ ) {
		var cb = cbs[ i$1 ];
		if ( cb._isFromView ) {
			cb();
		}
	}
};
Store.prototype.subscribe = function subscribe ( fn, names ) {
		var this$1 = this;

	if ( !names ) {
		this._subscribers[ ALWAYS_NOTIFY_KEY ].push( fn );
		return;
	}

	for ( var i = 0, len = names.length; i < len; i++ ) {
		var name = names[ i ];
		this$1._subscribers[ name ] = this$1._subscribers[ name ] || [];
		this$1._subscribers[ name ].push( fn );
	}
};
Store.prototype.toArray = function toArray () {
	return this._modelArray;
};

var Model = function Model( ref ) {
	if ( ref === void 0 ) ref = {};
	var state = ref.state; if ( state === void 0 ) state = {};
	var reducers = ref.reducers; if ( reducers === void 0 ) reducers = {};

	this._state = state;
	this._reducers = reducers;
	this._subscribers = [];
	this._committing = false;
};

var prototypeAccessors = { state: {} };
prototypeAccessors.state.get = function () {
	return this._state;
};
prototypeAccessors.state.set = function ( v ) {
	throw new Error( 'cannot replace state directly' );
};
Model.prototype.replaceState = function replaceState ( nextState ) {
	this._state = nextState;
};
Model.prototype.watch = function watch () {

};
Model.prototype.subscribe = function subscribe ( fn ) {
	this._subscribers.push( fn );
};
Model.prototype.commit = function commit ( type, payload ) {
		var this$1 = this;

	if( this._committing ) {
		return;
	}

	// invalid action
	if( typeof type !== 'string' ) {
		return;
	}

	var reducers = this._reducers;
	var state = this._state;

	for ( var i in reducers ) {
		if( type === i ) {
			var reducer = reducers[ i ];
			this$1._committing = true;
			reducer( state, payload );
			this$1._committing = false;
			// notify subscribers
			this$1.notify( type, payload );
			break;
		}
	}
};
Model.prototype.notify = function notify ( type, payload ) {
	var subscribers = this._subscribers;
	for ( var i = 0, len = subscribers.length; i < len; i++ ) {
		subscribers[ i ]( type, payload );
	}
};

Object.defineProperties( Model.prototype, prototypeAccessors );

var PulginManager = function PulginManager( app ) {
	this._app = app;
};
PulginManager.prototype.register = function register ( plugin ) {
		var this$1 = this;

	this._app.once( 'before-start', function () {
		this$1.use( plugin );
	} );
};
PulginManager.prototype.use = function use ( plugin ) {
	var store = this._app._store;
	plugin( store );
};

var ViewManager = function ViewManager( app ) {
	var store = app._store;
	var Base = app._Base;
	Base.implement( {
		events: {
			$config: function $config() {
				var this$1 = this;

				// auto-subscribe
				var models = this.models;

				var update = function () {
					this$1.$update();
				};
				update._isFromView = true;

				store.subscribe( update, models );
			}
		},
		dispatch: function dispatch() {
			var args = [], len = arguments.length;
			while ( len-- ) args[ len ] = arguments[ len ];

			return store.dispatch.apply( store, args );
		}
	} );
};

var regularRouter = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.regularRouter = factory());
}(commonjsGlobal, (function () { 'use strict';

function createCommonjsModule$$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var util = createCommonjsModule$$1(function (module) {
var _ = module.exports = {};
var slice = [].slice, o2str = ({}).toString;


// merge o2's properties to Object o1. 
_.extend = function(o1, o2, override){
  for(var i in o2) { if(override || o1[i] === undefined){
    o1[i] = o2[i]
  } }
  return o1;
}



_.slice = function(arr, index){
  return slice.call(arr, index);
}

_.typeOf = function typeOf (o) {
  return o == null ? String(o) : o2str.call(o).slice(8, -1).toLowerCase();
}

//strict eql
_.eql = function(o1, o2){
  var t1 = _.typeOf(o1), t2 = _.typeOf(o2);
  if( t1 !== t2) { return false; }
  if(t1 === 'object'){
    var equal = true;
    // only check the first's propertie
    for(var i in o1){
      if( o1[i] !== o2[i] ) { equal = false; }
    }
    return equal;
  }
  return o1 === o2;
}


// small emitter 
_.emitable = (function(){
  function norm(ev){
    var eventAndNamespace = (ev||'').split(':');
    return {event: eventAndNamespace[0], namespace: eventAndNamespace[1]}
  }
  var API = {
    once: function(event, fn){
      var callback = function(){
        fn.apply(this, arguments)
        this.off(event, callback)
      }
      return this.on(event, callback)
    },
    on: function(event, fn) {
      var this$1 = this;

      if(typeof event === 'object'){
        for (var i in event) {
          this$1.on(i, event[i]);
        }
        return this;
      }
      var ne = norm(event);
      event=ne.event;
      if(event && typeof fn === 'function' ){
        var handles = this._handles || (this._handles = {}),
          calls = handles[event] || (handles[event] = []);
        fn._ns = ne.namespace;
        calls.push(fn);
      }
      return this;
    },
    off: function(event, fn) {
      var this$1 = this;

      var ne = norm(event); event = ne.event;
      if(!event || !this._handles) { this._handles = {}; }

      var handles = this._handles , calls;

      if (calls = handles[event]) {
        if (!fn && !ne.namespace) {
          handles[event] = [];
        }else{
          for (var i = 0, len = calls.length; i < len; i++) {
            if ( (!fn || fn === calls[i]) && (!ne.namespace || calls[i]._ns === ne.namespace) ) {
              calls.splice(i, 1);
              return this$1;
            }
          }
        }
      }
      return this;
    },
    emit: function(event){
      var this$1 = this;

      var ne = norm(event); event = ne.event;

      var args = _.slice(arguments, 1),
        handles = this._handles, calls;

      if (!handles || !(calls = handles[event])) { return this; }
      for (var i = 0, len = calls.length; i < len; i++) {
        var fn = calls[i];
        if( !ne.namespace || fn._ns === ne.namespace ) { fn.apply(this$1, args) }
      }
      return this;
    }
  }
  return function(obj){
      obj = typeof obj == "function" ? obj.prototype : obj;
      return _.extend(obj, API)
  }
})();



_.bind = function(fn, context){
  return function(){
    return fn.apply(context, arguments);
  }
}

var rDbSlash = /\/+/g, // double slash
  rEndSlash = /\/$/;    // end slash

_.cleanPath = function (path){
  return ("/" + path).replace( rDbSlash,"/" ).replace( rEndSlash, "" ) || "/";
}

// normalize the path
function normalizePath(path) {
  // means is from 
  // (?:\:([\w-]+))?(?:\(([^\/]+?)\))|(\*{2,})|(\*(?!\*)))/g
  var preIndex = 0;
  var keys = [];
  var index = 0;
  var matches = "";

  path = _.cleanPath(path);

  var regStr = path
    //  :id(capture)? | (capture)   |  ** | * 
    .replace(/\:([\w-]+)(?:\(([^\/]+?)\))?|(?:\(([^\/]+)\))|(\*{2,})|(\*(?!\*))/g, 
      function(all, key, keyformat, capture, mwild, swild, startAt) {
        // move the uncaptured fragment in the path
        if(startAt > preIndex) { matches += path.slice(preIndex, startAt); }
        preIndex = startAt + all.length;
        if( key ){
          matches += "(" + key + ")";
          keys.push(key)
          return "("+( keyformat || "[\\w-]+")+")";
        }
        matches += "(" + index + ")";

        keys.push( index++ );

        if( capture ){
           // sub capture detect
          return "(" + capture +  ")";
        } 
        if(mwild) { return "(.*)"; }
        if(swild) { return "([^\\/]*)"; }
    })

  if(preIndex !== path.length) { matches += path.slice(preIndex) }

  return {
    regexp: new RegExp("^" + regStr +"/?$"),
    keys: keys,
    matches: matches || path
  }
}

_.log = function(msg, type){
  typeof console !== "undefined" && console[type || "log"](msg)
}

_.isPromise = function( obj ){

  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';

}



_.normalize = normalizePath;
});

var _$1 = util;



function State$1(option){
  this._states = {};
  this._pending = false;
  this.visited = false;
  if(option) { this.config(option); }
}


//regexp cache
State$1.rCache = {};

_$1.extend( _$1.emitable( State$1 ), {
  
  state: function(stateName, config){
    var this$1 = this;

    if(_$1.typeOf(stateName) === "object"){
      for(var i in stateName){
        this$1.state(i, stateName[i])
      }
      return this;
    }
    var current, next, nextName, states = this._states, i=0;

    if( typeof stateName === "string" ) { stateName = stateName.split("."); }

    var slen = stateName.length, current = this;
    var stack = [];


    do{
      nextName = stateName[i];
      next = states[nextName];
      stack.push(nextName);
      if(!next){
        if(!config) { return; }
        next = states[nextName] = new State$1();
        _$1.extend(next, {
          parent: current,
          manager: current.manager || current,
          name: stack.join("."),
          currentName: nextName
        })
        current.hasNext = true;
        next.configUrl();
      }
      current = next;
      states = next._states;
    }while((++i) < slen )

    if(config){
       next.config(config);
       return this;
    } else {
      return current;
    }
  },

  config: function(configure){
    var this$1 = this;


    configure = this._getConfig(configure);

    for(var i in configure){
      var prop = configure[i];
      switch(i){
        case "url": 
          if(typeof prop === "string"){
            this$1.url = prop;
            this$1.configUrl();
          }
          break;
        case "events": 
          this$1.on(prop)
          break;
        default:
          this$1[i] = prop;
      }
    }
  },

  // children override
  _getConfig: function(configure){
    return typeof configure === "function"? {enter: configure} : configure;
  },

  //from url 

  configUrl: function(){
    var url = "" , base = this, currentUrl;
    var _watchedParam = [];

    while( base ){

      url = (typeof base.url === "string" ? base.url: (base.currentName || "")) + "/" + url;

      // means absolute;
      if(url.indexOf("^/") === 0) {
        url = url.slice(1);
        break;
      }
      base = base.parent;
    }
    this.pattern = _$1.cleanPath("/" + url);
    var pathAndQuery = this.pattern.split("?");
    this.pattern = pathAndQuery[0];
    // some Query we need watched

    _$1.extend(this, _$1.normalize(this.pattern), true);
  },
  encode: function(param){
    var state = this;
    param = param || {};
    
    var matched = "%";

    var url = state.matches.replace(/\(([\w-]+)\)/g, function(all, capture){
      var sec = param[capture] || "";
      matched+= capture + "%";
      return sec;
    }) + "?";

    // remained is the query, we need concat them after url as query
    for(var i in param) {
      if( matched.indexOf("%"+i+"%") === -1) { url += i + "=" + param[i] + "&"; }
    }
    return _$1.cleanPath( url.replace(/(?:\?|&)$/,"") )
  },
  decode: function( path ){
    var matched = this.regexp.exec(path),
      keys = this.keys;

    if(matched){

      var param = {};
      for(var i =0,len=keys.length;i<len;i++){
        param[keys[i]] = matched[i+1] 
      }
      return param;
    }else{
      return false;
    }
  },
  // by default, all lifecycle is permitted

  async: function(){
    throw new Error( 'please use option.async instead')
  }

})


var state = State$1;

var browser$1 = createCommonjsModule$$1(function (module) {
var win = window, 
  doc = document;

var b = module.exports = {
  hash: "onhashchange" in win && (!doc.documentMode || doc.documentMode > 7),
  history: win.history && "onpopstate" in win,
  location: win.location,
  getHref: function(node){
    return "href" in node ? node.getAttribute("href", 2) : node.getAttribute("href");
  },
  on: "addEventListener" in win ?  // IE10 attachEvent is not working when binding the onpopstate, so we need check addEventLister first
      function(node,type,cb){return node.addEventListener( type, cb )}
    : function(node,type,cb){return node.attachEvent( "on" + type, cb )},
    
  off: "removeEventListener" in win ? 
      function(node,type,cb){return node.removeEventListener( type, cb )}
    : function(node,type,cb){return node.detachEvent( "on" + type, cb )}
}
});

// MIT
// Thx Backbone.js 1.1.2  and https://github.com/cowboy/jquery-hashchange/blob/master/jquery.ba-hashchange.js
// for iframe patches in old ie.

var browser = browser$1;
var _$2 = util;


// the mode const
var QUIRK = 3;
var HASH = 1;
var HISTORY = 2;



// extract History for test
// resolve the conficlt with the Native History
function Histery$1(options){
  options = options || {};

  // Trick from backbone.history for anchor-faked testcase 
  this.location = options.location || browser.location;

  // mode config, you can pass absolute mode (just for test);
  this.html5 = options.html5;
  this.mode = options.html5 && browser.history ? HISTORY: HASH; 
  if( !browser.hash ) { this.mode = QUIRK; }
  if(options.mode) { this.mode = options.mode; }

  // hash prefix , used for hash or quirk mode
  this.prefix = "#" + (options.prefix || "") ;
  this.rPrefix = new RegExp(this.prefix + '(.*)$');
  this.interval = options.interval || 66;

  // the root regexp for remove the root for the path. used in History mode
  this.root = options.root ||  "/" ;
  this.rRoot = new RegExp("^" +  this.root);

  this._fixInitState();

  this.autolink = options.autolink!==false;

  this.curPath = undefined;
}

_$2.extend( _$2.emitable(Histery$1), {
  // check the 
  start: function(){
    var path = this.getPath();
    this._checkPath = _$2.bind(this.checkPath, this);

    if( this.isStart ) { return; }
    this.isStart = true;

    if(this.mode === QUIRK){
      this._fixHashProbelm(path); 
    }

    switch ( this.mode ){
      case HASH: 
        browser.on(window, "hashchange", this._checkPath); 
        break;
      case HISTORY:
        browser.on(window, "popstate", this._checkPath);
        break;
      case QUIRK:
        this._checkLoop();
    }
    // event delegate
    this.autolink && this._autolink();

    this.curPath = path;

    this.emit("change", path);
  },
  // the history teardown
  stop: function(){

    browser.off(window, 'hashchange', this._checkPath)  
    browser.off(window, 'popstate', this._checkPath)  
    clearTimeout(this.tid);
    this.isStart = false;
    this._checkPath = null;
  },
  // get the path modify
  checkPath: function(ev){

    var path = this.getPath(), curPath = this.curPath;

    //for oldIE hash history issue
    if(path === curPath && this.iframe){
      path = this.getPath(this.iframe.location);
    }

    if( path !== curPath ) {
      this.iframe && this.nav(path, {silent: true});
      this.curPath = path;
      this.emit('change', path);
    }
  },
  // get the current path
  getPath: function(location){
    var location = location || this.location, tmp;
    if( this.mode !== HISTORY ){
      tmp = location.href.match(this.rPrefix);
      return tmp && tmp[1]? tmp[1]: "";

    }else{
      return _$2.cleanPath(( location.pathname + location.search || "" ).replace( this.rRoot, "/" ))
    }
  },

  nav: function(to, options ){

    var iframe = this.iframe;

    options = options || {};

    to = _$2.cleanPath(to);

    if(this.curPath == to) { return; }

    // pushState wont trigger the checkPath
    // but hashchange will
    // so we need set curPath before to forbit the CheckPath
    this.curPath = to;

    // 3 or 1 is matched
    if( this.mode !== HISTORY ){
      this._setHash(this.location, to, options.replace)
      if( iframe && this.getPath(iframe.location) !== to ){
        if(!options.replace) { iframe.document.open().close(); }
        this._setHash(this.iframe.location, to, options.replace)
      }
    }else{
      history[options.replace? 'replaceState': 'pushState']( {}, options.title || "" , _$2.cleanPath( this.root + to ) )
    }

    if( !options.silent ) { this.emit('change', to); }
  },
  _autolink: function(){
    if(this.mode!==HISTORY) { return; }
    // only in html5 mode, the autolink is works
    // if(this.mode !== 2) return;
    var prefix = this.prefix, self = this;
    browser.on( document.body, "click", function(ev){

      var target = ev.target || ev.srcElement;
      if( target.tagName.toLowerCase() !== "a" ) { return; }
      var tmp = (browser.getHref(target)||"").match(self.rPrefix);
      var hash = tmp && tmp[1]? tmp[1]: "";

      if(!hash) { return; }
      
      ev.preventDefault && ev.preventDefault();
      self.nav( hash )
      return (ev.returnValue = false);
    } )
  },
  _setHash: function(location, path, replace){
    var href = location.href.replace(/(javascript:|#).*$/, '');
    if (replace){
      location.replace(href + this.prefix+ path);
    }
    else { location.hash = this.prefix+ path; }
  },
  // for browser that not support onhashchange
  _checkLoop: function(){
    var self = this; 
    this.tid = setTimeout( function(){
      self._checkPath();
      self._checkLoop();
    }, this.interval );
  },
  // if we use real url in hash env( browser no history popstate support)
  // or we use hash in html5supoort mode (when paste url in other url)
  // then , histery should repara it
  _fixInitState: function(){
    var pathname = _$2.cleanPath(this.location.pathname), hash, hashInPathName;

    // dont support history popstate but config the html5 mode
    if( this.mode !== HISTORY && this.html5){

      hashInPathName = pathname.replace(this.rRoot, "")
      if(hashInPathName) { this.location.replace(this.root + this.prefix + hashInPathName); }

    }else if( this.mode === HISTORY /* && pathname === this.root*/){

      hash = this.location.hash.replace(this.prefix, "");
      if(hash) { history.replaceState({}, document.title, _$2.cleanPath(this.root + hash)) }

    }
  },
  // Thanks for backbone.history and https://github.com/cowboy/jquery-hashchange/blob/master/jquery.ba-hashchange.js
  // for helping stateman fixing the oldie hash history issues when with iframe hack
  _fixHashProbelm: function(path){
    var iframe = document.createElement('iframe'), body = document.body;
    iframe.src = 'javascript:;';
    iframe.style.display = 'none';
    iframe.tabIndex = -1;
    iframe.title = "";
    this.iframe = body.insertBefore(iframe, body.firstChild).contentWindow;
    this.iframe.document.open().close();
    this.iframe.location.hash = '#' + path;
  }
  
})





var histery = Histery$1;

var State = state;
var Histery = histery;
var _ = util;
var baseTitle = document.title;
var stateFn = State.prototype.state;


function StateMan$1(options){

  if(this instanceof StateMan$1 === false){ return new StateMan$1(options)}
  options = options || {};
  // if(options.history) this.history = options.history;

  this._states = {};
  this._stashCallback = [];
  this.strict = options.strict;
  this.current = this.active = this;
  this.title = options.title;
  this.on("end", function(){
    var cur = this.current,title;
    while( cur ){
      title = cur.title;
      if(title) { break; } 
      cur = cur.parent;
    }
    document.title = typeof title === "function"? cur.title(): String( title || baseTitle ) ;
  })

}


_.extend( _.emitable( StateMan$1 ), {
    // keep blank
    name: '',

    state: function(stateName, config){

      var active = this.active;
      if(typeof stateName === "string" && active){
         stateName = stateName.replace("~", active.name)
         if(active.parent) { stateName = stateName.replace("^", active.parent.name || ""); }
      }
      // ^ represent current.parent
      // ~ represent  current
      // only 
      return stateFn.apply(this, arguments);

    },
    start: function(options){

      if( !this.history ) { this.history = new Histery(options); } 
      if( !this.history.isStart ){
        this.history.on("change", _.bind(this._afterPathChange, this));
        this.history.start();
      } 
      return this;

    },
    stop: function(){
      this.history.stop();
    },
    // @TODO direct go the point state
    go: function(state$$1, option, callback){
      option = option || {};
      if(typeof state$$1 === "string") { state$$1 = this.state(state$$1); }

      if(!state$$1) { return; }

      if(typeof option === "function"){
        callback = option;
        option = {};
      }

      if(option.encode !== false){
        var url = state$$1.encode(option.param)
        option.path = url;
        this.nav(url, {silent: true, replace: option.replace});
      }

      this._go(state$$1, option, callback);

      return this;
    },
    nav: function(url, options, callback){
      if(typeof options === "function"){
        callback = options;
        options = {};
      }
      options = options || {};

      options.path = url;

      this.history.nav( url, _.extend({silent: true}, options));
      if(!options.silent) { this._afterPathChange( _.cleanPath(url) , options , callback) }

      return this;
    },
    decode: function(path){

      var pathAndQuery = path.split("?");
      var query = this._findQuery(pathAndQuery[1]);
      path = pathAndQuery[0];
      var state$$1 = this._findState(this, path);
      if(state$$1) { _.extend(state$$1.param, query); }
      return state$$1;

    },
    encode: function(stateName, param){
      var state$$1 = this.state(stateName);
      return state$$1? state$$1.encode(param) : '';
    },
    // notify specify state
    // check the active statename whether to match the passed condition (stateName and param)
    is: function(stateName, param, isStrict){
      if(!stateName) { return false; }
      var stateName = (stateName.name || stateName);
      var current = this.current, currentName = current.name;
      var matchPath = isStrict? currentName === stateName : (currentName + ".").indexOf(stateName + ".")===0;
      return matchPath && (!param || _.eql(param, this.param)); 
    },
    // after pathchange changed
    // @TODO: afterPathChange need based on decode
    _afterPathChange: function(path, options ,callback){

      this.emit("history:change", path);

      var found = this.decode(path);

      options = options || {};

      options.path = path;

      if(!found){
        // loc.nav("$default", {silent: true})
        return this._notfound(options);
      }

      options.param = found.param;

      this._go( found, options, callback );
    },
    _notfound: function(options){

      // var $notfound = this.state("$notfound");

      // if( $notfound ) this._go($notfound, options);

      return this.emit("notfound", options);
    },
    // goto the state with some option
    _go: function(state$$1, option, callback){

      var over;

      // if(typeof state === "string") state = this.state(state);

      // if(!state) return _.log("destination is not defined")

      if(state$$1.hasNext && this.strict) { return this._notfound({name: state$$1.name}); }

      // not touch the end in previous transtion

      // if( this.pending ){
      //   var pendingCurrent = this.pending.current;
      //   this.pending.stop();
      //   _.log("naving to [" + pendingCurrent.name + "] will be stoped, trying to ["+state.name+"] now");
      // }
      // if(this.active !== this.current){
      //   // we need return
      //   _.log("naving to [" + this.current.name + "] will be stoped, trying to ["+state.name+"] now");
      //   this.current = this.active;
      //   // back to before
      // }
      option.param = option.param || {};

      var current = this.current,
        baseState = this._findBase(current, state$$1),
        prepath = this.path,
        self = this;


      if( typeof callback === "function" ) { this._stashCallback.push(callback); }
      // if we done the navigating when start
      function done(success){
        over = true;
        if( success !== false ) { self.emit("end"); }
        self.pending = null;
        self._popStash(option);
      }
      
      option.previous = current;
      option.current = state$$1;

      if(current !== state$$1){
        option.stop = function(){
          done(false);
          self.nav( prepath? prepath: "/", {silent:true});
        }
        self.emit("begin", option);

      }
      // if we stop it in 'begin' listener
      if(over === true) { return; }

      if(current !== state$$1){
        // option as transition object.

        option.phase = 'permission';
        this._walk(current, state$$1, option, true , _.bind( function( notRejected ){

          if( notRejected===false ){
            // if reject in callForPermission, we will return to old 
            prepath && this.nav( prepath, {silent: true})

            done(false, 2)

            return this.emit('abort', option);

          } 

          // stop previous pending.
          if(this.pending) { this.pending.stop() } 
          this.pending = option;
          this.path = option.path;
          this.current = option.current;
          this.param = option.param;
          this.previous = option.previous;
          option.phase = 'navigation';
          this._walk(current, state$$1, option, false, _.bind(function( notRejected ){

            if( notRejected === false ){
              this.current = this.active;
              done(false)
              return this.emit('abort', option);
            }


            this.active = option.current;

            option.phase = 'completion';
            return done()

          }, this) )

        }, this) )

      }else{
        self._checkQueryAndParam(baseState, option);
        this.pending = null;
        done();
      }
      
    },
    _popStash: function(option){
      var this$1 = this;


      var stash = this._stashCallback, len = stash.length;

      this._stashCallback = [];

      if(!len) { return; }

      for(var i = 0; i < len; i++){
        stash[i].call(this$1, option)
      }
    },

    // the transition logic  Used in Both canLeave canEnter && leave enter LifeCycle

    _walk: function(from, to, option, callForPermit , callback){

      // nothing -> app.state
      var parent = this._findBase(from , to);


      option.basckward = true;
      this._transit( from, parent, option, callForPermit , _.bind( function( notRejected ){

        if( notRejected === false ) { return callback( notRejected ); }

        // only actual transiton need update base state;
        if( !callForPermit )  { this._checkQueryAndParam(parent, option) }

        option.basckward = false;
        this._transit( parent, to, option, callForPermit,  callback)

      }, this) )

    },

    _transit: function(from, to, option, callForPermit, callback){
      //  touch the ending
      if( from === to ) { return callback(); }

      var back = from.name.length > to.name.length;
      var method = back? 'leave': 'enter';
      var applied;

      // use canEnter to detect permission
      if( callForPermit) { method = 'can' + method.replace(/^\w/, function(a){ return a.toUpperCase() }); }

      var loop = _.bind(function( notRejected ){


        // stop transition or touch the end
        if( applied === to || notRejected === false ) { return callback(notRejected); }

        if( !applied ) {

          applied = back? from : this._computeNext(from, to);

        }else{

          applied = this._computeNext(applied, to);
        }

        if( (back && applied === to) || !applied ){ return callback( notRejected ) }

        this._moveOn( applied, method, option, loop );

      }, this);

      loop();
    },

    _moveOn: function( applied, method, option, callback){

      var isDone = false;
      var isPending = false;

      option.async = function(){

        isPending = true;

        return done;
      }

      function done( notRejected ){
        if( isDone ) { return; }
        isPending = false;
        isDone = true;
        callback( notRejected );
      }

      

      option.stop = function(){
        done( false );
      }


      this.active = applied;
      var retValue = applied[method]? applied[method]( option ): true;

      if(method === 'enter') { applied.visited = true; }
      // promise
      // need breadk , if we call option.stop first;

      if( _.isPromise(retValue) ){

        return this._wrapPromise(retValue, done); 

      }

      // if haven't call option.async yet
      if( !isPending ) { done( retValue ) }

    },


    _wrapPromise: function( promise, next ){

      return promise.then( next, function(){next(false)}) ;

    },

    _computeNext: function( from, to ){

      var fname = from.name;
      var tname = to.name;

      var tsplit = tname.split('.')
      var fsplit = fname.split('.')

      var tlen = tsplit.length;
      var flen = fsplit.length;

      if(fname === '') { flen = 0; }
      if(tname === '') { tlen = 0; }

      if( flen < tlen ){
        fsplit[flen] = tsplit[flen];
      }else{
        fsplit.pop();
      }

      return this.state(fsplit.join('.'))

    },

    _findQuery: function(querystr){

      var queries = querystr && querystr.split("&"), query= {};
      if(queries){
        var len = queries.length;
        var query = {};
        for(var i =0; i< len; i++){
          var tmp = queries[i].split("=");
          query[tmp[0]] = tmp[1];
        }
      }
      return query;

    },
    _findState: function(state$$1, path){
      var this$1 = this;

      var states = state$$1._states, found, param;

      // leaf-state has the high priority upon branch-state
      if(state$$1.hasNext){
        for(var i in states) { if(states.hasOwnProperty(i)){
          found = this$1._findState( states[i], path );
          if( found ) { return found; }
        } }
      }
      // in strict mode only leaf can be touched
      // if all children is don. will try it self
      param = state$$1.regexp && state$$1.decode(path);
      if(param){
        state$$1.param = param;
        return state$$1;
      }else{
        return false;
      }
    },
    // find the same branch;
    _findBase: function(now, before){

      if(!now || !before || now == this || before == this) { return this; }
      var np = now, bp = before, tmp;
      while(np && bp){
        tmp = bp;
        while(tmp){
          if(np === tmp) { return tmp; }
          tmp = tmp.parent;
        }
        np = np.parent;
      }
    },
    // check the query and Param
    _checkQueryAndParam: function(baseState, options){

      var from = baseState;
      while( from !== this ){
        from.update && from.update(options);
        from = from.parent;
      }

    }

}, true)



var stateman = StateMan$1;

var StateMan = stateman;
StateMan.Histery = histery;
StateMan.util = util;
StateMan.State = state;

var index = StateMan;

// import CircularJSON from '../utils/circular-json';

var view = function (Regular) {
	var RouterView = Regular.extend( {
		name: 'router-view',
		template: "\n\t\t\t<i ref=\"v\"></i>\n\t\t",
		config: function config() {
			this._commentInserted = false;

			var $router = this.$router;
			var name = this.data.name || 'default';

			$router.emit( 'add-router-view', {
				phase: this.$root.__phase__,
				key: name,
				value: this
			} );

			// console.log( '>', name, CircularJSON.parse( CircularJSON.stringify( $router.current ) ) );

			this.$mute();
		},
		init: function init() {
			if( !this._comment ) {
				this._comment = document.createComment( 'router-view' );
			}
		},
		clear: function clear() {
			if( this._prevcomponent ) {
				this._prevcomponent.$inject( false );
				this._prevcomponent.destroy();
			}
		},
		render: function render( component ) {
			var comment = this._comment;
			if ( !this._commentInserted ) {
				Regular.dom.inject( comment, this.$refs.v, 'after' );
				this._commentInserted = true;
			}

			if ( this.$refs.v && this.$refs.v.parentNode ) {
				this.$refs.v.parentNode.removeChild( this.$refs.v );
				delete this.$refs.v;
			}

			if ( !component ) {
				// this.clear();
				return;
			}
			if ( comment.parentNode ) {
				component.$inject( comment, 'after' );
			}

			this._prevcomponent = component;
		}
	} );
}

var link = function (Regular) {
	Regular.extend({
		name: 'router-link',
		template: "\n\t\t\t<a href=\"{ to }\">{#inc this.$body}</a>\n\t\t"
	});
}

// maybe Regular or extended from Regular, either is ok
var _Component;

var setCtor = function (Component) {
	_Component = Component;
};

var getCtor = function () {
	return _Component;
};

function each( obj, fn ) {
	var keys = Object.keys( obj );
	for ( var i = 0, len = keys.length; i < len; i++ ) {
		var key = keys[ i ];
		fn( obj[ key ], key, obj );
	}
}

var id = 0;
function walk( obj, fn, name ) {
	each( obj, function (v) {
		var currentName = v.name || ("annoymous_" + (id++));
		var path = name ? (name + "." + currentName) : currentName;
		fn( v, path );
		if ( v.children ) {
			walk( v.children, fn, path );
		}
	} );
}

function digestComponentDeps( routes ) {
	var Component = getCtor();
	var dirty = false;
	var ttl = 20;

	// handle components deps
	function walkComponents( extendOptions ) {
		// first and no deps
		if ( !extendOptions.components && !extendOptions._Ctor ) {
			extendOptions._Ctor = Component.extend( extendOptions );
			return;
		}

		var cps = extendOptions.components;

		// deps are ready
		var isReady = true;
		for ( var i in cps ) {
			if ( !cps[ i ]._Ctor ) {
				isReady = false;
				break;
			}
		}

		if ( isReady ) {
			var Ctor = Component.extend( extendOptions );
			// register component on Ctor
			for ( var i$1 in cps ) {
				Ctor.component( i$1, cps[ i$1 ]._Ctor )
			}
			extendOptions._Ctor = Ctor;
			return;
		}

		// if exists deps, and deps are not ready, mark as dirty, wait for next digest
		dirty = true;

		for ( var i$2 in cps ) {
			walkComponents( cps[ i$2 ] );
		}
	}

	function digestOne() {
		// reset
		dirty = false;

		walk( routes, function( route ) {
			var components = route.components || {};
			// combine
			if ( route.component ) {
				components[ 'default' ] = route.component;
			}
			for ( var i in components ) {
				walkComponents( components[ i ] );
			}
		} );

		ttl--;

		if ( !ttl ) {
			// error
			throw new Error( "components dependencies parse failed" );
		}

		if ( dirty && ttl ) {
			// next digest
			digestOne();
		}
	}

	digestOne();
}

var checkPurview = function ( e, cmd, components, cb ) {
	var done = e.async();
	var current = e.current;
	var go = e.go;

	var len = Object.keys( components ).length;

	function next() {
		len--;

		if( len === 0 ) {
			done();
			cb && cb();
		}
	}

	for ( var i in components ) {
		var component = components[ i ];
		var canTransition = component.route && component.route[ cmd ];
		if ( !canTransition ) {
			next();
		} else {
			canTransition( {
				route: current,
				redirect: go,
				next: next
			} );
		}
	}
};

var Router = function Router( options ) {
	// directly call
	if ( !( this instanceof Router ) ) {
		setCtor( options );
		return;
	}

	// new
	this._options = options;
};
Router.prototype.start = function start ( selector ) {
	var rootNode =
		( selector && document.querySelector( selector ) ) ||
		document.body;
	var Component = getCtor();

	if ( !Component ) {
		throw new Error( 'regular-router not initialized yet' );
	}

	// make stateman avaiable for all Regular instances
	var stateman = new index();
	Component.implement({
		$router: stateman
	});

	// register helper components
	Component.use( view );
	Component.use( link );

	// get routes from options.routes
	var ref = this._options;
		var routes = ref.routes;

	// flat
	var routeMap = {};
	walk( routes, function( route, name ) {
		if ( !~name.indexOf( '.' ) ) {
			route.isRootRoute = true;
		}
		routeMap[ name ] = route;
	} );

	// digest components dependencies
	digestComponentDeps( routes );

	var routerViewStack = {};
	stateman.on( {
		'add-router-view': function( ref ) {
				var phase = ref.phase;
				var key = ref.key;
				var value = ref.value;

			routerViewStack[ phase ] = routerViewStack[ phase ] || {};
			routerViewStack[ phase ][ key ] = value;
		},
		// 'purge-router-view': function( { phase } ) {
		// routerViewStack[ phase ] = {};
		// }
	} );

	// transform routes
	var transformedRoutes = {};
	var loop = function ( name ) {
		var route = routeMap[ name ];
		var parentName = name.split( '.' ).slice( 0, -1 ).join( '.' );
		var component = route.component;
		var components = route.components || {};
		var CtorMap = {};

		// combine
		if ( !components[ 'default' ] && component ) {
			components[ 'default' ] = component;
		}

		transformedRoutes[ name ] = {
			url: route.url,
			update: function update( e ) {
				// reuse, do nothing
			},
			enter: function enter( e ) {
				console.log( '@@route', name, 'enter' );
				var current = e.current;

				var instanceMap = {};

				// initialize component ctors
				CtorMap[ name ] = {};

				for ( var i in components ) {
					var cp = components[ i ];
					CtorMap[ name ][ i ] = cp._Ctor;
				}

				// get instances, and routerViews will be mounted
				for ( var i$1 in CtorMap[ name ] ) {
					instanceMap[ i$1 ] = new CtorMap[ name ][ i$1 ]({
						__phase__: name,
						__view__: i$1
					});
				}

				var routerViews = routerViewStack[ parentName ];

				// render router-view
				if ( routerViews ) {
					for ( var i$2 in routerViews ) {
						var routerView = routerViews[ i$2 ];
						routerView.render( instanceMap[ i$2 ] );
					}
				}

				if ( route.isRootRoute ) {
					instanceMap[ 'default' ] && instanceMap[ 'default' ].$inject( rootNode );
				}
			},
			canEnter: function canEnter( e ) {
				checkPurview( e, 'canEnter', components );
			},
			canLeave: function canLeave( e ) {
				checkPurview( e, 'canLeave', components );
			},
			leave: function leave( e ) {
				console.log( '@@route', name, 'leave' );

				var current = e.current;
				var routerViews = routerViewStack[ parentName ];

				// clean router-view
				if ( routerViews ) {
					for ( var i in routerViews ) {
						var routerView = routerViews[ i ];
						routerView.clear();
					}
				}
			}
		};
	};

		for ( var name in routeMap ) { loop( name ); }

	stateman.state( transformedRoutes );

	stateman.start( {
		prefix: '!'
	} );
};

return Router;

})));
});

var RouterManager = function RouterManager( app ) {
	var this$1 = this;

	this._app = app;

	var Base = app._Base;
	Base.use( regularRouter );
	app.once( 'before-start', function () {
		var getters = app._getters;
		var options = this$1._options || {};
		var routes = options.routes;
		walk( routes, function (component) {
			var computed = component.computed;
			var loop = function ( i ) {
				var c = computed[ i ];
				if ( typeof c === 'string' ) {
					if ( getters[ c ] ) {
						computed[ i ] = function () {
							// replaceState will replace state reference
							// so get state in realtime when computes
							var state = app._store.getState();
							return getters[ c ]( state )
						};
					} else {
						delete computed[ i ];
					}
				}
			};

			for ( var i in computed ) loop( i );
		} );
	} );
};
RouterManager.prototype.set = function set ( options ) {
	this._options = options;
};
RouterManager.prototype.start = function start () {
	var router = new regularRouter( this._options );
	this._app.$router = router;
	router.start();
};

function walk( routes, fn ) {
	for ( var i = 0, len = routes.length; i < len; i++ ) {
		var route = routes[ i ];

		var components = route.components || {};
		if ( route.component ) {
			components[ 'default' ] = route.component;
		}
		walkComponents( components, fn );
		if ( route.children ) {
			walk( route.children, fn );
		}
	}
}

function walkComponents( components, fn ) {
	for ( var i in components ) {
		var component = components[ i ];
		fn( component );
		if ( component.components ) {
			walkComponents( component.components, fn );
		}
	}
}

// Credits: vue/vuex

var devtoolsPlugin = function (options) { return function (store) {
	var devtools = window.__REO_DEVTOOLS_HOOK__;

	if ( !devtools ) {
		return;
	}

	store._devtools = devtools;

	devtools.emit( 'reo:init', store );
	devtools.on( 'reo:travel-to-state', function (state) {
		store.replaceState( state );
	} );

	store.subscribe( function ( action, state ) {
		devtools.emit( 'reo:reducer', action, state );
	} );
}; }

var App = (function (EventEmitter) {
	function App() {
		this._isRunning = false;
		this.$store = this._store = new Store();
		this._Base = index$1.extend();
		this.managers = {
			plugin: new PulginManager( this ),
			view: new ViewManager( this ),
			router: new RouterManager( this )
		};
		this.use( devtoolsPlugin() );
	}

	if ( EventEmitter ) App.__proto__ = EventEmitter;
	App.prototype = Object.create( EventEmitter && EventEmitter.prototype );
	App.prototype.constructor = App;
	App.prototype.use = function use ( plugin ) {
		this.managers.plugin.register( plugin );
	};
	App.prototype.model = function model ( ref ) {
		if ( ref === void 0 ) ref = {};
		var name = ref.name;
		var state = ref.state; if ( state === void 0 ) state = {};
		var reducers = ref.reducers; if ( reducers === void 0 ) reducers = {};

		if( !name ) {
			throw new Error( 'please name your model' );
		}

		var model = new Model( { state: state, reducers: reducers } );
		this._store.registerModel( name, model );

		return model;
	};
	App.prototype.actions = function actions ( actions ) {
		this._store.registerActions( actions );
	};
	App.prototype.getters = function getters ( getters ) {
		if ( getters === void 0 ) getters = {};

		if( this._getters ) {
			throw new Error( 'getters can only be called one time' );
		}
		this._getters = getters;
	};
	App.prototype.router = function router ( options ) {
		this.managers.router.set( options );
	};
	App.prototype.start = function start ( selector ) {
		if ( this._isRunning ) {
			return;
		}

		this._isRunning = true;

		this.emit( 'before-start' );
		this.managers.router.start();
		this.emit( 'after-start' );
	};

	return App;
}(eventemitter2));

var index = function() {
	return new App();
}

return index;

})));
