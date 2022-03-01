export default function MedicationForm() {
  return (
    <form>
      <div className="box">
        <input
          type="radio"
          id="tablets"
          value="tablets"
          name="medication-type"
        />
        <label htmlFor="medication-type">Tablets</label>
        <input type="radio" id="liquid" value="liquid" name="medication-type" />
        <label htmlFor="medication-type">Liquid</label>
        <input type="radio" id="cream" value="cream" name="medication-type" />
        <label htmlFor="medication-type">Cream</label>
        <input type="radio" id="other" value="other" name="medication-type" />
        <label htmlFor="medication-type">Other</label>
      </div>

      <label htmlFor="med-name">Name</label>
      <input type="text" name="med-name" required />

      <label htmlFor="med-strength">Strength</label>
      <input type="number" name="med-strength" required />

      <label htmlFor="med-dose">Dose</label>
      <input type="number" name="med-dose" required />

      <p>Select your schedule</p>
      <div className="box">
        <input type="checkbox" id="med-time" value="08:00" name="med-time" />
        <label htmlFor="med-time">08:00</label>
      </div>
      <div className="box">
        <input type="checkbox" id="med-time" value="11:00" name="med-time" />
        <label htmlFor="med-time">11:00</label>
      </div>
      <div className="box">
        <input type="checkbox" id="med-time" value="13:00" name="med-time" />
        <label htmlFor="med-time">13:00</label>
      </div>
      <div className="box">
        <input type="checkbox" id="med-time" value="18:00" name="med-time" />
        <label htmlFor="med-time">18:00</label>
      </div>
      <div className="box">
        <input type="checkbox" id="med-time" value="22:00" name="med-time" />
        <label htmlFor="med-time">22:00</label>
      </div>

      <label htmlFor="notes">Notes</label>
      <textarea name="notes" id="notes"></textarea>

      <button type="submit">Save</button>
    </form>
  );
}
