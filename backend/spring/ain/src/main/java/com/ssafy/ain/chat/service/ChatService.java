package com.ssafy.ain.chat.service;

import com.ssafy.ain.chat.dto.ChatDTO.*;

public interface ChatService {
    AddIdealPersonChatResponse addIdealPersonChat(Long memberId, Long idealPersonId, AddIdealPersonChatRequest addIdealPersonChatRequest);
    GetRecentDialogsResponse getRecentDialogs(Long memberId, Long idealPersonId, GetRecentDialogsRequest getRecentDialogsRequest);
}