package edu.bistu.decoration.service.impl;

import edu.bistu.decoration.domain.Designer;
import edu.bistu.decoration.domain.Vdesigner;
import edu.bistu.decoration.entity.DesignerEntity;
import edu.bistu.decoration.entity.PictureEntity;
import edu.bistu.decoration.repository.DesignerRepository;
import edu.bistu.decoration.repository.PictureRepository;
import edu.bistu.decoration.service.DesignerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class DesignerServiceImpl implements DesignerService {
    private final DesignerRepository designerRepository;
    private final PictureRepository  pictureRepository;

    public DesignerServiceImpl(DesignerRepository designerRepository, PictureRepository pictureRepository) {
        this.designerRepository = designerRepository;
        this.pictureRepository = pictureRepository;
    }


    @Override
    @Transactional(rollbackOn = Exception.class)
    public Designer saveDesigner(Designer designer){
        if (designer.getName()==null){
            String msg="必填参数不能为空";
            log.error(msg);
            throw new IllegalArgumentException(msg);
        }
        DesignerEntity designerEntity=null;
        if (designer.getId()!=null){
            designerEntity =designerRepository.findOne(designer.getId());
        }
        if (designerEntity==null){
            designerEntity=new DesignerEntity();
        }
        BeanUtils.copyProperties(designer,designerEntity);
        designerRepository.save(designerEntity);
        BeanUtils.copyProperties(designerEntity,designer);
        return designer;
    }

    @Override
    public Vdesigner getDesigner(Long id){
        DesignerEntity designerEntity = designerRepository.findById(id);
        Vdesigner vdesigner = new Vdesigner();
        BeanUtils.copyProperties(designerEntity,vdesigner);
        List<PictureEntity> pictureList =pictureRepository.findByTypeAndAndRelatedIdAndAndDisplayOrder("designer",designerEntity.getId(),0);
        if(pictureList.size()>0){
            PictureEntity pictureEntity = pictureList.get(0);
            vdesigner.setPicId(pictureEntity.getId());
            vdesigner.setUrl(pictureEntity.getUrl());
        }

        return vdesigner;
    }

    @Override
    public List<Vdesigner> getDesigner2(String style,String rank){
        List<Vdesigner> list = new ArrayList<>();
        List<DesignerEntity> designerList = designerRepository.findStyleAndRank(style, rank);
        for (DesignerEntity designerEntity : designerList) {
            Vdesigner vdesigner = new Vdesigner();
            BeanUtils.copyProperties(designerEntity, vdesigner);
            List<PictureEntity> pictureList =pictureRepository.findByTypeAndAndRelatedIdAndAndDisplayOrder("designer",designerEntity.getId(),0);
            if (pictureList.size()>0) {
                PictureEntity pictureEntity = pictureList.get(0);
                vdesigner.setPicId(pictureEntity.getId());
                vdesigner.setUrl(pictureEntity.getUrl());
            }
            list.add(vdesigner);
        }

        return list;
    }

    @Override
    public Page<Designer> getList(int curr, int limit, String rank) {
        Pageable pageable = new PageRequest(curr - 1, limit);
        List<Designer> list = new ArrayList();
        DesignerEntity condition = new DesignerEntity();
        condition.setRank(rank);
        Example<DesignerEntity> example = Example.of(condition);
        Page<DesignerEntity> page = designerRepository.findAll(example, pageable);
        for (DesignerEntity entity : page.getContent()) {
            Designer designer = new Designer();
            BeanUtils.copyProperties(entity, designer);
            list.add(designer);
        }
        return new PageImpl<>(list, pageable, page.getTotalElements());
    }

    @Override
    public Designer getDesigner3(Long id){
        DesignerEntity designerEntity = designerRepository.findById(id);
        Designer designer = new Designer();
        BeanUtils.copyProperties(designerEntity,designer);

        return designer;
    }

    @Override
    public void deleteDesigner(Long id){
        designerRepository.delete(id);
        return;
    }
}
