import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
          };

          console.log("Signup data: ", data);
      
          fetch("https://queer-films-a4556bef0856.herokuapp.com/users", {
          //fetch("http://localhost:8080/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          }).then((response) => {
            if (response.ok) {
              alert("Signup successful");
              window.location.reload();
            } else {
              console.error("Signup failed response: ", response);
              alert("Signup failed");
            }
          });
        };

        return(
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="4"
                    />
          </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
            </Form.Group>

            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
            </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        );
    }