package com.example.back.model.entity.auth;

import com.example.back.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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
@Table(name="TB_USER")
@DynamicInsert
@DynamicUpdate
@ToString
// soft delete
//@Where(clause = "DELETE_YN = 'N'")
//@SQLDelete(sql = "UPDATE TB_USER SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE EMAIL = ?")
public class User extends BaseTimeEntity {
//    email       varchar2(1000) not null constraint pk_user primary key, -- id (email)
//    password    varchar2(1000),                                         -- 암호
//    username    varchar2(1000),                                         -- 유저명
//    codeName   varchar2(1000),                                         -- 권한코드명(role_user, role_admin)
//    deleteYn   varchar2(1) default 'n',
//    insertTime varchar2(255),
//    updateTime varchar2(255),
//    deleteTime VARCHAR2(255)

    @Id
    private String email;
    private String password;
    private String username;
    private String codeName;

    public User(String email, String password, String username) {
        this.email = email;
        this.password = password;
        this.username = username;
    }
}
