/*jshint newcap: false */
/*global describe, it, before */
'use strict';
var expect = require('expect.js'),
    enzyme = require('enzyme'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    BodyClassName = require('../'),
    jsdom = require('jsdom').jsdom;

describe('BodyClassName', function () {
  global.beforeEach(function () {
    BodyClassName.canUseDOM = false;
  });

  it('has a displayName', function () {
    var el = enzyme.mount(React.createElement(BodyClassName, {className: 'hello'}));
    var name = el.name();
    expect(name).to.be.a('string');
    expect(name).not.to.be.empty();
  });

  it('hides itself from the DOM', function () {
    var Component = enzyme.mount(
      React.createElement(BodyClassName, {className: 'irrelevant'},
        React.createElement('div', null, 'hello')
      )
    );
    expect(Component.html()).to.equal('<div>hello</div>');
  });

  it('throws an error if it has multiple children', function (done) {
    var Component = function() {
      return (
        React.createElement(BodyClassName, {className: 'irrelevant'},
          React.createElement('div', null, 'hello'),
          React.createElement('div', null, 'world')
        )
      );
    };

    expect(function () {
      var el = enzyme.mount(React.createElement(Component));
    }).to.throwException(function (e) {
      expect(e.message).to.match(/^React.Children.only expected to receive a single React element child/);
      done();
    });
  });

  it('works with complex children', function () {
    var Component1 = function(){
      return React.createElement('p', null,
        React.createElement('span', null, 'c'),
        React.createElement('span', null, 'd')
      );
    };

    var Component2 = function() {
        return React.createElement(BodyClassName, {className: 'irrelevant'},
          React.createElement('div', null,
            React.createElement('div', null, 'a'),
            React.createElement('div', null, 'b'),
            React.createElement('div', null, React.createElement(Component1))
          )
        );
    };

    var component = enzyme.mount(React.createElement(Component2));
    var markup = component.html();
    expect(markup).to.equal(
      '<div>' +
        '<div>a</div>' +
        '<div>b</div>' +
        '<div>' +
          '<p>' +
            '<span>c</span>' +
            '<span>d</span>' +
          '</p>' +
        '</div>' +
      '</div>'
    );
  });
});

describe('BodyClassName.rewind', function () {
  it('clears the mounted instances', function () {
    BodyClassName.rewind();
    enzyme.mount(
      React.createElement(BodyClassName, {className: 'a'},
        React.createElement(BodyClassName, {className: 'b'},
          React.createElement(BodyClassName, {className: 'c'}))
      )
    );
    expect(BodyClassName.peek()).to.equal('a b c');
    BodyClassName.rewind();
    expect(BodyClassName.peek()).to.equal(undefined);
  });
  it('returns all the classNames used', function () {
    enzyme.mount(
      React.createElement(BodyClassName, {className: 'one'},
        React.createElement(BodyClassName, {className: 'two'},
          React.createElement(BodyClassName, {className: 'three'}))
      )
    );
    expect(BodyClassName.rewind()).to.equal('one two three');
  });
  it('returns undefined if no mounted instances exist', function () {
    enzyme.mount(
      React.createElement(BodyClassName, {className: 'a'},
        React.createElement(BodyClassName, {className: 'b'},
          React.createElement(BodyClassName, {className: 'c'}))
      )
    );
    BodyClassName.rewind();
    expect(BodyClassName.peek()).to.equal(undefined);
  });
});
