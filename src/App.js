import React,{ useEffect, useReducer, useRef } from 'react';

import './App.css';
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Home from './pages/home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

export const DiaryStateContext = React.createContext();
export const DiaryDispachContext = React.createContext();

const reducer = (state,action) =>{
  let newState = []
  switch(action.type){
    case 'INIT':{
      return action.data
    }
    case 'CREATE':{

      newState =[action.data,...state]
      break
    }
    case 'REMOVE':{
      newState= state.filter((it)=>it.id !== action.targetId)
      break
    }
    case 'EDIT':{
      newState = state.map((it)=>it.id === action.data.id ? {...action.data}:it)
      break
    }
    default:
      return state
  }
  localStorage.setItem("diary",JSON.stringify(newState))
  return newState
}


function App() {


  const [data,dispatch]=useReducer(reducer,[])


  const dataId=useRef(3)

  useEffect(()=>{
    const localData = localStorage.getItem("diary")
    if (localData){
      const diaryList = JSON.parse(localData).sort((a,b)=>b-a)
      dataId.current =parseInt(diaryList[0].id)+1

      dispatch({type:"INIT",data:diaryList})
    }

  },[])



  //create

  const onCreate = (date,content,emotion)=> {
    dispatch({
      type: "CREATE",
      data:{
        id:dataId.current,
        date:new Date(date).getTime(),
        content,
        emotion,
      }     
    })
    dataId.current +=1
  }

  //remove
  const onRemove = (targetId)=>{
    dispatch({
      type:"REMOVE",targetId
    })
  }

  //edit

  const onEdit = (targetId, date, content, emotion)=>{
    dispatch({
      type:"EDIT",
      data:{
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    })
  }



  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispachContext.Provider value={{onCreate,onEdit,onRemove}}>
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/new" element={<New/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/diary/:id" element={<Diary/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    </DiaryDispachContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
