/**
 * @desc babel编译JSX的时候调用
 * @param type
 * @param props
 * @param children
 * @return Vnode 虚拟Dom
 */
function createElement(type,props,...children){
    return {
        type,
        props:{
            ...props,
            children:children.map(child=>{
                return typeof child === 'object' ? child : createTextNode(child)
            })
        },
    }
}

function createTextNode(nodeValue){
    return {
        type:'TEXT',
        props:{
            children:[],
            nodeValue
        }
    }
}

export default createElement