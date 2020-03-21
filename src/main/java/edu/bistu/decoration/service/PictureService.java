package edu.bistu.decoration.service;

import edu.bistu.decoration.domain.Category;
import edu.bistu.decoration.domain.Picture;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PictureService {
    Picture savePicture(Picture picture);

    Page<Picture> getList(int curr, int limit, Category category);

    List<Picture> getHomepagePictures(String type, int size);

    Picture getPicture(Long id);

    void deletePicture(Long id);
}
