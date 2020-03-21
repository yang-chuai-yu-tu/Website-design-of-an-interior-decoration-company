package edu.bistu.decoration.repository;

import edu.bistu.decoration.entity.TipEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface TipRepository extends JpaRepository<TipEntity,Long> {

    TipEntity findById(Long id);

    @Transactional
    @Modifying
    @Query(value="delete from t_tip where id=?1",nativeQuery = true)
    void delete( @Param(value = "id") Long id);
}
