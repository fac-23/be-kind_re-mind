import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPills,
  faSyringe,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";

const StyledHeader = styled.h3`
  color: var(--color-two);
  font-family: var(--heading-font);
  text-align: center;
  font-size: 1.6rem;
  border-bottom: 1px solid var(--color-one);
  display: inline-block;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  border: 3px solid var(--color-one);
  margin: 1rem;
`;

const StyledInput = styled.div`
  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  label {
    background-color: var(--color-one);
    padding: 1rem;
    font-family: var(--body-font);
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    margin: 0.5rem;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input[type="radio"]:checked + label {
    background-color: var(--color-two);
    border: none;
  }

  input[type="radio"]:focus + label {
    border: 2px solid var(--color-one);
  }

  input[type="radio"]:hover + label {
    background-color: var(--color-two);
    border: none;
    cursor: pointer;
  }

  .icons {
    margin: 0;
    color: white;
  }
`;

const StyledInputs = styled.div`
  border: 3px solid var(--color-one);
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.1rem;
  font-family: var(--heading-font);

  label {
    margin: 0 1rem;
  }

  input,
  select {
    border: 1px solid #009444;
    margin: 0.5rem 1rem;
    padding: 10px;
  }
`;

const StyledSchedule = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 3px solid var(--color-one);
  margin: 0.5rem 1rem;
  padding: 1rem;
  font-family: var(--heading-font);
  font-size: 1.1rem;

  p {
    color: var(--color-two);
    font-size: 1.4rem;
    margin: 0 auto;
    text-align: center;
    border-bottom: 1px solid var(--color-one);
  }

  div {
    background: var(--color-one);
    border-radius: 5px;
    border: none;
    color: white;
  }
`;

const StyledTime = styled.div`
  border: var(--color-one) 3px solid;
  margin: 0.5rem 1rem;
  padding: 1rem;
  font-family: var(--heading-font);
  font-size: 1.1rem;
  color: white;

  div {
    border: none;
    background: var(--color-two);
    border-radius: 5px;
  }

  label {
    margin: 0.1rem;
  }

  input {
    margin-left: 1rem;
    border-radius: 5px;
    border: none;
    padding: 0.5rem;
  }
`;

const StyleNote = styled.div`
  border: var(--color-one) 3px solid;
  margin: 0.5rem 1rem;
  padding: 1rem;
  font-family: var(--heading-font);
  font-size: 1.1rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: var(--color-one);
    border-radius: 5px;
    border: none;
  }

  label {
    color: white;
  }

  textarea {
    border: 3px solid white;
    padding: 1.5rem;
  }
`;

const StyledButton = styled.button`
  background: var(--color-two);
  margin: 1rem;
  display: block;
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-family: var(--heading-font);
  font-size: 1.2rem;
  line-height: 20px;
  list-style: none;
  outline: none;
  padding: 0.5rem;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  border: none;
  width: calc(100% - 2rem);

  & :hover {
    background: #cc8c10;
    transform: scale(0.99);
  }
`;

const StyledMedType = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: centre;
  flex-wrap: wrap;
  margin: 2rem 0.5rem;
`;

function CustomInput({ id, name, icon }) {
  return (
    <StyledInput>
      <input type="radio" id={id} value={id} name="medicationType" />
      <label htmlFor={id}>
        {name} <FontAwesomeIcon className="iconTime" size="lg" icon={icon} />
      </label>
    </StyledInput>
  );
}

export default function MedicationForm() {
  return (
    <StyledForm
      className="flexbox-center-col"
      method="POST"
      action="/api/update-medlist"
    >
      <StyledHeader>Select a medicine type:</StyledHeader>
      <StyledMedType>
        <CustomInput id="tablets" name="Tablets" icon={faPills} />
        <CustomInput id="injection" name="Injection" icon={faSyringe} />

        <CustomInput id="liquid" name="Liquid" icon={faDroplet} />

        <CustomInput id="other" name="Other" icon={faPencil} />
      </StyledMedType>

      <StyledInputs>
        <label htmlFor="medName">Name</label>
        <input type="text" name="medName" required />

        <label htmlFor="medDose">Dose</label>
        <input type="number" name="medDose" required />

        <label htmlFor="units">Units</label>
        <select name="units" id="units">
          <option value="ug">micrograms - ug</option>
          <option value="mg">milligrams - mg</option>
          <option value="g">grams - g</option>
        </select>

        <label htmlFor="tabCount">Full box tablet count</label>
        <input type="number" name="tabCount" />
      </StyledInputs>

      <StyledSchedule>
        <p>Select your schedule</p>
        <div className="box">
          <input type="radio" id="medTime" value="08:00" name="medTime" />
          <label htmlFor="medTime">08:00</label>
        </div>
        <div className="box">
          <input type="radio" id="medTime" value="11:00" name="medTime" />
          <label htmlFor="medTime">11:00</label>
        </div>
        <div className="box">
          <input type="radio" id="medTime" value="13:00" name="medTime" />
          <label htmlFor="medTime">13:00</label>
        </div>
        <div className="box">
          <input type="radio" id="medTime" value="18:00" name="medTime" />
          <label htmlFor="medTime">18:00</label>
        </div>
        <div className="box">
          <input type="radio" id="medTime" value="22:00" name="medTime" />
          <label htmlFor="medTime">22:00</label>
        </div>
      </StyledSchedule>

      {/* <StyledTime className="box">
          <div className="box">
            <label htmlFor="customTime">Custom time:</label>
            <input
              min="05:00"
              max="23:00"
              type="time"
              id="customTime"
              name="customTime"
            />
          </div>
  </StyledTime>*/}

      <StyleNote>
        <div className="box">
          <label htmlFor="notes">Notes</label>
          <textarea name="notes" id="notes"></textarea>
        </div>
      </StyleNote>

      <StyledButton type="submit">Save</StyledButton>
    </StyledForm>
  );
}
