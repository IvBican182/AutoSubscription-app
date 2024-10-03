import { useAppDispatch } from "../Redux/store";
import { useSelector } from "react-redux";
import { fetchUsers } from "../Redux/userSlice";
import { RootState } from "../Redux/store";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap"
import style from "./AdminHomepage.module.css";
import { useNavigate } from "react-router";

//our admin homepage, users won't see this page
export default function AdminHomepage() {

    //enables the usage of dispatch
    const dispatch = useAppDispatch();

    //enables navigating to another route
    const navigate = useNavigate();

    //get users from our state
    const users = useSelector((state: RootState) => state.users.users )
    
    //function to fetch our users
    function fetch() {
        dispatch(fetchUsers());
    }
    
    //we use it in useEffect so that our users are fetched again upon changes in database
    useEffect(() => {
        fetch();
        console.log(users);
    }, []);

    return(
        <Container className={style.userContainer}>
            <Row className={style.row}>
                
                <Col className="col-md-4">
                    <div className={style.card}>
                        <div className="card-body">
                            <h5 className="card-title">TRAINING</h5>
                            <p>Set training for your team</p>
                            <p className="card-text">see the details</p>
                            <a href="#" className="btn btn-primary">SEE MORE</a>
                        </div>
                    </div>
                </Col>
                
                <Col className="col-md-4">
                    <div className={style.card}>
                        <div className="card-body">
                            <h5 className="card-title">PROFILE</h5>
                            <p>coach name</p>
                            <p>player email</p>
                            <p>group</p>
                            <p className="card-text">view and edit your profile details</p>
                            {/*navigate to profile page, still needs work */}
                            <button className="btn btn-primary" onClick={()=> navigate("/profile")}>SEE MORE</button>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className={style.row}>   
                <Col className="col-md-4">
                    <div className={style.card}>
                        <div className="card-body">
                            <h5 className="card-title">NEWS FEED</h5>
                            <p className="card-text">Write news for your team group</p>
                            <a href="#" className="btn btn-primary">GO</a>
                        </div>
                    </div>
                </Col>
                
                <Col className="col-md-4">
                    <div className={style.card}>
                        <div className="card-body">
                            <h5 className="card-title">TOTAL BUDGET</h5>
                            <p className="card-text">VIEW SUBSCRIPTION DETAILS</p>
                            <a href="#" className="btn btn-primary">VIEW DETAILS</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}