import { LightningElement, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import getHotels from '@salesforce/apex/HotelListController.getHotels';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class HotelListComponent extends NavigationMixin(LightningElement) {

    city = '';
    type = '';
    hotels = [];
    selectedHotel;
    isLoading = false;
    error;

  @wire(CurrentPageReference)
getStateParameters(pageRef){
    if(pageRef && pageRef.state){

        this.city = pageRef.state.c__city;
        this.type = pageRef.state.c__type;
        this.guestId = pageRef.state.c__guestId;

        console.log('STATE VALUES => ', this.city, this.type);

    
        if(this.city && this.type){
            this.loadHotels();
        }
    }
}

 
    loadHotels(){
        this.isLoading = true;

        getHotels({ city:this.city, type:this.type })
        .then(result=>{
    console.log('APEX RESULT => ', result);

    this.hotels = result ? result : [];  
    this.error = undefined;
})
        .catch(err=>{
            this.error = err.body?.message;
        })
        .finally(()=>{
            this.isLoading = false;
        });
    }

  
    handleSelect(event){
        const index = event.target.dataset.index;
        this.selectedHotel = this.hotels[index];

        console.log('Selected Hotel:', this.selectedHotel);
    }

    
    handleConfirm(){

        console.log('Confirm clicked');
        console.log('SelectedHotel:', this.selectedHotel);

        if(!this.selectedHotel){
            this.dispatchEvent(
                new ShowToastEvent({
                    title:'No selection',
                    message:'Please select a hotel.',
                    variant:'warning'
                })
            );
            return;
        }

        this.dispatchEvent(
            new ShowToastEvent({
                title:'Hotel Selected',
                message:this.selectedHotel.Name,
                variant:'success'
            })
        );

        
        this[NavigationMixin.Navigate]({
            type:'standard__navItemPage',
            attributes:{
                apiName:'Payment_Information'
                 },
    state:{
         c__guestId:this.guestId 
            }
        });
    }
}
