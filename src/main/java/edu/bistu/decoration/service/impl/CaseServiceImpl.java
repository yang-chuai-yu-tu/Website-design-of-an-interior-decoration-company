package edu.bistu.decoration.service.impl;

import edu.bistu.decoration.domain.CaseInfo;
import edu.bistu.decoration.domain.Picture;
import edu.bistu.decoration.domain.Vcase;
import edu.bistu.decoration.domain.Vcasedetail;
import edu.bistu.decoration.entity.CaseEntity;
import edu.bistu.decoration.entity.DesignerEntity;
import edu.bistu.decoration.entity.PictureEntity;
import edu.bistu.decoration.repository.CaseRepository;
import edu.bistu.decoration.repository.DesignerRepository;
import edu.bistu.decoration.repository.PictureRepository;
import edu.bistu.decoration.service.CaseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CaseServiceImpl implements CaseService {
    private final CaseRepository caseRepository;
    private final PictureRepository pictureRepository;
    private final DesignerRepository designerRepository;

    //保存案例
    @Override
    @Transactional(rollbackOn = Exception.class)
    public CaseInfo saveCase(CaseInfo caseInfo) {
        if(caseInfo==null||caseInfo.getName()==null){
            String msg = "必填参数不能为空";
            log.error(msg);
            throw new IllegalArgumentException(msg);
        }
        CaseEntity caseEntity=null;
        if (caseInfo.getId()!=null) {
            caseEntity=caseRepository.findOne(caseInfo.getId());
        }
        if (caseEntity == null) {
            caseEntity = new CaseEntity();
        }
        BeanUtils.copyProperties(caseInfo, caseEntity);
        caseEntity = caseRepository.save(caseEntity);
        BeanUtils.copyProperties(caseEntity, caseInfo);
        return caseInfo;
    }

    //取案例详细界面信息
    @Override
    public Vcasedetail getCases(Long caseId){
        CaseEntity caseEntity = caseRepository.findById(caseId);
        Long designerId=caseEntity.getDesignerId();
        Vcasedetail vcasedetail = new Vcasedetail();
        BeanUtils.copyProperties(caseEntity,vcasedetail);
        List<PictureEntity> casePictureEntityList = pictureRepository.findByRelatedIdAndType(caseId,"case");
        List<PictureEntity> designerPictureEntityList = pictureRepository.findByRelatedIdAndType(designerId,"designer");
        List<Picture> casePictureList =new ArrayList<>();
        List<Picture> designerPictureList =new ArrayList<>();
        for(PictureEntity pictureEntity:casePictureEntityList){
            Picture picture = new Picture();
            BeanUtils.copyProperties(pictureEntity,picture);
            casePictureList.add(picture);
        }
        for(PictureEntity pictureEntity:designerPictureEntityList){
            Picture picture = new Picture();
            BeanUtils.copyProperties(pictureEntity,picture);
            designerPictureList.add(picture);
        }
        DesignerEntity designerEntity=designerRepository.findById(designerId);
        vcasedetail.setCasePicture(casePictureList);
        vcasedetail.setDesignerPicture(designerPictureList);
        vcasedetail.setDesignerName(designerEntity.getName());
        vcasedetail.setRank(designerEntity.getRank());

        return vcasedetail;
    }

    //搜索框用（根据户型、面积、风格）
    @Override
    public List<Vcase> getCases2(String style, Integer bedroomnum, Integer area1, Integer area2){
        List<Vcase> list = new ArrayList<>();
        List<CaseEntity> caseList = caseRepository.findStyleAndBedroomNum(style, bedroomnum, area1, area2);
        for (CaseEntity caseEntity : caseList) {
            Vcase vcase = new Vcase();
            BeanUtils.copyProperties(caseEntity, vcase);
            List<PictureEntity> pictureList =pictureRepository.findByTypeAndAndRelatedIdAndAndDisplayOrder("case",caseEntity.getId(),0);
            if (pictureList.size()>0) {
                PictureEntity pictureEntity = pictureList.get(0);
                vcase.setPicId(pictureEntity.getId());
                vcase.setUrl(pictureEntity.getUrl());
                vcase.setCategory(pictureEntity.getCategory());
            }
            list.add(vcase);
        }

        return list;
    }

    //相关案例用
    @Override
    public List<Vcase> getCases3(Long id){
        List<Vcase> list = new ArrayList<>();
        List<CaseEntity> caseList = caseRepository.findByDesignerId(id);
        for(CaseEntity caseEntity : caseList){
            Vcase vcase = new Vcase();
            BeanUtils.copyProperties(caseEntity,vcase);
            List<PictureEntity> pictureList = pictureRepository.findByTypeAndAndRelatedIdAndAndDisplayOrder("case",caseEntity.getId(),0);
            if (pictureList.size()>0) {
                PictureEntity pictureEntity = pictureList.get(0);
                vcase.setPicId(pictureEntity.getId());
                vcase.setUrl(pictureEntity.getUrl());
                vcase.setCategory(pictureEntity.getCategory());
            }
            list.add(vcase);
        }

        return list;
    }

    //后台查询用
    @Override
    public Page<CaseInfo> getList(int curr, int limit, String style) {
        Pageable pageable = new PageRequest(curr - 1, limit);
        List<CaseInfo> list = new ArrayList();
        CaseEntity condition = new CaseEntity();
        condition.setStyle(style);
        Example<CaseEntity> example = Example.of(condition);
        Page<CaseEntity> page = caseRepository.findAll(example, pageable);
        for (CaseEntity entity : page.getContent()) {
            CaseInfo caseInfo = new CaseInfo();
            BeanUtils.copyProperties(entity, caseInfo);
            list.add(caseInfo);
        }
        return new PageImpl<>(list, pageable, page.getTotalElements());
    }

    @Override
    public CaseInfo getCases4(Long id){
        CaseEntity caseEntity = caseRepository.findById(id);
        CaseInfo caseInfo = new CaseInfo();
        BeanUtils.copyProperties(caseEntity,caseInfo);

        return caseInfo;
    }

    @Override
    public void deleteCase(Long id){
        caseRepository.delete(id);
        return;
    }
}
