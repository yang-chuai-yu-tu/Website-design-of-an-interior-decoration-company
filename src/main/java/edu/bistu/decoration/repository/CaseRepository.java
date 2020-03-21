package edu.bistu.decoration.repository;

import edu.bistu.decoration.entity.CaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface CaseRepository extends JpaRepository<CaseEntity,Long> {
    @Query(value = "select * from t_case where if(?1!='',style=?1,1=1) and if(?2!='',bedroom_num=?2,2=2) and area between ?3 and ?4", nativeQuery = true)
    List<CaseEntity> findStyleAndBedroomNum(String style,Integer bedroomnum,Integer area1,Integer area2);

    CaseEntity findById(Long id);

    List<CaseEntity> findByDesignerId(Long id);

    @Transactional
    @Modifying
    @Query(value="delete from t_case where id=?1",nativeQuery = true)
    void delete( @Param(value = "id") Long id);
}
