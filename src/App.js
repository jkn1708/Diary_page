import React,{ useReducer, useRef } from 'react';

import './App.css';
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Home from './pages/home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

//components
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

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
    }
    default:
      return state
  }
  return newState
}
const dummyDate = [
  {
    id:1,
  emotion:1,
  content:"첫번째 일기",
  date : 1647421200990
  },
  {
    id:2,
  emotion:2,
  content:"두번째 일기",
  date : 1647421200991
  }
]

function App() {
  const [data,dispatch]=useReducer(reducer,dummyDate)


  const dataId=useRef(0)

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

  const onEdit = (targetId,date,content,emotion)=>{
    dispatch({
      type:"EDIT",
      data:{
        id:targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
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
        <Route path="/edit" element={<Edit/>}/>
        <Route path="/diary/:id" element={<Diary/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    </DiaryDispachContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
