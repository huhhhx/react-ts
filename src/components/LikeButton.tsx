import React,{useState , useEffect,useRef,useContext} from "react";
import useMousePosition from "../hooks/useMousePosition";
import { themeContext } from "../App";
const  LikeButton : React.FC = () =>{
    const [like,setLike] = useState(0);
    const [on,setOn] = useState(false);
    const likeRef = useRef(0)
    const didMountRef = useRef(false);
    const domRef = useRef<HTMLInputElement>(null);

    const positions = useMousePosition()

    // 接收context
    const theme = useContext(themeContext)


    useEffect(()=>{
        document.title = `点击了${like}次`
    })

    useEffect(()=>{
        // 模拟生命周期函数
        if(didMountRef.current){
            console.log('update')
        }else {
            didMountRef.current = true;
        }
    })

    // useEffect(()=>{
    //     if(domRef && domRef.current) {
    //         domRef.current.focus()
    //     }

    // })
    function handleAlertClick (){
        setTimeout(() => {
            alert(`you clicked on ${likeRef.current}`)
        }, 3000);
    }
    return (
       <div>
        <input type="text" ref={domRef}></input>
            <h2>X :{positions.x}, Y :{positions.y}</h2>
            <button style={theme} onClick={() => { on ? setLike(like + 1) : setLike(like) ;likeRef.current++;}}>
                {like} 👍
            </button>
            <button onClick={()=>handleAlertClick()}>alert</button>
            <br></br>
            <button onClick={()=>setOn(!on)}>{on ? 'on' : 'off'}</button>
       </div>
    )
};

export default LikeButton;