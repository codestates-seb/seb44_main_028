package com.ftiland.travelrental.category.entity;

import com.ftiland.travelrental.image.entity.ImageCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Category {
    @Id
    private String categoryId;

    private String title;

    /*@OneToOne
    private ImageCategory image;*/
}
