package edu.bistu.decoration.repository;


import edu.bistu.decoration.entity.DesignerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface DesignerRepository extends JpaRepository<DesignerEntity,Long> {
    DesignerEntity findById(Long id);

    @Query(value = "select * from t_designer where if(?1!='',style=?1,1=1) and if(?2!='',rank=?2,2=2)", nativeQuery = true)
    List<DesignerEntity> findStyleAndRank(String style, String rank);

    @Transactional
    @Modifying
    @Query(value="delete from t_designer where id=?1",nativeQuery = true)
    void delete( @Param(value = "id") Long id);
}
