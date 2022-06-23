import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../App'
import { setFillColor, setStrokeColor, setTool } from '../store/reducers/toolSlice'
import "../styles/toolbar.scss"
import Brush from '../tools/Brush'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Line from '../tools/Line'
import Rect from '../tools/Rect'

const ToolBar = ({id}) => {
    const dispatch = useDispatch()
    const {canvas} = useSelector(state => state.canvas)

    const changeColor = e => {
      dispatch(setStrokeColor(e.target.value))
      dispatch(setFillColor(e.target.value))
    }

  return (
    <div className='toolbar'>
        <button className='toolbar_btn brush' onClick={() => dispatch(setTool(new Brush(canvas, socket, id)))}/>
        <button className='toolbar_btn rect' onClick={() => dispatch(setTool(new Rect(canvas, socket, id)))}/>
        <button className='toolbar_btn circle' onClick={() => dispatch(setTool(new Circle(canvas, socket, id)))}/>
        <button className='toolbar_btn eraser' onClick={() => dispatch(setTool(new Eraser(canvas, socket, id)))}/>
        <button className='toolbar_btn line' onClick={() => dispatch(setTool(new Line(canvas, socket, id)))}/>
        <input type="color" onChange={(e) => changeColor(e)}></input>
    </div>
  )
}

export default ToolBar