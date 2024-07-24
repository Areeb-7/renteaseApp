// import React from 'react';
// import './Make.module.css';

// function Make() {
//   return (
//     <div className="container">
//       <div className="text-container">
//         <h1>Make It Happen In 4 Steps</h1>
//         <p>Choose a vehicle</p>
//         <p>Unlock unparalleled adventures and memorable journeys with our vast fleet of vehicles tailored to suit every need, taste, and destination.</p>
//         <p>Pick location & date</p>
//         <p>Pick your ideal location and date, and let us take you on a journey filled with convenience, flexibility, and unforgettable experiences.</p>
//         <p>Make a booking</p>
//         <p>Secure your reservation with ease, unlocking a world of possibilities and embarking on your next adventure with confidence.</p>
//         <p>Sit back & relax</p>
//         <p>Hassle-free convenience as we take care of every detail, allowing you to unwind and embrace a journey filled comfort.</p>
//       </div>
//       <div className="image-container">
//         <img src="https://via.placeholder.com/300" alt="placeholder" />
//       </div>
//     </div>
//   );
// }

// export default Make;

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  /* Styles for the outer container */
`;

const StepContainer = styled.div`
  /* Styles for each step container */
`;

const Title = styled.div`
  /* Styles for the title "Make It Happens In 4 Steps" */
`;

const StepContent = styled.div`
  /* Styles for the content of each step */
`;

const StepNumber = styled.div`
  /* Styles for the step number */
`;

function Make() {
  return (
    <Container>
      <div className="div">
        <Title>Make It Happens In 4 Steps</Title>

        {/* Step 1 */}
        <StepContainer>
          <StepContent>
            <div>Choose a vehicle</div>
            <div>
              Unlock unparalleled adventures and
              <br />
              memorable journeys with our vast
              <br />
              fleet of vehicles tailored to suit
              <br />
              every need, taste, and destination.
            </div>
          </StepContent>
          <StepNumber>1</StepNumber>
        </StepContainer>

        {/* Step 2 */}
        <StepContainer>
          <StepNumber>2</StepNumber>
          <StepContent>
            <div>Pick location & date</div>
            <div>
              Pick your ideal location and date, <br />
              and let us take you on a journey <br />
              filled with convenience, flexibility,
              <br />
              and unforgettable experiences.
            </div>
          </StepContent>
        </StepContainer>

        {/* Step 3 */}
        <StepContainer>
          <StepContent>
            <div>Make a booking</div>
            <div>
              Secure your reservation with ease, <br />
              unlocking a world of possibilities
              <br />
              and embarking on your next <br />
              adventure with confidence.
            </div>
          </StepContent>
          <StepNumber>3</StepNumber>
        </StepContainer>

        {/* Step 4 */}
        <StepContainer>
          <StepNumber>4</StepNumber>
          <StepContent>
            <div>Sit back & relax</div>
            <div>
              Hassle-free convenience as we <br />
              take care of every detail, allowing <br />
              you to unwind and embrace a<br />
              journey filled comfort.
            </div>
          </StepContent>
        </StepContainer>

      </div>
    </Container>
  );
}

export default Make;

