//return Vnode 虚拟Dom
function createElement(type,props,...children){
    return {
        type,
        props:{
            ...props,
            children
        },
    }
}

export  {
    createElement
}