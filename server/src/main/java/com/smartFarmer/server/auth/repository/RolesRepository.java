package com.smartFarmer.server.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartFarmer.server.auth.entity.RolesEntity;
import com.smartFarmer.server.constance.Roles;

@Repository
public interface RolesRepository extends JpaRepository<RolesEntity, Long> {
    public RolesEntity findByName(Roles name);
}
