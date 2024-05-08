package com.ssafy.ain.idealperson.controller;

import com.ssafy.ain.global.dto.ApiResponse;
import com.ssafy.ain.idealperson.dto.IdealPersonDTO.*;
import com.ssafy.ain.idealperson.service.IdealPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.ssafy.ain.global.constant.SuccessCode;
import org.springframework.security.core.Authentication;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://myain.co.kr"})
@RequestMapping("/ideal-people")
public class IdealPersonController {

    private final IdealPersonService idealPersonService;

    @GetMapping("")
    public ApiResponse<?> getAllIdealPerson(Authentication authentication) {
        return ApiResponse.success(SuccessCode.GET_IDEAL_PEOPLE,
                idealPersonService.getAllIdealPerson("1"));
    }

    @PatchMapping("/ranks")
    public ApiResponse<?> modifyRankingOfIdealPeople(Authentication authentication,
            @RequestBody ModifyRankingOfIdealPeopleRequest modifyRankingOfIdealPeopleRequest) {
        idealPersonService.modifyRankingOfIdealPeople(modifyRankingOfIdealPeopleRequest);
        return ApiResponse.success(SuccessCode.MODIFY_RANKING_OF_IDEAL_PEOPLE);
    }

    @PostMapping("/names")
    public ApiResponse<?> getNameOfIdealPerson(@RequestBody GetNameOfIdealPersonRequest getNameOfIdealPersonRequest) {
        return ApiResponse.success(SuccessCode.GET_NAME_OF_IDEAL_PERSON,
                idealPersonService.getNameOfIdealPerson(getNameOfIdealPersonRequest));
    }
}