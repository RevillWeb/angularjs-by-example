var esprima = require("esprima").parse,
  is = require("simple-is"),
  alter = require("alter"),
  traverse = require("ast-traverse");


function matchAndExtendModuleDefinition(node, modules, fragments) {
  if(node.type !== "CallExpression") {
    return;
  }

  var callee = node.callee;
  if(callee.type !== "MemberExpression") {
    return;
  }

  if(!(callee.object && callee.object.name === "angular" &&
    callee.property && callee.property.name === "module")) {
    return;
  }

  var args = node.arguments;
  if(args[0].type !== "Literal" || !is.someof(args[0].value, Object.keys(modules))) {
    return;
  }
  var moduleExtensions = modules[args[0].value];

  if(args.length === 1) {
    //we got only module name
    fragments.push({
      start: args[0].range[1],
      end: node.range[1] - 1,
      str: ", " + JSON.stringify(moduleExtensions)
    });
  } else if(args.length === 2 && args[1].type === "ArrayExpression") {
    var modulesString = JSON.stringify(args[1].elements.map(function(elem) {
      return elem.name || elem.value;
    }).concat(moduleExtensions));

    //we got module name and deps
    fragments.push({
      start: args[1].range[0],
      end: args[1].range[1],
      str: modulesString
    });
  }
}


module.exports = function angularExtender(src, moduleExtensions) {
  var ast = esprima(src, {
    range: true
  });

  var replaceFragments = [];
  traverse(ast, {post: function(node) {
    matchAndExtendModuleDefinition(node,  moduleExtensions, replaceFragments);
  }});

  var res = alter(src, replaceFragments);
  return {
    out: res,
    changed: (replaceFragments.length !== 0)
  }
};