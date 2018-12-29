const contentNode = document.getElementById('contents');
const issues = [
  {
    id: 1, status: 'Open', owner: 'Ravan',
    created: new Date('2018-08-15'), effort: 5,
    completionDate: undefined, title: 'Erro no console quando clicamos em Adicionar',
  },
  {
    id: 2, status: 'Assigned', owner: 'Eddie',
    created: new Date('2018-08-16'), effort: 14,
    completionDate: new Date('2018-08-30'),
    title: 'Faltando borda de baixo no painel',
  }
];

class IssueFilter extends React.Component{
  render(){
    return (
      <div>Local para o Filtro de Issues</div>
    )
  }
}

class IssueRow extends React.Component {
  render(){
    const issue = this.props.issue;
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
        <td>{issue.title}</td>
      </tr>
    )
  }

}

IssueRow.defaultProps = {
  issue_title: "-- sem título --",
};

class IssueTable extends React.Component {
  render(){
    const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />);
    const borderedStyle = {border: "1px solid silver", padding: 6};
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Completion Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>{issueRows}</tbody>
      </table>
    )
  }
}


class IssueAdd extends React.Component{
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    const form = document.forms.issueAdd;
    this.props.createIssue({
        owner: form.owner.value,
        title: form.title.value,
        status: 'New',
        created: new Date(),
    });
    // limpa o formulário para próxima entrada
    form.owner.value="";
    form.title.value="";
  }
  render(){
    return (
      <div>
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="owner" placeholder="Owner" />
          <input type="text" name="title" placeholder="Title" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

class IssueList extends React.Component {
  constructor(){
    super();
    this.state = {issues: []};
    this.createIssue = this.createIssue.bind(this);
  }
  componentDidMount(){
    this.loadData();
  }
  loadData(){
    setTimeout(() => {
      this.setState({issues: issues});
    });
  }
  createIssue(newIssue){
    const newIssues = this.state.issues.slice();
    newIssue.id = this.state.issues.length+1;
    newIssues.push(newIssue);
    this.setState({issues: newIssues});
  }
  render(){
    console.log("Contando renderizações")
    return (
      <div>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue}/>
      </div>
    );
  }
}

ReactDOM.render(<IssueList />, contentNode);
