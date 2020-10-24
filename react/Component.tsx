// class Component{
//     static isReactComponent = true
//     protected props: any;
//     constructor(props) {
//         this.props = props
//     }
// }
//
//

function Component(props){
    this.props = props;
}

Component.prototype.isReactComponent = {};
export default Component