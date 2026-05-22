package com.jardineria.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    @Value("${jardineria.upload.cloudinary-folder}")
    private String folder;

    public Map uploadImage(MultipartFile file) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
            "folder", folder,
            "resource_type", "image"
        ));
    }

    public void deleteImage(String publicId) throws IOException {
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    public String getThumbnailUrl(String publicId, int width, int height) {
        return cloudinary.url()
            .format("auto")
            .transformation(new com.cloudinary.Transformation().width(width).height(height).crop("fill"))
            .publicId(publicId)
            .generate();
    }
}
