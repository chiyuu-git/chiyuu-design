import React, { useRef, useEffect, useContext, useState } from 'react';

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

import { ConnectionContext } from '../Room'
import { sendToServer } from '../Chat/webSocket'

const CM = () => {
  const cm_placeholder = useRef(null)
  const { connection, candidateInfo, interviewerInfo } = useContext(ConnectionContext)
  const codeResultBox = useRef(null)
  const [codeResult, setCodeResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [editor, setEditor] = useState(null)
  // NOTE:point
  let myID = interviewerInfo.name + interviewerInfo.phone
  let targetID = candidateInfo.name + candidateInfo.phone

  useEffect(() => {
    const commonOptions = {
      value: "function myScript(){return 100;}\n",
      mode: "javascript",
      theme: 'material',
      // 样式相关
      height: '1000px',
      // 代码折叠相关
      lineNumbers: true,
      lineWrapping: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      extraKeys: { "Ctrl-Space": "autocomplete" }, //ctrl-space唤起智能提示
      matchBrackets: true,  //括号匹配
      autoCloseBrackets: true,
    }

    const editor = CodeMirror.fromTextArea(cm_placeholder.current, {
      ...commonOptions,
      styleActiveLine: true,
    })

    // 代码缓存 #start
    const session = sessionStorage.getItem('code') || `function example(){
  print('print函数，可以用于输出结果')
  return 100;
}\n`
    editor.setValue(session)
    // 代码缓存 #end

    setEditor(editor)

    connection.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data);
      switch (msg.type) {
        case 'codeChange':
          console.log(msg.changeObj)
          const { from, to, text } = msg.changeObj
          editor.replaceRange(text, from, to)
          break
      }
    })
  }, [])

  // console.log(editor.getValue())
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('code', editor.getValue())
  })

  // code 是一段可执行的js字符串，自动输出返回值
  // 提供一个print函数用于输出
  function runCode() {
    let result = null
    try {
      result = Function(`
        return function(print){
          ${editor.getValue()}
        }
      `)()(print)
    }
    catch (error) {
      setCodeResult(error + '')
    }
    setShowResult(true)
  }
  function print(result) {
    setCodeResult(result)
  }


  return (
    <section className='code-mirror'>
      <textarea ref={cm_placeholder}></textarea>
      <div className="code_run">
        <div className="grow_wrap">
          <a className='result_btn' onClick={() => setShowResult(!showResult)}>
            运行结果
            <i className={`iconfont ${showResult ? 'icon-arrow_down' : 'icon-arrow_up'}`}></i>
          </a>
        </div>
        <a className='btn run_btn' onClick={runCode}>提交运行</a>
      </div>
      <div className="code_result_box" ref={codeResultBox} style={showResult ? { display: 'block' } : { display: 'none' }}>
        输出如下：{codeResult}
      </div>
    </section>
  )
};

export default CM;