package com.ssafy.ain.idealperson.service.impl;

import com.ssafy.ain.idealperson.repository.IdealPersonRepository;
import com.ssafy.ain.idealperson.service.IdealPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IdealPersonServiceImpl implements IdealPersonService {

    private final IdealPersonRepository idealPersonRepository;
}