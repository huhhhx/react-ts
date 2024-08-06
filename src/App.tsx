import React, { useState ,startTransition,useTransition} from 'react';
import LikeButton from './components/LikeButton';
import MouseTracker from './components/MouseTracker';
import useMousePosition from './hooks/useMousePosition';
import useURLLoader from './hooks/useURLLoader';
import logo from './logo.svg';
import './App.css';

interface IShowResult {
  message: string,
  status:string
} 

interface IThemeProps {
  [key : string] : {color :string; background: string}
}
const thmes :IThemeProps = {
  'light' :{
    color:'#000',
    background:'#eee'
  },
  'dark':{
    color:'#fff',
    background:'#222'
  }}
// 创建context
 export const themeContext = React.createContext(thmes.light)

 
function App() {
  const positions = useMousePosition();

  const [data,loading] = useURLLoader('https://dog.ceo/api/breeds/image/random')
  const dogResult = data as IShowResult;

  const [input, setInput] = useState('');
  const [searchDate, setSearchDate] = useState<number[]>([]);
   
  // 查看是否数据渲染了 通过isPending查看
  const [isPending,startTransition] = useTransition()

  function updateInput(e:React.ChangeEvent<HTMLInputElement>){
    const value = e.target.value;
    setInput(value)
   
    // 非紧急的更新 可有一定的延迟
    startTransition(()=>{
      const arr = Array.from({ length: 10000 }, (_, i) => new Date().getTime() + i)
      setSearchDate(arr)
    })
  }

  return (
    <div className="App">
      <themeContext.Provider value={thmes.dark}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>X :{positions.x}, Y :{positions.y}</p>
          <LikeButton></LikeButton>
          <MouseTracker></MouseTracker>
          {/* {loading ? <p>请稍等...</p> : <img src={dogResult && dogResult.message}></img>} */}

          <input type="text" value={input} onChange={updateInput} />
          {isPending && <h1>⏳</h1> }
          {searchDate.map((item)=>
          <option key={item}>{item}</option>)}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </themeContext.Provider>
    </div>
  );
}

export default App;
