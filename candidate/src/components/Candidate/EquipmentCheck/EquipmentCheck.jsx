import React,{useState,useRef,useEffect,useContext} from 'react';
import {NavLink} from 'react-router-dom'
import './EquipmentCheck.less'

import Recorder from 'js-audio-recorder';

import {ConnectionContext} from '../Candidate'

const EquipmentCheck = (props) => {
  // hooks
  const {context} = useContext(ConnectionContext)
  console.log(context)
  const video = useRef()
  const recordCover = useRef()

  const [recording,setRecording] = useState(false)
  const [notStart,setNotStart] = useState(true)
  const [recorder,setRecorder] = useState(new Recorder({
    sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
    sampleRate: 16000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
    numChannels: 1,         // 声道，支持 1 或 2， 默认是1
    compiling: false,       // 是否边录边转换，默认是false
  }))

  const [stream,setStream] = useState()

  // 视频
  useEffect(() => {
    const constraints = { video: true }
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
      setStream(mediaStream)
      video.current.srcObject = mediaStream;
      video.current.onloadedmetadata = function(e) {
        video.current.play()
      }
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); }); // 总是在最后检查错误
  },[])

  // 录音
  function startRecord(){
    setRecording(true)
    recorder.onprogress = (params) => {
      // icon 总共宽 29.6，控制音量动画
      const clipWidth = (1-params.vol*0.01)*38
      recordCover.current.style.clipPath = `inset(0px ${clipWidth}px 0px 0px)`
    }
    recorder.start().then(() => {
        console.log('开始录音')
    }, (error) => {
        console.log(`异常了,${error.name}:${error.message}`)
    })
  }
  function endRecord(){
    setRecording(false)
    recorder.stop()
    recordCover.current.style.clipPath = ''
    console.log('录音结束')
  }
  function playRecord(){
    console.log('播放录音')
    setNotStart(false)
    recorder.play()
    // 播放结束后改变图形
    setTimeout(() => {
      setNotStart(true)
    },recorder.duration*1000)
  }
  function stopStream(){
    // 停止流
    stream.getTracks()[0].stop()
  }

  return context===null?<div></div>:(
    <section className='equipmentCheck_box'>
      <div className="check_box">
        <header className="check_header">
          <div className="title">通讯设备检测</div>
          <div className="holder"></div>
        </header>
        <div className="check_body">
          <div className="tips">
            <p className="welcome">{context.candidateInfo.name},欢迎参加XX在线面试</p>
            <p className="direction">请允许本网页对摄像头和麦克疯的使用权限，并确保通讯设备的正常使用</p>
          </div>
          <div className="audio_check">
            <div className="row1">
              <p>通话设备检测</p>
              <p>请按照提示检查麦克风设备</p>
              <div className="line"></div>
            </div>
            <div className="record">
              <p>1.点击下面的按钮进行录音</p>
              {!recording&&
              <a className='record_btn' onClick={startRecord}>
                <i className="iconfont icon-start"></i>
                录音开始
              </a>}
              {recording&&
              <a className='record_btn' onClick={endRecord}>
                <i className="iconfont icon-stop"></i>
                录音结束
              </a>}
              <span className="volume_module">
                <i className='iconfont icon-volume base'></i>
                <i className='iconfont icon-volume cover' ref={recordCover}></i>
              </span>
            </div>
            <div className="record">
              <p>2.点击下面的按钮播放录音</p>
              <a className='record_btn' onClick={playRecord}>
              {notStart?
                <i className='iconfont icon-play'></i>:
                <i className='iconfont icon-pause'></i>
              }
                播放录音
              </a>
            </div>
          </div>
          <div className="video_check">
            <div className="row1">
              <p>视频设备检测</p>
              <p>请保持人脸清晰，不要有物品遮挡摄像头</p>
              <div className="line"></div>
            </div>
            <video ref={video} width='350px' height='170px'>

            </video>
          </div>
          <NavLink to={`/candidate/room`} className='btn confirm_info' onClick={stopStream}>确定</NavLink>
        </div>
      </div>
    </section>
  );
};

export default EquipmentCheck;