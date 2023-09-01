package com.ftiland.travelrental.image.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeletedImageRepository extends JpaRepository<DeletedImage,Long> {
    void deleteByName(String imageName);
}
