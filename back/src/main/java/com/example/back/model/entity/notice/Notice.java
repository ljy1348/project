package com.example.back.model.entity.notice;

import com.example.back.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import javax.persistence.*;

/**
 * packageName : model.entity.notice
 * fileName : NotiCE
 * author : GGG
 * date : 2023-11-24
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-24         GGG          최초 생성
 */
@Entity
@Table(name = "TB_NOTICE")
@SequenceGenerator(
        name = "SQ_NOTICE_GENERATOR"
        , sequenceName = "SQ_NOTICE"
        , initialValue = 1
        , allocationSize = 1
)
@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
// soft delete
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE TB_NOTICE SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE NOTICE_ID = ? ")
public class Notice extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE
            , generator = "SQ_NOTICE_GENERATOR"
    )
    @Column
    private Integer noticeId;

    @Column
    private String noticeTitle;

    @Column
    private String noticeWriter;

    @Column
    private String noticeContent;

    @Column
    private String memberId;
}
