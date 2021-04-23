/*jshint newcap: false */
/*global global, describe, it, afterEach, before, after */
'use strict';
var expect = require('expect.js'),
    enzyme = require('enzyme'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    BodyClassName = require('../'),
    jsdom = require('jsdom').jsdom;

describe('BodyClassName (in a browser)', function () {
  global.beforeEach(function () {
    BodyClassName.canUseDOM = true;
    global.document.body.className = '';
  });

  it('changes the document body class name on mount', function () {
    var className = 'hello world';
    var Component = enzyme.mount(React.createElement(BodyClassName, {className: className}));
    expect(global.document.body.className).to.equal(className);
  });

  it('does not erase existing body class names', function () {
    global.document.body.className = 'testing'
    var className = 'hello world';
    var Component = enzyme.mount(React.createElement(BodyClassName, { className: className }));
    expect(global.document.body.className).to.equal('testing hello world');
  });

  it('does not erase and or duplicate existing body class names', function () {
    global.document.body.className = 'testing hello'
    var className = 'hello world';
    var Component = enzyme.mount(React.createElement(BodyClassName, { className: className }));
    expect(global.document.body.className).to.equal('testing hello world');
  });

  it('supports nesting, gathering all classNames used', function (done) {
    var called = false;
    var firstName = 'hello world';
    var secondName = 'foo bar';
    class Component1 extends React.Component{
      componentDidMount() {
        setTimeout(function () {
          expect(called).to.be(true);
          expect(global.document.body.className).to.equal(firstName + ' ' + secondName);
          done();
        });
      }
      render() {
        return React.createElement(BodyClassName, {className: firstName});
      }
    }
    class Component2 extends React.Component {
      componentDidMount() {
        called = true;
      }
      render() {
        return React.createElement(BodyClassName, {className: secondName},
          React.DOM.div(null, React.createElement(Component1))
        );
      }
    }
    enzyme.mount(React.createElement(Component2), global.document.body);
  });
});
