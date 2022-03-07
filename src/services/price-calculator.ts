import { DiscountType } from "../models/discount-type";
import { ServiceType } from "../models/service-type";
import { ServiceYear } from "../models/service-year";
import { 
    getDiscountsForYear, 
    getPriceListForYear } from "./data-service";

export function getCalculatedPrice(selectedServices: ServiceType[], selectedYear: ServiceYear) : { basePrice: number, finalPrice: number } {

    const basePrice = calculateBasePrice(selectedServices, selectedYear);
    const discount = calculateDiscount(selectedServices, selectedYear);
    const finalPrice = discount >= basePrice ? 0 : basePrice - discount;
    
    return { basePrice: basePrice, finalPrice: finalPrice };
}

function calculateBasePrice(selectedServices: ServiceType[], selectedYear: ServiceYear) {
    return getPriceListForYear(selectedYear)
        .filter(s => selectedServices.includes(s.service))
        .reduce((sum, current) => sum + current.price, 0)
}

function calculateDiscount(selectedServices: ServiceType[], selectedYear: ServiceYear): number {
    let discount = 0;

    for (const discountTypeKey in DiscountType) {
        discount += calculateDiscounType(discountTypeKey, selectedServices, selectedYear);
    }

    return discount;
}

function calculateDiscounType(discountTypeKey: string, selectedServices: ServiceType[], selectedYear: ServiceYear): number {
    const discountType = DiscountType[discountTypeKey];

    const discounts = getDiscountsForYear(selectedYear)
        .filter(d => d.type == discountType && d.package.every(service => selectedServices.includes(service)))
        .map(d => d.discount);
    
    if (!discounts.length) {
        return 0;
    }
    
    return Math.max(...discounts);
}