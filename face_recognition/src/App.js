
import './App.css';
import React, { useState } from 'react';
import ParticlesBg from 'particles-bg'
import Navigtion from './components/Navigtion/Navigtion';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import AgePredictions from './components/AgePredictions/AgePredictions';
import Fotter from './components/Fotter/Fotter'
import Loading from './components/Loading/Loading';

function App () {
 
// We check if the environment is 'development' or 'production'.
// 'process.env.NODE_ENV' is set automatically by React depending on whether 
// the app is running locally or in a live production environment.
const backendUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001'  // Local backend for development
  : 'https://smartbrain-backend-6y14.onrender.com';  // Deployed backend for production


  // * state to switch sign in , registar or home :
  const [isSignedIn, setIsSignedIn] = useState("signin");

  const onRouteChange = (route) => {
    if (route === 'signout') { //* clear all state when log out
      setIsSignedIn("signin"); 
      setImageUrl(""); 
      setInput("");
      setBox({});
      setAgePredictions([]);
      setIsDetectionMade(false);
    } else if (route === 'home') {
      setIsSignedIn("home");
    } else if (route === 'register') {
      setIsSignedIn("register");
    }
    else if  (route === 'signin') {
      setIsSignedIn("signin");
    }
  }; //* end here

  //* state to control user obj to fetch and retrive data
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    detectionCounter: 0
  });
  const handleUserUpdate = (newUser) => {
    setUser((prevUser) => ({ ...prevUser, ...newUser }));
  }; //* end here

//* New state for loading
  const [isLoading, setIsLoading] = useState(false); 
  
  // * just to chake : const onInputChange = (event) => {console.log(event.target.value)}
  // * just to chake : const onButtonSubmit = () => {console.log('click')}


  // * two state variables, input to track the URL entered by the user ,
  // * and imageUrl to hold the URL when the button is clicked.
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  //*onInputChange: Updates the input state as the user types in the URL.
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  //* state for Clarifai age prediction
  const [agePredictions, setAgePredictions] = useState([]);

  const [isDetectionMade, setIsDetectionMade] = useState(false); // State to track if detection is made

  


  
  // todo: Clarifai FACE DETECTION . to extract the data and calculate the squre around the face  : ->>
  // Initialize the state to store the bounding box coordinates for the detected face
const [box, setBox] = useState({});

// Function to calculate the face location on the image based on the Clarifai API response
const calculateFaceLocation = (data) => {
  // Extract the bounding box information from the first detected face region
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

  // Get the DOM element representing the input image to retrieve its dimensions
  const image = document.getElementById('inputimage');
  const width = Number(image.width);   // Convert the image width to a numeric value
  const height = Number(image.height); // Convert the image height to a numeric value

  // Calculate the pixel coordinates of the bounding box based on the image dimensions
  return {
    leftCol: clarifaiFace.left_col * width,          // Left edge of the box
    topRow: clarifaiFace.top_row * height,           // Top edge of the box
    rightCol: width - (clarifaiFace.right_col * width),  // Right edge of the box
    bottomRow: height - (clarifaiFace.bottom_row * height), // Bottom edge of the box
  };
};

// Function to update the state with the calculated face bounding box and log the coordinates
const displayFaceBox = (box) => {
  setBox(box);  // Update the state with the new box coordinates
  console.log(box); // Log the box coordinates to verify they are correct
};
 // todo:  ->> end here 

 

  //* onButtonSubmit: Sets the imageUrl state with the current input value,
  //* triggering the FaceRecognition component to display the image.
  // todo: and also uses the api doc of clarifi with the help of !section 290! in ZTM to read a doc like a pro !
  //todo: also i added fetch to Clarifai age prediction
  const onButtonSubmit = () => {
    setImageUrl(input); // Set the imageUrl to the input value when the button is pressed
    
    // Call the backend instead of Clarifai directly
    fetch(`${backendUrl}/clarifai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl: input, // Send the image URL to the backend
        modelId: 'face-detection' // Specify the model ID for face detection
      }),
    })
    .then(response => response.json())
    .then(result => {
      if (result) {
        // Update detection counter or handle the response
        fetch(`${backendUrl}/detectionCounter`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email }),
        })
        .then(response => response.json())
        .then(data => {
          handleUserUpdate({
            detectionCounter: data.userCount,
            name: data.userName,
          });
        });
  
        // Calculate and display the face box
        const faceBox = calculateFaceLocation(result);
        displayFaceBox(faceBox);
      }
  
      // Call the age detection model after face detection
      fetch(`${backendUrl}/clarifai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: input,
          modelId: 'age-demographics-recognition' // Specify the model ID for age recognition
        }),
      })
      .then(response => response.json())
      .then(result => {
        const ageConcepts = result.outputs[0].data.concepts;
        const top3Concepts = ageConcepts.slice(0, 3);
        setAgePredictions(top3Concepts);
        setIsDetectionMade(true);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="App">
      <ParticlesBg color="#DCDCDC" num={55} type="cobweb" bg={true} />

      {/* Navigation bar that shows 'Sign In' or 'Sign Out' based on the isSignedIn state */}
      <Navigtion isSignedIn={isSignedIn} onRouteChange={onRouteChange} />

      
  
      {/* Conditional rendering: 
          If the user is signed in (isSignedIn is true), show the homepage components. 
          Otherwise, show the SignIn form. */}
      {isSignedIn==="home" ? (
        <div>
          <Logo />
          <Rank user={user} />
          {/* ImageLinkForm component where the user can input an image URL and submit it */}
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />

          <div className="centerContent">
             {/* FaceRecognition component that shows the image with detected face bounding box */}
          <FaceRecognition imageUrl={imageUrl} box={box} />
          
          {isDetectionMade && (
        <AgePredictions agePredictions={agePredictions} />
      )}
          
          </div>
          
        </div>
      ) : (
        isSignedIn==="signin"
        /* SignIn component that shows the sign-in form if the user is not signed in */
       ? <SignIn onRouteChange={onRouteChange} user={user} onUserUpdate={handleUserUpdate} setIsLoading={setIsLoading} isLoading={isLoading} />
       :<Register onRouteChange={onRouteChange}  user={user} onUserUpdate={handleUserUpdate} setIsLoading={setIsLoading} isLoading={isLoading} />
      )}
      <Fotter />
      
    </div>
  );
}

export default App;
