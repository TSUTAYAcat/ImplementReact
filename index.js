import React from './React/index'
import ReactDom from './react-dom/index'

const ele = (
    <div title={"牛牛"} className="item" key='1' style={{ width: "100%", height: 100, backgroundColor: "red" }} onClick={() => { alert(1) }}>
        {' 你好，react，'}<span>I love react</span>
    </div>
)
function Ele(props = {}) {
    return (
        <div title={"牛牛"} className="item" key='1' style={{ width: "100%", height: 100, backgroundColor: "red" }} onClick={() => { alert(1) }}>
            {props.message ? props.message : '牛牛你好，react，'}<span>I love react</span>
        </div>
    )
}
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 1
        }
    }
    componentWillMount() {
        console.log('componentWillMount');
    }
    componentDidMount() {
        console.log('componentDidMount');
    }
    componentWillReceiveProps() {
        console.log('componentWillReceiveProps');
    }
    componentWillUpdate() {
        console.log('componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }
    click() {
        console.log(this.state);
        this.setState({
            num: ++this.state.num
        })
    }
    render() {
        return (
            <div title={"羊羊"} className="item" key='1' style={{ width: "100%", height: 100, backgroundColor: "red" }} >
                {this.state.num}{'羊羊你好，react，'} <button onClick={this.click.bind(this)}>I love react</button>
            </div >
        )
    }
}
// class 
// ReactDom.render(ele, document.querySelector('#root'))
// ReactDom.render(<Ele name="GDP" />, document.querySelector('#root'))

ReactDom.render(<Home name="GDP" />, document.querySelector('#root'))


