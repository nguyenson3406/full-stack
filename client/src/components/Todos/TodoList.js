import React, {Component} from 'react'
import AddTodo from './AddTodo'
import './TodosList.scss'
import { toast } from 'react-toastify'

class TodoList extends Component{

    state = {
        listTodos: [
            { id: 'todo1', title: 'Doing homework' },
            { id: 'todo2', title: 'Making videos' },
            { id: 'todo3', title: 'Fixing bugs' },
        ],
        editTodo: {}
    }

    addTodo = (todo) =>{
        let {listTodos} = this.state
        this.setState({
            listTodos: [...listTodos,todo]
        })
    }

    deleteTodo = (todo) =>{
        let {listTodos} = this.state
        let currentTodo = listTodos.filter(item => item.id !== todo.id)
        this.setState({
            listTodos: currentTodo
        })
        toast.success("Success delete Todo!",{
            className: 'toast-message'
        })
    }

    editTodo = (todo) =>{
        let {listTodos,editTodo} = this.state
        let isEmptyObj = Object.keys(editTodo).length === 0;

        if (isEmptyObj === false && editTodo.id === todo.id) {

            let listTodosCopy = [...listTodos];

            let objIndex = listTodosCopy.findIndex((item => item.id === todo.id));

            listTodosCopy[objIndex].title = editTodo.title;

            this.setState({
                listTodos: listTodosCopy,
                editTodo: {}
            })
            toast.success("Update todo succeed!",{
                className:'toast-message'
            })
            return;
        }
        this.setState({
            editTodo: todo
        })
    }

    editChangeTodo = (event) =>{
        let editTodoCopy = { ...this.state.editTodo };
        editTodoCopy.title = event.target.value;
        this.setState({
            editTodo: editTodoCopy
        })
    }

    render(){
        let {listTodos,editTodo} = this.state
        let isEmptyObj = Object.keys(editTodo).length === 0;
        console.log('check edit: ',Object.keys(editTodo))
        console.log('check list: ',this.state.listTodos)
        return(
            <>
                <AddTodo addTodo={this.addTodo}></AddTodo>
                <div className='TodoList'>
                    {
                        listTodos.map((item,index) => {
                            return(
                                <div className='todo-child' key={item.id}>
                                    {
                                        isEmptyObj===true?
                                            <>
                                                <span>{index+1} - {item.title}</span>
                                                <></>  <button onClick={() =>this.editTodo(item)}>Edit</button>
                                                <></>  <button onClick={() =>this.deleteTodo(item)}>Delete</button>
                                            </>
                                        :
                                            <>
                                            {editTodo.id===item.id?
                                                <>
                                                {index + 1} - 
                                                <input value={editTodo.title}
                                                    onChange={(event)=>this.editChangeTodo(event)}></input>
                                                <></> <button  onClick={() =>this.editTodo(item)}>Save</button>
                                                </>                                              
                                            :
                                                <>
                                                <span>{index+1} - {item.title}</span>
                                                <></>  <button onClick={() =>this.editTodo(item)}>Edit</button>
                                                <></>  <button onClick={() =>this.deleteTodo(item)}>Delete</button>
                                                </>
                                            }                                          
                                            </>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

export default TodoList