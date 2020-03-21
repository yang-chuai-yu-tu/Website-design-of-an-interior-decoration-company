package edu.bistu.decoration.restful;

import edu.bistu.decoration.domain.Category;
import edu.bistu.decoration.domain.CommonResult;
import edu.bistu.decoration.domain.Picture;
import edu.bistu.decoration.service.PictureService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j

public class PictureController {

    @Autowired
    private PictureService pictureService;

    @PostMapping("/picture/savepicture")
    public CommonResult<Picture> savePicture(@RequestBody Picture picture) {

        try {
            Picture newPicture = pictureService.savePicture(picture);
            return new CommonResult(newPicture);

        } catch (Throwable t){
            log.error("保存图片{}发生异常", picture!=null?picture.getTitle():"null", t);
            return new CommonResult(500,"保存图片出错了");
        }
    }

    @GetMapping("/picture/gethomepagepictures")
    public CommonResult<List<Picture>> getPictures(String type, int size){

        try{
            List<Picture> pictures =pictureService.getHomepagePictures(type,size);
            CommonResult response = new CommonResult(pictures);
            response.setCount(pictures.size());
            return response;
        }catch (Throwable t){
            return new CommonResult(500,"获取首页图片出错了");
        }
    }

    @GetMapping("/picture/list")
    public CommonResult<List<Picture>> getList(@Valid @RequestParam(value = "page", required = false, defaultValue="1") Integer curr,
                                               @Valid @RequestParam(value = "limit", required = false, defaultValue="10") Integer limit,
                                               @Valid @RequestParam(value = "category", required = false) Category category){

        try{

            Page<Picture> picturePage =pictureService.getList(curr,limit,category);
            CommonResult response = new CommonResult(picturePage.getContent());
            response.setCount((int)picturePage.getTotalElements());
            return response;
        }catch (Throwable t){
            log.error("查询图片发生异常", t);
            return new CommonResult(500,"获取图片出错了");
        }
    }

    @GetMapping("/picture/info/{id}")
    public CommonResult<Picture> getPicture(@PathVariable Long id){

        try{
            Picture picture = pictureService.getPicture(id);
            CommonResult response = new CommonResult(picture);
            return response;
        }catch (Throwable t){
            log.error("查询图片发生异常", t);
            return new CommonResult(500,"获取图片出错了");
        }
    }

    @GetMapping("/picture/delete")
    public void delete(Long id){
        pictureService.deletePicture(id);
        return;
    }

}
