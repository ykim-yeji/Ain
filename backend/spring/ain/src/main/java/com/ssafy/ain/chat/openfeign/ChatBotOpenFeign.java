package com.ssafy.ain.chat.openfeign;

import com.ssafy.ain.chat.dto.ChatBotOpenFeignDTO.*;
import com.ssafy.ain.global.dto.OpenFeignResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "chatBotOpenFeign", url = "https://myain.co.kr/fast/chatbots")
public interface ChatBotOpenFeign {

    @PostMapping("/ideal-people")
    OpenFeignResponse<AddIdealPersonChatBotResponse> addIdealPersonChatBot();
    @DeleteMapping("/ideal-people")
    OpenFeignResponse<?> deletePersonChatBot(DeleteIdealPersonChatBotRequest deleteIdealPersonChatBotRequest);
}