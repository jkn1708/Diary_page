const env =process.env
env.PUBLIC_URL = env.PUBLIC_URL || ""


export const emotionList = [
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
