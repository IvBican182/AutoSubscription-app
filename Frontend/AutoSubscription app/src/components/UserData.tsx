
//showing user data
const UserData: React.FC<any> = ({ props }) => {
    return (
        <div>
            <li>{props.first_name}</li>
            <li>{props.last_name}</li>
            <li>{props.user_email}</li>
            <li>{props.user_age}</li>
            
        </div>
    ) 
  };

  export default UserData;