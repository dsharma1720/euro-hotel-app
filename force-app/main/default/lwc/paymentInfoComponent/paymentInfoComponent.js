import { LightningElement, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import savePayment from '@salesforce/apex/PaymentController.savePayment';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PaymentInfoComponent extends NavigationMixin(LightningElement){

    cardNumber;
    cvv;
    expiryMonth;
    expiryYear;
    guestId;

    monthOptions = [
        { label: 'January', value: 'January' },
        { label: 'February', value: 'February' },
        { label: 'March', value: 'March' },
        { label: 'April', value: 'April' },
        { label: 'May', value: 'May' },
        { label: 'June', value: 'June' },
        { label: 'July', value: 'July' },
        { label: 'August', value: 'August' },
        { label: 'September', value: 'September' },
        { label: 'October', value: 'October' },
        { label: 'November', value: 'November' },
        { label: 'December', value: 'December' }
    ];

    yearOptions = [
        { label: '2024', value: '2024' },
        { label: '2025', value: '2025' },
        { label: '2026', value: '2026' },
        { label: '2027', value: '2027' },
        { label: '2028', value: '2028' },
        { label: '2029', value: '2029' },
        { label: '2030', value: '2030' },
        { label: '2031', value: '2031' },
        { label: '2032', value: '2032' },
        { label: '2033', value: '2033' },
        { label: '2034', value: '2034' },
        { label: '2035', value: '2035' }
    ];

    @wire(CurrentPageReference)
    getState(pageRef){
        if(pageRef?.state?.c__guestId){
            this.guestId = pageRef.state.c__guestId;
             console.log("GuestId received:", this.guestId);
        }
    }

    handleChange(event){
        const field = event.target.dataset.field;
        this[field] = event.target.value;
         console.log(field, event.target.value);
    }

    handleSubmit(){
         console.log("GuestId:", this.guestId);
        savePayment({
            cardNumber:this.cardNumber,
            cvv:this.cvv,
            expiryMonth:this.expiryMonth,
            expiryYear:this.expiryYear,
            guestId:this.guestId
        })
        .then(paymentId => {
            console.log('Payment Success:', paymentId);

            this.showToast(
                'Success',
                'Payment completed successfully and email sent!',
                'success'
            );
            this[NavigationMixin.Navigate]({
                type:'standard__recordPage',
                attributes:{
                    recordId:paymentId,
                    objectApiName:'Payment_Master__c',
                    actionName:'view'
                }
            });
        })
        .catch(error=>{
            console.error('Payment Error:', error);
             this.showToast(
                'Error',
                error.body?.message || 'Payment failed',
                'error'
            );
        });
    }

    showToast(title, message, variant){
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
}
        