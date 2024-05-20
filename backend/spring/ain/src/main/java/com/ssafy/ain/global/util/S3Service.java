package com.ssafy.ain.global.util;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.ain.global.exception.InvalidException;
import com.ssafy.ain.global.exception.NoExistException;
import com.ssafy.ain.global.exception.ServerException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

import static com.ssafy.ain.global.constant.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

    // Todo: 이미지 업로드
    public String upload(MultipartFile file) {
        if (Objects.isNull(file)) {
            throw new NoExistException(NOT_EXISTS_FILE);
        }

        String filename = getFileUuidName(
                Objects.requireNonNull(file.getOriginalFilename(), NOT_EXISTS_FILE_TO_UPLOAD.getMessage())
        );

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());

        try {
            amazonS3Client.putObject(
                    new PutObjectRequest(bucket, filename, file.getInputStream(), metadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );
        } catch (IOException e) {
            throw new ServerException(NOT_UPLOADS_FILE);
        }
        return amazonS3Client.getUrl(bucket, filename).toString();
    }

    // Todo: 이미지 삭제
    public void delete(String url) {
        if (url == null || !url.contains(String.format("https://%s.s3.%s.amazonaws.com/", bucket, region))) {
            throw new InvalidException(INVALID_URL_FORMAT);
        }

        String file = url.split("https://" + bucket + ".s3." + region + ".amazonaws.com/")[1];

        if (amazonS3Client.doesObjectExist(bucket, file)) {
            amazonS3Client.deleteObject(bucket, file);
        }
    }

    private String getFileUuidName(String name) {
        return UUID.randomUUID() + name.substring(name.lastIndexOf('.'));
    }
}
