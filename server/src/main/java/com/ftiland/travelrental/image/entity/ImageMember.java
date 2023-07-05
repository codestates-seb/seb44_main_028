package com.ftiland.travelrental.image.entity;

import com.ftiland.travelrental.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@Entity
public class ImageMember {

    @Id
    private String imageId;

    private String fileName;
    private String imageUrl;
    private String fileType;

    @OneToOne
    @JoinColumn(name="member_id")
    private Member member;
}
