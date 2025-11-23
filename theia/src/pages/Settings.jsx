import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Settings() {

    // the users name, initial is user
    const [username, setUsername] = useState(() => {
        // get username
        const savedName = localStorage.getItem("username");

        // if we have it use it
        if (savedName) {
            return savedName;
        }
        // default
        else { return "User"; }
        }
    );

    // array of emergency contact strings
    const [emergencyContacts, setEmergencyContacts] = useState(() => {
        // get contacts
        const savedContacts = localStorage.getItem("contacts");

        // if we have contacts use them
        if (savedContacts) {
            return JSON.parse(savedContacts);
        }
        // default
        else { return []; }
        }
    );

    // for entering new contacts
    const [enteredContact, setEnteredContact] = useState("");

    // bool for showing the adding contact dialogue
    const [showEnteringContact, setShowEnteringContact] = useState(false);

    // handles adding contacts to the emergency contacts array
    const AddContact = () => { 

        // check if empty
        if (enteredContact.trim() === "") { return; }

        // add to emergency contacts
        setEmergencyContacts([...emergencyContacts, enteredContact.trim()]);

        // Reset entered contact
        setEnteredContact("");

        // hide entering text
        setShowEnteringContact(false);
    }

    const RemoveContact = (arrayIndex) => {
        // remove contact at that index
        setEmergencyContacts((prev) =>
            prev.filter((_, i) => i !== arrayIndex)
        );
    };

    const navigate = useNavigate();

    // load data
    useEffect(() => {
        const savedName = localStorage.getItem("username");
        const savedContacts = localStorage.getItem("contacts");

        if (savedName) setUsername(savedName);
        if (savedContacts) setEmergencyContacts(JSON.parse(savedContacts));
    }, []);

    // save name
    useEffect(() => {
        // add username to local storage
        localStorage.setItem("username", username);
    }, [username]);

    // save emergency contacts
    useEffect(() => {
        // add contacts to local storage
        localStorage.setItem("contacts", JSON.stringify(emergencyContacts));
    }, [emergencyContacts]);

    return (
        <div className="container">
            <h1 className="title">Settings</h1>

            <button onClick={() => navigate("/")}>
                Return to Home
            </button>

            <section>
                <h3>Change Name</h3>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </section>

            <section>
                <h3>Emergency Contacts</h3>

                <ul>
                    {emergencyContacts.map((contact, index) => (
                        <li key={index}>
                            <span>{contact}</span>

                            <button onClick={() => RemoveContact(index)}>
                                Remove
                            </button>
                        </li>
                    )
                    )
                    }
                </ul>

                {!showEnteringContact ? (
                    <button onClick={() => setShowEnteringContact(true)}>
                        Add Emergency Contact
                    </button>
                ) : (
                    <div>
                        <input
                            type="text"
                            placeholder="Enter new contact"
                            value={enteredContact}
                            onChange={(e) => setEnteredContact(e.target.value)}
                        />

                        <button onClick={AddContact}>
                            Save
                        </button>

                        <button onClick={() => {
                                setEnteredContact("");
                                setShowEnteringContact(false);
                            }
                            }
                        >
                            Cancel
                        </button>
                    </div>
                )
                }
            </section>
        </div>
    );
}