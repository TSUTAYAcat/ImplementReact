import ReactDom from '../react-dom/index'
class Component {
    constructor(props) {
        this.props = props
        this.state = {}
    }
    setState(changeState) {
        Object.assign(this.state, changeState)
        ReactDom.renderComponent(this)
    }
}
export default Component