import { createSlice } from "@reduxjs/toolkit";

const initialState={
Language:'ENG'

}

const WebState=createSlice({
name:'webState',
initialState,
reducers:{
    ChangeLanguage:(state,action)=>{
  
     state.Language=action.payload;
    }



}


})
export const { ChangeLanguage}=WebState.actions
export default WebState.reducer