package com.ssafy.ain.idealperson.controller;

import com.ssafy.ain.global.dto.ApiResponse;
import com.ssafy.ain.global.dto.UserPrincipal;
import com.ssafy.ain.idealperson.dto.IdealPersonDTO.*;
import com.ssafy.ain.idealperson.service.IdealPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.ssafy.ain.global.constant.SuccessCode;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ideal-people")
public class IdealPersonController {

    private final IdealPersonService idealPersonService;

    @GetMapping("")
    public ApiResponse<?> getAllIdealPerson(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ApiResponse.success(SuccessCode.GET_IDEAL_PEOPLE,
                idealPersonService.getAllIdealPerson(userPrincipal.getUserInfoDTO().getMemberId()));
    }

    @PatchMapping("/ranks")
    public ApiResponse<?> modifyRankingOfIdealPeople(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                                     @RequestBody ModifyRankingOfIdealPeopleRequest modifyRankingOfIdealPeopleRequest) {
        idealPersonService.modifyRankingOfIdealPeople(
                userPrincipal.getUserInfoDTO().getMemberId(),
                modifyRankingOfIdealPeopleRequest.getIdealPersonRankings());
        return ApiResponse.success(SuccessCode.MODIFY_RANKING_OF_IDEAL_PEOPLE);
    }

    @GetMapping("/names")
    public ApiResponse<?> getNameOfIdealPerson(@RequestBody GetNameOfIdealPersonRequest getNameOfIdealPersonRequest) {
        return ApiResponse.success(SuccessCode.GET_NAME_OF_IDEAL_PERSON,
                idealPersonService.getNameOfIdealPerson(getNameOfIdealPersonRequest));
    }

    @PostMapping("")
    public ApiResponse<?> addIdealPerson(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                         @ModelAttribute AddIdealPersonRequest addIdealPersonRequest) {
        idealPersonService.addIdealPerson(
                userPrincipal.getUserInfoDTO().getMemberId(),
                addIdealPersonRequest);
        return ApiResponse.success(SuccessCode.ADD_IDEAL_PERSON);
    }

    @DeleteMapping("/{idealPersonId}")
    public ApiResponse<?> removeIdealPerson(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                            @PathVariable Long idealPersonId) {
        idealPersonService.removeIdealPerson(userPrincipal.getUserInfoDTO().getMemberId(), idealPersonId);
        return ApiResponse.success(SuccessCode.REMOVE_IDEAL_PERSON);
    }

    @PatchMapping("/{idealPersonId}/nicknames")
    public ApiResponse<?> modifyIdealPersonNickname(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                                    @PathVariable Long idealPersonId,
                                                    @RequestBody ModifyIdealPersonNicknameRequest idealPersonNickname) {
        idealPersonService.modifyIdealPersonNickname(userPrincipal.getUserInfoDTO().getMemberId(),
                idealPersonId, idealPersonNickname.getIdealPersonNickname());
        return ApiResponse.success(SuccessCode.MODIFY_IDEAL_PERSON_NICKNAME);
    }

    @GetMapping("/count")
    public ApiResponse<?> getIdealPersonCount(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ApiResponse.success(SuccessCode.GET_IDEAL_PERSON_COUNT,
                idealPersonService.getIdealPersonCount(userPrincipal.getUserInfoDTO()
                        .getMemberId()));
    }
}