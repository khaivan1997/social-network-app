package com.example.tintok.Model;

import androidx.lifecycle.MutableLiveData;

import com.example.tintok.Communication.RestAPI_model.ChatForm;

import java.util.ArrayList;

public class ChatRoom  {
    private String chatRoomID;
    private ArrayList<String> memberIDs;
    public MutableLiveData<ArrayList<MessageEntity>> messageEntities;

    public ChatRoom(){
        messageEntities = new MutableLiveData<>();
    }

    public String getChatRoomID() {
        return chatRoomID;
    }

    public void setChatRoomID(String chatRoomID) {
        this.chatRoomID = chatRoomID;
    }

    public ArrayList<String> getMemberIDs() {
        return memberIDs;
    }

    public void setMemberIDs(ArrayList<String> memberIDs) {
            this.memberIDs = memberIDs;
    }

    public MutableLiveData<ArrayList<MessageEntity>> getMessageEntities() {
        return messageEntities;
    }

    public void postMessageEntities(ArrayList<MessageEntity> messageEntities) {
        this.messageEntities.postValue(messageEntities);
    }
    public void setMutableMessengerEntities(MutableLiveData<ArrayList<MessageEntity>> msgs){
        this.messageEntities = msgs;
    }
    public void setMessageEntities(ArrayList<MessageEntity> messageEntities) {
        this.messageEntities.setValue(messageEntities);
    }
}
