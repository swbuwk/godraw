import Tool from "./Tool"

export default class Brush extends Tool {
    mouseDown = false

    constructor(canvas, socket, id) {
        super(canvas, socket, id)
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)

    }

    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.emit("draw", {
            id: this.id,
            tool: {
                type: "end"
            }
        })
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
            this.socket.emit("draw", {
                id: this.id,
                tool: {
                    type: "brush",
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    stroke: this.ctx.strokeStyle,
                    lineWidth: this.ctx.lineWidth
                }
            })
        }
    }

    static draw(ctx, stroke, lineWidth, x, y) {
        ctx.strokeStyle = stroke
        ctx.lineWidth = lineWidth
        ctx.lineTo(x,y)
        ctx.stroke()
    }
}