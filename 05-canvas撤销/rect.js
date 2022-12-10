class Shapes{
  constructor(config){
    this.x = config.x || 0
    this.y = config.y || 0
    this.width = config.width || 100
    this.height = config.height || 100
    this.fill = config.fill
    this.stroke = config.stroke
    this.strokeWidth = config.strokeWidth || 1
    this.shadowBlur = config.shadowBlur
    this.shadowColor = config.shadowColor || 'black'
  }
}
class Rect extends Shapes{
  constructor(context,options={}){
    super(options)
    this.cornerRadius = options.cornerRadius
    this.draw(context)
  }
  draw(context){
    const { x, y, width, height, cornerRadius, fill, stroke, strokeWidth, shadowBlur, shadowColor } = this
    context.beginPath()
    if(!cornerRadius){
      context.rect(x,y,width,height)
    }else{
      let topLeft = 0;
      let topRight = 0;
      let bottomLeft = 0;
      let bottomRight = 0;
      if(typeof cornerRadius === 'number'){
        topLeft = topRight = bottomLeft = bottomRight = Math.min(cornerRadius,width/2,height/2)
      }
      if(Object.prototype.toString.call(cornerRadius)==='[object Array]'){
        topLeft = Math.min(cornerRadius[0] || 0, width / 2, height / 2);
        topRight = Math.min(cornerRadius[1] || 0, width / 2, height / 2);
        bottomRight = Math.min(cornerRadius[2] || 0, width / 2, height / 2);
        bottomLeft = Math.min(cornerRadius[3] || 0, width / 2, height / 2);
      }
      context.moveTo(topLeft+x, 0+y);
      context.lineTo(width-topRight+x, 0+y);
      context.arc(
        width - topRight + x,
        topRight + y,
        topRight,
        (Math.PI * 3) / 2,
        0,
        false
      );
      context.lineTo(width+x,height - bottomRight + y)
      context.arc(
        width - bottomRight + x,
        height - bottomRight + y,
        bottomRight,
        0,
        Math.PI / 2,
        false
      )
      context.lineTo(bottomLeft + x, height + y)
      context.arc(
        bottomLeft+x,
        height-bottomLeft+y,
        bottomLeft,
        Math.PI/2,
        Math.PI,
        false
      )
      context.lineTo(0+x,topLeft+y)
      context.arc(
        topLeft+x,
        topLeft+y,
        topLeft,
        Math.PI,
        (Math.PI*3)/2,
        false
      )
    }
    context.closePath()
    context.shadowColor= shadowColor
    context.shadowBlur = shadowBlur
    context.lineWidth = strokeWidth
    stroke&&(context.strokeStyle = stroke)
    stroke&&context.stroke()
    fill&&(context.fillStyle = fill)
    fill&&context.fill()
  }
}