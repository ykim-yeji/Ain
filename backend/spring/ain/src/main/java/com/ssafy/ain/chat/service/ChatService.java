package com.ssafy.ain.chat.service;

import com.ssafy.ain.chat.dto.ChatDTO.*;
import com.ssafy.ain.chat.dto.ChatOpenFeignDTO.*;
import com.ssafy.ain.global.dto.OpenFeignResponse;

public interface ChatService {
    AddIdealPersonChatResponse addIdealPersonChat(Long memberId, Long idealPersonId, AddIdealPersonChatRequest addIdealPersonChatRequest);
    GetRecentDialogsResponse getRecentDialogs(GetRecentDialogsRequest getRecentDialogsRequest);
    void deleteIdealPersonChat(Long memberId, Long idealPersonId);
}