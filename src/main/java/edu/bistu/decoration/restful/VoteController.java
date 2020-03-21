package edu.bistu.decoration.restful;

import edu.bistu.decoration.domain.CommonResult;
import edu.bistu.decoration.domain.Vote;
import edu.bistu.decoration.domain.Vvote;
import edu.bistu.decoration.service.VoteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
public class VoteController {

    @Autowired
    private VoteService voteService;

    @PostMapping("/vote/savevote")
    public CommonResult<Vote> saveVote(@RequestBody Vote vote){

        try{
            Vote newVote = voteService.saveVote(vote);
            return new CommonResult(newVote);
        }catch(Throwable t){
            log.error("保存投票{}发生异常",vote!=null?vote.getName():"null",t);
            return new CommonResult(500,"保存投票出错了");
        }
    }

    @GetMapping("/vote/getvotes")
    public CommonResult<Vvote> getVotes(){

        try{
            List<Vvote> voteList =voteService.getVotes();
            CommonResult response = new CommonResult(voteList);
            response.setCount(voteList.size());
            return response;
        }catch (Throwable t){
            return new CommonResult(500,"获取投票出错了");
        }


    }


    //后台查询用
    @GetMapping("/vote/list")
    public CommonResult<List<Vote>> getList(@Valid @RequestParam(value = "page", required = false, defaultValue="1") Integer curr,
                                           @Valid @RequestParam(value = "limit", required = false, defaultValue="10") Integer limit,
                                            @Valid @RequestParam(value = "flag", required = false)String flag
    ){

        try{

            Page<Vote> votePage =voteService.getList(curr,limit,flag);
            CommonResult response = new CommonResult(votePage.getContent());
            response.setCount((int)votePage.getTotalElements());
            return response;
        }catch (Throwable t){
            log.error("查询投票发生异常", t);
            return new CommonResult(500,"获取投票出错了");
        }
    }

    @GetMapping("/vote/info/{id}")
    public CommonResult<Vote> getPicture(@PathVariable Long id){

        try{
            Vote vote = voteService.getVote(id);
            CommonResult response = new CommonResult(vote);
            return response;
        }catch (Throwable t){
            log.error("查询投票发生异常", t);
            return new CommonResult(500,"获取投票出错了");
        }
    }

    @GetMapping("/vote/delete")
    public void delete(Long id){
        voteService.deleteVote(id);
        return;
    }

}
