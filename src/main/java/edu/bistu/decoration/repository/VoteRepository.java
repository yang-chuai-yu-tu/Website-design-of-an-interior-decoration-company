package edu.bistu.decoration.repository;

import edu.bistu.decoration.entity.VoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface VoteRepository extends JpaRepository<VoteEntity,Long> {
    List<VoteEntity> findByFlag(String flag);

    VoteEntity findById(Long id);

    @Transactional
    @Modifying
    @Query(value="delete from t_vote where id=?1",nativeQuery = true)
    void delete( @Param(value = "id") Long id);
}
