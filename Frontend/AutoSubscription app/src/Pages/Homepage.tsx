export default function Homepage() {
    return (
        <div className="container">
        <div className="total-budget">
            <div className="sum">
                <span>Amount of money from transactions</span>
                <button>Transaction details</button> 
            </div>
        </div>
        <div>
            <button>Create new transaction</button>
            <button>Create new subscription</button>
        </div>
        <div>
            <button>View current transactions</button>
            <button>View current subscriptions</button>
        </div>
        </div>
    )

}