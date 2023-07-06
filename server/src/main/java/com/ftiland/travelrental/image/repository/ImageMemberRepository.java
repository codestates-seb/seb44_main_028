package com.ftiland.travelrental.image.repository;


import com.ftiland.travelrental.image.entity.Image;
import com.ftiland.travelrental.image.entity.ImageMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ImageMemberRepository extends JpaRepository<ImageMember,String> {
    @Query("SELECT i FROM ImageMember i WHERE i.member.memberId =:memberId")
    List<ImageMember> findByMemberId(@Param("memberId") Long memberId);
}
