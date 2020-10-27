import * as React from '../react'
import * as ReactDom  from '../react-dom'

function Fun(props){
    return <div className={props.name}>
        {props.name}
    </div>
}

class Cla extends React.Component{
    private props: any
    static defaultProps = {
        default:'props'
    }
    constructor(props) {
        super(props);
    }

    render(){
        return <div>{this.props.name} {this.props.default}</div>
    }
}

const app = <div className='test'>
    text
    <div>div</div>
    <span>span</span>
    <p>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </p>
    {/*<button onClick={()=>console.log('click')}>btn</button>*/}
    <Fun name='function'/>
    <Cla name='class'/>
    {/*<>*/}
    {/*    Fragment*/}
    {/*</>*/}
    {/*<React.Fragment>*/}
    {/*    <div>React.Fragment</div>*/}
    {/*</React.Fragment>*/}
    <dl>
        {
            [1,2,3].map(itm=><dd key={itm}>{itm}</dd>)
        }
    </dl>
</div>

ReactDom.render(app,document.getElementById('app'))