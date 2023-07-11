package com.ftiland.travelrental.image.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
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
}
