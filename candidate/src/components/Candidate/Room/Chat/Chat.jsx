import React, { useEffect,useRef,useContext } from 'react';

import webRTC from './webRTC'
import textChat from './textChat'
import {ConnectionContext} from '../../Candidate'
// import adapter from 'webrtc-adapter';

import './Chat.less'

const Chat = () => {
  const chatRecorder = useRef()

  const {context} = useContext(ConnectionContext)
  const {connection,candidateInfo,interviewerInfo} = context

  useEffect(() => {
    webRTC(connection,candidateInfo.name,interviewerInfo.id)
    textChat(connection,candidateInfo.name,interviewerInfo.id)
    
    const maxHeight = getComputedStyle(chatRecorder.current).height
    chatRecorder.current.style.maxHeight = maxHeight
  },[])

  return (
    <div className="chat_box">
      <div className='video_box'>
        <video id="remoteVideo" autoPlay></video>
        <video id="localVideo" autoPlay muted width='40' height='28' ></video>
        <div className='video_btn' id='videoCover'>
          <a className='icon_btn' id='inviteBtn'><i className='iconfont icon-video'></i><span>视频通话</span></a>
          <i className='iconfont icon-interviewer'></i>
          <a className='icon_btn'><i className='iconfont icon-audio'></i><span>语音通话</span></a>
        </div>
        <div className='video_toolbar'>
          <a className='hangup_btn' id='hangUpBtn'><i className='iconfont icon-hangup'></i>挂断</a>
          <i className='iconfont icon-fullscreen'></i>
        </div>
      </div>
      <div className='interviewer_info'>
        <p>面试官 - {interviewerInfo.name}<span className='status'>离线</span></p>
        <p>
          <i className='iconfont icon-phone'></i>{interviewerInfo.phone}
        </p>
      </div>
      <div className='text_chat'>
        <div className='chat_recorder' ref={chatRecorder}></div>
        <div className='chat_toolbar'>
          <input type='text' placeholder="请输入聊天内容"></input>
          <p><a>常见问题</a><a>按回车键发送</a></p>
        </div>
      </div>
    </div>
  );
};

export default Chat