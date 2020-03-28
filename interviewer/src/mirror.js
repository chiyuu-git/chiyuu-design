import React,{useRef,useEffect,useState} from 'react'
import ReactDOM from 'react-dom'

import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

import 'codemirror/theme/material.css'
// 智能提示
import 'codemirror/addon/hint/show-hint.css';  
import 'codemirror/addon/hint/show-hint.js';  
import 'codemirror/addon/hint/javascript-hint.js'; 
// 代码折叠相关
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
// 括号匹配
import 'codemirror/addon/edit/matchbrackets'
// 自动补全括号
import 'codemirror/addon/edit/closebrackets'
// 当前行背景高亮
import 'codemirror/addon/selection/active-line'

function Test(){
  const cm_container = useRef(null)
  const cm_receiver = useRef(null)

  useEffect(()=>{
    const commonOptions = {
      value: "function myScript(){return 100;}\n",
      mode:  "javascript",
      theme:'material',
      // 代码折叠相关
      lineNumbers: true,
      lineWrapping:true,
      foldGutter: true,
      gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      extraKeys:{"Ctrl-Space":"autocomplete"}, //ctrl-space唤起智能提示
      matchBrackets:true,  //括号匹配
      autoCloseBrackets:true,
    }

    const editor = CodeMirror(cm_container.current,{
      ...commonOptions,
      styleActiveLine:true,
    })
    const receiver  = CodeMirror(cm_receiver.current,{
      ...commonOptions,
      readOnly:true,
    })

    editor.on('change',function(instance,changeObj){
      const {from,to,text} = changeObj
      receiver.replaceRange(text,from,to)
    })

    // ws Test
    const ws = new WebSocket('ws://localhost:8888')

    ws.onopen = () => {
      console.log('WebSocket onopen')
    }

    ws.onmessage = e => {
      console.log('WebSocket onmessage');
      console.log('WebSocket message received：', e)
      console.log('WebSocket data received：', e.data)
    }

    ws.onclose = e => {
      console.log("WebSocket onclose");
    }
  },[])
  
  return (
    <div>
      <div ref={cm_container}></div>
      <br/>
      <div ref={cm_receiver}></div>
    </div>
  )
}




ReactDOM.render(<Test/>,document.getElementById('root'));

