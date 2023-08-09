package com.ftiland.travelrental.product.service;

import com.ftiland.travelrental.category.dto.CategoryDto;
import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberService;
import com.ftiland.travelrental.product.dto.CreateProduct;
import com.ftiland.travelrental.product.dto.UpdateProduct;
import com.ftiland.travelrental.product.entity.Product;
import com.ftiland.travelrental.product.repository.ProductRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;
    @Mock
    private MemberService memberService;
    @Mock
    private ProductCategoryService productCategoryService;

    @InjectMocks
    private ProductService productService;

    @Test
    @DisplayName("상품 생성 성공")
    void createProduct_SUCCESS() {
        // given
        Member member = Member.builder()
                .memberId(1L)
                .email("test@test.com")
                .displayName("이명규")
                .latitude(37.5793493362539)
                .longitude(126.91794995956589).build();

        Product product = Product.builder()
                .title("제목입니다.")
                .content("내용입니다.")
                .content("내용입니다.")
                .member(member).build();

        List<CategoryDto> categories = List.of(CategoryDto.builder()
                        .categoryId("318baf68-71c8-410c-8e1d-21852fbf088e")
                        .title("등산").build(),
                CategoryDto.builder()
                        .categoryId("7c08b19f-5846-4b6b-a11e-861d004f8151")
                        .title("캠핑").build());

        given(memberService.findMember(any()))
                .willReturn(member);

        given(productRepository.save(any()))
                .willReturn(product);

        given(productCategoryService.createProductCategories(any(), any()))
                .willReturn(categories);

        ArgumentCaptor<Product> captor = ArgumentCaptor.forClass(Product.class);
        ArgumentCaptor<List<String>> captor2 = ArgumentCaptor.forClass(List.class);
        CreateProduct.Request request = new CreateProduct.Request(
                "제목", 1000, 500, 1000, "내용", 3,
                List.of("318baf68-71c8-410c-8e1d-21852fbf088e", "7c08b19f-5846-4b6b-a11e-861d004f8151")
        );

        // when
        CreateProduct.Response response = productService.createProduct(request, 2L, List.of());

        // then
        verify(productRepository, times(1)).save(captor.capture());
        assertThat(captor.getValue().getTitle()).isEqualTo(request.getTitle());
        assertThat(captor.getValue().getContent()).isEqualTo(request.getContent());

        verify(productCategoryService, times(1))
                .createProductCategories(captor.capture(), captor2.capture());
        assertThat(captor2.getValue()).isEqualTo(request.getCategoryIds());

        assertThat(response.getProductId()).isEqualTo(product.getProductId());
        List<CategoryDto> categoryIds = response.getCategories();

        for (int i = 0; i < categoryIds.size(); i++) {
            CategoryDto c1 = categoryIds.get(i);
            CategoryDto c2 = categories.get(i);
            assertThat(c1.getCategoryId()).isEqualTo(c2.getCategoryId());
        }
    }

    @Test
    @DisplayName("상품 생성 실패 - 멤버 위치정보 없을 때")
    void createProduct_FAIL_NOT_FOUND_LOCATION() {
        // given
        Member member = Member.builder()
                .memberId(1L)
                .email("test@test.com")
                .displayName("이명규")
                .latitude(null)
                .longitude(null).build();

        given(memberService.findMember(any()))
                .willReturn(member);

        CreateProduct.Request request = new CreateProduct.Request(
                "제목", 1000, 500, 1000, "내용", 3,
                List.of("318baf68-71c8-410c-8e1d-21852fbf088e", "7c08b19f-5846-4b6b-a11e-861d004f8151")
        );

        // when
        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                () -> productService.createProduct(request, 2L, List.of()));
        // then
        assertThat(exception.getExceptionCode()).isEqualTo(ExceptionCode.NOT_FOUND_LOCATION);
    }

    @Test
    @DisplayName("상품 수정 성공")
    void updateProduct_SUCCESS() {
        // given
        Member member = Member.builder()
                .memberId(1L)
                .email("test@test.com")
                .displayName("이명규")
                .latitude(37.5793493362539)
                .longitude(126.91794995956589).build();

        Product product = Product.builder()
                .productId("91052a17-bca6-4fde-a586-a1d179ad3463")
                .title("원래제목입니다.")
                .content("원래내용입니다.")
                .baseFee(1)
                .feePerDay(1)
                .overdueFee(1)
                .member(member).build();

        List<CategoryDto> preCategories = List.of(CategoryDto.builder()
                        .categoryId("318baf68-71c8-410c-8e1d-21852fbf088e")
                        .title("등산").build(),
                CategoryDto.builder()
                        .categoryId("7c08b19f-5846-4b6b-a11e-861d004f8151")
                        .title("캠핑").build());

        given(memberService.findMember(any()))
                .willReturn(member);

        given(productRepository.findById(anyString()))
                .willReturn(Optional.of(product));

        ArgumentCaptor<Product> captor = ArgumentCaptor.forClass(Product.class);
        ArgumentCaptor<List<String>> captor2 = ArgumentCaptor.forClass(List.class);
        UpdateProduct.Request request = new UpdateProduct.Request(
                "제목", 1000, 500, 1000, "내용", 3,
                List.of("318baf68-71c8-410c-8e1d-21852fbf088e", "7c08b19f-5846-4b6b-a11e-861d004f8151")
        );

        // when
        UpdateProduct.Response response = productService.updateProduct(request,
                product.getProductId(),
                2L,
                List.of());

        // then
        verify(productCategoryService, times(1))
                .createProductCategories(captor.capture(), captor2.capture());

        Optional.ofNullable(request.getTitle())
                .ifPresentOrElse(title -> assertThat(captor.getValue().getTitle()).isEqualTo(title),
                        () -> assertThat(captor.getValue().getTitle()).isEqualTo(product.getTitle()));
        Optional.ofNullable(request.getContent())
                .ifPresentOrElse(content -> assertThat(captor.getValue().getContent()).isEqualTo(content),
                        () -> assertThat(captor.getValue().getContent()).isEqualTo(product.getContent()));
        Optional.ofNullable(request.getBaseFee())
                .ifPresentOrElse(baseFee -> assertThat(captor.getValue().getBaseFee()).isEqualTo(baseFee),
                        () -> assertThat(captor.getValue().getContent()).isEqualTo(product.getContent()));
        Optional.ofNullable(request.getFeePerDay())
                .ifPresentOrElse(feePerDay -> assertThat(captor.getValue().getFeePerDay()).isEqualTo(feePerDay),
                        () -> assertThat(captor.getValue().getContent()).isEqualTo(product.getContent()));
        Optional.ofNullable(request.getOverdueFee())
                .ifPresentOrElse(overdueFee -> assertThat(captor.getValue().getOverdueFee()).isEqualTo(overdueFee),
                        () -> assertThat(captor.getValue().getOverdueFee()).isEqualTo(product.getOverdueFee()));
        Optional.ofNullable(request.getMinimumRentalPeriod())
                .ifPresentOrElse(minimumRentalPeriod -> assertThat(captor.getValue().getMinimumRentalPeriod()).isEqualTo(minimumRentalPeriod),
                        () -> assertThat(captor.getValue().getMinimumRentalPeriod()).isEqualTo(product.getMinimumRentalPeriod()));
    }

    @Test
    @DisplayName("상품 수정 실패 - 작성자일치하지 않음")
    void updateProduct_FAIL_() {
        // given
        Member member1 = Member.builder()
                .memberId(1L)
                .email("test@test.com")
                .displayName("이명규")
                .latitude(37.5793493362539)
                .longitude(126.91794995956589).build();

        Member member2 = Member.builder()
                .memberId(2L)
                .email("test2@test.com")
                .displayName("이명규2")
                .latitude(37.5793493362539)
                .longitude(126.91794995956589).build();

        Product product = Product.builder()
                .productId("91052a17-bca6-4fde-a586-a1d179ad3463")
                .title("원래제목입니다.")
                .content("원래내용입니다.")
                .baseFee(1)
                .feePerDay(1)
                .overdueFee(1)
                .member(member2).build();

        List<CategoryDto> preCategories = List.of(CategoryDto.builder()
                        .categoryId("318baf68-71c8-410c-8e1d-21852fbf088e")
                        .title("등산").build(),
                CategoryDto.builder()
                        .categoryId("7c08b19f-5846-4b6b-a11e-861d004f8151")
                        .title("캠핑").build());

        given(memberService.findMember(any()))
                .willReturn(member1);

        given(productRepository.findById(anyString()))
                .willReturn(Optional.of(product));

        UpdateProduct.Request request = new UpdateProduct.Request(
                "제목", 1000, 500, 1000, "내용", 3,
                List.of("318baf68-71c8-410c-8e1d-21852fbf088e", "7c08b19f-5846-4b6b-a11e-861d004f8151")
        );

        // when
        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                () -> productService.updateProduct(request, product.getProductId(), 2L, List.of()));

        // then
        assertThat(exception.getExceptionCode()).isEqualTo(ExceptionCode.UNAUTHORIZED);
    }
}