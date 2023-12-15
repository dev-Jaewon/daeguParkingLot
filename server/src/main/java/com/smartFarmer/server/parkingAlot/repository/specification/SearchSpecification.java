package com.smartFarmer.server.parkingAlot.repository.specification;

import java.util.List;
import java.util.ArrayList;

import org.springframework.data.jpa.domain.Specification;

import com.smartFarmer.server.parkingAlot.dto.SearchDetail;
import com.smartFarmer.server.parkingAlot.entity.ParkingAlotEntity;

import jakarta.persistence.criteria.Predicate;

public class SearchSpecification {
    public static Specification<ParkingAlotEntity> filterPhone(SearchDetail searchInfo) {
        return (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (searchInfo.getDong() != null) {
                predicates.add(cb.like(root.get("streetAddress"), likePattern(searchInfo.getRo())));
            } else if (searchInfo.getRo() != null) {
                predicates.add(cb.like(root.get("locationAddress"), likePattern(searchInfo.getDong())));
            }

            if (searchInfo.getGu() != null) {
                predicates.add(cb.like(root.get("streetAddress"), likePattern(searchInfo.getGu())));
            }

            if (searchInfo.getFree() != null) {
                predicates.add(cb.like(root.get("priceInformation"), likePattern(searchInfo.getFree())));
            }

            if (searchInfo.getName() != null) {
                predicates.add(cb.like(root.get("name"), likePattern(searchInfo.getName())));
            }

            return cb.and(predicates.toArray(new Predicate[predicates.size()]));

        };
    }

    private static String likePattern(String value) {
        return "%" + value + "%";
    }
}
