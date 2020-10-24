/**
 * @desc vnode->node
 * @param vnode
 * @param container
 */
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
        let _vnode;
        if(type.prototype.isReactComponent){
            _vnode = new type({
                ...props,
                ...type.defaultProps
            }).render()
        }else{
            _vnode = type(props)
        }
        node = createNode(_vnode)
    }else if(type){
        node = document.createElement(type)
    }else{
        node = document.createDocumentFragment()
    }

    updateNode(node,props)
    childNode(props.children,node)
    return node
}

function childNode(children,node){
    children.forEach(itm=>{
        if(Array.isArray(itm)){
            return itm.map(it=>render(it,node))
        }
        return render(itm,node)
    })
}

function updateNode(node,nextVal){
    Object.keys(nextVal)
        .filter(itm=>itm!=='children')
        .forEach(itm=>{
            if(itm.startsWith('on')){
                return node.addEventListener(itm.slice(2).toLowerCase(),nextVal[itm])
            }
            node[itm] = nextVal[itm]
        })
}

export  {
    render
}