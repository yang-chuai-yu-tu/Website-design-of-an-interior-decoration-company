package edu.bistu.decoration.service.impl;

import edu.bistu.decoration.domain.Activity;
import edu.bistu.decoration.entity.ActivityEntity;
import edu.bistu.decoration.repository.ActivityRepository;
import edu.bistu.decoration.service.ActivityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

//@Service用于标注业务层组件,IOC的思想,注解本身承担了两个职责：一是Bean的创建,二是将一个类标识为一个服务。
@Service
@Slf4j
public class ActivityServiceImpl implements ActivityService {
    private final ActivityRepository activityRepository;

    public ActivityServiceImpl(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    //声明式事务管理建立在AOP之上的。其本质是对方法前后进行拦截，然后在目标方法开始之前创建或者加入一个事务，在执行完目标方法之后根据执行情况提交或者回滚事务。
    @Transactional(rollbackOn = Exception.class)
    public Activity saveActivity(Activity activity) {
        if(activity==null||activity.getName()==null||activity.getImage()==null){
            String msg = "必填参数不能为空";
            log.error(msg);
            throw new IllegalArgumentException(msg);
        }
        ActivityEntity activityEntity=null;
        if (activity.getId()!=null) {
            activityEntity=activityRepository.findOne(activity.getId());
        }
        if (activityEntity == null) {
            activityEntity = new ActivityEntity();
        }
        BeanUtils.copyProperties(activity, activityEntity);
        activityEntity = activityRepository.save(activityEntity);
        BeanUtils.copyProperties(activityEntity, activity);
        return activity;
    }

    @Override
    public List<Activity> getBanners() {
        List<Activity> list = new ArrayList<>();
        try {
            List<ActivityEntity> activeList = activityRepository.findByFlag("true");
            for (ActivityEntity activityEntity : activeList) {
                Activity activity = new Activity();
                BeanUtils.copyProperties(activityEntity, activity);
                list.add(activity);
            }
        } catch (Exception e) {
            log.error("getBanners exception", e);
        }

        return list;
    }

    //后台查询用
    @Override
    public Page<Activity> getList(int curr, int limit, String flag) {
        Pageable pageable = new PageRequest(curr - 1, limit);
        List<Activity> list = new ArrayList();
        ActivityEntity condition = new ActivityEntity();
        condition.setFlag(flag);
        Example<ActivityEntity> example = Example.of(condition);
        Page<ActivityEntity> page = activityRepository.findAll(example, pageable);
        for (ActivityEntity entity : page.getContent()) {
            Activity activity = new Activity();
            BeanUtils.copyProperties(entity, activity);
            list.add(activity);
        }
        return new PageImpl<>(list, pageable, page.getTotalElements());
    }

    @Override
    public Activity getActivity(Long id){
        ActivityEntity activityEntity = activityRepository.findById(id);
        Activity activity = new Activity();
        BeanUtils.copyProperties(activityEntity,activity);

        return activity;
    }

    @Override
    public void deleteActivity(Long id){
        activityRepository.delete(id);
        return;
    }

}

