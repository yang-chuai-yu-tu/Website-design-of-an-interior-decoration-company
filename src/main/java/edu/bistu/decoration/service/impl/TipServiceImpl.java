package edu.bistu.decoration.service.impl;


import edu.bistu.decoration.domain.Designer;
import edu.bistu.decoration.domain.Tip;
import edu.bistu.decoration.entity.TipEntity;
import edu.bistu.decoration.repository.TipRepository;
import edu.bistu.decoration.service.TipService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j

public class TipServiceImpl implements TipService {
    private final TipRepository tipRepository;

    public TipServiceImpl(TipRepository tipRepository){this.tipRepository=tipRepository;}

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Tip saveTip(Tip tip){
        if(tip==null||tip.getContent()==null){
            String msg = "必填参数不能为空";
            log.error(msg);
            throw new IllegalArgumentException(msg);
        }
        if (tip.getCrateTime()==null){
            tip.setCrateTime(new Date());
        }
        TipEntity tipEntity = null;
        if(tip.getId()!=null){
            tipEntity=tipRepository.findOne(tip.getId());
        }
        if(tip.getId()==null){
            tipEntity=new TipEntity();
        }
        BeanUtils.copyProperties(tip,tipEntity);
        tipEntity = tipRepository.save(tipEntity);
        BeanUtils.copyProperties(tipEntity,tip);
        return tip;
    }

    @Override
    public List<Tip> getTips() {
        List<Tip> list = new ArrayList<>();
        try {
            List<TipEntity> tipList = tipRepository.findAll();
            for (TipEntity tipEntity : tipList) {
                Tip tip = new Tip();
                BeanUtils.copyProperties(tipEntity, tip);
                list.add(tip);
            }
        } catch (Exception e) {
            log.error("getTips exception", e);
        }

        return list;
    }

    @Override
    public Tip getTip(Long id){
        TipEntity tipEntity = tipRepository.findById(id);
        Tip tip = new Tip();
        BeanUtils.copyProperties(tipEntity,tip);

        return tip;
    }

    @Override
    public Page<Tip> getList(int curr, int limit) {
        Pageable pageable = new PageRequest(curr - 1, limit);
        List<Tip> list = new ArrayList();
        TipEntity condition = new TipEntity();
        Example<TipEntity> example = Example.of(condition);
        Page<TipEntity> page = tipRepository.findAll(example, pageable);
        for (TipEntity entity : page.getContent()) {
            Tip tip = new Tip();
            BeanUtils.copyProperties(entity, tip);
            list.add(tip);
        }
        return new PageImpl<>(list, pageable, page.getTotalElements());
    }

    @Override
    public void deleteTip(Long id){
        tipRepository.delete(id);
        return;
    }
}

