package com.example.back.repository.customer;


import com.example.back.model.dto.customer.CustomerDto;
import com.example.back.model.entity.Customer.Customer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * packageName : com.example.back.repository.Customer

 * fileName : CustomerRepository
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
@Repository
public interface CustomerRepository extends JpaRepository <Customer, Integer> {


    @Query(value = "SELECT CST.TITLE_ID as titleId " +
            "     , CST.TITLE as title " +
            "     , CST.CONTENT as content " +
            "     , CST.ANSWER_YN as answerYn " +
            "     , CST.PARENT_BID as parentBid " +
            "     , CST.ANSWER as answer " +
            "     , CST.MEMBER_ID as memberId " +
            "     , CST.INSERT_TIME as insertTime " +
            "     , MEM.MEMBER_NAME as memberName " +
            "FROM TB_CUSTOMER_SERVICE CST, TB_MEMBERS_INFO MEM " +
            "WHERE CST.MEMBER_ID = MEM.MEMBER_ID " +
            "AND CST.DELETE_YN = 'N' " +
            "AND CST.MEMBER_ID = :memberId " +
            "ORDER BY CST.TITLE_ID DESC ", countQuery = "SELECT COUNT(*) " +
            "FROM TB_CUSTOMER_SERVICE CST, TB_MEMBERS_INFO MEM " +
            "WHERE CST.MEMBER_ID = MEM.MEMBER_ID " +
            "AND CST.DELETE_YN = 'N' " +
            "AND CST.MEMBER_ID = :memberId " +
            "ORDER BY CST.TITLE_ID DESC ", nativeQuery = true)
    Page<CustomerDto> getCustomerAll(@Param("memberId") String memberId, Pageable pageable);


    @Query(value = "SELECT CST.TITLE_ID as titleId " +
            "     , CST.TITLE as title " +
            "     , CST.CONTENT as content " +
            "     , CST.ANSWER_YN as answerYn " +
            "     , CST.PARENT_BID as parentBid " +
            "     , CST.ANSWER as answer " +
            "     , CST.MEMBER_ID as memberId " +
            "     , CST.INSERT_TIME as insertTime " +
            "     , MEM.MEMBER_NAME as memberName " +
            "FROM TB_CUSTOMER_SERVICE CST, TB_MEMBERS_INFO MEM " +
            "WHERE CST.MEMBER_ID = MEM.MEMBER_ID " +
            "AND CST.DELETE_YN = 'N' " +
            "ORDER BY CST.TITLE_ID DESC ", countQuery = "SELECT COUNT(*) " +
            "FROM TB_CUSTOMER_SERVICE CST, TB_MEMBERS_INFO MEM " +
            "WHERE CST.MEMBER_ID = MEM.MEMBER_ID " +
            "AND CST.DELETE_YN = 'N' " +
            "ORDER BY CST.TITLE_ID DESC ", nativeQuery = true)
    Page<CustomerDto> findAllByOrderByTitleIdDesc(Pageable pageable);


    @Query(value = "SELECT CST.TITLE_ID as titleId " +
            "     , CST.TITLE as title " +
            "     , CST.CONTENT as content " +
            "     , CST.ANSWER_YN as answerYn " +
            "     , CST.PARENT_BID as parentBid " +
            "     , CST.ANSWER as answer " +
            "     , CST.MEMBER_ID as memberId " +
            "     , CST.INSERT_TIME as insertTime " +
            "     , MEM.MEMBER_NAME as memberName " +
            "FROM TB_CUSTOMER_SERVICE CST, TB_MEMBERS_INFO MEM " +
            "WHERE CST.MEMBER_ID = MEM.MEMBER_ID " +
            "AND CST.DELETE_YN = 'N' " +
            "AND CST.MEMBER_ID = :memberId AND CST.TITLE LIKE '%' || :title || '%' " +
            "ORDER BY CST.TITLE_ID DESC ", countQuery = "SELECT COUNT(CST.TITLE_ID) " +
            "FROM TB_CUSTOMER_SERVICE CST, TB_MEMBERS_INFO MEM " +
            "WHERE CST.MEMBER_ID = MEM.MEMBER_ID " +
            "AND CST.DELETE_YN = 'N' " +
            "AND CST.MEMBER_ID = :memberId AND CST.TITLE LIKE '%' || :title || '%' " +
            "ORDER BY CST.TITLE_ID DESC ", nativeQuery = true)
    Page<CustomerDto> findTitleLike(@Param("title") String title,@Param("memberId") String memberId,  Pageable pageable);

    @Query(value = "SELECT CST.TITLE_ID as titleId" +
            "     , CST.TITLE as title " +
            "     , CST.CONTENT as content " +
            "     , CST.ANSWER_YN as answerYn " +
            "     , CST.ANSWER as answer " +
            "     , CST.PARENT_BID as parentBid " +
            "     , CST.INSERT_TIME as insertTime " +
            "     , MEM.MEMBER_NAME as memberName " +
            "FROM TB_CUSTOMER_SERVICE CST, TB_MEMBERS_INFO MEM " +
            "WHERE CST.MEMBER_ID = MEM.MEMBER_ID " +
            "AND CST.DELETE_YN = 'N' " +
            "AND TITLE LIKE '%' || :title || '%' " +
            "ORDER BY CST.TITLE_ID DESC ", countQuery = "SELECT COUNT(CST.TITLE) " +
            "FROM TB_CUSTOMER_SERVICE CST, TB_MEMBERS_INFO MEM " +
            "WHERE CST.MEMBER_ID = MEM.MEMBER_ID " +
            "AND CST.DELETE_YN = 'N' " +
            "AND TITLE LIKE '%' || :title || '%' " +
            "ORDER BY CST.TITLE_ID DESC ", nativeQuery = true)
    Page<CustomerDto> findAllTitleAll(@Param("title") String title, Pageable pageable);
}
