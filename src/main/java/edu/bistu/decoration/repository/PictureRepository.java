package edu.bistu.decoration.repository;

import edu.bistu.decoration.entity.PictureEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;


public interface PictureRepository extends JpaRepository<PictureEntity,Long> {

    //按类型取首页图片
    @Query("SELECT p FROM PictureEntity p, CaseEntity c WHERE p.type=?1 AND p.relatedId=c.id AND p.displayOrder=0 AND c.priority=0 ")
    Page<PictureEntity> findHomepagePictures(@Param("type") String type, Pageable pageable);

    List<PictureEntity> findByTypeAndAndRelatedIdAndAndDisplayOrder(String type, Long relatedId, int displayOrder);

    List<PictureEntity> findByRelatedIdAndType(Long relatedId,String type);

    PictureEntity findById(Long id);

    @Transactional
    @Modifying
    @Query(value="delete from t_picture where id=?1",nativeQuery = true)
    void delete( @Param(value = "id") Long id);
}