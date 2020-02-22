import React,{useRef,useEffect} from 'react';

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

const CM = () => {
  const cm_placeholder = useRef(null)

  useEffect(()=>{
    const commonOptions = {
      value: "function myScript(){return 100;}\n",
      mode:  "javascript",
      theme:'material',
      // 样式相关
      height:'1000px',
      // 代码折叠相关
      lineNumbers: true,
      lineWrapping:true,
      foldGutter: true,
      gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      extraKeys:{"Ctrl-Space":"autocomplete"}, //ctrl-space唤起智能提示
      matchBrackets:true,  //括号匹配
      autoCloseBrackets:true,
    }

    const editor = CodeMirror.fromTextArea(cm_placeholder.current,{
      ...commonOptions,
      styleActiveLine:true,
    })
  },[])
  return (
    <textarea ref={cm_placeholder}>
    </textarea>
  )
};

export default CM;