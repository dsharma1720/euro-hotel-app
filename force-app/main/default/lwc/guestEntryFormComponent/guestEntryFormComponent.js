import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import saveGuest from '@salesforce/apex/GuestEntryController.saveGuest';


export default class GuestEntryFormComponent extends NavigationMixin(LightningElement){

    firstName = '';
    lastName = '';
    phone = '';
    email = '';

    adults = '0';
    children = '0';

    checkIn = '';
    checkOut = '';

    city = '';
    hotelType = '';


    cityOptions = [
    { label: 'Bangalore', value: 'Bangalore' },
    { label: 'Mumbai', value: 'Mumbai' },
    { label: 'Delhi', value: 'Delhi' },
    { label: 'Hyderabad', value: 'Hyderabad' },
    { label: 'Chennai', value: 'Chennai' },
    { label: 'Kolkata', value: 'Kolkata' },
    { label: 'Pune', value: 'Pune' },
    { label: 'Jaipur', value: 'Jaipur' },
    { label: 'Goa', value: 'Goa' },
    { label: 'Kochi', value: 'Kochi' },
    { label: 'Udaipur', value: 'Udaipur' },
    { label: 'Ahmedabad', value: 'Ahmedabad' },
    { label: 'Chandigarh', value: 'Chandigarh' },
    { label: 'Varanasi', value: 'Varanasi' },
    { label: 'Shimla', value: 'Shimla' },
    { label: 'Manali', value: 'Manali' }
];
    hotelOptions = [
        { label:'3 Star', value:'3 Star'},
        { label:'4 Star', value:'4 Star'},
        { label:'5 Star', value:'5 Star'}
    ];

    
    handleChange(event) {

    const field = event.target.dataset.field;
    let value = event.target.value;

  
    if(field === 'adults' || field === 'children'){
        value = value ? parseInt(value, 10) : 0;
    }

  
    if(field === 'checkIn' || field === 'checkOut'){
        value = value || '';
    }

  
    this[field] = value;

    console.log(field + " = " + value);
}

handleNext(){

    saveGuest({
            firstName:this.firstName,
            lastName:this.lastName,
            phone:this.phone,
            email:this.email
        })
        .then(guestId => {

            console.log("Guest Created:", guestId);

            this[NavigationMixin.Navigate]({
                type:'standard__navItemPage',
                attributes:{ apiName:'Hotel_Lists' },
                state:{
                    c__city:this.city,
                    c__type:this.hotelType,
                    c__guestId:guestId
                }
            });

        })
        .catch(error=>{
            console.error("Guest Save Error:", error);      
        });
    }
}
