'use strict';

var contentNode = document.getElementById('contents');

var continentes = ['Africa', 'America', 'Asia', 'Australia', 'Europa'];

var mensagem = continentes.map(function (c) {
  return 'Hello ' + c;
}).join('<br/>');

var component = React.createElement(
  'p',
  null,
  mensagem
);
ReactDOM.render(component, contentNode); // Render the component inside the content Node