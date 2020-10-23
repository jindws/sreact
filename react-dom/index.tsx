function render(vnode,container){
    const node = createNode(vnode)
    container.appendChild(node)
}

function createNode(vnode){
    const {type,props} = vnode;
    let node;
    if(type === 'TEXT'){
        node = document.createTextNode('')
    }else if(typeof type === 'function'){
        const _vnode = type(props)
        node = createNode(_vnode)
    }else{
        node = document.createElement(type)
    }

    update(node,props)

    props.children.forEach(itm=>render(itm,node))
    return node
}

function update(node,nextVal){
    Object.keys(nextVal).filter(itm=>itm!=='children')
        .forEach(itm=>{
            node[itm] = nextVal[itm]
        })
}

export  {
    render
}