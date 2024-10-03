import { Container, Row, Col } from "react-bootstrap"
import style from "./UserHomepage.module.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import UserData from "./UserData";

//our user homepage, admins won't see this page
export default function UserHomepage() {

    //get the current authenticated user state
    const user = useSelector((state: RootState) => state.auth.user);
    
    //convert user object to array for mapping purposes
    const userArray = [user];
    
    //get the current user ID, we want to use it later for fetching current user data
    const userId = userArray.map((u:any) => u.id )

    console.log(`userHomepage ${JSON.stringify(userArray)}`);

     //enables navigating to another route
    const navigate = useNavigate();



    return(
        <Container className={style.userContainer}>
            <Row className={style.row}>
                
                <Col className="col-md-4">
                    <div className={style.card}>
                        <div className="card-body">
                            <h5 className="card-title">TRAINING</h5>
                            <p>training details by the day</p>
                            <p className="card-text">View training details for the week</p>
                            <a href="#" className="btn btn-primary">SEE MORE</a>
                        </div>
                    </div>
                </Col>
                
                <Col className="col-md-4">
                    <div className={style.card}>
                        <div className="card-body">
                            <h5 className="card-title">PROFILE</h5>
                            <div>
                                {/*mapping our userArray to send data to another component*/}
                                <div> {userArray.map((user:any) => {
                                    return <UserData key={user.id} props={user}/>
                                })}
                                </div>
                            </div>
                            <p className="card-text">view and edit your profile details</p>
                            {/*navigates to the current user profile page*/}
                            <button className="btn btn-primary" onClick={()=> navigate(`/profile/${userId}`)}>SEE MORE</button>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className={style.row}>   
                <Col className="col-md-4">
                    <div className={style.card}>
                        <div className="card-body">
                            <h5 className="card-title">NEWS FEED</h5>
                            <p className="card-text">Check the latest posts from you Coaches</p>
                            <a href="#" className="btn btn-primary">VIEW</a>
                        </div>
                    </div>
                </Col>
                
                <Col className="col-md-4">
                    <div className={style.card}>
                        <div className="card-body">
                            <h5 className="card-title">SUBSCRIPTION</h5>
                            <p className="card-text">VIEW SUBSCRIPTION DETAILS OR SUBSCRIBE</p>
                            <a href="#" className="btn btn-primary">VIEW DETAILS OR SUBSCRIBE</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}