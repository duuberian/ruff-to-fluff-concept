'use strict';
const form = document.querySelector('#request-form');
const result = document.querySelector('#result');
function localDate(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
form.elements.date.min = localDate(new Date());
document.querySelector('#example').addEventListener('click', () => {
  const date = new Date(); date.setDate(date.getDate()+3);
  const example = {owner:'Alex',dog:'Teddy',breed:'Cockapoo',date:localDate(date),notes:'A little nervous around the dryer.'};
  for (const [key,value] of Object.entries(example)) form.elements[key].value=value;
  result.hidden=true;
  form.elements.owner.focus({preventScroll:true});
});
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  document.querySelector('#result-title').textContent = `${values.get('dog')}’s request`;
  const summary = document.querySelector('#summary'); summary.replaceChildren();
  for (const [label,key] of [['Your name','owner'],['Dog','dog'],['Breed / coat','breed'],['Preferred date','date'],['Notes','notes']]) {
    if (!values.get(key)) continue;
    const dt=document.createElement('dt'), dd=document.createElement('dd');
    dt.textContent=label; dd.textContent=values.get(key); summary.append(dt,dd);
  }
  result.hidden=false; result.focus();
});
form.addEventListener('input', () => { result.hidden=true; });
