const contentNode = document.getElementById('contents');

const continentes = ['Africa','America','Asia','Australia','Europa'];

const mensagem = continentes.map(c => `Hello ${c}`).join('<br/>');

var component = <p>{mensagem}</p>;
ReactDOM.render(component, contentNode);  // Render the component inside the content Node
