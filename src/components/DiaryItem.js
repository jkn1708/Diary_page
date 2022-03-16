import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton"

const DiaryItem = ({id,emotion,content,date}) => {
    const navigate = useNavigate()

    const strDate =new Date(parseInt(date)).toLocaleDateString();

    const goDatail = ()=>{
        navigate(`/diary/${id}`)
    }
    const goEdit = ()=>{
        navigate(`/Edit/${id}`)
    }

    return(
        <div className="DiaryItem">
            <div className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")} onClick={goDatail}>
                <img src={process.env.PUBLIC_URL +`assets/reaction${emotion}.png`}/>
            </div>
            <div className="info_wrapper" onClick={goDatail}>
                <div className="diary_date">{strDate}</div>
                <div className="diary_content_preview">{content.slice(0,30)}</div>
            </div>
            <div className="btn_wrapper" onClick={goEdit}>
                <MyButton text={"수정하기"}/>
            </div>
        </div>


    )
}

export default DiaryItem