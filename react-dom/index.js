import Component from '../React/Component'

const render = (vnode, container) => {
    const dom = render_(vnode)
    return container.appendChild(dom)

}
function createComponent(tag, props) {
    let instance = {}
    if (tag.prototype.render) {
        instance = new tag(props)
    } else {
        instance = new Component(props)
        instance.render = tag.bind(instance)
    }
    return instance
}
function setComponentProps(instance) {
    // 设置组件属性
    // instance.props = props // 我个人觉得这一步是多余的，前面已经设置过props，所以暂时把ta给注释掉
    // 实现componentWillMount--------------
    if (!instance.base && instance.componentWillMount) instance.componentWillMount()
    // 实现componentWillReceiveProps--------------
    if (instance.base && instance.componentWillReceiveProps) instance.componentWillReceiveProps()
}
function renderComponent(instance) {
    const base = render_(instance.render())
    // 实现componentWillUpdate--------------
    if (instance.base && instance.componentWillUpdate) instance.componentWillUpdate()
    // 实现componentWillUpdate--------------
    if (instance.base && instance.componentDidUpdate) instance.componentDidUpdate()
    // 实现componentWillUpdate--------------
    if (!instance.base && instance.componentDidMount) instance.componentDidMount()

    // 节点替换
    if (instance.base && instance.base.parentNode) {
        instance.base.parentNode.replaceChild(base, instance.base)
    }
    instance.base = base
}
const render_ = (vnode) => {
    const { tag, attrs: props, children } = vnode
    if (typeof (tag) === 'function') {
        // --------------1,创建组件--------------
        let instance = createComponent(tag, props)
        // --------------2,设置组件属性--------------
        setComponentProps(instance)
        // --------------3，组件渲染成dom instance.render()返回babel编译后的jsx对象--------------
        renderComponent(instance)
        // --------------4，返回dom 下一步挂载到dom树--------------
        return instance.base
    } else {
        if (typeof (vnode) === 'string' || typeof (vnode) === 'number') {  // 如果当前vnode是字符串/数字直接text包裹放入入container 返回
            return document.createTextNode(vnode)
        } else {
            const { tag, attrs, children } = vnode
            // 1,处理tag
            const dom = document.createElement(tag)
            // 2,处理attrs
            attrs && Object.keys(attrs).forEach(key => {
                const value = attrs[key]
                // 处理className => class 
                if (key === 'className') key = 'class'
                // 处理onClick => onclick
                if (/^on/.test(key)) {
                    // console.log(key, 132, 'onclick' in dom, value);
                    key = key.toLowerCase()
                }
                // 如果没有attrs[key] 统一设置为空字符串
                if (!value) value = ''
                if (typeof (value) === 'string') {
                    // 如果当前属性的值是字符串 直接赋值或者设置属性
                    // 如果dom存在的属性 直接修改  如果dom不存在的属性 则通过设置属性
                    (key in dom) ? dom[key] = value : dom.setAttribute(key, value)
                } else if (typeof (value) === 'object') {
                    // 如果当前属性的值是对象 
                    // 如果是style 属性，如果属性值是number类型，为他亲切加上px ，否则字符串类型直接赋值dom.style[k]
                    if (key === 'style') {
                        for (const k in value) {
                            // 如果不是value内部属性则跳过本次循环
                            if (!value.hasOwnProperty(k)) continue
                            // 如果是数值加上px 否则直接赋值当前属性
                            typeof (k) === 'number' ? dom.style[k] = value[k] + 'px' : dom.style[k] = value[k]
                        }
                    }
                } else {
                    dom[key] = value
                }
            })
            // 3,处理children
            if (children.length) children.forEach(child => render(child, dom))
            // 4,返回
            return dom
        }
    }
}
const ReactDom = {
    render,
    renderComponent
}

export default ReactDom