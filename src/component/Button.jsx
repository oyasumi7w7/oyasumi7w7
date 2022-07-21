import React from 'react'




export class Button extends React.Component{
    render(){
        return (
             <button>{this.props.title}</button>
        )
    }
}
export function Button2(props) {
    return <button>{props.title}</button>
}