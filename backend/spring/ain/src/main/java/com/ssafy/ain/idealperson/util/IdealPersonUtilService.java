package com.ssafy.ain.idealperson.util;

import com.ssafy.ain.global.exception.InvalidException;
import com.ssafy.ain.global.exception.NoExistException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import static com.ssafy.ain.global.constant.ErrorCode.INVALID_SAME_IDEAL_PERSON_NICKNAME;
import static com.ssafy.ain.global.constant.ErrorCode.NOT_EXISTS_IDEAL_PERSON_NICKNAME;

@Component
public class IdealPersonUtilService {

    public void validateNicknameNotInput(String idealPersonNickname) {
        if (!StringUtils.hasText(idealPersonNickname)) {
            throw new NoExistException(NOT_EXISTS_IDEAL_PERSON_NICKNAME);
        }
    }

    public void validateSameNickname(String originNickname, String newNickname) {
        if (originNickname.equals(newNickname)) {
            throw new InvalidException(INVALID_SAME_IDEAL_PERSON_NICKNAME);
        }
    }
}