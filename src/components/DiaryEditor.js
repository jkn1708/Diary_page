
import MyHeader from "./MyHeader"
import MyButton from "./MyButton"
import { useNavigate } from "react-router-dom"
import { useState,useRef, useContext } from "react"
import EmotionItem from "./EmotionItem";
import { DiaryDispachContext } from "../App";

export const getStringDate = (date) => {

    let year = date.getFullYear();
  
    let month = date.getMonth() + 1;
  
    let day = date.getDate();
  
    if (month < 10) {
  
      month = `0${month}`;
  
    }
  
    if (day < 10) {
  
      day = `0${day}`;
  
    }
  
    return `${year}-${month}-${day}`;
  
  };
const emotionList = [
    {
        emotion_id:1,
        emotion_img:process.env.PUBLIC_URL + `/assets/reaction1.png`,
        emotion_desc:'완전 좋음'
    },
    {
        emotion_id:2,
        emotion_img:process.env.PUBLIC_URL + `/assets/reaction2.png`,
        emotion_desc:'좋음'
    },
    {
        emotion_id:3,
        emotion_img:process.env.PUBLIC_URL + `/assets/reaction3.png`,
        emotion_desc:'조금 안좋음'
    },
    {
        emotion_id:4,
        emotion_img:process.env.PUBLIC_URL + `/assets/reaction4.png`,
        emotion_desc:'안좋음'
    },
    

]




const DiaryEditor = () => {
    const [emotion,setEmotion] = useState(3)
    const [date, setDate] = useState(getStringDate(new Date()));
    const navigate = useNavigate()
    const [content,setContent] = useState("")
    const contentRef = useRef()
    const {onCreate}= useContext(DiaryDispachContext)

    const handleClickEmote = (emotion)=>{
        setEmotion(emotion)
    }
    const handeSubmit = () =>{
        if (content.length <1){
            contentRef.current.focus()
            return
        }
        onCreate(date,content,emotion);
        navigate("/",{replace:true})

    }

    return(
        <div className="DiaryEditor">
            <MyHeader
            headText={"새 일기쓰기"}
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