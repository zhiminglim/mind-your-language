import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Register() {

  const [userName, setUserName] = useState("");
  const [userSubmitted, setUserSubmitted] = useState(false);

  function handlePlay(event) {
    setUserSubmitted(true);

    event.preventDefault();
  }

  function handleUserNameChange(event) {
    const { name, value } = event.target;
    setUserSubmitted(false);
    setUserName(value);
  }

  return (
    <div>

      <p>Please fill in your details and play!</p>
      <form className="user-form">
        <TextField
          className="user-form-input"
          required
          id="outlined-required"
          label="Username"
          variant="outlined"
          onChange={handleUserNameChange}
        />
        <Button variant="contained" color="primary" onClick={handlePlay}>Play</Button>
      </form>

      <div>
        {userSubmitted &&
          <h2>Welcome, {userName}</h2>
        }
      </div>
    </div>
  );
}

export default Register;
