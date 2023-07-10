package com.ftiland.travelrental.image.entity;

import com.ftiland.travelrental.category.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ImageCategory {
    @Id
    private String imageId;

    private String fileName;
    private String imageUrl;
    private String fileType;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Category category;
}
