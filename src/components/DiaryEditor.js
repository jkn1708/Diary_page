
import MyHeader from "./MyHeader"
import MyButton from "./MyButton"
import { useNavigate } from "react-router-dom"
import { useState,useRef, useContext, useEffect } from "react"
import EmotionItem from "./EmotionItem";
import { DiaryDispachContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";





const DiaryEditor = ({isEdit,originData}) => {
    const [emotion,setEmotion] = useState(3)
    const [date, setDate] = useState(getStringDate(new Date()));
    const navigate = useNavigate()
    const [content,setContent] = useState("")
    const contentRef = useRef()
    const {onCreate,onEdit}= useContext(DiaryDispachContext);

    const handleClickEmote = (emotion)=>{
        setEmotion(emotion)
    }
    useEffect(()=>{
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))))
            setEmotion(originData.emotion)
            setContent(originData.content)
        }

    },[isEdit,originData])

    const handeSubmit = () =>{
        if (content.length < 1){
            contentRef.current.focus()
            return
        }
        if(window.confirm(isEdit ? "일기를 수정하시겠습니까?": "새로운 일기를 작성하시겠습니까?")){
            if(!isEdit){
                onCreate(date,content,emotion);
            }
            else{
                onEdit(originData.id, date, content, emotion);
            }
        }
        
        navigate("/",{replace:true})
    }

    

    return(
        <div className="DiaryEditor">
            <MyHeader
            headText={isEdit ? "일기 수정하기":"새 일기쓰기"}
            leftChild={<MyButton text={"< 뒤로가기"} onClick={()=> navigate(-1)}/>}
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input className="input_date" 
                        value={date} onChange={(e)=>setDate(e.target.value)} type={"date"}/>
                    </div>
                </section>
            </div>
            <section>
                <h4>오늘의 감정</h4>
                <div className="input_box emotion_list_wrapper">
                    {emotionList.map((it)=>(
                        <div key={it.emotion_id}>
                            <EmotionItem key={it.emotion_id} {...it} onClick ={handleClickEmote}
                            isSelected={it.emotion_id === emotion}
                            />
                        </div>
                    ))}

                </div>
            </section>
            <section>
                <h4>오늘의 일기</h4>
                <div className="input_box text_wrapper">
                    <textarea 
                    placeholder="오늘 하루는?"
                    ref={contentRef} 
                    value={content} 
                    onChange={(e)=>setContent(e.target.value)}/>
                </div>
            </section>
            <section>
                <div className="control_box">
                    <MyButton text={"취소하기"} onClick={()=> navigate(-1)}/>
                    <MyButton text={"작성완료"} onClick={handeSubmit} type={"positive"}/>
                </div>
            </section>
        </div>
    )
}

export default DiaryEditor