import React from 'react'
import { useParams } from 'react-router-dom'
import Canvas from './Canvas'
import SettingBar from './SettingBar'
import ToolBar from './ToolBar'

const Room = () => {
    const {id} = useParams()

  return (
    <>
        <ToolBar id={id}/>
        <SettingBar id={id}/>
        <Canvas id={id}/>
    </>
  )
}

export default Room