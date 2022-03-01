export default function MedicationForm() {
  return (
    <form method="POST" action="/api/update-medlist">
      <div className="box">
        <input
          type="radio"
          id="tablets"
          value="tablets"
          name="medicationType"
        />
        <label htmlFor="medicationType">Tablets</label>
        <input type="radio" id="liquid" value="liquid" name="medicationType" />
        <label htmlFor="medicationType">Liquid</label>
        <input type="radio" id="cream" value="cream" name="medicationType" />
        <label htmlFor="medicationType">Cream</label>
        <input type="radio" id="other" value="other" name="medicationType" />
        <label htmlFor="medicationType">Other</label>
      </div>

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
    </form>
  );
}
