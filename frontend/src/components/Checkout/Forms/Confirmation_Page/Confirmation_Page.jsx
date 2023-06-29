const Confirmation = ({ payment_success })=>{

    const Success = ()=>{
        return <div style={{width:'100%', textAlign: 'center', fontSize: '22px' }}>
            <hr/><br/>
            !! Thank you for shopping !!<br/>
            Your products will be delivered soon.<br/><br/><br/>

            <span style={{fontSize:'15px'}}>Reach me at <a href='https://www.linkedin.com/in/stoic-harsh/'>LinkedIn</a></span>
        </div>
    }

    const Failure = ()=>{
        return <div style={{width:'100%', textAlign: 'center', fontSize: '22px' }}>
        <hr/><br/>
            * Payment Failed.<br/>
            Something went wrong...

            <br/><br/><br/>

            <span style={{fontSize:'15px'}}>Try Again</span>
        </div>
    }

    return (payment_success) ? <Success/> : <Failure/>
}

export default Confirmation;