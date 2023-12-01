package com.example.back.model.entity.reserve;

import com.example.back.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;

/**
 * packageName : com.example.back.model.entity.reserve
 * fileName : NonMemberInfo
 * author : rkdtk
 * date : 2023-11-27
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-27         rkdtk          최초 생성
 */
@Entity
@Table(name="TB_NON_MEMBERS_INFO")
@SequenceGenerator(

        name = "SQ_NON_MEMBER_INFO"
        , sequenceName = "SQ_NON_MEMBER_INFO"
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
// soft delete
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE TB_NON_MEMBERS_INFO SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE userNumber = ?")
public class NonMemberInfo extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "SQ_NON_MEMBER_INFO")

    private Integer userNumber;
    private String userName;
    private String userSex;
    private String userCountry;
    private String userDate;
    private String userPhone;
    private String userEmail;
}


