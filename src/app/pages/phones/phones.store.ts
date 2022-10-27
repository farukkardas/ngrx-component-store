import { inject, Injectable } from "@angular/core";
import { Phone } from "src/app/models/phone";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { catchError, EMPTY, Observable, switchMap, tap } from "rxjs";
import { PhoneService } from "src/app/service/phone.service";
import { HttpErrorResponse } from "@angular/common/http";

export interface PhonesState {
    phones: Phone[];
    selectedphoneId: number | null;
    error: string | null;
}

export const initialState: PhonesState = {
    phones: [],
    selectedphoneId: null,
    error: null
}

@Injectable()
export class PhonesStore extends ComponentStore<PhonesState>{
    constructor() {
        super(initialState)
    }

    phoneService = inject(PhoneService)

    phones$ = this.select(state => state.phones);
    error$ = this.select(state => state.error);
    selectedPhoneId$ = this.select(state => state.selectedphoneId);
    selectedPhone$ = this.select(
        this.phones$,
        this.selectedPhoneId$,
        (phones, selectedphoneId) => phones.find(phone => phone.id === selectedphoneId)
    )

    readonly getPhones = this.effect(() => {
        return this.phoneService.getAll().pipe(
            tapResponse(
                (phones) => this.setAllphones(phones),
                (error: HttpErrorResponse) => this.logError(error),
            )
        )
    });

    logError(error: HttpErrorResponse) {
        this.patchState({ error: error.message })
    }

    setAllphones(phones: Phone[]) {
        this.setState(state => {
            return {
                ...state,
                phones: [...state.phones, ...phones]
            }
        })
    }

    addPhone(phone: Phone) {
        this.setState(state => ({
            ...state,
            phones: [...state.phones, phone]
        }))
    }

    removePhone = this.updater((state, phoneId: number) => ({
        ...state,
        phones: state.phones.filter(phone => phone.id !== phoneId)
    }))

    selectPhone(phoneId: number) {
        this.patchState({ selectedphoneId: phoneId })
    }

    updatePhone = this.updater(state => ({
        ...state,
        phones: state.phones.map(phone => {
            if (phone.id === state.selectedphoneId) {
                phone.price = (phone?.price ?? 0) + 10;
                return phone;
            }
            return phone
        })
    }))

    delete = this.updater((state: PhonesState, productId: number) => ({
        ...state,
        phones: state.phones.filter(phone => phone.id !== productId)
    }))
}