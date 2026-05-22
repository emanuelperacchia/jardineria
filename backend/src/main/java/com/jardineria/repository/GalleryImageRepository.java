package com.jardineria.repository;

import com.jardineria.model.GalleryImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GalleryImageRepository extends JpaRepository<GalleryImage, Long> {
    List<GalleryImage> findByCategoryIdOrderByDisplayOrderAsc(Long categoryId);
    List<GalleryImage> findAllByOrderByDisplayOrderAsc();
}
