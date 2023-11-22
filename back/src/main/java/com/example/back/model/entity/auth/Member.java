package com.example.back.model.entity.auth;

import com.example.back.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;

/**
 * packageName : com.example.simpledms.repository.auth
 * fileName : User
 * author : GGG
 * date : 2023-11-14
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-14         GGG          최초 생성
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="TB_MEMBERS_INFO")
@DynamicInsert
@DynamicUpdate
@ToString
// soft delete
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE BS_USER_INFORMATION SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE MEMBER_ID = ?")
public class Member extends BaseTimeEntity {

    @Id
    private String memberId;
    @Column(unique = true)
    private String memberPw;
    private String memberName;
    private String memberEname;
    private String memberEmail;
    private String memberPhone;
    private String memberSex;
    private String memberAdd;
    @Enumerated(EnumType.STRING)
    private ERole memberAuth;
    private String memberCountry;
    private Date memberDate;
    private int memberMile;

    public Member(String userId, String userPassword, String userName) {
        this.memberId = userId;
        this.memberPw = userPassword;
        this.memberName = userName;
    }

    public Member(String userId, String userPassword, String userName, ERole right) {
        this.memberId = userId;
        this.memberPw = userPassword;
        this.memberName = userName;
        this.memberAuth = right;
    }

    public Member(String userId, String userPassword, String userName, String userEmail, String userAdd, String userPhone, String userSex, String userNationality, Date birthDate, String enName) {
        this.memberId = userId;
        this.memberPw = userPassword;
        this.memberName = userName;
        this.memberDate = birthDate;
        this.memberEname = enName;
        this.memberAdd = userAdd;
        this.memberPhone = userPhone;
        this.memberSex = userSex;
        this.memberCountry = userNationality;
        this.memberEmail = userEmail;
        this.memberMile = 0;
    }
}
