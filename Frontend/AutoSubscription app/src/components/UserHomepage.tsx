import { Container, Row, Col } from "react-bootstrap"
import style from "./UserHomepage.module.css";

export default function UserHomepage() {
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
                            <p>player name</p>
                            <p>player email</p>
                            <p>group</p>
                            <p className="card-text">view and edit your profile details</p>
                            <a href="#" className="btn btn-primary">SEE MORE</a>
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