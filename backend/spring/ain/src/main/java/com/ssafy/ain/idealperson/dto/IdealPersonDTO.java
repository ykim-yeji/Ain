package com.ssafy.ain.idealperson.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class IdealPersonDTO {
    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class GetIdealPeopleResponse {
        List<GetIdealPersonResponse> idealPeople;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class GetIdealPersonResponse {
        private Long idealPersonId;
        private String idealPersonFullName;
        private String idealPersonNickname;
        private String idealPersonImageUrl;
        private int idealPersonRank;
        private String idealPersonThreadId;
    }
}