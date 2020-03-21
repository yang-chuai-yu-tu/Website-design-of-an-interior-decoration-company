package edu.bistu.decoration.repository;

import edu.bistu.decoration.entity.OptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface OptionRepository extends JpaRepository<OptionEntity,Long> {
    List<OptionEntity> findByRelatedId(Long relatedId);

    @Transactional
    @Modifying
    @Query(value="update t_option o set o.amount=o.amount+1 where o.name = ?1 and o.related_id =?2",nativeQuery = true)
    void updateAmount(@Param(value = "name")String name, @Param(value = "related_id")Long related_id);

    OptionEntity findById(Long id);

    @Transactional
    @Modifying
    @Query(value="delete from t_option where id=?1",nativeQuery = true)
    void delete( @Param(value = "id") Long id);
}
