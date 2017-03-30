class TodoItem{
  constructor(name,city,state,category,description,link){
    this.name=name;
    this.city=city;
    this.state=state;
    this.category=category;
    this.description=description;
    this.link=link;
  }
  toTableRow(){
    var row=document.createElement('tr');
    for (let cell of ['name','city','state','category','description','link']){
      let td=document.createElement('td');
      td.innerHTML=this[cell];
      row.appendChild(td);
    }
    //create delete button
    let td=document.createElement('td');
    //td.innerHTML="<button type='submit' id=".this.id" class='btn btn-primary' onclick='ec.deleteExpense(this)' name='button'>Delete</button></div>";
    let button=document.createElement('button');
    button.id=this.id;
    button.innerHTML="Delete";
    // button.onclick=function(){ec.deleteExpense(this.id);};
    td.appendChild(button);
    row.appendChild(td);
    //create edit button
    let buttonE=document.createElement('button');
    buttonE.id=this.id;
    buttonE.innerHTML="Edit";
    // buttonE.onclick=function(){ec.editExpense(this.id);};
    td.appendChild(buttonE);
    row.appendChild(td);
    return row;
  }
}
class TodoItemDB{
  constructor(){
    this.db=[]
  }
  addTodoList(expense){
    //add item to  the database
    this.db.push(item);
    //add item to local storage
    this.saveMe(item);
  }
  saveItem(item){
    //add item to localStorage
  }
  getTodoListDB(){
    return this.db
  }
}
