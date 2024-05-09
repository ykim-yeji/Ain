package com.ssafy.ain.idealperson.dto;

import com.ssafy.ain.global.constant.Gender;
import com.ssafy.ain.idealperson.constant.Mbti;
import com.ssafy.ain.idealperson.entity.IdealPerson;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

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

    @Getter
    @Setter
    public static class ModifyRankingOfIdealPeopleRequest {
        private Long[] idealPersonRankings;
    }

    @Getter
    @Setter
    public static class GetNameOfIdealPersonRequest {
        private String idealPersonGender;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class GetNameOfIdealPersonResponse {
        private String idealPersonName;
    }

    @Getter
    @Setter
    public static class AddIdealPersonRequest {
        private String idealPersonFullName;
        private String idealPersonMBTI;
        private String idealPersonGender;
        private MultipartFile idealPersonImage;

        public IdealPerson toEntity(Long memberId, String idealPersonImageUrl, String threadId) {
            return IdealPerson.builder()
                    .memberId(memberId)
                    .fullName(idealPersonFullName)
                    .nickname(idealPersonFullName)
                    .mbti(Mbti.valueOf(idealPersonMBTI))
                    .gender(Gender.valueOf(idealPersonGender))
                    .idealPersonImageUrl(idealPersonImageUrl)
                    .assistantId("assistantId")
                    .threadId(threadId)
                    .ranking(0)
                    .build();
        }
    }

    @Getter
    @Setter
    public static class GetIdealPersonThreadIdResponse {
        private String idealPersonThreadId;
    }
}