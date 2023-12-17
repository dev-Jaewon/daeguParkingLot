package com.smartFarmer.server.parkingAlot.repository.specification;

import java.util.List;
import java.util.ArrayList;

import org.springframework.data.jpa.domain.Specification;
import org.postgis.Geometry;
import org.postgis.Point;

import com.smartFarmer.server.parkingAlot.dto.SearchDetail;
import com.smartFarmer.server.parkingAlot.dto.SearchRangeParkingLotDto;
import com.smartFarmer.server.parkingAlot.entity.ParkingAlotEntity;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

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

    public static Specification<ParkingAlotEntity> zxcv(SearchRangeParkingLotDto searchInfo) {
        return (root, cq, builder) -> {
            Expression<Geometry> target = geo(root, builder, root.get("lat"), root.get("lot"));
            Expression<Geometry> center = geo(root, builder, builder.literal(searchInfo.getLat()), builder.literal(searchInfo.getLot()));

            Expression<Boolean> within = builder.function("ST_DWithin", Boolean.class, target, center, builder.literal(searchInfo.getRange()));

            return builder.equal(within, true);
        };
    }

    private static Expression<Geometry> geo(Root<ParkingAlotEntity> root, CriteriaBuilder builder, Expression<?> lat, Expression<?> lot) {
        Expression<Point> point = builder.function("ST_Point", Point.class, lot, lat);
        Expression<Point> centerPoint = builder.function("ST_SetSRID", Point.class, point, builder.literal(4326));

        return builder.function("geography", Geometry.class, centerPoint);
    }

    private static String likePattern(String value) {
        return "%" + value + "%";
    }
}
