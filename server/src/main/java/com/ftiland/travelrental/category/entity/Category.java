package com.ftiland.travelrental.category.entity;

import com.ftiland.travelrental.image.entity.ImageCategory;
import lombok.*;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Category {
    @Id
    private String categoryId;

    private String title;

    @OneToOne
    @JoinColumn
    private ImageCategory image;
}
