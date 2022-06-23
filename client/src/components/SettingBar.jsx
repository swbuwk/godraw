import React from 'react'
import { useDispatch } from 'react-redux'
import { setLineWidth, setStrokeColor } from '../store/reducers/toolSlice'
import "../styles/toolbar.scss"


const SettingBar = ({id}) => {
  const dispatch = useDispatch()

  return (
    <div className='settingbar'>
      <label htmlFor='line_width'>Толщина линии</label>
      <input 
        id = "line_width"
        type = "number"
        defaultValue={1}
        min={1}
        max={10}
        onChange={e => {dispatch(setLineWidth(e.target.value))}}></input>
    <label htmlFor='stroke_color'>Цвет обводки</label>
      <input 
        id = "stroke_color"
        type = "color"
        onChange={e => {dispatch(setStrokeColor(e.target.value))}}></input>
    </div>
  )
}

export default SettingBar