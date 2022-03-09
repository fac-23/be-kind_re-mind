import styled from "styled-components";

const StyledHeader = styled.h3`
  color: var(--color-two);
  font-family: var(--heading-font);
  text-align: center;
  font-size: 1.6rem;
  border-bottom: 1px solid var(--color-one);
  display: inline-block;
  margin: 0 auto;
`;

const StyledTypesRow1 = styled.div`
  margin: 1rem;
  padding: 1rem;
`;

const StyledTypesRow2 = styled.div`
  margin: 1rem;
  padding: 1rem;
`;

const StyledForm = styled.form`
  border: 3px solid var(--color-one);
`;

const StyledInput = styled.span`
  background: red;
  input {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  label[for="medicationType"] {
    display: inline-block;
    background-color: #ddd;
    padding: 10px 20px;
    font-family: sans-serif, Arial;
    font-size: 16px;
    border: 2px solid #444;
    border-radius: 4px;
  }

  input[type="radio"]:checked + label {
    background-color: #bfb;
    border-color: #4c4;
  }
`;

function CustomInput({ id, name }) {
  return (
    <StyledInput>
      <input type="radio" id={id} value={id} name="medicationType" />
      <label htmlFor="medicationType">{name}</label>
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
      <StyledTypesRow1>
        <CustomInput id="tablets" name="Tablets" />
        <CustomInput id="liquid" name="Liquid" />
      </StyledTypesRow1>
      <StyledTypesRow2>
        <CustomInput id="cream" name="Cream" />
        <CustomInput id="other" name="Other" />
      </StyledTypesRow2>

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

      <p>Select your schedule</p>
      <div className="box">
        <input type="checkbox" id="medTime" value="08:00" name="medTime" />
        <label htmlFor="medTime">08:00</label>
      </div>
      <div className="box">
        <input type="checkbox" id="medTime" value="11:00" name="medTime" />
        <label htmlFor="medTime">11:00</label>
      </div>
      <div className="box">
        <input type="checkbox" id="medTime" value="13:00" name="medTime" />
        <label htmlFor="medTime">13:00</label>
      </div>
      <div className="box">
        <input type="checkbox" id="medTime" value="18:00" name="medTime" />
        <label htmlFor="medTime">18:00</label>
      </div>
      <div className="box">
        <input type="checkbox" id="medTime" value="22:00" name="medTime" />
        <label htmlFor="medTime">22:00</label>
      </div>
      <div className="box">
        <input
          min="05:00"
          max="23:00"
          type="time"
          id="customTime"
          name="customTime"
        />
        <label htmlFor="customTime">Custom time:</label>
      </div>

      <label htmlFor="notes">Notes</label>
      <textarea name="notes" id="notes"></textarea>

      <button type="submit">Save</button>
    </StyledForm>
  );
}
