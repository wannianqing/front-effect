class QingNiu extends HTMLElement {
  constructor() {
    super();
    var shadowRoot = this.attachShadow({mode: 'open'})
    this.width = this.getAttribute('width') || '100'
    this.height = this.getAttribute('height') || '100'
    this.radius = this.getAttribute('radius') || '10'
    this.backgroundColor = this.getAttribute('backgroundColor') || '#c74747'

    const box = this.createElement()

    shadowRoot.appendChild(box)
  }
  createElement(){
    const box = document.createElement('div')
    box.style.cssText = `
      width:${this.width}px;
      height:${this.height}px;
      border-radius:${this.radius}px;
      background-color:${this.backgroundColor};
    `
    return box
  }
}

window.customElements.define('qing-niu',QingNiu)