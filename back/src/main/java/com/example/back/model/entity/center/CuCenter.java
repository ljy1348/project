package com.example.back.model.entity.center;


import com.example.back.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name="TB_CUSTOMER_SERVICE")
@SequenceGenerator(
        name = "SQ_CUSTOMER_SERVICE_GENERATOR"
        , sequenceName = "SQ_CUSTOMER_SERVICE"
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
@SQLDelete(sql = "UPDATE TB_CUSTOMER_SERVICE SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE NOTICEID = ?")
public class CuCenter extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE
            , generator = "SQ_CUSTOMER_SERVICE_GENERATOR"
    )
    private Integer titleId;

    private String title;

    private String respondent;

    private String content;

    private Integer titleCodeNumber;

    private String answerYn;

    private Integer parentBid;

    private String memberId;
}
