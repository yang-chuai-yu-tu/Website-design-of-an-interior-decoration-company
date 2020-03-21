package edu.bistu.decoration.service.impl;

import edu.bistu.decoration.domain.Option;
import edu.bistu.decoration.entity.OptionEntity;
import edu.bistu.decoration.repository.OptionRepository;
import edu.bistu.decoration.service.OptionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class OptionServiceImpl implements OptionService {
    private final OptionRepository optionRepository;

    public OptionServiceImpl(OptionRepository optionRepository){this.optionRepository=optionRepository;}

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Option saveOption(Option option){
        if(option==null||option.getName()==null||option.getAmount()==null){
            String msg = "必填参数不能为空";
            log.error(msg);
            throw new IllegalArgumentException(msg);
        }
        OptionEntity optionEntity=null;
        if (option.getId()!=null) {
            optionEntity=optionRepository.findOne(option.getId());
        }
        if (optionEntity == null) {
            optionEntity = new OptionEntity();
        }
        BeanUtils.copyProperties(option, optionEntity);
        optionEntity = optionRepository.save(optionEntity);
        BeanUtils.copyProperties(optionEntity, option);
        return option;
    }

    @Override
    public void update(String name, Long id){
        try {
            optionRepository.updateAmount(name,id);
        } catch (Exception e){
            log.error("更新选项票数出错");
        }
        return;
    }

    //后台查询用
    @Override
    public Page<Option> getList(int curr, int limit) {
        Pageable pageable = new PageRequest(curr - 1, limit);
        List<Option> list = new ArrayList();
        OptionEntity condition = new OptionEntity();
        Example<OptionEntity> example = Example.of(condition);
        Page<OptionEntity> page = optionRepository.findAll(example, pageable);
        for (OptionEntity entity : page.getContent()) {
            Option option = new Option();
            BeanUtils.copyProperties(entity, option);
            list.add(option);
        }
        return new PageImpl<>(list, pageable, page.getTotalElements());
    }

    @Override
    public Option getOption(Long id){
        OptionEntity optionEntity = optionRepository.findById(id);
        Option option = new Option();
        BeanUtils.copyProperties(optionEntity,option);

        return option;
    }

    @Override
    public void deleteOption(Long id){
        optionRepository.delete(id);
        return;
    }

}
