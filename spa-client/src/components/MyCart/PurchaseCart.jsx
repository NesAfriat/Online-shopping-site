import {useRef} from "react";
import classes from "../../styling/addForm.module.css";
import {postPurchaseShoppingCart} from "../../api";

const PurchaseCart = (props) => {
    const ccNumber = useRef();
    const expdate = useRef();
    const cvs = useRef();
    const country = useRef();
    const city = useRef();
    const street = useRef();
    const zip = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();

        const enteredccNumer = ccNumber.current.value;
        const enteredDate = expdate.current.value;
        let dateArr = enteredDate.split('-')
        const dateFormat = dateArr[1] + "-" + dateArr[0];
        console.log(dateFormat)
        const enteredCVS = cvs.current.value;
        const enteredCountry = country.current.value;
        const enteredCity = city.current.value;
        const enteredStreet = street.current.value;
        const enteredZip = zip.current.value;

        await postPurchaseShoppingCart(
            props.visitorId,
            enteredccNumer,
            dateFormat,
            enteredCVS,
            enteredCountry,
            enteredCity,
            enteredStreet,
            enteredZip
        ).then((res) => {
            console.log(res);
            let errors = 0;
            let len = 0;
            if (res.errorOccurred) {
                alert(res.errorMessage);
                console.log(res.errorMessage)
            } else {
                len = Object.entries(res.value).length;
                Object.entries(res.value).map(([i, basket])=>{
                    if(basket.errorAcquired){
                        errors++
                        alert(`Error purchase basket: ${i}\nError message: ${basket.purchaseError}`)
                    }
                })
                if(errors === 0){
                    alert("purchased cart");
                }
                else if(errors === len){
                    alert("purchase failed")
                }else{
                    alert("Successfully purchase cart")
                }
                props.setter(false);
                props.reloadCart();
            }
        });
    };

    return (
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <h1 className={classes.h1}>
                    Enter your payment and delivery information:
                </h1>
                <label htmlFor="Credit-card number">Credit-card number: </label>
                <input type="number" required id="Credit-card number" ref={ccNumber}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="expiration date">expiration date: </label>
                <input type="date" required id="expiration date" ref={expdate}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="cvs">cvs: </label>
                <input type="number" required id="cvs" ref={cvs}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="Country">Country: </label>
                <input type="text" required id="Country" ref={country}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="City">City: </label>
                <input type="text" required id="City" ref={city}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="Street">Street: </label>
                <input type="text" required id="Street" ref={street}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="Zip">Zip: </label>
                <input type="text" required id="Zip" ref={zip}/>
            </div>
            <div>
                <button className={classes.actions}>Proceed to payment</button>
            </div>
        </form>
    );
};

export default PurchaseCart;
