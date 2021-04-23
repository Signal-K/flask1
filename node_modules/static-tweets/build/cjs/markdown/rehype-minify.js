"use strict";
exports.__esModule = true;
function minifyAst(ast) {
    var _a;
    if (Array.isArray(ast)) {
        return ast.reduce(function (nodes, node) {
            var _a;
            var n = minifyAst(node);
            // Empty new lines aren't required
            var isNoise = n === '\n' && ((_a = nodes[nodes.length - 1]) === null || _a === void 0 ? void 0 : _a.tag) !== 'span';
            if (!isNoise)
                nodes.push(n);
            return nodes;
        }, []);
    }
    // Handle the root ast
    if (!ast.tagName && ast.children) {
        return minifyAst(ast.children);
    }
    if (ast.type === 'text') {
        return ast.value;
    }
    if (ast.type === 'element') {
        var node = { tag: ast.tagName };
        var children = ((_a = ast.children) === null || _a === void 0 ? void 0 : _a.length) ? minifyAst(ast.children) : [];
        if (ast.properties && Object.keys(ast.properties).length) {
            node.props = ast.properties;
        }
        if (ast.data) {
            node.data = ast.data;
        }
        if (children.length) {
            node.nodes = children;
        }
        return node;
    }
    throw new Error("Unable to handle the following AST: " + JSON.stringify(ast, null, 2));
}
function rehypeMinify() {
    this.Compiler = function (tree) { return minifyAst(tree); };
}
exports["default"] = rehypeMinify;
//# sourceMappingURL=rehype-minify.js.map