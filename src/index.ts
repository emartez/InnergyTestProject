import { Action } from "./models/action";
import { AppState } from "./models/app-state";
import { ServiceType } from "./models/service-type";
import { ServiceYear } from "./models/service-year";
import { getCalculatedPrice } from "./services/price-calculator";
import { reducer } from "./services/state-service";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: Action; service: ServiceType }
) => {
    const state: AppState = !!previouslySelectedServices ? { selectedServices: previouslySelectedServices } : undefined;
    return reducer(state, action).selectedServices;
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => getCalculatedPrice(selectedServices, selectedYear);