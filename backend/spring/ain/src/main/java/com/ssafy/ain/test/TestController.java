package com.ssafy.ain.test;

import com.ssafy.ain.global.util.S3Service;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/test")
public class TestController {

    private final S3Service s3Service;

    public TestController(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @GetMapping
    public String getTestResponse() {
        return "ok";
    }

    @PostMapping("/upload-test")
    public String putImageTest(@ModelAttribute ImageReq imageReq) {
        System.out.println("imageReq.file = " + imageReq.getFile());
        return s3Service.upload(imageReq.getFile());
    }
}

@Getter
@Setter
class ImageReq {
    private MultipartFile file;
}
