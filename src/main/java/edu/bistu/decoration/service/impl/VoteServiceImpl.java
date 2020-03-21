package edu.bistu.decoration.service.impl;

import edu.bistu.decoration.domain.Option;
import edu.bistu.decoration.domain.Vote;
import edu.bistu.decoration.domain.Vvote;
import edu.bistu.decoration.entity.OptionEntity;
import edu.bistu.decoration.entity.VoteEntity;
import edu.bistu.decoration.repository.OptionRepository;
import edu.bistu.decoration.repository.VoteRepository;
import edu.bistu.decoration.service.VoteService;
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
public class VoteServiceImpl implements VoteService {
    private final VoteRepository voteRepository;
    private final OptionRepository optionRepository;

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Vote saveVote(Vote vote){
        if(vote==null||vote.getTitle()==null){
            String msg = "必填参数不能为空";
            log.error(msg);
            throw new IllegalArgumentException(msg);
        }
        VoteEntity voteEntity=null;
        if (vote.getId()!=null){
            voteEntity=voteRepository.findOne(vote.getId());
        }
        if (voteEntity==null){
            voteEntity=new VoteEntity();
        }
        BeanUtils.copyProperties(vote,voteEntity);
        voteEntity=voteRepository.save(voteEntity);
        BeanUtils.copyProperties(voteEntity,vote);
        return vote;
    }

    @Override
    public List<Vvote> getVotes() {
        List<Vvote> voteList = new ArrayList<>();
        try {
            List<VoteEntity> voteEntityList = voteRepository.findByFlag("true");
            for (VoteEntity voteEntity : voteEntityList) {
                List<OptionEntity> optionEntityList = optionRepository.findByRelatedId(voteEntity.getId());
                List<Option> optionList = new ArrayList<>();
                for (OptionEntity optionEntity: optionEntityList){
                    Option option = new Option();
                    BeanUtils.copyProperties(optionEntity, option);
                    optionList.add(option);
                }
                Vvote vote = new Vvote();
                BeanUtils.copyProperties(voteEntity, vote);
                vote.setOptions(optionList);
                voteList.add(vote);
            }
        } catch (Exception e) {
            log.error("getBanners exception", e);
        }

        return voteList;
    }

    //后台查询用
    @Override
    public Page<Vote> getList(int curr, int limit, String flag) {
        Pageable pageable = new PageRequest(curr - 1, limit);
        List<Vote> list = new ArrayList();
        VoteEntity condition = new VoteEntity();
        condition.setFlag(flag);
        Example<VoteEntity> example = Example.of(condition);
        Page<VoteEntity> page = voteRepository.findAll(example, pageable);
        for (VoteEntity entity : page.getContent()) {
            Vote vote = new Vote();
            BeanUtils.copyProperties(entity, vote);
            list.add(vote);
        }
        return new PageImpl<>(list, pageable, page.getTotalElements());
    }

    @Override
    public Vote getVote(Long id){
        VoteEntity voteEntity = voteRepository.findById(id);
        Vote vote = new Vote();
        BeanUtils.copyProperties(voteEntity,vote);

        return vote;
    }

    @Override
    public void deleteVote(Long id){
        voteRepository.delete(id);
        return;
    }

}
