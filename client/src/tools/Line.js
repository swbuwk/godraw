import Tool from "./Tool"

export default class Line extends Tool {
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
                type: "line",
                startX: this.startX,
                startY: this.startY,
                x: e.pageX - e.target.offsetLeft,
                y: e.pageY - e.target.offsetTop,
                stroke: this.ctx.strokeStyle,
                lineWidth: this.ctx.lineWidth
            }
        })
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        
        this.ctx.beginPath()
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft
            let currentY = e.pageY - e.target.offsetTop
            this.draw(this.startX, this.startY, currentX, currentY)
        }
    }

    draw(x, y, x1, y1) {
        this.ctx.moveTo(x, y)
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.lineTo(x1, y1)
            this.ctx.stroke()
            this.ctx.beginPath()
        }
    }

    static quickDraw(ctx, stroke, lineWidth, x, y, x1, y1) {
        ctx.strokeStyle = stroke
        ctx.lineWidth = lineWidth
        ctx.moveTo(x,y)
        ctx.lineTo(x1,y1)
        ctx.stroke()
    }
}