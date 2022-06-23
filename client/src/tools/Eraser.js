import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas, socket, id) {
        super(canvas, socket, id)
        this.listen()
    }

    

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
            this.socket.emit("draw", {
                id: this.id,
                tool: {
                    type: "eraser",
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    lineWidth: this.ctx.lineWidth
                }
            })
        }
    }

    static draw(ctx, lineWidth, x, y) {
        ctx.strokeStyle = "white"
        ctx.lineWidth = lineWidth
        ctx.lineTo(x,y)
        ctx.stroke()
    }
}