let lastRule;
let lastBreak;
function useEffect(callback,rules){
    const changed = !lastRule||!rules||rules.some((itm,index)=>itm!==lastRule[index])
    if(changed){
        lastBreak&&lastBreak()
        lastBreak = callback()
    }
    lastRule = rules;

}

export default useEffect
