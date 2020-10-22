import * as React from '../react'
import * as ReactDom  from '../react-dom'

const app = <div className='test'>
    <p>text</p>
    <button>btn</button>
</div>

ReactDom.render(app,document.getElementById('app'))