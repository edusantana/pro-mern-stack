const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component{
  render(){
    return (
      <div>Local para o Filtro de Issues</div>
    )
  }
}

class IssueTable extends React.Component {
  render(){
    return <div>Lugar da tabela de issues</div>
  }
}

class IssueAdd extends React.Component{
  render(){
    return <div>Espaço para adicionar um formulário para adicionar um novo Issue</div>
  }
}

class IssueList extends React.Component {
  render(){
    return (
      <div>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable />
        <hr />
        <IssueAdd />
      </div>
    );
  }
}

ReactDOM.render(<IssueList />, contentNode);
