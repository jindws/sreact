/**
 * @desc vnode->node
 * @param vnode
 * @param container
 */

interface Fiber{
    type?: any// ReactElement.type，也就是我们调用`createElement`的第一个参数
    // 指向自己的第一个子节点
    child?: Fiber | null
    // 指向他在Fiber节点树中的`parent`，用来在处理完这个节点之后向上返回
    return?: Fiber | null
    // 兄弟节点的return指向同一个父节点
    sibling?: Fiber | null
    base: Fiber | null
    node:any//真实Dom节点
    props: {
        children
    }
}


function childNode(fiber:Fiber){
    const {children} = fiber.props;
    let oldFiber = fiber.base?.child,prevSibling;
    children.forEach((itm,index)=>{
        let newFiber:Fiber = {
            type:itm.type,
            props:itm.props,
            node:null,//新增
            base:null,//存储fiber,用于比较
            return:fiber
        }

        if(oldFiber){
            oldFiber = oldFiber.sibling
        }

        if(!index){
            fiber.child = newFiber
        }else{
            prevSibling.sibling = newFiber
        }



        // if(Array.isArray(itm)){
        //     return itm.map(it=>render(it,node))
        // }
        // return render(itm,node)
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

/**
 * 下一个子任务
 */
let nextUnitWork:Fiber;

/**
 * 运行中的任务
 */
let wipRoot:Fiber;

/**
 * 现在的根节点
 */
let currentRoot;

function render(vnode,container){
    wipRoot = {
        node:container,
        props:{
            children:[vnode],
        },
        base:currentRoot
    }
    nextUnitWork = wipRoot
    // const node = createNode(vnode)
    // container.appendChild(node)
}

function createNode(fiber:Fiber){
    const {type,props} = fiber;
    let node;
    if(type === 'TEXT'){
        node = document.createTextNode('')
    }else if(type){
        node = document.createElement(type)
    }

    updateNode(node,props)
    // childNode(props.children,node)
    return node
}


function updateHostComponent(fiber:Fiber){
    console.log(fiber)
    if(!fiber.node){
        fiber.node = createNode(fiber)
    }
    childNode(fiber)
}

/**
 * @desc 执行当前子任务
 * @param fiber
 */
function runUnitWork(fiber:Fiber){
    updateHostComponent(fiber)
    //返回下一个子任务
    if(fiber.child){//先找子元素
        return fiber.child
    }
    //再找兄弟元素
    let nextFiber = fiber;
    while(nextFiber){
        if(nextFiber.sibling){
            return nextFiber.sibling
        }
        nextFiber = nextFiber.return//parent节点
    }
}

/**
 * @desc 执行子任务/commit
 * @param didTimeout
 */
function workLoop({didTimeout}){
    if(nextUnitWork&&!didTimeout){//进行下个子任务
        nextUnitWork = runUnitWork(nextUnitWork)
    }

    if(!nextUnitWork){
        //commit
    }
}

(window as any).requestIdleCallback(workLoop)

export default render