#!/usr/bin/env node

const bodyParser = require('body-parser')

const express = require('express');
const app = express();
app.use(express.static('static'));
app.set('json spaces', 2);
app.use(bodyParser.json()) // parse application/json

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

const validIssuesStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
}

const issueFieldType = {
  id: 'required',
  status: 'required',
  owner: 'required',
  effort: 'required',
  created: 'required',
  completionDate: 'optional',
  title: 'required',
}

function validateIssue(issue){
  for(const field in issue){
    const type = issueFieldType[field];
    if(!type){
      delete issue[field];
    }else if( type === 'required' && !issue[field]){
      return `${field} is required.`;
    }
  }
  if (!validIssuesStatus[issue.status]){
    return `${issue.status} é um status inválido.`;
  }
  return null;
}

app.get('/api/issues', (req,res) =>{
  const metadata = {total_count: issues.length};
  console.log("enviando resposta...");
  res.json({_metadata: metadata, records: issues});
});

// atende criação de issues
app.post('/api/issues', (req,res) =>{
  const newIssue = req.body;
  newIssue.id = issues.length + 1;
  newIssue.created = new Date();
  if(!newIssue.status){
    newIssue.state = 'New';
  }
  const err = validateIssue(newIssue);
  if (err){
    res.status(422).json({message: `Requisição inválida: #{err}`})
  }
  issues.push(newIssue);
  res.json(newIssue);
});

app.listen(3000, function(){
  console.log("Aplicativo iniciado. Acesso em http://localhost:3000");
});
