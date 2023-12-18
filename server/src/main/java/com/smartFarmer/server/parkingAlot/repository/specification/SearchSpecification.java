package com.smartFarmer.server.parkingAlot.repository.specification;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.ArrayList;

import org.springframework.data.jpa.domain.Specification;
import org.postgis.Geometry;
import org.postgis.Point;

import com.smartFarmer.server.parkingAlot.dto.SearchDetail;
import com.smartFarmer.server.parkingAlot.dto.SearchDto;
import com.smartFarmer.server.parkingAlot.entity.ParkingAlotEntity;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class SearchSpecification {
    public static Specification<ParkingAlotEntity> search(SearchDto p) {
        return (root, cq, builder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if(p.getContent() != null){
                SearchDetail searchDetail = getAddress(p.getContent());

                predicates.addAll(detailPredicates(root, builder, searchDetail));
            }

            Expression<Geometry> target = geo(root, builder, root.get("lat"), root.get("lot"));
            Expression<Geometry> center = geo(root, builder, builder.literal(p.getLat()), builder.literal(p.getLot()));
            Expression<Boolean> within = builder.function("ST_DWithin", Boolean.class, target, center, builder.literal(p.getRange()));

            predicates.add(builder.equal(within, true));

            return builder.and(predicates.toArray(new Predicate[predicates.size()]));
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

    private static List<Predicate> detailPredicates(Root<ParkingAlotEntity> root, CriteriaBuilder builder, SearchDetail searchInfo){
        List<Predicate> predicates = new ArrayList<>();

            if (searchInfo.getDong() != null) {
                predicates.add(builder.like(root.get("streetAddress"), likePattern(searchInfo.getRo())));
            } else if (searchInfo.getRo() != null) {
                predicates.add(builder.like(root.get("locationAddress"), likePattern(searchInfo.getDong())));
            }

            if (searchInfo.getGu() != null) {
                predicates.add(builder.like(root.get("streetAddress"), likePattern(searchInfo.getGu())));
            }

            if (searchInfo.getFree() != null) {
                predicates.add(builder.like(root.get("priceInformation"), likePattern(searchInfo.getFree())));
            }

            if (searchInfo.getName() != null) {
                predicates.add(builder.like(root.get("name"), likePattern(searchInfo.getName())));
            }

        return predicates;
    }

    private static SearchDetail getAddress(String content) {
        final Pattern PACKAGE_PATTERN_1 = Pattern.compile("([가-힣A-Za-z·\\d~\\-\\.]{2,}(로|길).[\\d]+)");
        final Pattern PACKAGE_PATTERN_2 = Pattern.compile("([가-힣A-Za-z·\\d~\\-\\.]+(읍|동)\\s)[\\d]+-[\\d]+");
        final Pattern DAEGU = Pattern.compile("(대구광역시|대구)");
        final Pattern GU = Pattern.compile("[가-힣]{1,}구");
        final Pattern FREE = Pattern.compile("(무료|유료)");

        SearchDetail searchDetail = new SearchDetail();

        Matcher matcher = PACKAGE_PATTERN_1.matcher(content);
        if (matcher.find()) {
            searchDetail.setRo(matcher.group());
            content = content.replaceAll(PACKAGE_PATTERN_1.pattern(), "").trim();
        }

        matcher = PACKAGE_PATTERN_2.matcher(content);
        if (matcher.find()) {
            searchDetail.setDong(matcher.group());
            content = content.replaceAll(PACKAGE_PATTERN_2.pattern(), "").trim();
        }

        matcher = DAEGU.matcher(content);
        if (matcher.find()) {
            content = content.replaceAll(DAEGU.pattern(), "").trim();
        }

        matcher = GU.matcher(content);
        if (matcher.find()) {
            searchDetail.setGu(content);
            content = content.replaceAll(GU.pattern(), "").trim();
        }

        matcher = FREE.matcher(content);
        if (matcher.find()) {
            if (content.contains("무료")) {
                searchDetail.setFree("무료");
            } else if (content.contains("유료")) {
                searchDetail.setFree("유료");
            }

            content = content.replaceAll(FREE.pattern(), "").trim();
        }

        searchDetail.setName(content);

        return searchDetail;
    }
}
