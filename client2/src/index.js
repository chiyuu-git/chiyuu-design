import React,{useRef,useEffect,useState} from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store'
import { Provider } from 'react-redux'

import Frame from './Frame'

ReactDOM.render(
  (
  <Provider store={store}>
      <Frame/>
  </Provider>
  ), 
  document.getElementById('root'));