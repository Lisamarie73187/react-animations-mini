import React, { Component } from 'react';
import Card from './Card';
import './App.css';
import { TransitionMotion, Motion, spring } from 'react-motion';



export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [{
                key: 't1',
                data: {
                    todo: 'Learn react-motion',
                    completed: false
                }
            }],
            shouldAnimate: false
        }
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.toggle = this.toggle.bind(this);
        this.getDefaultStyles = this.getDefaultStyles.bind(this);
        this.getStyles = this.getStyles.bind(this)
        this.animate = this.animate.bind(this)
    }

    animate(){
        this.setState({
            shouldAnimate: !this.state.shouldAnimate
        })
    }

    addTodo(e) {
        e.preventDefault();
        let newTodo = {
            key: `t${new Date()}`,
            data: {
                todo: this.inputRef.value,
                completed: false
            }
        }
        this.setState({
            todos: [...this.state.todos, newTodo]
        })
        this.inputRef.value = '';
    }

    removeTodo( id ) {
        let todos = this.state.todos.filter( todo => todo.key  !== id );
        this.setState({
            todos: todos
        })
    }

    toggle( id ) {
        let todos = this.state.todos.map( todo => {
            if (todo.key === id) {
                todo.data.completed = !todo.data.completed;
            }
            return todo;
        });
        this.setState({
            todos: todos
        })
    }
    getDefaultStyles(){
       return this.state.todos.map( todo => {
            return Object.assign({}, todo, {style:{ height: 0, opacity: 0 }})
        })
    }

    getStyles (){
        return this.state.todos.map( todo => {
            return Object.assign({}, todo, {style: {height: spring(65), opacity: spring(1)}})
        })
    }
    willEnter() {
        return {
            height: 0,
            opacity: 0
        }
    }

    willLeave(){
        return {
            height: spring(0),
            opacity: spring(0)
        }
    }

    render() {
       
        return(
            <div className='app'>
                <h1>to-dos</h1>
                <div className='todos-wrap'>
                    <div className='right-arrow'>></div> 
                    <div className='input-container'>
                        <form onSubmit={ this.addTodo }>
                            <input 
                                ref={ input => this.inputRef = input}
                                placeholder='add new to-do...'
                                className='todo-inp'
                                /> 
                        </form>   
                    </div>
                    <TransitionMotion 
                        defaultStyles={ this.getDefaultStyles() }
                        styles={ this.getStyles() }
                        willEnter={ this.willEnter }
                        willLeave={ this.willLeave }
                        >
                        {(styles) => {
                        return(
                            <div>
                            {styles.map( (todo, i) => {
                                return <Card 
                                    key={todo.key}
                                    toggle={ this.toggle }
                                    removeTodo={ this.removeTodo } 
                                    todo={ todo } /> 
                                })}
                            </div>
                        )}}  
                    </TransitionMotion>
                    <Motion 
                        defaultStyle={{height: 100, width: 100}} 
                        style={{height: this.state.shouldAnimate ? spring(200, {stiffness: 60, damping: 5}) : spring(100), width: this.state.shouldAnimate ? spring(200) : spring(100)}}>
                        {(style) => {
                            return <div style={{width: style.width, height: style.height, background: 'blue', margin: 'auto', marginTop: '30px'}}></div>
                        }}
                    </Motion>
                    <button onClick={ this.animate } style={{width: '200px', margin: 'auto', marginTop: '20px'}}>Click Me</button>
                </div> 
            </div> 
        )
    }
}
