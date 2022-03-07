import { Action } from "../models/action";
import { AppState } from "../models/app-state";
import { ServiceType } from "../models/service-type";
import { getMainServices, getRelatedServices } from "./data-service";

const initialState: AppState = {  
    selectedServices: []
};

export function reducer(state: AppState = initialState, action: { type: Action; service: ServiceType; }): AppState {    
    switch (action.type) {
        case "Select": 
            return { selectedServices: selectService(state.selectedServices, action.service) };
        case "Deselect":
            return { selectedServices: deselectService(state.selectedServices, action.service) };
        default:
            return state;
    }
}

// function to add the service to the collection of selected services
function selectService(previouslySelectedServices: ServiceType[], service: ServiceType) : ServiceType[] {

    // if service is already in the collection then nothing to select
    if (previouslySelectedServices.indexOf(service) >= 0) {
        return previouslySelectedServices;
    }

    // if service is related then at least one main service needs to be in the collection
    let mainServices = getMainServices(service);
    if (!!mainServices.length && !mainServices.some(main => previouslySelectedServices.includes(main))) {
        return previouslySelectedServices;
    }

    return [...previouslySelectedServices, service];
}

// function to remove the service from the collection of selected services
function deselectService(previouslySelectedServices: ServiceType[], service: ServiceType) : ServiceType[] {
    if (!previouslySelectedServices.length) {
        return [];
    }
    
    // service doesn't exist in the collection
    const serviceIndex = previouslySelectedServices.indexOf(service);
    if (serviceIndex < 0) {
        return previouslySelectedServices;
    }

    // deselect service and related services
    const selectedServices = previouslySelectedServices.filter((s, index) => index !== serviceIndex);
    return deselectRelatedServices(selectedServices, service);
}

function deselectRelatedServices(selectedServices: ServiceType[], service: ServiceType) : ServiceType[] {
    const relatedServices = getRelatedServices(service);

    if (!relatedServices.length) {
        return selectedServices;
    }
    
    //get related services with no main service selected
    const relatedServicesToRemove = relatedServices.filter(s => 
        !getMainServices(s).some(main =>  selectedServices.includes(main))
    );

    return selectedServices.filter(s => !relatedServicesToRemove.includes(s));
}