package edu.bistu.decoration.service;

import edu.bistu.decoration.domain.Vote;
import edu.bistu.decoration.domain.Vvote;
import org.springframework.data.domain.Page;

import java.util.List;

public interface VoteService {
    Vote saveVote(Vote vote);

    List<Vvote> getVotes();

    Page<Vote> getList(int curr, int limit, String flag);

    Vote getVote(Long id);

    void deleteVote(Long id);
}
