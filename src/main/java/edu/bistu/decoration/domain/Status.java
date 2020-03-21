package edu.bistu.decoration.domain;

import java.util.ArrayList;
import java.util.List;

public enum Status {

        UNKNOWN(0, "未知"),

        /** 预约状态的分类 **/
        CREATE(1, "创建"),
        CANCEL(2, "取消"),
        SUCCESS(3, "成功"),
        FAIL(4,"失败");



        private int code;
        private String label;

        public int getCode() {
            return code;
        }

        public String getLabel() {
            return label;
        }

        Status(int code, String label) {
            this.code = code;
            this.label = label;
        }

        public static Status parseByCode(int code) {
            for (Status s : Status.values()) {
                if (s.code == code) {
                    return s;
                }
            }
            return UNKNOWN;
        }

        public static Status parseByLable(String label) {
            for (Status s : Status.values()) {
                if (s.label.equals(label)) {
                    return s;
                }
            }
            return UNKNOWN;
        }

        public static List<Status> getCategoryByCode(int startCode, int endCode) {
            List<Status> statuses = new ArrayList<>();
            for (Status s : Status.values()) {
                if (s.code>=startCode && s.code<=endCode) {
                    statuses.add(s);
                }
            }
            return statuses;
        }


}
