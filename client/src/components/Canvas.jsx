import { useEffect, useState } from "react"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { socket } from "../App"
import { setCanvas } from "../store/reducers/canvasSlice"
import { setTool } from "../store/reducers/toolSlice"
import "../styles/canvas.scss"
import axios from "axios"
import Brush from "../tools/Brush"
import Circle from "../tools/Circle"
import Eraser from "../tools/Eraser"
import Line from "../tools/Line"
import Rect from "../tools/Rect"
import Modal from "./Modal"

const Canvas = ({id}) => {
    const canvasRef = useRef()
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [modal, setModal] = useState(true)

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d")
        axios.get(`https://godraw-backend.herokuapp.com/image?id=${id}`).then((res) => {
          const img = new Image()
          img.src = res.data
          img.onload = () => {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
            ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
          }
        })
        dispatch(setCanvas(canvasRef.current))
        dispatch(setTool(new Brush(canvasRef.current, socket, id)))
        socket.on("update_canvas", data => {
          const strokeStyle = ctx.strokeStyle
          const fillStyle = ctx.fillStyle
          const lineWidth = ctx.lineWidth
          const tool = data.tool
          switch (tool.type) {
            case "brush": {
              Brush.draw(ctx, tool.stroke, tool.lineWidth, tool.x, tool.y)
              break
            }
            case "rect": {
              Rect.quickDraw(ctx, tool.fill, tool.stroke, tool.lineWidth, tool.startX, tool.startY, tool.w, tool.h)
              ctx.beginPath()
              break
            }
            case "circle": {
              Circle.quickDraw(ctx, tool.fill, tool.stroke, tool.lineWidth, tool.startX, tool.startY, tool.w, tool.h)
              ctx.beginPath()
              break
            }
            case "eraser": {
              Eraser.draw(ctx, tool.lineWidth, tool.x, tool.y)
              break
            }
            case "line": {
              Line.quickDraw(ctx, tool.stroke, tool.lineWidth, tool.startX, tool.startY, tool.x, tool.y)
              ctx.beginPath()
              break
            }
            case "end": {
              ctx.beginPath()
              break
            }
          }
          ctx.strokeStyle = strokeStyle
          ctx.fillStyle = fillStyle
          ctx.lineWidth = lineWidth
        })
    })


    const connect = () => {
      if (name) {
        const user = {
          name,
          id
        }
        console.log(user)
        socket.emit("enter", user)
        setModal(false)
      }
    }

    const mouseUpHandler = () => {
      axios.post(`https://godraw-backend.herokuapp.com/image?id=${id}`, {img: canvasRef.current.toDataURL()}).then(() => {})
    }


  return (
    <>
    {modal 
    ? 
    <Modal>
      <h2>Введите ваш никнейм</h2>
      <input 
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}>
        </input>
      <button onClick={connect}>Войти</button>
    </Modal> 
    : 
    <></>}
    <div className='canvas'>
        <canvas 
          ref={canvasRef}
          width={600}
          height={400}
          onMouseUp={mouseUpHandler}
          ></canvas>
    </div>
    </>
   
  )
}

export default Canvas
