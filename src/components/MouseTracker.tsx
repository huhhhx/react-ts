import React,{useEffect,useState} from "react";

const MouseTracker: React.FC = ()=>{
    const [positions, setPositions] = useState({x:0,y:0})
    // 每次渲染完后会执行useEfect函数
    useEffect(()=>{
        const updateMouse = (e:MouseEvent)=>{
            setPositions({x:e.clientX,y:e.clientY})
        }
        document.addEventListener('click',updateMouse)
        // 返回一个函数 在执行下一个effect时清除上一次的effect
        return ()=>{
            document.removeEventListener('click',updateMouse)
        }
        // 如果第二个参数是一个空数组，就表明副效应参数没有任何依赖项。
        // 因此，副效应函数这时只会在组件加载进入 DOM 后执行一次，后面组件重新渲染，就不会再次执行。
        // 这很合理，由于副效应不依赖任何变量，所以那些变量无论怎么变，副效应函数的执行结果都不会改变，所以运行一次就够了。
    },[])
    return (
        <p>X :{positions.x}, Y :{positions.y}</p>
    )
}
export default MouseTracker