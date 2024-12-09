//应用的入口点，用于挂载 React 组件到 DOM。
//引入react核心库
import React from 'react'
//引入react-dom用于渲染
import ReactDOM from 'react-dom/client'
//引入App组件
import App from './App/App'

// render过时了，用不了
// 渲染app组件到页面
// ReactDOM.render(<App/>,document.getElementById,('root'));

// Use ReactDOM.createRoot()
const root = ReactDOM.createRoot(document.getElementById('root')); // Create root for the app

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

