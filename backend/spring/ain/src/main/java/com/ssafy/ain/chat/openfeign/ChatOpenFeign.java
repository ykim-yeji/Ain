package com.ssafy.ain.chat.openfeign;

import com.ssafy.ain.chat.dto.ChatDTO.*;
import com.ssafy.ain.chat.dto.ChatOpenFeignDTO.*;
import com.ssafy.ain.global.dto.OpenFeignResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "ChatOpenFeign", url = "https://myain.co.kr/fast/chats")
public interface ChatOpenFeign {

    @PostMapping("/ideal-people")
    OpenFeignResponse<AddIdealPersonChatOFResponse> addIdealPersonChat(AddIdealPersonChatOFRequest addIdealPersonChatOFRequest);

    @PostMapping("/dialogs")
    OpenFeignResponse<GetIdealPersonChatsOFResponse> getIdealPersonChats(GetIdealPersonChatsRequest getIdealPersonChatsRequest);
}