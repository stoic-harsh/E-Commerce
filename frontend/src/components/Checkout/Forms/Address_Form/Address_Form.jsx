import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text_Field, Select_Menu } from './Inputs';
import { fetchCountries, fetchSubDivisions } from '../../../../functions/index';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


const Address_Form = ({ next, shippingData }) => {
    
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        city: '',
        address: '',
        phone: '',
        email: '',
        zipCode: '',
        shippingCountryCode: '',
        shippingSubDivision: ''
    });
    const [isSubmit, setIsSubmit] = useState(false);

    const [countries, setCountries] = useState([]);
    const [subDivisions, setSubDivisions] = useState([]);

    const buttonDivStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: '0 23px'
    }

    const updateState = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setFormState({...formState, [name]: value});
    }


    const validate = (values)=>{
        const errors = {};
        if(!values.firstName){  errors.firstName = "First Name is required"}
        if(!values.lastName){  errors.lastName = "Last Name is required"}
        if(!values.email){  errors.email = "Email is required"}
        if(!values.address){  errors.address = "Address is required"}
        if(!values.phone){  errors.phone = "Phone is required"}
        if(!values.city){  errors.city = "City is required"}
        if(!values.zipCode){  errors.zipCode = "ZIP Code is required"}
        if(!values.shippingCountryCode){  errors.shippingCountryCode = "Country is required"}
        if(!values.shippingSubDivision){  errors.shippingSubDivision = "Sub-division is required"}
        if(values.email){
            const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            const isEmailValid = regex.test(values.email);
            if(!isEmailValid){
                errors.email = "Invalid Email"
            }
        }
        setFormErrors(errors);
        if(Object.keys(errors).length !== 0) window.alert(JSON.stringify(errors, undefined, 2));
    }

    useEffect(()=>{
        fetchCountries(setCountries);
    }, []);

    useEffect(()=>{
        if(formState.shippingCountryCode !== '') fetchSubDivisions(formState.shippingCountryCode, setSubDivisions);
    }, [formState.shippingCountryCode]);

    useEffect(()=>{
        if(Object.keys(formErrors).length === 0  &&  isSubmit){
            shippingData(formState);
            next();
        }
    }, [formErrors]);


    return <>
        <Grid container spacing={1.8} padding={3}>
            <Text_Field name="firstName" label="First Name" value={formState.firstName} onChange={updateState} helperText={formErrors.firstName} />
            <Text_Field name="lastName" label="Last Name" value={formState.lastName} onChange={updateState} helperText={formErrors.lastName} />
            <Text_Field name="address" label="House No./Street/Locality" value={formState.address} onChange={updateState} helperText={formErrors.address} />
            <Text_Field name="email" label="Email" value={formState.email} onChange={updateState} helperText={formErrors.email} />
            <Text_Field name="phone" label="Mobile Number" value={formState.phone} onChange={updateState} helperText={formErrors.phone} />
            <Text_Field name="city" label="City" value={formState.city} onChange={updateState} helperText={formErrors.city} />
            <Text_Field name="zipCode" label="ZIP Postal Code" value={formState.zipCode} onChange={updateState} helperText={formErrors.zipCode} />
            <Select_Menu name="shippingCountryCode" label="Shipping Country" array={countries} value={formState.shippingCountryCode} onChange={updateState} helperText={formErrors.shippingCountryCode} />
            <Select_Menu name="shippingSubDivision" label="Shipping Sub-division" array={subDivisions} value={formState.shippingSubDivision} onChange={updateState} helperText={formErrors.shippingSubDivision} />
        </Grid>

        <div style={buttonDivStyle}>
            <Button variant="outlined" color="warning" onClick={() => {
                navigate('/cart');
            }}>Back to Cart</Button>
            <Button variant="contained" className="lastButtonMargin" color="success" onClick={() => {
                validate(formState);
                setIsSubmit(true);
            }}>Next</Button>
        </div>

    </>
}

export default Address_Form;