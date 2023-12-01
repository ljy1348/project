package com.example.back.model.entity.Customer;

import com.example.back.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * packageName : com.example.back.model.entity.Customer
 * fileName : Customer
 * author : GGG
 * date : 2023-11-29
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-29         GGG          최초 생성
 */
@Entity
@Table(name = "TB_CUSTOMER_SERVICE")
@SequenceGenerator(
        name = "SQ_CUSTOMER_GENERATOR"
        , sequenceName = "SQ_CUSTOMER"
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
@SQLDelete(sql = "UPDATE TB_CUSTOMER_SERVICE SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE TITLE_ID = ?")
public class Customer extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE
            , generator = "SQ_CUSTOMER_GENERATOR"
    )
    private Integer titleId;

    private String title;

    private String content;

    private String answerYn;

    private String answer;

    private Integer parentBid;

    private String memberId;
}
