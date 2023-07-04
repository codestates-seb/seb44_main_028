package com.ftiland.travelrental.category.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class Category {
    @Id
    private String categoryId;

    private String title;
}
