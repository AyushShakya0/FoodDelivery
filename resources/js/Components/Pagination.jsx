import React from "react";
import styled from "styled-components";
import { Inertia } from "@inertiajs/inertia";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const StyledPagination = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const P = styled.p`
    font-size: 16px;
    margin-left: 0.8rem;

    & span {
        font-weight: 600;
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 0.6rem;
`;

const PaginationButton = styled.button`
    background-color: ${(props) =>
        props.active ? "#E5E5E6" : "var(--color-white)"};
    color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
    border: none;
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 16px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 7px;
    transition: all 0.3s;

    &:focus {
        outline: none;
    }

    &:hover:not(:disabled) {
        background-color: #7E7E81;
        color: var(--color-brand-50);
    }
`;

function Pagination({ meta, pageSize }) {
    const {
        current_page: currentPage,
        from,
        to,
        total,
        last_page: lastPage,
    } = meta;

    console.log("Pagination meta data:", meta);

    const updatePageNumber = (pageNumber) => {
        console.log(`Navigating to page ${pageNumber}`);
        Inertia.visit(window.location.pathname, {
            preserveState: true,
            preserveScroll: true,
            method: "get",
            data: { page: pageNumber },
        });
    };

    // Adjust condition to ensure pagination is always considered when multiple pages exist
    if (lastPage <= 1) return null;

    const rangeStart = Math.max(1, currentPage - 2);
    const rangeEnd = Math.min(lastPage, currentPage + 2);
    const pageNumbers = Array.from(
        { length: rangeEnd - rangeStart + 1 },
        (_, i) => rangeStart + i
    );

    return (
        <StyledPagination>
            <P>
                Showing <span>{from}</span> to <span>{to}</span> of{" "}
                <span>{total}</span> results
            </P>
            <Buttons>
                <PaginationButton
                    onClick={() => updatePageNumber(1)}
                    disabled={currentPage === 1}
                >
                    <HiChevronLeft />
                </PaginationButton>
                {pageNumbers.map((pageNumber) => (
                    <PaginationButton
                        key={pageNumber}
                        onClick={() => updatePageNumber(pageNumber)}
                        active={pageNumber === currentPage}
                    >
                        {pageNumber}
                    </PaginationButton>
                ))}
                <PaginationButton
                    onClick={() => updatePageNumber(lastPage)}
                    disabled={currentPage === lastPage}
                >
                    <HiChevronRight />
                </PaginationButton>
            </Buttons>
        </StyledPagination>
    );
}

export default Pagination;
