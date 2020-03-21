package edu.bistu.decoration.domain;

import java.util.ArrayList;
import java.util.List;

public enum Category {

    UNKNOWN(0, "未知"),

    /** 案例的图片分类 **/
    CASE(100, "案例"),
    LIVING_ROOM(101, "客厅"),
    BED_ROOM(102, "卧室"),
    KITCHEN(103,"厨房"),
    DINING_ROOM(104,"餐厅"),
    BATH_ROOM(105,"卫生间"),
    OTHER_ROOM(199,"其他"),

    /** 设计师的图片分类 **/
    DESIGNER(200, "设计师"),

    /** 小贴士的图片分类 **/
    TIP(300, "小贴士");

    private int code;
    private String label;

    public int getCode() {
        return code;
    }

    public String getLabel() {
        return label;
    }

    Category(int code, String label) {
        this.code = code;
        this.label = label;
    }

    public static Category parseByCode(int code) {
        for (Category c : Category.values()) {
            if (c.code == code) {
                return c;
            }
        }
        return UNKNOWN;
    }

    public static Category parseByLable(String label) {
        for (Category c : Category.values()) {
            if (c.label.equals(label)) {
                return c;
            }
        }
        return UNKNOWN;
    }

    public static List<Category> getCategoryByCode(int startCode, int endCode) {
        List<Category> categories = new ArrayList<>();
        for (Category c : Category.values()) {
            if (c.code>=startCode && c.code<=endCode) {
                categories.add(c);
            }
        }
        return categories;
    }
}
