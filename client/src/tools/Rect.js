import Tool from "./Tool"

export default class Rect extends Tool {
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
                type: "rect",
                startX: this.startX,
                startY: this.startY,
                w: this.w,
                h: this.h,
                fill: this.ctx.fillStyle,
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
            this.w = currentX - this.startX
            this.h = currentY - this.startY
            this.draw(this.startX, this.startY, this.w, this.h)
        }
    }

    draw(x, y, w, h) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x, y, w, h)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    static quickDraw(ctx, fill, stroke, lineWidth, x, y, w, h) {
        ctx.fillStyle = fill
        ctx.strokeStyle = stroke
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        ctx.rect(x, y, w, h)
        ctx.fill()
        ctx.stroke()
    }
}