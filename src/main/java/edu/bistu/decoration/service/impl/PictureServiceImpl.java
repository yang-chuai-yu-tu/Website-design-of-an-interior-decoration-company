package edu.bistu.decoration.service.impl;

import edu.bistu.decoration.domain.Category;
import edu.bistu.decoration.domain.Picture;
import edu.bistu.decoration.entity.PictureEntity;
import edu.bistu.decoration.repository.PictureRepository;
import edu.bistu.decoration.service.PictureService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j

public class PictureServiceImpl implements PictureService {
    private final PictureRepository pictureRepository;

    public PictureServiceImpl(PictureRepository pictureRepository){this.pictureRepository=pictureRepository;}


    @Override
    @Transactional(rollbackOn = Exception.class)
    public Picture savePicture(Picture picture) {
        if(picture==null||picture.getUrl()==null||picture.getType()==null){
            String msg = "必填参数不能为空";
            log.error(msg);
            throw new IllegalArgumentException(msg);
        }
        PictureEntity pictureEntity=null;
        if (picture.getId()!=null) {
            pictureEntity=pictureRepository.findOne(picture.getId());
        }
        if (pictureEntity == null) {
            pictureEntity = new PictureEntity();
        }
        BeanUtils.copyProperties(picture, pictureEntity);
        pictureEntity = pictureRepository.save(pictureEntity);
        BeanUtils.copyProperties(pictureEntity, picture);
        return picture;
    }

    /**
     * 首页案例或设计师图片，只取第一页
     * @param type 图片类型 case:案例; designer:设计师
     * @param size
     * @return
     */
    @Override
    public List<Picture> getHomepagePictures(String type, int size){
        Pageable pageable = new PageRequest(0, size);
        List<Picture> pictures  = new ArrayList<>();
        try {
            Page<PictureEntity> page =pictureRepository.findHomepagePictures(type, pageable);
            for (PictureEntity pictureEntity : page.getContent()) {
                Picture picture = new Picture();
                BeanUtils.copyProperties(pictureEntity, picture);
                pictures.add(picture);
            }
        } catch (Exception e){
            log.error("Find pictures by type[{}] size[{}] exception!", type, size, e);

        }
        return pictures;
    }

    //后台管理用
    @Override
    public Page<Picture> getList(int curr, int limit, Category category) {
        Pageable pageable = new PageRequest(curr - 1, limit);
        List<Picture> list = new ArrayList();
        PictureEntity condition = new PictureEntity();
        condition.setCategory(category);
        Example<PictureEntity> example = Example.of(condition);
        Page<PictureEntity> page = pictureRepository.findAll(example, pageable);
        for (PictureEntity entity : page.getContent()) {
            Picture picture = new Picture();
            BeanUtils.copyProperties(entity, picture);
            list.add(picture);
        }
        return new PageImpl<>(list, pageable, page.getTotalElements());
    }

    @Override
    public Picture getPicture(Long id){
        PictureEntity pictureEntity = pictureRepository.findById(id);
        Picture picture = new Picture();
        BeanUtils.copyProperties(pictureEntity,picture);

        return picture;
    }


    @Override
    public void deletePicture(Long id){
        pictureRepository.delete(id);
        return;
    }
}
