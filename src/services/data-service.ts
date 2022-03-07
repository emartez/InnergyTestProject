import { DiscountType } from "../models/discount-type";
import { ServiceType } from "../models/service-type";
import { ServiceYear } from "../models/service-year";

const relatedServices: {main: ServiceType, related: ServiceType}[] = [
    { main: "Photography", related: "TwoDayEvent" },
    { main: "VideoRecording", related: "TwoDayEvent" },
    { main: "VideoRecording", related: "BlurayPackage" }
];

const priceList: { [key in ServiceYear]: { service: ServiceType, price: number}[] } = {
    2020: [
            { service: "Photography", price: 1700},
            { service: "VideoRecording", price: 1700},
            { service: "WeddingSession", price: 600},
            { service: "BlurayPackage", price: 300},
            { service: "TwoDayEvent", price: 400},
        ],
    2021: [
            { service: "Photography", price: 1800},
            { service: "VideoRecording", price: 1800},
            { service: "WeddingSession", price: 600},
            { service: "BlurayPackage", price: 300},
            { service: "TwoDayEvent", price: 400},
        ],
    2022: [
            { service: "Photography", price: 1900},
            { service: "VideoRecording", price: 1900},
            { service: "WeddingSession", price: 600},
            { service: "BlurayPackage", price: 300},
            { service: "TwoDayEvent", price: 400},
        ]
};

const discounts: { [key in ServiceYear]: { type: DiscountType, package: ServiceType[], discount: number}[] } = {
    2020: [
            { type: DiscountType.PhotoVideo, package: ["Photography", "VideoRecording"], discount: 1200},
            { type: DiscountType.WeddingSession, package: ["WeddingSession", "Photography"], discount: 300 },
            { type: DiscountType.WeddingSession, package: ["WeddingSession", "VideoRecording"], discount: 300 }
        ],
    2021: [
            { type: DiscountType.PhotoVideo, package: ["Photography", "VideoRecording"], discount: 1300},
            { type: DiscountType.WeddingSession, package: ["WeddingSession", "Photography"], discount: 300 },
            { type: DiscountType.WeddingSession, package: ["WeddingSession", "VideoRecording"], discount: 300 }
        ],
    2022: [
            { type: DiscountType.PhotoVideo, package: ["Photography", "VideoRecording"], discount: 1300},
            { type: DiscountType.WeddingSession, package: ["WeddingSession", "Photography"], discount: 600 },
            { type: DiscountType.WeddingSession, package: ["WeddingSession", "VideoRecording"], discount: 300 }
        ]
};

export function getRelatedServices(service: ServiceType) : ServiceType[] {
    return relatedServices.filter(s => s.main == service).map(s => s.related);
}

export function getMainServices(service: ServiceType) : ServiceType[] {
    return relatedServices.filter(s => s.related == service).map(s => s.main);
}

export function getPriceListForYear(year: ServiceYear) : { service: ServiceType, price: number}[] {
    return priceList[year];
}

export function getDiscountsForYear(year: ServiceYear) : { type: DiscountType, package: ServiceType[], discount: number}[] {
    return discounts[year];
}