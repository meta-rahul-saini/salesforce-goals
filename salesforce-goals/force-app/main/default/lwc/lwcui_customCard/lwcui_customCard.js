import { LightningElement } from 'lwc';
import quoteManual from '@salesforce/label/c.quoteManual';
import LOCALE from '@salesforce/i18n/locale';
import CURRENCY from '@salesforce/i18n/currency';

export default class Lwcui_customCard extends LightningElement {
    label = {
        quoteManual
    };

    number = 123456.78;
    formattedNumber = new Intl.NumberFormat(LOCALE, {
        style: 'currency',
        currency: CURRENCY,
        currencyDisplay: 'symbol'
    }).format(this.number);
}