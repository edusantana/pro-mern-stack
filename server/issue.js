'use strict';

const validIssuesStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
}

const issueFieldType = {
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

module.exports = {
  validateIssue: validateIssue
};
