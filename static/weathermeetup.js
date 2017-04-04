class TodoItem{
  constructor(name,city,state,category,description,link,id){
    this.name=name;
    this.city=city;
    this.state=state;
    this.category=category;
    this.description=description;
    this.link=link;
    this.id=id;
  }
  toTableRow(){
    var row=document.createElement('tr');
    for (let cell of ['name','city','state','category','description','link']){
      let td=document.createElement('td');
      if (cell=="link"){
         let a=document.createElement('a');
         a.href=this[cell];
         a.innerHTML="More details on event"
         td.appendChild(a);
      }
     else  td.innerHTML=this[cell];
      row.appendChild(td);
    }
    //create delete button
    let td=document.createElement('td');
    //create delete button
    let button=document.createElement('button');
    button.id=this.id;
    button.innerHTML="Delete";
    button.onclick=function(){wc.deleteItem(this.id);};
    td.appendChild(button);
    row.appendChild(td);
    return row;
  }
}
class TodoItemDB{
  constructor(){
    this.db=[]
  }
  addTodoList(item){
    //add item to  the database
    this.db.push(item);
    //add item to local storage
    this.saveItem();
  }
  saveItem(){
    //add item to localStorage
    localStorage.activitydb=JSON.stringify(this.db);
  }
  deleteItem(id){
    for (let item of this.getTodoListDB()){
      if (item.id==id) this.db.splice(id,1);
    }
    this.saveItem();
  }
  getTodoListDB(){
    return this.db
  }
  reloadMe(){
    let obs = JSON.parse(localStorage.activitydb);
    for(let act of obs) {
         act = new TodoItem(act.name, act.city, act.state, act.category,(act.description.split('.'))[0], act.link,act.id);
         this.db.push(act);
     }
  }
}
