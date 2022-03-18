import React from "react"
const EmotionItem = ({isSelected,emotion_id,emotion_img,emotion_desc,onClick}) =>{

    return(
    <div className={["EmotionItem", isSelected ? `_on${emotion_id}`: `_off`].join(" ")}
        onClick={()=>onClick(emotion_id)}>
            <img src={emotion_img} />
            <span>{emotion_desc}</span>
        </div>

    )


}

export default React.memo(EmotionItem)