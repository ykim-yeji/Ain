package com.ssafy.ain.global.util;

import org.springframework.data.repository.CrudRepository;

import com.ssafy.ain.global.entity.RefreshToken;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
}