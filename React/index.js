import Component from '../React/Component'

const React = {
    createElement(tag, attrs, ...children) {
        return {
            tag, attrs, children
        }
    },
    Component,
}
export default React