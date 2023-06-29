import { commerce } from '../commerceJS';

export const fetchProducts = async (state, setLoading) => {
    setLoading(true);
    try {
        const result = await commerce.products.list();
        state(result.data);
        setLoading(false);
    } catch (err) {
        window.alert(err.message);
    }
}

export const fetchCart = async (state, setLoading) => {
    setLoading(true);
    try {
        const result = await commerce.cart.retrieve();
        state(result);
        setLoading(false);
    } catch (err) {
        window.alert(err.message);
    }
}

export const addToCart = async (state, product_id, quantity, setLoading) => {
    setLoading(true);
    try {
        const result = await commerce.cart.add(product_id, quantity);
        state(result.cart);
        setLoading(false);
    } catch (err) {
        window.alert(err.message);
    }
}

export const updateCart = async (lineItemId, quantity, state, setLoading) => {
    setLoading(true);
    try {
        const response = await commerce.cart.update(lineItemId, { quantity });
        setLoading(false);
        state(response.cart);
    } catch (err) {
        window.alert(err.message);
    }
}

export const removeFromCart = async (lineItemId, state, setLoading) => {
    setLoading(true);
    try {
        const response = await commerce.cart.remove(lineItemId);
        setLoading(false);
        state(response.cart);
    } catch (err) {
        window.alert(err.message);
    }
}

export const emptyCart = async (state, setLoading) => {
    setLoading(true);
    try {
        const response = await commerce.cart.empty()
        state(response.cart);
        setLoading(false);
    } catch (err) {
        window.alert(err.message);
    }
}

export const generateCheckoutToken = async (cartId, state, setLoading) => {
    setLoading(true);
    try {
        const result = await commerce.checkout.generateToken(cartId, { type: 'cart' });
        state(result);
        setLoading(false);
    } catch (err) {
        window.alert(err.message);
    }
}

export const fetchCountries = async (state) => {
    try {
        const object = await commerce.services.localeListCountries();
        const keyValuePair = Object.entries(object.countries);
        state(keyValuePair);
    } catch (err) {
        window.alert(err.message);
    }
}

export const fetchSubDivisions = async (countryCode, state) => {
    try {
        const object = await commerce.services.localeListSubdivisions(countryCode);
        const keyValuePair = Object.entries(object.subdivisions);
        state(keyValuePair);
    } catch (err) {
        window.alert(err.message);
    }
}