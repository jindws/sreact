import * as React from '../react'
import * as ReactDom  from '../react-dom'

function Fun(props){
    return <div className={props.name}>
        {props.name}
    </div>
}


const app = <div className='test'>
    <p>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </p>
    <button>btn</button>
    <Fun name='function'/>
</div>

ReactDom.render(app,document.getElementById('app'))