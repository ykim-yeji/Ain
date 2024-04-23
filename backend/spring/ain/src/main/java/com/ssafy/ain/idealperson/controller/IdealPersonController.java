package com.ssafy.ain.idealperson.controller;

import com.ssafy.ain.idealperson.service.IdealPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ideal-people")
public class IdealPersonController {

    private final IdealPersonService idealPersonService;
}