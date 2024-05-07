package com.ssafy.ain.idealperson.controller;

import com.ssafy.ain.global.dto.ApiResponse;
import com.ssafy.ain.idealperson.service.IdealPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ssafy.ain.global.constant.SuccessCode;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ideal-people")
public class IdealPersonController {

    private final IdealPersonService idealPersonService;

    @GetMapping("")
    public ApiResponse<?> getIdealPeopleList() {
        return ApiResponse.success(SuccessCode.GET_IDEAL_PEOPLE_LIST,
                idealPersonService.getIdealPeopleList("1"));
    }
}