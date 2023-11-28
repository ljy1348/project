package com.example.back.model.entity.center;

import com.example.back.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name="TB_NOTICE")
@SequenceGenerator(
        name = "SQ_NOTICE_GENERATOR"
        , sequenceName = "SQ_NOTICE"
        , initialValue = 1
        , allocationSize = 1
)
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE TB_NOTICE SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE NOTICEID = ?")
public class Notice extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE
                  , generator = "SQ_NOTICE_GENERATOR"
    )
    private Integer noticeId;

    private String noticeWriter;

    private String noticeContent;

    private String noticeTitle;

    private String memberId;
}
