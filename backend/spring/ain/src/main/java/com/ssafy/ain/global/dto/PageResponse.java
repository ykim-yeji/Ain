package com.ssafy.ain.global.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class PageResponse {

    private final List<?> content;
    private final int pageSize; //한 페이지당 데이터 개수
}