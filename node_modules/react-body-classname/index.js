'use strict';

var React = require('react');
var withSideEffect = require('react-side-effect');
var PropTypes = require('prop-types');

function splitClassName(className) {
  return className.split(/\s+/);
}

function reducePropsToState(propsList) {
  return propsList.map(function(props) {
    return props.className;
  }).filter(function (value, index, self) {
    return self.indexOf(value) === index;
  }).join(' ');
}

function handleStateChangeOnClient(stringClassNames) {
  var currentClassNames = splitClassName(document.body.className).filter(
    function (className) {
      return BodyClassName.cache.indexOf(className) === -1;
    });

  var newClassNames = splitClassName(stringClassNames);

  BodyClassName.cache = newClassNames;
  document.body.className = currentClassNames.concat(newClassNames).join(' ').trim();
}

function BodyClassName(props){
  if (props.children) {
    return React.Children.only(props.children);
  } else {
    return null;
  }
}

BodyClassName.displayName = 'BodyClassName';
BodyClassName.cache = [];
BodyClassName.propTypes = {
  className: PropTypes.string.isRequired
};

module.exports = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(BodyClassName);
